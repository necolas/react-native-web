/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { MONOSPACE_FONT_STACK, SYSTEM_FONT_STACK, STYLE_SHORT_FORM_EXPANSIONS } from './constants';
import normalizeValueWithProperty from './normalizeValueWithProperty';

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

const supportsCSS3TextDecoration =
  !canUseDOM ||
  (window.CSS != null &&
    window.CSS.supports != null &&
    (window.CSS.supports('text-decoration-line', 'none') ||
      window.CSS.supports('-webkit-text-decoration-line', 'none')));

/**
 * Transform
 */

// { scale: 2 } => 'scale(2)'
// { translateX: 20 } => 'translateX(20px)'
// { matrix: [1,2,3,4,5,6] } => 'matrix(1,2,3,4,5,6)'
const mapTransform = (transform) => {
  const type = Object.keys(transform)[0];
  const value = transform[type];
  if (type === 'matrix' || type === 'matrix3d') {
    return `${type}(${value.join(',')})`;
  } else {
    const normalizedValue = normalizeValueWithProperty(value, type);
    return `${type}(${normalizedValue})`;
  }
};

const resolveTransform = (resolvedStyle, style) => {
  let transform = style.transform;
  if (Array.isArray(style.transform)) {
    transform = style.transform.map(mapTransform).join(' ');
  }
  resolvedStyle.transform = transform;
};

/**
 * Reducer
 */

const createReactDOMStyle = (style) => {
  if (!style) {
    return emptyObject;
  }

  const resolvedStyle = {};

  Object.keys(style)
    .sort()
    .forEach((prop) => {
      const value = normalizeValueWithProperty(style[prop], prop);

      // Ignore everything else with a null value
      if (value == null) {
        return;
      }

      switch (prop) {
        // Ignore some React Native styles
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

        // The 'flex' property value in React Native must be a positive integer,
        // 0, or -1.
        case 'flex': {
          if (value === -1) {
            resolvedStyle.flexGrow = 0;
            resolvedStyle.flexShrink = 1;
            resolvedStyle.flexBasis = 'auto';
          } else {
            resolvedStyle.flex = value;
          }
          break;
        }

        case 'font': {
          resolvedStyle[prop] = value.replace('System', SYSTEM_FONT_STACK);
          break;
        }

        case 'fontFamily': {
          if (value.indexOf('System') > -1) {
            const stack = value.split(/,\s*/);
            stack[stack.indexOf('System')] = SYSTEM_FONT_STACK;
            resolvedStyle[prop] = stack.join(',');
          } else if (value === 'monospace') {
            resolvedStyle[prop] = MONOSPACE_FONT_STACK;
          } else {
            resolvedStyle[prop] = value;
          }
          break;
        }

        case 'fontVariant': {
          if (Array.isArray(value) && value.length > 0) {
            resolvedStyle.fontVariant = value.join(' ');
          }
          break;
        }

        case 'textAlignVertical': {
          resolvedStyle.verticalAlign = value === 'center' ? 'middle' : value;
          break;
        }

        case 'textDecorationLine': {
          // use 'text-decoration' for browsers that only support CSS2
          // text-decoration (e.g., IE, Edge)
          if (!supportsCSS3TextDecoration) {
            resolvedStyle.textDecoration = value;
          } else {
            resolvedStyle.textDecorationLine = value;
          }
          break;
        }

        case 'transform':
        case 'transformMatrix': {
          resolveTransform(resolvedStyle, style);
          break;
        }

        case 'writingDirection': {
          resolvedStyle.direction = value;
          break;
        }

        default: {
          const longFormProperties = STYLE_SHORT_FORM_EXPANSIONS[prop];
          if (longFormProperties) {
            longFormProperties.forEach((longForm, i) => {
              // The value of any longform property in the original styles takes
              // precedence over the shortform's value.
              if (typeof style[longForm] === 'undefined') {
                resolvedStyle[longForm] = value;
              }
            });
          } else {
            resolvedStyle[prop] = Array.isArray(value) ? value.join(',') : value;
          }
        }
      }
    });

  return resolvedStyle;
};

export default createReactDOMStyle;
