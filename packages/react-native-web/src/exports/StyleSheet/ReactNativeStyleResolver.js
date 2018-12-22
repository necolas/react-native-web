/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

/**
 * WARNING: changes to this file in particular can cause significant changes to
 * the results of render performance benchmarks.
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import createReactDOMStyle from './createReactDOMStyle';
import flattenArray from '../../modules/flattenArray';
import flattenStyle from './flattenStyle';
import I18nManager from '../I18nManager';
import i18nStyle from './i18nStyle';
import { prefixInlineStyles } from '../../modules/prefixStyles';
import StyleSheetManager from './StyleSheetManager';

const emptyObject = {};

export default class ReactNativeStyleResolver {
  _init() {
    this.cache = { ltr: {}, rtl: {}, rtlNoSwap: {} };
    this.injectedCache = { ltr: {}, rtl: {}, rtlNoSwap: {} };
    this.styleSheetManager = new StyleSheetManager();
  }

  constructor() {
    this._init();
  }

  getStyleSheet() {
    // reset state on the server so critical css is always the result
    const sheet = this.styleSheetManager.getStyleSheet();
    if (!canUseDOM) {
      this._init();
    }
    return sheet;
  }

  _injectRegisteredStyle(id) {
    const { doLeftAndRightSwapInRTL, isRTL } = I18nManager;
    const dir = isRTL ? (doLeftAndRightSwapInRTL ? 'rtl' : 'rtlNoSwap') : 'ltr';
    if (!this.injectedCache[dir][id]) {
      const style = flattenStyle(id);
      const domStyle = createReactDOMStyle(i18nStyle(style));
      Object.keys(domStyle).forEach(styleProp => {
        const value = domStyle[styleProp];
        if (value != null) {
          this.styleSheetManager.injectDeclaration(styleProp, value);
        }
      });
      this.injectedCache[dir][id] = true;
    }
  }

  /**
   * Resolves a React Native style object to DOM attributes
   */
  resolve(style) {
    if (!style) {
      return emptyObject;
    }

    // fast and cachable
    if (typeof style === 'number') {
      this._injectRegisteredStyle(style);
      const key = createCacheKey(style);
      return this._resolveStyleIfNeeded(style, key);
    }

    // resolve a plain RN style object
    if (!Array.isArray(style)) {
      return this._resolveStyleIfNeeded(style);
    }

    // flatten the style array
    // cache resolved props when all styles are registered
    // otherwise fallback to resolving
    const flatArray = flattenArray(style);
    let isArrayOfNumbers = true;
    let cacheKey = '';
    for (let i = 0; i < flatArray.length; i++) {
      const id = flatArray[i];
      if (typeof id !== 'number') {
        isArrayOfNumbers = false;
      } else {
        if (isArrayOfNumbers) {
          cacheKey += (id + '-');
        }
        this._injectRegisteredStyle(id);
      }
    }
    const key = isArrayOfNumbers ? createCacheKey(cacheKey) : null;
    return this._resolveStyleIfNeeded(flatArray, key);
  }

  /**
   * Resolves a React Native style object to DOM attributes, accounting for
   * the existing styles applied to the DOM node.
   *
   * To determine the next style, some of the existing DOM state must be
   * converted back into React Native styles.
   */
  resolveWithNode(rnStyleNext, node) {
    const { classList: rdomClassList, style: rdomStyle } = getDOMStyleInfo(node);
    // Convert the DOM classList back into a React Native form
    // Preserves unrecognized class names.
    const { classList: rnClassList, style: rnStyle } = rdomClassList.reduce(
      (styleProps, className) => {
        const { prop, value } = this.styleSheetManager.getDeclaration(className);
        if (prop) {
          styleProps.style[prop] = value;
        } else {
          styleProps.classList.push(className);
        }
        return styleProps;
      },
      { classList: [], style: {} }
    );

    // Create next DOM style props from current and next RN styles
    const { classList: rdomClassListNext, style: rdomStyleNext } = this.resolve([
      i18nStyle(rnStyle),
      rnStyleNext
    ]);

    // Final className
    // Add the current class names not managed by React Native
    const className = classListToString(rdomClassListNext.concat(rnClassList));

    // Final style
    // Next class names take priority over current inline styles
    const style = { ...rdomStyle };
    rdomClassListNext.forEach(className => {
      const { prop } = this.styleSheetManager.getDeclaration(className);
      if (style[prop]) {
        style[prop] = '';
      }
    });
    // Next inline styles take priority over current inline styles
    Object.assign(style, rdomStyleNext);

    return { className, style };
  }

  /**
   * Resolves a React Native style object
   */
  _resolveStyle(style) {
    const flatStyle = flattenStyle(style);
    const domStyle = createReactDOMStyle(i18nStyle(flatStyle));

    const props = Object.keys(domStyle).reduce(
      (props, styleProp) => {
        const value = domStyle[styleProp];
        if (value != null) {
          const className = this.styleSheetManager.getClassName(styleProp, value);
          if (className) {
            props.classList.push(className);
          } else {
            // Certain properties and values are not transformed by 'createReactDOMStyle' as they
            // require more complex transforms into multiple CSS rules. Here we assume that StyleManager
            // can bind these styles to a className, and prevent them becoming invalid inline-styles.
            if (
              styleProp === 'pointerEvents' ||
              styleProp === 'placeholderTextColor' ||
              styleProp === 'animationName'
            ) {
              const className = this.styleSheetManager.injectDeclaration(styleProp, value);
              if (className) {
                props.classList.push(className);
              }
            } else {
              if (!props.style) {
                props.style = {};
              }
              // 4x slower render
              props.style[styleProp] = value;
            }
          }
        }
        return props;
      },
      { classList: [] }
    );

    props.className = classListToString(props.classList);
    if (props.style) {
      props.style = prefixInlineStyles(props.style);
    }
    return props;
  }

  /**
   * Caching layer over 'resolveStyle'
   */
  _resolveStyleIfNeeded(style, key) {
    if (key) {
      const { doLeftAndRightSwapInRTL, isRTL } = I18nManager;
      const dir = isRTL ? (doLeftAndRightSwapInRTL ? 'rtl' : 'rtlNoSwap') : 'ltr';
      if (!this.cache[dir][key]) {
        // slow: convert style object to props and cache
        this.cache[dir][key] = this._resolveStyle(style);
      }
      return this.cache[dir][key];
    }
    return this._resolveStyle(style);
  }
}

/**
 * Misc helpers
 */
const createCacheKey = id => {
  const prefix = 'rn';
  return `${prefix}-${id}`;
};

const classListToString = list => list.join(' ').trim();

/**
 * Copies classList and style data from a DOM node
 */
const hyphenPattern = /-([a-z])/g;
const toCamelCase = str => str.replace(hyphenPattern, m => m[1].toUpperCase());

const getDOMStyleInfo = node => {
  const nodeStyle = node.style;
  const classList = Array.prototype.slice.call(node.classList);
  const style = {};
  // DOM style is a CSSStyleDeclaration
  // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
  for (let i = 0; i < nodeStyle.length; i += 1) {
    const property = nodeStyle.item(i);
    if (property) {
      // DOM style uses hyphenated prop names and may include vendor prefixes
      // Transform back into React DOM style.
      style[toCamelCase(property)] = nodeStyle.getPropertyValue(property);
    }
  }
  return { classList, style };
};
