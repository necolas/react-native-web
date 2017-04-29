/**
 * WARNING: changes to this file in particular can cause significant changes to
 * the results of render performance benchmarks.
 */
import createReactDOMStyle from './createReactDOMStyle';
import flattenArray from '../../modules/flattenArray';
import flattenStyle from './flattenStyle';
import I18nManager from '../I18nManager';
import mapKeyValue from '../../modules/mapKeyValue';
import { prefixInlineStyles } from '../../modules/prefixStyles';
import ReactNativePropRegistry from '../../modules/ReactNativePropRegistry';
import StyleManager from './StyleManager';

const createCacheKey = id => {
  const prefix = I18nManager.isRTL ? 'rtl' : 'ltr';
  return `${prefix}-${id}`;
};

const classListToString = list => list.join(' ').trim();

class StyleRegistry {
  constructor() {
    this.cache = {};
    this.styleManager = new StyleManager();
  }

  getStyleSheetHtml() {
    return this.styleManager.getStyleSheetHtml();
  }

  /**
   * Registers and precaches a React Native style object to HTML class names
   */
  register(flatStyle) {
    const id = ReactNativePropRegistry.register(flatStyle);
    const key = createCacheKey(id);
    const style = createReactDOMStyle(flatStyle);
    const classList = mapKeyValue(style, (prop, value) => {
      if (value != null) {
        return this.styleManager.setDeclaration(prop, value);
      }
    });
    const className = classList.join(' ').trim();
    this.cache[key] = { classList, className };
    return id;
  }

  /**
   * Resolves a React Native style object to DOM attributes
   */
  resolve(reactNativeStyle) {
    if (!reactNativeStyle) {
      return undefined;
    }

    // fast and cachable
    if (typeof reactNativeStyle === 'number') {
      const key = createCacheKey(reactNativeStyle);
      return this._resolveStyleIfNeeded(key, reactNativeStyle);
    }

    // resolve a plain RN style object
    if (!Array.isArray(reactNativeStyle)) {
      return this._resolveStyle(reactNativeStyle);
    }

    // flatten the style array
    // cache resolved props when all styles are registered
    // otherwise fallback to resolving
    const flatArray = flattenArray(reactNativeStyle);
    let isArrayOfNumbers = true;
    for (let i = 0; i < flatArray.length; i++) {
      if (typeof flatArray[i] !== 'number') {
        isArrayOfNumbers = false;
        break;
      }
    }
    const key = isArrayOfNumbers ? createCacheKey(flatArray.join('-')) : null;
    return this._resolveStyleIfNeeded(key, flatArray);
  }

  /**
   * Resolves a React Native style object to DOM attributes, accounting for
   * the existing styles applied to the DOM node.
   *
   * To determine the next style, some of the existing DOM state must be
   * converted back into React Native styles.
   */
  resolveStateful(rnStyleNext, { classList: rdomClassList, style: rdomStyle }) {
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
    const { classList: rdomClassListNext, style: rdomStyleNext } = this.resolve([
      rnStyle,
      rnStyleNext
    ]);

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
  _resolveStyle(reactNativeStyle) {
    const domStyle = createReactDOMStyle(flattenStyle(reactNativeStyle));

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
  _resolveStyleIfNeeded(key, style) {
    if (key) {
      if (!this.cache[key]) {
        // slow: convert style object to props and cache
        this.cache[key] = this._resolveStyle(style);
      }
      return this.cache[key];
    }
    return this._resolveStyle(style);
  }
}

module.exports = StyleRegistry;
