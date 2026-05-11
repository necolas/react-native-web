/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { atomic, classic, inline } from './compiler';
import { createSheet } from './dom';
import { localizeStyle } from './localizeStyle';
import { preprocess } from './preprocess';
import { styleq } from 'styleq';
import { validate } from './validate';
import canUseDOM from '../../modules/canUseDom';
import { getScopedState, hasRequestScope } from '../../modules/asyncContext';

const staticStyleMap: WeakMap<Object, Object> = new WeakMap();
const sheet = createSheet();

// ---------------------------------------------------------------------------
// Per-request delta tracking
//
// On the server, callers wrap each SSR render in `runInRequestScope`. Any rule
// inserted into the process-wide sheet during the scope is also pushed into a
// per-request delta buffer here, so the streaming pipeline can emit only the
// rules that landed during the current chunk. Outside any scope (client,
// legacy two-pass renderer, module-load time on the server) this is a no-op
// and the shared sheet behaves exactly as upstream.
// ---------------------------------------------------------------------------

const REQUEST_DELTA_KEY = 'StyleSheet.delta';

type RequestDelta = {|
  // Rules added in insertion order, bucketed by group number.
  pending: Map<number, Array<string>>,
  // Groups for which a `[stylesheet-group="N"]{}` marker rule has already
  // been emitted in a prior flush during this request. Subsequent flushes
  // skip the marker for these groups; only the new content is emitted.
  emittedGroupMarkers: Set<number>
|};

function createRequestDelta(): RequestDelta {
  return {
    emittedGroupMarkers: new Set(),
    pending: new Map()
  };
}

function appendRequestDelta(cssText: string, groupValue: number): void {
  if (!hasRequestScope()) return;
  const delta = getScopedState<RequestDelta>(
    REQUEST_DELTA_KEY,
    createRequestDelta
  );
  const group = Number(groupValue);
  let bucket = delta.pending.get(group);
  if (bucket == null) {
    bucket = [];
    delta.pending.set(group, bucket);
  }
  bucket.push(cssText);
}

function encodeGroupMarker(group: number): string {
  return `[stylesheet-group="${group}"]{}`;
}

/**
 * Drain the current request's pending delta into a CSS text fragment suitable
 * for emission as `<style data-rnw-delta="...">{textContent}</style>` in the
 * streamed response. Returns an empty string if there is no active request
 * scope or no pending rules.
 *
 * Each group present in the delta is preceded by its `[stylesheet-group="N"]`
 * marker rule the first time it appears for the request; subsequent flushes
 * skip the marker because the client already knows the group exists.
 */
function takeRequestDelta(): string {
  if (!hasRequestScope()) return '';
  const delta = getScopedState<RequestDelta>(
    REQUEST_DELTA_KEY,
    createRequestDelta
  );
  if (delta.pending.size === 0) return '';

  const orderedGroups = Array.from(delta.pending.keys()).sort((a, b) =>
    a > b ? 1 : -1
  );
  const out = [];
  for (const group of orderedGroups) {
    const bucket = delta.pending.get(group);
    if (bucket == null || bucket.length === 0) continue;
    if (!delta.emittedGroupMarkers.has(group)) {
      out.push(encodeGroupMarker(group));
      delta.emittedGroupMarkers.add(group);
    }
    for (const rule of bucket) {
      out.push(rule);
    }
  }
  delta.pending.clear();
  return out.join('\n');
}

/**
 * Discard any pending delta entries for the current request without emitting
 * them. The streaming pipeline calls this after the shell head dump, since
 * the full sheet text has already been emitted there and the delta channel
 * should only carry rules added *after* that point.
 */
function resetRequestDelta(): void {
  if (!hasRequestScope()) return;
  const delta = getScopedState<RequestDelta>(
    REQUEST_DELTA_KEY,
    createRequestDelta
  );
  delta.pending.clear();
  // Note: we do not reset emittedGroupMarkers — once a marker has been emitted
  // for the request (e.g. inline in the shell dump's text), subsequent chunks
  // should not re-emit it.
}

/**
 * Pre-mark groups whose markers are already present in the shell head dump
 * so subsequent delta flushes don't emit duplicate markers for them. Called
 * by the streaming pipeline immediately after rendering the shell.
 */
function markGroupsAsEmitted(groupNumbers: $ReadOnlyArray<number>): void {
  if (!hasRequestScope()) return;
  const delta = getScopedState<RequestDelta>(
    REQUEST_DELTA_KEY,
    createRequestDelta
  );
  for (const g of groupNumbers) delta.emittedGroupMarkers.add(g);
}

const defaultPreprocessOptions = { shadow: true, textShadow: true };

function customStyleq(styles, options: Options = {}) {
  const { writingDirection, ...preprocessOptions } = options;
  const isRTL = writingDirection === 'rtl';
  return styleq.factory({
    transform(style) {
      const compiledStyle = staticStyleMap.get(style);
      if (compiledStyle != null) {
        return localizeStyle(compiledStyle, isRTL);
      }
      return preprocess(style, {
        ...defaultPreprocessOptions,
        ...preprocessOptions
      });
    }
  })(styles);
}

