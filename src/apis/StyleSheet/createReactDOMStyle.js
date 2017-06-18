/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * The browser implements the CSS cascade, where the order of properties is a
 * factor in determining which styles to paint. React Native is different. It
 * gives giving precedence to the more specific style property. For example,
 * the value of `paddingTop` takes precedence over that of `padding`.
 *
 * This module creates mutally exclusive style declarations by expanding all of
 * React Native's supported shortform properties (e.g. `padding`) to their
 * longfrom equivalents.
 *
 * @noflow
 */

import normalizeValue from './normalizeValue';
import processColor from '../../modules/processColor';

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
  padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
  paddingHorizontal: ['paddingRight', 'paddingLeft'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
  textDecorationLine: ['textDecoration'],
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

// TODO: add inset and spread support
const resolveShadow = (resolvedStyle, style) => {
  const { height, width } = style.shadowOffset || defaultOffset;
  const offsetX = normalizeValue(null, width);
  const offsetY = normalizeValue(null, height);
  const blurRadius = normalizeValue(null, style.shadowRadius || 0);
  const color = processColor(style.shadowColor, style.shadowOpacity);

  if (color) {
    const boxShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
    resolvedStyle.boxShadow = style.boxShadow ? `${style.boxShadow}, ${boxShadow}` : boxShadow;
  } else if (style.boxShadow) {
    resolvedStyle.boxShadow = style.boxShadow;
  }
};

/**
 * Text Shadow
 */

const resolveTextShadow = (resolvedStyle, style) => {
  const { height, width } = style.textShadowOffset || defaultOffset;
  const offsetX = normalizeValue(null, width);
  const offsetY = normalizeValue(null, height);
  const blurRadius = normalizeValue(null, style.textShadowRadius || 0);
  const color = processColor(style.textShadowColor);

  if (color) {
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
  let hasResolvedTextShadow = false;

  return (resolvedStyle, prop) => {
    const value = normalizeValue(prop, style[prop]);
    if (value == null) {
      return resolvedStyle;
    }

    switch (prop) {
      case 'display': {
        resolvedStyle.display = value;
        // default of 'flexShrink:0' has lowest precedence
        if (style.display === 'flex' && style.flex == null && style.flexShrink == null) {
          resolvedStyle.flexShrink = 0;
        }
        break;
      }
      // ignore React Native styles
      case 'aspectRatio':
      case 'elevation':
      case 'overlayColor':
      case 'resizeMode':
      case 'tintColor': {
        break;
      }
      case 'flex': {
        resolvedStyle.flexGrow = value;
        resolvedStyle.flexShrink = 1;
        resolvedStyle.flexBasis = '0%';
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
        // normalize color values
        let finalValue = value;
        if (colorProps[prop]) {
          finalValue = processColor(value);
        }

        const longFormProperties = styleShortFormProperties[prop];
        if (longFormProperties) {
          longFormProperties.forEach((longForm, i) => {
            // the value of any longform property in the original styles takes
            // precedence over the shortform's value
            if (styleProps.indexOf(longForm) === -1) {
              resolvedStyle[longForm] = finalValue;
            }
          });
        } else {
          resolvedStyle[prop] = finalValue;
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
