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

export default function createStyleResolver() {
  let inserted, sheet, cache;
  const resolved = { css: {}, ltr: {}, rtl: {}, rtlNoSwap: {} };

  const init = () => {
    inserted = { css: {}, ltr: {}, rtl: {}, rtlNoSwap: {} };
    sheet = createOrderedCSSStyleSheet(createCSSStyleSheet(STYLE_ELEMENT_ID));
    cache = {};
    modality((rule) => sheet.insert(rule, STYLE_GROUPS.modality));
    initialRules.forEach((rule) => {
      sheet.insert(rule, STYLE_GROUPS.reset);
    });
  };

  init();

  function addToCache(className, prop, value) {
    if (!cache[prop]) {
      cache[prop] = {};
    }
    cache[prop][value] = className;
  }

  function getClassName(prop, value) {
    const val = stringifyValueWithProperty(value, prop);
    return cache[prop] && cache[prop].hasOwnProperty(val) && cache[prop][val];
  }

  function _injectRegisteredStyle(id) {
    const { doLeftAndRightSwapInRTL, isRTL } = I18nManager.getConstants();
    const dir = isRTL ? (doLeftAndRightSwapInRTL ? 'rtl' : 'rtlNoSwap') : 'ltr';
    if (!inserted[dir][id]) {
      const style = createCompileableStyle(i18nStyle(flattenStyle(id)));
      const results = atomic(style);
      Object.keys(results).forEach((key) => {
        const { identifier, property, rules, value } = results[key];
        addToCache(identifier, property, value);
        rules.forEach((rule) => {
          const group = STYLE_GROUPS.custom[property] || STYLE_GROUPS.atomic;
          sheet.insert(rule, group);
        });
      });
      inserted[dir][id] = true;
    }
  }

  /**
   * Resolves a React Native style object to DOM attributes
   */
  function resolve(style, classList) {
    const nextClassList = [];
    let props = {};

    if (!style && !classList) {
      return props;
    }

    if (Array.isArray(classList)) {
      flattenArray(classList).forEach((identifier) => {
        if (identifier) {
          if (inserted.css[identifier] == null && resolved.css[identifier] != null) {
            const item = resolved.css[identifier];
            item.rules.forEach((rule) => {
              sheet.insert(rule, item.group);
            });
            inserted.css[identifier] = true;
          }

          nextClassList.push(identifier);
        }
      });
    }

    if (typeof style === 'number') {
      // fast and cachable
      _injectRegisteredStyle(style);
      const key = createCacheKey(style);
      props = _resolveStyle(style, key);
    } else if (!Array.isArray(style)) {
      // resolve a plain RN style object
      props = _resolveStyle(style);
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
          _injectRegisteredStyle(id);
        }
      }
      const key = isArrayOfNumbers ? createCacheKey(cacheKey) : null;
      props = _resolveStyle(flatArray, key);
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
  function _resolveStyle(style, key) {
    const { doLeftAndRightSwapInRTL, isRTL } = I18nManager.getConstants();
    const dir = isRTL ? (doLeftAndRightSwapInRTL ? 'rtl' : 'rtlNoSwap') : 'ltr';

    // faster: memoized
    if (key != null && resolved[dir][key] != null) {
      return resolved[dir][key];
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
            const className = getClassName(styleProp, value);
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
                    sheet.insert(rule, STYLE_GROUPS.atomic);
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
      resolved[dir][key] = props;
    }

    return props;
  }

  return {
    getStyleSheet() {
      const textContent = sheet.getTextContent();
      // Reset state on the server so critical css is always the result
      if (!canUseDOM) {
        init();
      }

      return {
        id: STYLE_ELEMENT_ID,
        textContent
      };
    },
    createCSS(rules, group) {
      const result = {};
      Object.keys(rules).forEach((name) => {
        const style = rules[name];
        const compiled = classic(style, name);

        Object.keys(compiled).forEach((key) => {
          const { identifier, rules } = compiled[key];
          resolved.css[identifier] = { group: group || STYLE_GROUPS.classic, rules };
          result[name] = identifier;
        });
      });
      return result;
    },
    resolve,
    get sheet() {
      return sheet;
    }
  };
}

/**
 * Misc helpers
 */
const createCacheKey = (id) => {
  const prefix = 'rn';
  return `${prefix}-${id}`;
};

const classListToString = (list) => list.join(' ').trim();
