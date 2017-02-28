/**
 * The browser implements the CSS cascade, where the order of properties is a
 * factor in determining which styles to paint. React Native is different in
 * giving precedence to the more specific styles. For example, the value of
 * `paddingTop` takes precedence over that of `padding`.
 *
 * This module creates mutally exclusive style declarations by expanding all of
 * React Native's supported shortform properties (e.g. `padding`) to their
 * longfrom equivalents.
 */

import normalizeValue from './normalizeValue';
import resolveBoxShadow from './resolveBoxShadow';
import resolveTextShadow from './resolveTextShadow';
import resolveTransform from './resolveTransform';

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

const alphaSortProps = propsArray => propsArray.sort((a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
});

const createReducer = (style, styleProps) => {
  let hasResolvedBoxShadow = false;
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
      case 'elevation':
      case 'overlayColor':
      case 'resizeMode':
      case 'tintColor': {
        break;
      }
      case 'flex': {
        resolvedStyle.flexGrow = value;
        resolvedStyle.flexShrink = 1;
        resolvedStyle.flexBasis = 'auto';
        break;
      }
      case 'shadowColor':
      case 'shadowOffset':
      case 'shadowOpacity':
      case 'shadowRadius': {
        if (!hasResolvedBoxShadow) {
          resolveBoxShadow(resolvedStyle, style);
        }
        hasResolvedBoxShadow = true;
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
      case 'transform': {
        resolveTransform(resolvedStyle, style);
        break;
      }
      default: {
        const longFormProperties = styleShortFormProperties[prop];
        if (longFormProperties) {
          longFormProperties.forEach((longForm, i) => {
            // the value of any longform property in the original styles takes
            // precedence over the shortform's value
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

const expandStyle = style => {
  if (!style) {
    return emptyObject;
  }
  const styleProps = Object.keys(style);
  const sortedStyleProps = alphaSortProps(styleProps);
  const reducer = createReducer(style, styleProps);
  const resolvedStyle = sortedStyleProps.reduce(reducer, {});
  return resolvedStyle;
};

module.exports = expandStyle;
