/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import normalizeColor from '../../modules/normalizeColor';
import normalizeValue from './normalizeValue';
import resolveShadowValue from './resolveShadowValue';

/**
 * The browser implements the CSS cascade, where the order of properties is a
 * factor in determining which styles to paint. React Native is different. It
 * gives giving precedence to the more specific style property. For example,
 * the value of `paddingTop` takes precedence over that of `padding`.
 *
 * This module creates mutally exclusive style declarations by expanding all of
 * React Native's supported shortform properties (e.g. `padding`) to their
 * longfrom equivalents.
 */

const emptyObject = {};
const styleShortFormProperties = {
  borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
  borderRadius: [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius'
  ],
  borderStyle: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
  borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
  margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
  marginHorizontal: ['marginRight', 'marginLeft'],
  marginVertical: ['marginTop', 'marginBottom'],
  overflow: ['overflowX', 'overflowY'],
  overscrollBehavior: ['overscrollBehaviorX', 'overscrollBehaviorY'],
  padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
  paddingHorizontal: ['paddingRight', 'paddingLeft'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
  writingDirection: ['direction']
};

const colorProps = {
  backgroundColor: true,
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderBottomColor: true,
  borderLeftColor: true,
  color: true
};

const borderWidthProps = {
  borderWidth: true,
  borderTopWidth: true,
  borderRightWidth: true,
  borderBottomWidth: true,
  borderLeftWidth: true
};

const monospaceFontStack = 'monospace, monospace';
const systemFontStack =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif';

const alphaSortProps = propsArray =>
  propsArray.sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

const defaultOffset = { height: 0, width: 0 };

/**
 * Shadow
 */

const resolveShadow = (resolvedStyle, style) => {
  const { boxShadow } = style;
  const shadow = resolveShadowValue(style);
  resolvedStyle.boxShadow = boxShadow ? `${boxShadow}, ${shadow}` : shadow;
};

/**
 * Text Decoration
 */

const resolveTextDecoration = (resolvedStyle, style) => {
  const { textDecorationColor, textDecorationLine, textDecorationStyle } = style;
  const color = normalizeColor(textDecorationColor) || '';
  const lineStyle = textDecorationStyle || '';
  if (textDecorationLine) {
    resolvedStyle.textDecoration = `${textDecorationLine} ${lineStyle} ${color}`.trim();
  }
};

/**
 * Text Shadow
 */

const resolveTextShadow = (resolvedStyle, style) => {
  const { textShadowColor, textShadowOffset, textShadowRadius } = style;
  const { height, width } = textShadowOffset || defaultOffset;
  const offsetX = normalizeValue(null, width);
  const offsetY = normalizeValue(null, height);
  const blurRadius = normalizeValue(null, textShadowRadius || 0);
  const color = normalizeColor(textShadowColor);

  if (color && (height !== 0 || width !== 0)) {
    resolvedStyle.textShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
  }
};

/**
 * Transform
 */

// { scale: 2 } => 'scale(2)'
// { translateX: 20 } => 'translateX(20px)'
const mapTransform = transform => {
  const type = Object.keys(transform)[0];
  const value = normalizeValue(type, transform[type]);
  return `${type}(${value})`;
};

// [1,2,3,4,5,6] => 'matrix3d(1,2,3,4,5,6)'
const convertTransformMatrix = transformMatrix => {
  const matrix = transformMatrix.join(',');
  return `matrix3d(${matrix})`;
};

const resolveTransform = (resolvedStyle, style) => {
  let transform = style.transform;
  if (Array.isArray(style.transform)) {
    transform = style.transform.map(mapTransform).join(' ');
  } else if (style.transformMatrix) {
    transform = convertTransformMatrix(style.transformMatrix);
  }
  resolvedStyle.transform = transform;
};

/**
 * Reducer
 */

const createReducer = (style, styleProps) => {
  let hasResolvedShadow = false;
  let hasResolvedTextDecoration = false;
  let hasResolvedTextShadow = false;

  return (resolvedStyle, prop) => {
    let value = normalizeValue(prop, style[prop]);

    // Make sure the default border width is explicitly set to '0' to avoid
    // falling back to any unwanted user-agent styles.
    if (borderWidthProps[prop]) {
      value = value == null ? normalizeValue(null, 0) : value;
    }

    // Normalize color values
    if (colorProps[prop]) {
      value = normalizeColor(value);
    }

    // Ignore everything else with a null value
    if (value == null) {
      return resolvedStyle;
    }

    switch (prop) {
      // Ignore some React Native styles
      case 'aspectRatio':
      case 'elevation':
      case 'overlayColor':
      case 'resizeMode':
      case 'tintColor': {
        break;
      }

      // TODO: remove once this issue is fixed
      // https://github.com/rofrischmann/inline-style-prefixer/issues/159
      case 'backgroundClip': {
        if (value === 'text') {
          resolvedStyle.backgroundClip = value;
          resolvedStyle.WebkitBackgroundClip = value;
        }
        break;
      }

      case 'display': {
        resolvedStyle.display = value;
        // A flex container in React Native has these defaults which should be
        // set only if there is no otherwise supplied flex style.
        if (style.display === 'flex' && style.flex == null) {
          if (style.flexShrink == null) {
            resolvedStyle.flexShrink = 0;
          }
          if (style.flexBasis == null) {
            resolvedStyle.flexBasis = 'auto';
          }
        }
        break;
      }

      // The 'flex' property value in React Native must be a positive integer,
      // 0, or -1.
      case 'flex': {
        if (value > 0) {
          resolvedStyle.flexGrow = value;
          resolvedStyle.flexShrink = 1;
          resolvedStyle.flexBasis = '0%';
        } else if (value === 0) {
          resolvedStyle.flexGrow = 0;
          resolvedStyle.flexShrink = 0;
          resolvedStyle.flexBasis = '0%';
        } else if (value === -1) {
          resolvedStyle.flexGrow = 0;
          resolvedStyle.flexShrink = 1;
          resolvedStyle.flexBasis = 'auto';
        }
        break;
      }

      case 'fontFamily': {
        if (value.indexOf('System') > -1) {
          const stack = value.split(/\s*,\s*/);
          stack[stack.indexOf('System')] = systemFontStack;
          resolvedStyle.fontFamily = stack.join(', ');
        } else if (value === 'monospace') {
          resolvedStyle.fontFamily = monospaceFontStack;
        } else {
          resolvedStyle.fontFamily = value;
        }
        break;
      }

      case 'fontVariant': {
        if (Array.isArray(value) && value.length > 0) {
          resolvedStyle.fontVariant = value.join(' ');
        }
        break;
      }

      case 'shadowColor':
      case 'shadowOffset':
      case 'shadowOpacity':
      case 'shadowRadius': {
        if (!hasResolvedShadow) {
          resolveShadow(resolvedStyle, style);
        }
        hasResolvedShadow = true;
        break;
      }

      case 'textAlignVertical': {
        resolvedStyle.verticalAlign = value === 'center' ? 'middle' : value;
        break;
      }

      case 'textDecorationColor':
      case 'textDecorationLine':
      case 'textDecorationStyle': {
        if (!hasResolvedTextDecoration) {
          resolveTextDecoration(resolvedStyle, style);
        }
        hasResolvedTextDecoration = true;
        break;
      }

      case 'textShadowColor':
      case 'textShadowOffset':
      case 'textShadowRadius': {
        if (!hasResolvedTextShadow) {
          resolveTextShadow(resolvedStyle, style);
        }
        hasResolvedTextShadow = true;
        break;
      }

      case 'transform':
      case 'transformMatrix': {
        resolveTransform(resolvedStyle, style);
        break;
      }

      default: {
        const longFormProperties = styleShortFormProperties[prop];
        if (longFormProperties) {
          longFormProperties.forEach((longForm, i) => {
            // The value of any longform property in the original styles takes
            // precedence over the shortform's value.
            if (styleProps.indexOf(longForm) === -1) {
              resolvedStyle[longForm] = value;
            }
          });
        } else {
          resolvedStyle[prop] = value;
        }
      }
    }

    return resolvedStyle;
  };
};

const createReactDOMStyle = style => {
  if (!style) {
    return emptyObject;
  }
  const styleProps = Object.keys(style);
  const sortedStyleProps = alphaSortProps(styleProps);
  const reducer = createReducer(style, styleProps);
  const resolvedStyle = sortedStyleProps.reduce(reducer, {});
  return resolvedStyle;
};

export default createReactDOMStyle;
