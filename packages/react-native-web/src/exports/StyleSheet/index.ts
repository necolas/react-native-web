/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { styleq, type CompiledStyle, type Styles } from 'styleq';

import canUseDOM from '../../modules/canUseDom';
import type { GenericStyleProp } from '../../types';
import { atomic, classic, inline, type Style } from './compiler';
import { createSheet } from './dom';
import { localizeStyle, type LocalizedStyle } from './localizeStyle';
import { preprocess, type PreprocessOptions } from './preprocess';
import { validate } from './validate';

const staticStyleMap: WeakMap<object, LocalizedStyle> = new WeakMap();
const sheet = createSheet();

function createStyleq(isRTL: boolean, preprocessOptions?: PreprocessOptions) {
  return styleq.factory({
    transform(style) {
      // Don't preprocess compiled objects: it rewrites keys and breaks styleq's cache
      const compiledStyle =
        staticStyleMap.get(style) ??
        (style.$$css === true ? (style as CompiledStyle) : null);

      return compiledStyle != null
        ? localizeStyle(compiledStyle, isRTL)
        : preprocess(style, preprocessOptions);
    }
  });
}

const styleqLTR = createStyleq(false);
const styleqRTL = createStyleq(true);

function customStyleq(styles: Styles, options: StyleSheetOptions = {}) {
  if (!('shadow' in options) && !('textShadow' in options)) {
    return options.writingDirection === 'rtl'
      ? styleqRTL(styles)
      : styleqLTR(styles);
  }

  const { writingDirection, ...preprocessOptions } = options;

  return createStyleq(writingDirection === 'rtl', preprocessOptions)(styles);
}

function insertRules(compiledOrderedRules: Array<[Array<string>, number]>) {
  compiledOrderedRules.forEach(([rules, order]) => {
    if (sheet != null) {
      rules.forEach((rule) => {
        sheet.insert(rule, order);
      });
    }
  });
}

function compileAndInsertAtomic(style: Style) {
  const [compiledStyle, compiledOrderedRules] = atomic(preprocess(style));
  insertRules(compiledOrderedRules);
  return compiledStyle;
}

function compileAndInsertReset(style: Style, key: string) {
  const [compiledStyle, compiledOrderedRules] = classic(style, key);
  insertRules(compiledOrderedRules);
  return compiledStyle;
}

/* ----- API ----- */

type AbsoluteFillStyle = {
  readonly position: 'absolute';
  readonly left: 0;
  readonly right: 0;
  readonly top: 0;
  readonly bottom: 0;
};

const absoluteFill: AbsoluteFillStyle = create({
  x: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }
}).x;

/**
 * create
 */
function create<
  const T extends Readonly<Record<string, Style | CompiledStyle>>
>(styles: T): Readonly<T> {
  const stylesMap: Record<string, Style | CompiledStyle> = styles;
  Object.keys(stylesMap).forEach((key) => {
    const styleObj = stylesMap[key];
    // Only compile at runtime if the style is not already compiled
    if (styleObj != null && styleObj.$$css !== true) {
      let compiledStyles;
      if (key.indexOf('$raw') > -1) {
        compiledStyles = compileAndInsertReset(
          styleObj as Style,
          key.split('$raw')[0]
        );
      } else {
        if (process.env.NODE_ENV !== 'production') {
          validate(styleObj);
          stylesMap[key] = Object.freeze(styleObj);
        }
        compiledStyles = compileAndInsertAtomic(styleObj as Style);
      }
      staticStyleMap.set(styleObj, compiledStyles);
    }
  });
  return styles;
}

/**
 * compose
 */
function compose<T, U>(style1: T, style2: U): [T, U] {
  if (process.env.NODE_ENV !== 'production') {
    /* oxlint-disable prefer-rest-params */
    const len = arguments.length;
    if (len > 2) {
      const readableStyles = [...arguments].map((a) => flatten(a));
      throw new Error(
        `StyleSheet.compose() only accepts 2 arguments, received ${len}: ${JSON.stringify(
          readableStyles
        )}`
      );
    }
    /* oxlint-enable prefer-rest-params */
  }
  return [style1, style2];
}

/**
 * flatten
 */
function flatten<T extends object>(
  ...styles: ReadonlyArray<GenericStyleProp<T>>
): Partial<T> & Readonly<Record<string, unknown>>;
function flatten(
  ...styles: ReadonlyArray<unknown>
): Readonly<Record<string, unknown>>;
function flatten(
  ...styles: ReadonlyArray<unknown>
): Readonly<Record<string, unknown>> {
  const flatArray = styles.flat(Infinity);
  const result: Record<string, unknown> = {};
  for (let i = 0; i < flatArray.length; i++) {
    const style = flatArray[i];
    if (style != null && typeof style === 'object') {
      Object.assign(result, style);
    }
  }
  return result;
}

/**
 * getSheet
 */
function getSheet(): { id: string; textContent: string } {
  return {
    id: sheet.id,
    textContent: sheet.getTextContent()
  };
}

/**
 * resolve
 */
type StyleProps = [string, Record<string, unknown> | null, string];

export type StyleSheetOptions = {
  shadow?: boolean;
  textShadow?: boolean;
  writingDirection?: 'auto' | 'ltr' | 'rtl';
};

function resolve(styles?: Styles, options: StyleSheetOptions = {}): StyleProps {
  const isRTL = options.writingDirection === 'rtl';
  const styleProps: StyleProps = customStyleq(styles, options);
  if (Array.isArray(styleProps) && styleProps[1] != null) {
    styleProps[1] = inline(styleProps[1], isRTL);
  }
  return styleProps;
}

// Only kept for backward compatibility. Use `StyleSheet.resolve` instead.
function StyleSheet(styles?: Styles, options?: StyleSheetOptions): StyleProps {
  return resolve(styles, options);
}

StyleSheet.absoluteFill = absoluteFill;
StyleSheet.create = create;
StyleSheet.compose = compose;
StyleSheet.flatten = flatten;
StyleSheet.getSheet = getSheet;
StyleSheet.resolve = resolve;
// `hairlineWidth` is not implemented using screen density as browsers may
// round sub-pixel values down to `0`, causing the line not to be rendered.
StyleSheet.hairlineWidth = 1;

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: { resolveRNStyle?: typeof flatten };
  }
}

const devToolsHook = canUseDOM ? window.__REACT_DEVTOOLS_GLOBAL_HOOK__ : null;

if (devToolsHook) {
  devToolsHook.resolveRNStyle = StyleSheet.flatten;
}

export type IStyleSheet = {
  (styles?: Styles, options?: StyleSheetOptions): StyleProps;
  absoluteFill: AbsoluteFillStyle;
  create: typeof create;
  compose: typeof compose;
  flatten: typeof flatten;
  getSheet: typeof getSheet;
  hairlineWidth: number;
  resolve: typeof resolve;
};

const stylesheet: IStyleSheet = StyleSheet;

export default stylesheet;