function insertRules(compiledOrderedRules) {
  compiledOrderedRules.forEach(([rules, order]) => {
    if (sheet != null) {
      rules.forEach((rule) => {
        const { ruleAdded } = sheet.insert(rule, order);
        // Only mirror rules that the dedup check accepted. Rules that the
        // shared sheet already had (module-load-time inserts from a prior
        // request, or repeated inserts within the same request) must not
        // appear in the delta — they are already in the head dump.
        if (ruleAdded) {
          appendRequestDelta(rule, order);
        }
      });
    }
  });
}

function compileAndInsertAtomic(style) {
  const [compiledStyle, compiledOrderedRules] = atomic(
    preprocess(style, defaultPreprocessOptions)
  );
  insertRules(compiledOrderedRules);
  return compiledStyle;
}

function compileAndInsertReset(style, key) {
  const [compiledStyle, compiledOrderedRules] = classic(style, key);
  insertRules(compiledOrderedRules);
  return compiledStyle;
}

/* ----- API ----- */

const absoluteFillObject = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

const absoluteFill = create({ x: { ...absoluteFillObject } }).x;

/**
 * create
 */
function create<T: Object>(styles: T): $ReadOnly<T> {
  Object.keys(styles).forEach((key) => {
    const styleObj = styles[key];
    // Only compile at runtime if the style is not already compiled
    if (styleObj != null && styleObj.$$css !== true) {
      let compiledStyles;
      if (key.indexOf('$raw') > -1) {
        compiledStyles = compileAndInsertReset(styleObj, key.split('$raw')[0]);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          validate(styleObj);
          styles[key] = Object.freeze(styleObj);
        }
        compiledStyles = compileAndInsertAtomic(styleObj);
      }
      staticStyleMap.set(styleObj, compiledStyles);
    }
  });
  return styles;
}

/**
 * compose
 */
function compose(style1: any, style2: any): any {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable prefer-rest-params */
    const len = arguments.length;
    if (len > 2) {
      const readableStyles = [...arguments].map((a) => flatten(a));
      throw new Error(
        `StyleSheet.compose() only accepts 2 arguments, received ${len}: ${JSON.stringify(
          readableStyles
        )}`
      );
    }
    /* eslint-enable prefer-rest-params */
    /*
    console.warn(
      'StyleSheet.compose(a, b) is deprecated; use array syntax, i.e., [a,b].'
    );
    */
  }
  return [style1, style2];
}

/**
 * flatten
 */
function flatten(...styles: any): { [key: string]: any } {
  const flatArray = styles.flat(Infinity);
  const result = {};
  for (let i = 0; i < flatArray.length; i++) {
    const style = flatArray[i];
    if (style != null && typeof style === 'object') {
      // $FlowFixMe
      Object.assign(result, style);
    }
  }
  return result;
}

/**
 * getSheet
 */
function getSheet(): { id: string, textContent: string } {
  return {
    id: sheet.id,
    textContent: sheet.getTextContent()
  };
}

/**
 * resolve
 */
type StyleProps = [string, { [key: string]: mixed } | null];
type Options = {
  shadow?: boolean,
  textShadow?: boolean,
  writingDirection: 'ltr' | 'rtl'
};

function StyleSheet(styles: any, options?: Options = {}): StyleProps {
  const isRTL = options.writingDirection === 'rtl';
  const styleProps: StyleProps = customStyleq(styles, options);
  if (Array.isArray(styleProps) && styleProps[1] != null) {
    styleProps[1] = inline(styleProps[1], isRTL);
  }
  return styleProps;
}

StyleSheet.absoluteFill = absoluteFill;
StyleSheet.absoluteFillObject = absoluteFillObject;
StyleSheet.create = create;
StyleSheet.compose = compose;
StyleSheet.flatten = flatten;
StyleSheet.getSheet = getSheet;
StyleSheet.takeRequestDelta = takeRequestDelta;
StyleSheet.resetRequestDelta = resetRequestDelta;
StyleSheet.markGroupsAsEmitted = markGroupsAsEmitted;
// `hairlineWidth` is not implemented using screen density as browsers may
// round sub-pixel values down to `0`, causing the line not to be rendered.
StyleSheet.hairlineWidth = 1;

if (canUseDOM && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle = StyleSheet.flatten;
}

export type IStyleSheet = {
  (styles: $ReadOnlyArray<any>, options?: Options): StyleProps,
  absoluteFill: Object,
  absoluteFillObject: Object,
  create: typeof create,
  compose: typeof compose,
  flatten: typeof flatten,
  getSheet: typeof getSheet,
  takeRequestDelta: typeof takeRequestDelta,
  resetRequestDelta: typeof resetRequestDelta,
  markGroupsAsEmitted: typeof markGroupsAsEmitted,
  hairlineWidth: number
};

const stylesheet: IStyleSheet = StyleSheet;

export default stylesheet;
