/**
 * WARNING: changes to this file in particular can cause significant changes to
 * the results of render performance benchmarks.
 */

import createReactDOMStyle from './createReactDOMStyle';
import flattenArray from '../../modules/flattenArray';
import flattenStyle from './flattenStyle';
import generateCss from './generateCss';
import injector from './injector';
import mapKeyValue from '../../modules/mapKeyValue';
import prefixInlineStyles from './prefixInlineStyles';
import ReactNativePropRegistry from '../../modules/ReactNativePropRegistry';

const prefix = 'r-';
const SPACE_REGEXP = /\s/g;
const ESCAPE_SELECTOR_CHARS_REGEXP = /[(),":?.%\\$#*]/g;

/**
 * Creates an HTML class name for use on elements
 */
const createClassName = (prop, value) => {
  const val = `${value}`.replace(SPACE_REGEXP, '-');
  return `rn-${prop}:${val}`;
};

/**
 * Formatting improves debugging in devtools and snapshot
 */
const mapDeclarationsToClassName = (style, fn) => {
  const result = mapKeyValue(style, fn).join('\n').trim();
  return `\n${result}`;
};

/**
 * Inject a CSS rule for a given declaration and record the availability of the
 * resulting class name.
 */
let injectedClassNames = {};
const injectClassNameIfNeeded = (prop, value) => {
  const className = createClassName(prop, value);
  if (!injectedClassNames[className]) {
    // create a valid CSS selector for a given HTML class name
    const selector = className.replace(ESCAPE_SELECTOR_CHARS_REGEXP, '\\$&');
    const body = generateCss({ [prop]: value });
    const css = `.${selector}{${body}}`;
    // this adds the rule to the buffer to be injected into the document
    injector.addRule(className, css);
    injectedClassNames[className] = true;
  }

  return className;
};

/**
 * Converts a React Native style object to HTML class names
 */
let resolvedPropsCache = {};
const registerStyle = (id, flatStyle) => {
  const style = createReactDOMStyle(flatStyle);
  const className = mapDeclarationsToClassName(style, (prop, value) => {
    if (value != null) {
      return injectClassNameIfNeeded(prop, value);
    }
  });

  const key = `${prefix}${id}`;
  resolvedPropsCache[key] = { className };

  return id;
};

/**
 * Resolves a React Native style object to DOM props
 */
const resolveProps = (reactNativeStyle) => {
  const flatStyle = flattenStyle(reactNativeStyle);
  const domStyle = createReactDOMStyle(flatStyle);
  const style = {};

  const className = mapDeclarationsToClassName(domStyle, (prop, value) => {
    if (value != null) {
      const singleClassName = createClassName(prop, value);
      if (injectedClassNames[singleClassName]) {
        return singleClassName;
      } else {
        // 4x slower render
        style[prop] = value;
      }
    }
  });

  const props = {
    className,
    style: prefixInlineStyles(style)
  };

  /*
  if (process.env.__REACT_NATIVE_DEBUG_ENABLED__) {
    console.groupCollapsed('[StyleSheet] resolving uncached styles');
    console.log(
      'Slow operation. Resolving style objects (uncached result). ' +
      'Occurs on first render and when using styles not registered with "StyleSheet.create"'
    );
    console.log('source => \n', reactNativeStyle);
    console.log('flatten => \n', flatStyle);
    console.log('resolve => \n', props);
    console.groupEnd();
  }
  */

  return props;
};

/**
 * Caching layer over 'resolveProps'
 */
const resolvePropsIfNeeded = (key, style) => {
  if (key) {
    if (!resolvedPropsCache[key]) {
      // slow: convert style object to props and cache
      resolvedPropsCache[key] = resolveProps(style);
    }
    return resolvedPropsCache[key];
  }
  return resolveProps(style);
};

/**
 * Web style registry
 */
const StyleRegistry = {
  initialize(classNames) {
    injectedClassNames = classNames;

    /*
    if (process.env.__REACT_NATIVE_DEBUG_ENABLED__) {
      if (global.__REACT_NATIVE_DEBUG_ENABLED__styleRegistryTimer) {
        clearInterval(global.__REACT_NATIVE_DEBUG_ENABLED__styleRegistryTimer);
      }
      global.__REACT_NATIVE_DEBUG_ENABLED__styleRegistryTimer = setInterval(() => {
        const entryCount = Object.keys(resolvedPropsCache).length;
        console.groupCollapsed('[StyleSheet] resolved props cache snapshot:', entryCount, 'entries');
        console.log(resolvedPropsCache);
        console.groupEnd();
      }, 30000);
    }
    */
  },

  reset() {
    injectedClassNames = {};
    resolvedPropsCache = {};
    injector.reset();
  },

  register(style) {
    const id = ReactNativePropRegistry.register(style);
    return registerStyle(id, style);
  },

  resolve(reactNativeStyle) {
    if (!reactNativeStyle) {
      return undefined;
    }

    // fast and cachable
    if (typeof reactNativeStyle === 'number') {
      const key = `${prefix}${reactNativeStyle}`;
      return resolvePropsIfNeeded(key, reactNativeStyle);
    }

    // convert a RN style object to DOM props
    if (!Array.isArray(reactNativeStyle)) {
      return resolveProps(reactNativeStyle);
    }

    // flatten the array
    // [ 1, [ 2, 3 ], { prop: value }, 4, 5 ] => [ 1, 2, 3, { prop: value }, 4, 5 ];
    const flatArray = flattenArray(reactNativeStyle);

    let isArrayOfNumbers = true;
    for (let i = 0; i < flatArray.length; i++) {
      if (typeof flatArray[i] !== 'number') {
        isArrayOfNumbers = false;
        break;
      }
    }

    // TODO: determine when/if to cache unregistered styles. This produces 2x
    // faster benchmark results for unregistered styles. However, the cache
    // could be filled with props that are never used again.
    //
    // let hasValidKey = true;
    // let key = flatArray.reduce((keyParts, element) => {
    //   if (typeof element === 'number') {
    //     keyParts.push(element);
    //   } else {
    //     if (element.transform) {
    //       hasValidKey = false;
    //     } else {
    //       const objectAsKey = Object.keys(element).map((prop) => `${prop}:${element[prop]}`).join(';');
    //       if (objectAsKey !== '') {
    //         keyParts.push(objectAsKey);
    //       }
    //     }
    //   }
    //   return keyParts;
    // }, [ prefix ]).join('-');
    // if (!hasValidKey) { key = null; }

    // cache resolved props when all styles are registered
    const key = isArrayOfNumbers ? `${prefix}${flatArray.join('-')}` : null;

    return resolvePropsIfNeeded(key, flatArray);
  }
};

module.exports = StyleRegistry;
