/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { atomic, classic, inline, preprocess } from './compiler';
import { createSheet } from './dom';
import { styleq } from 'styleq';
import { validate } from './validate';

const staticStyleMap: WeakMap<Object, Array<Object>> = new WeakMap();

const sheet = createSheet();

function customStyleq(styles, isRTL) {
  return styleq.factory({
    transform(style) {
      if (staticStyleMap.has(style)) {
        const compiledStyles = staticStyleMap.get(style);
        if (Array.isArray(compiledStyles)) {
          return isRTL ? compiledStyles[1] : compiledStyles[0];
        }
      }
      return style;
    }
  })(styles);
}

function compileAndInsert(style) {
  const [compiledStyle, compiledOrderedRules] = atomic(preprocess(style));
  const [compiledRTLStyle, compiledRTLOrderedRules] = atomic(preprocess(style, true));
  [...compiledOrderedRules, ...compiledRTLOrderedRules].forEach(([rules, order]) => {
    if (sheet != null) {
      rules.forEach((rule) => {
        sheet.insert(rule, order);
      });
    }
  });
  return [compiledStyle, compiledRTLStyle];
}

function compileAndInsertReset(style, key) {
  const [compiledStyle, compiledOrderedRules] = classic(style, key);
  compiledOrderedRules.forEach(([rules, order]) => {
    if (sheet != null) {
      rules.forEach((rule) => {
        sheet.insert(rule, order);
      });
    }
  });
  return [compiledStyle, compiledStyle];
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
function create(styles: Object): {| [key: string]: { [key: string]: any } |} {
  Object.keys(styles).forEach((key) => {
    const styleObj = styles[key];
    if (styleObj != null) {
      if (key.indexOf('$raw') > -1) {
        const compiledStyles = compileAndInsertReset(styleObj, key.split('$raw')[0]);
        staticStyleMap.set(styleObj, compiledStyles);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          validate(styleObj);
          styles[key] = Object.freeze(styleObj);
        }
        const compiledStyles = compileAndInsert(styleObj);
        staticStyleMap.set(styleObj, compiledStyles);
      }
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
  }
  if (style1 && style2) {
    return [style1, style2];
  } else {
    return style1 || style2;
  }
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

function StyleSheet(styles: any, isRTL?: boolean): StyleProps {
  const styleProps: StyleProps = customStyleq(styles, isRTL);
  if (Array.isArray(styleProps) && styleProps[1] != null) {
    styleProps[1] = inline(preprocess(styleProps[1], isRTL));
  }
  return styleProps;
}

StyleSheet.absoluteFill = absoluteFill;
StyleSheet.absoluteFillObject = absoluteFillObject;
StyleSheet.create = create;
StyleSheet.compose = compose;
StyleSheet.flatten = flatten;
StyleSheet.getSheet = getSheet;
// `hairlineWidth` is not implemented using screen density as browsers may
// round sub-pixel values down to `0`, causing the line not to be rendered.
StyleSheet.hairlineWidth = 1;

if (canUseDOM && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle = StyleSheet.flatten;
}

export type IStyleSheet = {
  (styles: $ReadOnlyArray<any>, isRTL: boolean): StyleProps,
  absoluteFill: Object,
  absoluteFillObject: Object,
  create: typeof create,
  compose: typeof compose,
  flatten: typeof flatten,
  getSheet: typeof getSheet,
  hairlineWidth: number
};

const stylesheet: IStyleSheet = StyleSheet;

export default stylesheet;
