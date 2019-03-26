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

const emptyObject = {};

export default function createStyleResolver() {
  let inserted, sheet, lookup;
  const resolved = { css: {}, ltr: {}, rtl: {}, rtlNoSwap: {} };

  const init = () => {
    inserted = { css: {}, ltr: {}, rtl: {}, rtlNoSwap: {} };
    sheet = createOrderedCSSStyleSheet(createCSSStyleSheet(STYLE_ELEMENT_ID));
    lookup = {
      byClassName: {},
      byProp: {}
    };
    modality(rule => sheet.insert(rule, STYLE_GROUPS.modality));
    initialRules.forEach(rule => {
      sheet.insert(rule, STYLE_GROUPS.reset);
    });
  };

  init();

  function addToLookup(className, prop, value) {
    if (!lookup.byProp[prop]) {
      lookup.byProp[prop] = {};
    }
    lookup.byProp[prop][value] = className;
    lookup.byClassName[className] = { prop, value };
  }

  function getClassName(prop, value) {
    const val = stringifyValueWithProperty(value, prop);
    const cache = lookup.byProp;
    return cache[prop] && cache[prop].hasOwnProperty(val) && cache[prop][val];
  }

  function _injectRegisteredStyle(id) {
    const { doLeftAndRightSwapInRTL, isRTL } = I18nManager;
    const dir = isRTL ? (doLeftAndRightSwapInRTL ? 'rtl' : 'rtlNoSwap') : 'ltr';
    if (!inserted[dir][id]) {
      const style = createCompileableStyle(i18nStyle(flattenStyle(id)));
      const results = atomic(style);
      Object.keys(results).forEach(key => {
        const { identifier, property, rules, value } = results[key];
        addToLookup(identifier, property, value);
        rules.forEach(rule => {
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
      flattenArray(classList).forEach(identifier => {
        if (identifier) {
          if (inserted.css[identifier] == null && resolved.css[identifier] != null) {
            const item = resolved.css[identifier];
            item.rules.forEach(rule => {
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
   * Resolves a React Native style object to DOM attributes, accounting for
   * the existing styles applied to the DOM node.
   *
   * To determine the next style, some of the existing DOM state must be
   * converted back into React Native styles.
   */
  function resolveWithNode(rnStyleNext, node) {
    function getDeclaration(className) {
      return lookup.byClassName[className] || emptyObject;
    }

    const { classList: rdomClassList, style: rdomStyle } = getDOMStyleInfo(node);
    // Convert the DOM classList back into a React Native form
    // Preserves unrecognized class names.
    const { classList: rnClassList, style: rnStyle } = rdomClassList.reduce(
      (styleProps, className) => {
        const { prop, value } = getDeclaration(className);
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
    const { classList: rdomClassListNext, style: rdomStyleNext } = resolve([
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
      const { prop } = getDeclaration(className);
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
  function _resolveStyle(style, key) {
    const { doLeftAndRightSwapInRTL, isRTL } = I18nManager;
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
                Object.values(a).forEach(({ identifier, rules }) => {
                  props.classList.push(identifier);
                  rules.forEach(rule => {
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
      Object.keys(rules).forEach(name => {
        const style = rules[name];
        const compiled = classic(style, name);

        Object.values(compiled).forEach(({ identifier, rules }) => {
          resolved.css[identifier] = { group: group || STYLE_GROUPS.classic, rules };
          result[name] = identifier;
        });
      });
      return result;
    },
    resolve,
    sheet,
    resolveWithNode
  };
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
