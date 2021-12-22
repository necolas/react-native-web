/**
 * Copyright (c) Nicolas Gallagher.
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
import createCSSStyleSheet from './createCSSStyleSheet';
import createCompileableStyle from './createCompileableStyle';
import createOrderedCSSStyleSheet from './createOrderedCSSStyleSheet';
import flattenArray from '../../modules/flattenArray';
import flattenStyle from './flattenStyle';
import I18nManager from '../I18nManager';
import i18nStyle from './i18nStyle';
import { atomic, classic, inline, stringifyValueWithProperty } from './compile';
import initialRules from './initialRules';
import modality from './modality';
import { STYLE_ELEMENT_ID, STYLE_GROUPS } from './constants';

export default class StyleResolver {
  static resolved = { css: {}, ltr: {}, rtl: {}, rtlNoSwap: {} };
  inserted = { css: {}, ltr: {}, rtl: {}, rtlNoSwap: {} };
  _sheet: any;

  constructor(rootTag?: HTMLElement) {
    this._init(rootTag);
  }

  _init(rootTag?: HTMLElement) {
    this._sheet = createOrderedCSSStyleSheet(createCSSStyleSheet(STYLE_ELEMENT_ID, rootTag));
    this.cache = {};

    modality((rule) => this.sheet.insert(rule, STYLE_GROUPS.modality));
    initialRules.forEach((rule) => {
      this.sheet.insert(rule, STYLE_GROUPS.reset);
    });
  }

  clear() {
    StyleResolver.resolved = { css: {}, ltr: {}, rtl: {}, rtlNoSwap: {} };
    this.inserted = { css: {}, ltr: {}, rtl: {}, rtlNoSwap: {} };
    this.cache = {};
    this._sheet.clear();
  }

  _addToCache(className, prop, value) {
    if (!this.cache[prop]) {
      this.cache[prop] = {};
    }
    this.cache[prop][value] = className;
  }

  _getClassName(prop, value) {
    const val = stringifyValueWithProperty(value, prop);
    return this.cache[prop] && this.cache[prop].hasOwnProperty(val) && this.cache[prop][val];
  }

  _injectRegisteredStyle(id) {
    const { doLeftAndRightSwapInRTL, isRTL } = I18nManager.getConstants();
    const dir = isRTL ? (doLeftAndRightSwapInRTL ? 'rtl' : 'rtlNoSwap') : 'ltr';
    if (!this.inserted[dir][id]) {
      const style = createCompileableStyle(i18nStyle(flattenStyle(id)));
      const results = atomic(style);
      Object.keys(results).forEach((key) => {
        const { identifier, property, rules, value } = results[key];
        this._addToCache(identifier, property, value);
        rules.forEach((rule) => {
          const group = STYLE_GROUPS.custom[property] || STYLE_GROUPS.atomic;
          this.sheet.insert(rule, group);
        });
      });
      this.inserted[dir][id] = true;
    }
  }

  /**
   * Resolves a React Native style object to DOM attributes
   */
  resolve(style, classList) {
    const nextClassList = [];
    let props = {};

    if (!style && !classList) {
      return props;
    }

    if (Array.isArray(classList)) {
      flattenArray(classList).forEach((identifier) => {
        if (identifier) {
          if (
            this.inserted.css[identifier] == null &&
            StyleResolver.resolved.css[identifier] != null
          ) {
            const item = StyleResolver.resolved.css[identifier];
            item.rules.forEach((rule) => {
              this.sheet.insert(rule, item.group);
            });
            this.inserted.css[identifier] = true;
          }

          nextClassList.push(identifier);
        }
      });
    }

    if (typeof style === 'number') {
      // fast and cachable
      this._injectRegisteredStyle(style);
      const key = createCacheKey(style);
      props = this._resolveStyle(style, key);
    } else if (!Array.isArray(style)) {
      // resolve a plain RN style object
      props = this._resolveStyle(style);
    } else {
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
            cacheKey += id + '-';
          }
          this._injectRegisteredStyle(id);
        }
      }
      const key = isArrayOfNumbers ? createCacheKey(cacheKey) : null;
      props = this._resolveStyle(flatArray, key);
    }

    nextClassList.push(...props.classList);

    const finalProps = {
      className: classListToString(nextClassList),
      classList: nextClassList
    };
    if (props.style) {
      finalProps.style = props.style;
    }

    return finalProps;
  }

  /**
   * Resolves a React Native style object
   */
  _resolveStyle(style, key) {
    const { doLeftAndRightSwapInRTL, isRTL } = I18nManager.getConstants();
    const dir = isRTL ? (doLeftAndRightSwapInRTL ? 'rtl' : 'rtlNoSwap') : 'ltr';

    // faster: memoized
    if (key != null && StyleResolver.resolved[dir][key] != null) {
      return StyleResolver.resolved[dir][key];
    }

    const flatStyle = flattenStyle(style);
    const localizedStyle = createCompileableStyle(i18nStyle(flatStyle));

    // slower: convert style object to props and cache
    const props = Object.keys(localizedStyle)
      .sort()
      .reduce(
        (props, styleProp) => {
          const value = localizedStyle[styleProp];
          if (value != null) {
            const className = this._getClassName(styleProp, value);
            if (className) {
              props.classList.push(className);
            } else {
              // Certain properties and values are not transformed by 'createReactDOMStyle' as they
              // require more complex transforms into multiple CSS rules. Here we assume that StyleManager
              // can bind these styles to a className, and prevent them becoming invalid inline-styles.
              if (
                styleProp === 'animationKeyframes' ||
                styleProp === 'placeholderTextColor' ||
                styleProp === 'pointerEvents' ||
                styleProp === 'scrollbarWidth'
              ) {
                const a = atomic({ [styleProp]: value });
                Object.keys(a).forEach((key) => {
                  const { identifier, rules } = a[key];
                  props.classList.push(identifier);
                  rules.forEach((rule) => {
                    this.sheet.insert(rule, STYLE_GROUPS.atomic);
                  });
                });
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

    if (props.style) {
      props.style = inline(props.style);
    }

    if (key != null) {
      StyleResolver.resolved[dir][key] = props;
    }

    return props;
  }

  getStyleSheet() {
    const textContent = this.sheet.getTextContent();
    // Reset state on the server so critical css is always the result
    if (!canUseDOM) {
      this._init();
    }

    return {
      id: STYLE_ELEMENT_ID,
      textContent
    };
  }

  static createCSS(rules, group) {
    const result = {};
    Object.keys(rules).forEach((name) => {
      const style = rules[name];
      const compiled = classic(style, name);

      Object.keys(compiled).forEach((key) => {
        const { identifier, rules } = compiled[key];
        StyleResolver.resolved.css[identifier] = { group: group || STYLE_GROUPS.classic, rules };
        result[name] = identifier;
      });
    });
    return result;
  }

  get sheet() {
    return this._sheet;
  }
}

/**
 * Misc helpers
 */
const createCacheKey = (id) => {
  const prefix = 'rn';
  return `${prefix}-${id}`;
};

const classListToString = (list) => list.join(' ').trim();
