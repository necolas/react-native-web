/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * WARNING: changes to this file in particular can cause significant changes to
 * the results of render performance benchmarks.
 *
 * @noflow
 */

import createReactDOMStyle from './createReactDOMStyle';
import flattenArray from '../../modules/flattenArray';
import flattenStyle from './flattenStyle';
import I18nManager from '../I18nManager';
import i18nStyle from './i18nStyle';
import { prefixInlineStyles } from '../../modules/prefixStyles';
import ReactNativePropRegistry from '../../modules/ReactNativePropRegistry';
import StyleManager from './StyleManager';

const emptyObject = {};

const createCacheKey = id => {
  const prefix = 'rn';
  return `${prefix}-${id}`;
};

const classListToString = list => list.join(' ').trim();

export default class StyleRegistry {
  cache = { ltr: {}, rtl: {} };
  styleManager = new StyleManager();

  getStyleSheets() {
    return this.styleManager.getStyleSheets();
  }

  /**
   * Registers and precaches a React Native style object to HTML class names
   */
  register(flatStyle) {
    const id = ReactNativePropRegistry.register(flatStyle);
    this._registerById(id);
    return id;
  }

  _registerById(id) {
    const dir = I18nManager.isRTL ? 'rtl' : 'ltr';
    if (!this.cache[dir][id]) {
      const style = flattenStyle(id);
      const domStyle = createReactDOMStyle(i18nStyle(style));
      Object.keys(domStyle).forEach(styleProp => {
        const value = domStyle[styleProp];
        if (value != null) {
          this.styleManager.setDeclaration(styleProp, value);
        }
      });
      this.cache[dir][id] = true;
    }
  }

  /**
   * Resolves a React Native style object to DOM attributes
   */
  resolve(reactNativeStyle, options = emptyObject) {
    if (!reactNativeStyle) {
      return emptyObject;
    }

    // fast and cachable
    if (typeof reactNativeStyle === 'number') {
      this._registerById(reactNativeStyle);
      const key = createCacheKey(reactNativeStyle);
      return this._resolveStyleIfNeeded(reactNativeStyle, options, key);
    }

    // resolve a plain RN style object
    if (!Array.isArray(reactNativeStyle)) {
      return this._resolveStyle(reactNativeStyle, options);
    }

    // flatten the style array
    // cache resolved props when all styles are registered
    // otherwise fallback to resolving
    const flatArray = flattenArray(reactNativeStyle);
    let isArrayOfNumbers = true;
    for (let i = 0; i < flatArray.length; i++) {
      const id = flatArray[i];
      if (typeof id !== 'number') {
        isArrayOfNumbers = false;
      } else {
        this._registerById(id);
      }
    }
    const key = isArrayOfNumbers ? createCacheKey(flatArray.join('-')) : null;
    return this._resolveStyleIfNeeded(flatArray, options, key);
  }

  /**
   * Resolves a React Native style object to DOM attributes, accounting for
   * the existing styles applied to the DOM node.
   *
   * To determine the next style, some of the existing DOM state must be
   * converted back into React Native styles.
   */
  resolveStateful(rnStyleNext, domStyleProps, options) {
    const { classList: rdomClassList, style: rdomStyle } = domStyleProps;

    // Convert the DOM classList back into a React Native form
    // Preserves unrecognized class names.
    const { classList: rnClassList, style: rnStyle } = rdomClassList.reduce(
      (styleProps, className) => {
        const { prop, value } = this.styleManager.getDeclaration(className);
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
    const { classList: rdomClassListNext, style: rdomStyleNext } = this.resolve(
      [rnStyle, rnStyleNext],
      options
    );

    // Next class names take priority over current inline styles
    const style = { ...rdomStyle };
    rdomClassListNext.forEach(className => {
      const { prop } = this.styleManager.getDeclaration(className);
      if (style[prop]) {
        style[prop] = '';
      }
    });

    // Next inline styles take priority over current inline styles
    Object.assign(style, rdomStyleNext);

    // Add the current class names not managed by React Native
    const className = classListToString(rdomClassListNext.concat(rnClassList));

    return { className, style };
  }

  /**
   * Resolves a React Native style object
   */
  _resolveStyle(reactNativeStyle, options) {
    const flatStyle = flattenStyle(reactNativeStyle);
    const domStyle = createReactDOMStyle(options.i18n === false ? flatStyle : i18nStyle(flatStyle));

    const props = Object.keys(domStyle).reduce(
      (props, styleProp) => {
        const value = domStyle[styleProp];
        if (value != null) {
          const className = this.styleManager.getClassName(styleProp, value);
          if (className) {
            props.classList.push(className);
          } else {
            if (!props.style) {
              props.style = {};
            }
            // 4x slower render
            props.style[styleProp] = value;
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
  _resolveStyleIfNeeded(style, options, key) {
    const dir = I18nManager.isRTL ? 'rtl' : 'ltr';
    if (key) {
      if (!this.cache[dir][key]) {
        // slow: convert style object to props and cache
        this.cache[dir][key] = this._resolveStyle(style, options);
      }
      return this.cache[dir][key];
    }
    return this._resolveStyle(style, options);
  }
}
