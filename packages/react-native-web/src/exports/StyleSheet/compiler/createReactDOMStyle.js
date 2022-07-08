/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import normalizeValueWithProperty from './normalizeValueWithProperty';
import canUseDOM from '../../../modules/canUseDom';

type Style = { [key: string]: any };

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

const ignoredProps = {
  elevation: true,
  overlayColor: true,
  resizeMode: true,
  tintColor: true
};

const MONOSPACE_FONT_STACK = 'monospace,monospace';

const SYSTEM_FONT_STACK =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

const STYLE_SHORT_FORM_EXPANSIONS = {
  borderColor: [
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor'
  ],
  borderRadius: [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius'
  ],
  borderStyle: [
    'borderTopStyle',
    'borderRightStyle',
    'borderBottomStyle',
    'borderLeftStyle'
  ],
  borderWidth: [
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth'
  ],
  marginHorizontal: ['marginRight', 'marginLeft'],
  marginVertical: ['marginTop', 'marginBottom'],
  overflow: ['overflowX', 'overflowY'],
  overscrollBehavior: ['overscrollBehaviorX', 'overscrollBehaviorY'],
  paddingHorizontal: ['paddingRight', 'paddingLeft'],
  paddingVertical: ['paddingTop', 'paddingBottom']
};

/**
 * Transform
 */

// { scale: 2 } => 'scale(2)'
// { translateX: 20 } => 'translateX(20px)'
// { matrix: [1,2,3,4,5,6] } => 'matrix(1,2,3,4,5,6)'
const mapTransform = (transform: Object): string => {
  const type = Object.keys(transform)[0];
  const value = transform[type];
  if (type === 'matrix' || type === 'matrix3d') {
    return `${type}(${value.join(',')})`;
  } else {
    const normalizedValue = normalizeValueWithProperty(value, type);
    return `${type}(${normalizedValue})`;
  }
};

export const createTransformValue = (style: Style): string => {
  let transform = style.transform;
  if (Array.isArray(style.transform)) {
    transform = style.transform.map(mapTransform).join(' ');
  }
  return transform;
};

/**
 * Reducer
 */

const createReactDOMStyle = (style: Style, isInline?: boolean): Style => {
  if (!style) {
    return emptyObject;
  }

  const resolvedStyle = {};

  for (const prop in style) {
    const value = style[prop];

    if (
      // Ignore everything with a null value
      value == null ||
      // Ignore some React Native styles
      ignoredProps[prop]
    ) {
      continue;
    }

    if (prop === 'aspectRatio') {
      resolvedStyle[prop] = value.toString();
    } else if (prop === 'backgroundClip') {
      // TODO: remove once this issue is fixed
      // https://github.com/rofrischmann/inline-style-prefixer/issues/159
      if (value === 'text') {
        resolvedStyle.backgroundClip = value;
        resolvedStyle.WebkitBackgroundClip = value;
      }
    } else if (prop === 'flex') {
      if (value === -1) {
        resolvedStyle.flexGrow = 0;
        resolvedStyle.flexShrink = 1;
        resolvedStyle.flexBasis = 'auto';
      } else {
        resolvedStyle.flex = value;
      }
    } else if (prop === 'font') {
      resolvedStyle[prop] = value.replace('System', SYSTEM_FONT_STACK);
    } else if (prop === 'fontFamily') {
      if (value.indexOf('System') > -1) {
        const stack = value.split(/,\s*/);
        stack[stack.indexOf('System')] = SYSTEM_FONT_STACK;
        resolvedStyle[prop] = stack.join(',');
      } else if (value === 'monospace') {
        resolvedStyle[prop] = MONOSPACE_FONT_STACK;
      } else {
        resolvedStyle[prop] = value;
      }
    } else if (prop === 'fontVariant') {
      if (Array.isArray(value) && value.length > 0) {
        resolvedStyle.fontVariant = value.join(' ');
      }
    } else if (prop === 'textAlignVertical') {
      resolvedStyle.verticalAlign = value === 'center' ? 'middle' : value;
    } else if (prop === 'textDecorationLine') {
      // use 'text-decoration' for browsers that only support CSS2
      // text-decoration (e.g., IE, Edge)
      if (!supportsCSS3TextDecoration) {
        resolvedStyle.textDecoration = value;
      } else {
        resolvedStyle.textDecorationLine = value;
      }
    } else if (prop === 'transform' || prop === 'transformMatrix') {
      resolvedStyle.transform = createTransformValue(style);
    } else if (prop === 'writingDirection') {
      resolvedStyle.direction = value;
    } else {
      const value = normalizeValueWithProperty(style[prop], prop);
      const longFormProperties = STYLE_SHORT_FORM_EXPANSIONS[prop];
      if (isInline && prop === 'margin') {
        if (style.marginHorizontal == null) {
          resolvedStyle.marginLeft = value;
          resolvedStyle.marginRight = value;
        }
        if (style.marginVertical == null) {
          resolvedStyle.marginTop = value;
          resolvedStyle.marginBottom = value;
        }
      } else if (isInline && prop === 'padding') {
        if (style.paddingHorizontal == null) {
          resolvedStyle.paddingLeft = value;
          resolvedStyle.paddingRight = value;
        }
        if (style.paddingVertical == null) {
          resolvedStyle.paddingTop = value;
          resolvedStyle.paddingBottom = value;
        }
      } else if (longFormProperties) {
        longFormProperties.forEach((longForm, i) => {
          // The value of any longform property in the original styles takes
          // precedence over the shortform's value.
          if (style[longForm] == null) {
            resolvedStyle[longForm] = value;
          }
        });
      } else {
        resolvedStyle[prop] = Array.isArray(value) ? value.join(',') : value;
      }
    }
  }

  return resolvedStyle;
};

export default createReactDOMStyle;
