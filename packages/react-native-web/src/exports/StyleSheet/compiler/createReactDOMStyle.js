/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import hyphenateStyleName from './hyphenateStyleName';
import normalizeValueWithProperty from './normalizeValueWithProperty';

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

const MONOSPACE_FONT_STACK = 'monospace,monospace';

const SYSTEM_FONT_STACK =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

const STYLE_SHORT_FORM_EXPANSIONS: { [string]: Array<string> } = {
  borderColor: [
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor'
  ],
  borderBlockColor: ['borderTopColor', 'borderBottomColor'],
  borderInlineColor: ['borderRightColor', 'borderLeftColor'],
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
  borderBlockStyle: ['borderTopStyle', 'borderBottomStyle'],
  borderInlineStyle: ['borderRightStyle', 'borderLeftStyle'],
  borderWidth: [
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth'
  ],
  borderBlockWidth: ['borderTopWidth', 'borderBottomWidth'],
  borderInlineWidth: ['borderRightWidth', 'borderLeftWidth'],
  insetBlock: ['top', 'bottom'],
  insetInline: ['left', 'right'],
  marginBlock: ['marginTop', 'marginBottom'],
  marginInline: ['marginRight', 'marginLeft'],
  paddingBlock: ['paddingTop', 'paddingBottom'],
  paddingInline: ['paddingRight', 'paddingLeft'],
  overflow: ['overflowX', 'overflowY'],
  overscrollBehavior: ['overscrollBehaviorX', 'overscrollBehaviorY'],
  borderBlockStartColor: ['borderTopColor'],
  borderBlockStartStyle: ['borderTopStyle'],
  borderBlockStartWidth: ['borderTopWidth'],
  borderBlockEndColor: ['borderBottomColor'],
  borderBlockEndStyle: ['borderBottomStyle'],
  borderBlockEndWidth: ['borderBottomWidth'],
  //borderInlineStartColor: ['borderLeftColor'],
  //borderInlineStartStyle: ['borderLeftStyle'],
  //borderInlineStartWidth: ['borderLeftWidth'],
  //borderInlineEndColor: ['borderRightColor'],
  //borderInlineEndStyle: ['borderRightStyle'],
  //borderInlineEndWidth: ['borderRightWidth'],
  borderEndStartRadius: ['borderBottomLeftRadius'],
  borderEndEndRadius: ['borderBottomRightRadius'],
  borderStartStartRadius: ['borderTopLeftRadius'],
  borderStartEndRadius: ['borderTopRightRadius'],
  insetBlockEnd: ['bottom'],
  insetBlockStart: ['top'],
  //insetInlineEnd: ['right'],
  //insetInlineStart: ['left'],
  marginBlockStart: ['marginTop'],
  marginBlockEnd: ['marginBottom'],
  //marginInlineStart: ['marginLeft'],
  //marginInlineEnd: ['marginRight'],
  paddingBlockStart: ['paddingTop'],
  paddingBlockEnd: ['paddingBottom']
  //paddingInlineStart: ['marginLeft'],
  //paddingInlineEnd: ['marginRight'],
};

const PREFIXED_PROPERTIES = Object.fromEntries(
  [
    'appearance',
    'backdropFilter',
    'backfaceVisibility',
    'boxDecorationBreak',
    'hyphenateCharacter',
    'hyphens',
    'initialLetter',
    'lineClamp',
    'mask',
    'maskClip',
    'maskImage',
    'maskOrigin',
    'maskPosition',
    'maskRepeat',
    'maskSize',
    'printColorAdjust',
    'rubyPosition',
    'textEmphasis',
    'textEmphasisColor',
    'textEmphasisPosition',
    'textEmphasisStyle',
    'textSizeAdjust',
    'userSelect'
  ].map((prop) => [
    prop,
    'Webkit' + prop.charAt(0).toUpperCase() + prop.substring(1)
  ])
);

const PREFIXED_PROPERTY_NAMES = Object.keys(PREFIXED_PROPERTIES)
  .map(hyphenateStyleName)
  .join('|');

const PREFIXED_PROPERTY_TEST_PATTERN = new RegExp(
  `(?:^|[\\s,])(?:${PREFIXED_PROPERTY_NAMES})(?=[\\s,]|$)`
);

const PREFIXED_PROPERTY_REPLACE_PATTERN = new RegExp(
  `(^|\\s)(${PREFIXED_PROPERTY_NAMES})(?=\\s|$)`,
  'g'
);

const SIZING_PROPERTIES: Set<string> = new Set([
  'height',
  'width',
  'minHeight',
  'minWidth',
  'maxHeight',
  'maxWidth',
  'columnWidth'
]);

const PREFIXED_SIZING_VALUES: Set<string> = new Set([
  'fill-available',
  'contain-floats'
]);

const PREFIXED_FUNCTIONS_PATTERN = /(cross-fade|image-set)\(/g;

// Only split multi values, not cubic beziers
const VALUE_SEPARATOR_PATTERN = /,(?![^()]*(?:\([^()]*\))?\))/g;

const prefixTransitionValue = (value: string): string => {
  if (!PREFIXED_PROPERTY_TEST_PATTERN.test(value)) {
    return value;
  }

  return value
    .split(VALUE_SEPARATOR_PATTERN)
    .map((singleValue) => {
      const prefixedValue = singleValue.replace(
        PREFIXED_PROPERTY_REPLACE_PATTERN,
        '$1-webkit-$2'
      );

      return prefixedValue !== singleValue
        ? `${prefixedValue},${singleValue}`
        : singleValue;
    })
    .join(',');
};

const prefixValue = (prop: string, value: any): any => {
  if (typeof value !== 'string' || value.indexOf('-webkit-') > -1) {
    return value;
  }

  const prefixedValue = value.replace(
    PREFIXED_FUNCTIONS_PATTERN,
    '-webkit-$1('
  );

  if (prefixedValue !== value) {
    return [prefixedValue, value];
  }

  if (SIZING_PROPERTIES.has(prop) && PREFIXED_SIZING_VALUES.has(value)) {
    return ['-webkit-' + value, value];
  }
  if (prop === 'transition' || prop === 'transitionProperty') {
    return prefixTransitionValue(value);
  }

  return value;
};

/**
 * Reducer
 */

const createReactDOMStyle = (style: Style, isInline?: boolean): Style => {
  if (!style) {
    return emptyObject;
  }

  const resolvedStyle: Style = {};

  for (const prop in style) {
    const value = style[prop];

    if (
      // Ignore everything with a null value
      value == null
    ) {
      continue;
    }

    if (prop === 'backgroundClip') {
      resolvedStyle.backgroundClip = value;
      if (value === 'text') {
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
    } else if (prop === 'writingDirection') {
      resolvedStyle.direction = value;
    } else {
      const value = normalizeValueWithProperty(style[prop], prop);
      const longFormProperties = STYLE_SHORT_FORM_EXPANSIONS[prop];
      if (isInline && prop === 'inset') {
        if (style.insetInline == null) {
          resolvedStyle.left = value;
          resolvedStyle.right = value;
        }
        if (style.insetBlock == null) {
          resolvedStyle.top = value;
          resolvedStyle.bottom = value;
        }
      } else if (isInline && prop === 'margin') {
        if (style.marginInline == null) {
          resolvedStyle.marginLeft = value;
          resolvedStyle.marginRight = value;
        }
        if (style.marginBlock == null) {
          resolvedStyle.marginTop = value;
          resolvedStyle.marginBottom = value;
        }
      } else if (isInline && prop === 'padding') {
        if (style.paddingInline == null) {
          resolvedStyle.paddingLeft = value;
          resolvedStyle.paddingRight = value;
        }
        if (style.paddingBlock == null) {
          resolvedStyle.paddingTop = value;
          resolvedStyle.paddingBottom = value;
        }
      } else if (longFormProperties) {
        longFormProperties.forEach((longForm) => {
          // The value of any longform property in the original styles takes
          // precedence over the shortform's value.
          if (style[longForm] == null) {
            resolvedStyle[longForm] = value;
          }
        });
      } else if (isInline) {
        resolvedStyle[prop] = value;
      } else {
        const prefixedProp = PREFIXED_PROPERTIES[prop];
        const prefixedValue = prefixValue(prop, value);
        resolvedStyle[prop] = prefixedValue;

        if (prefixedProp != null) {
          resolvedStyle[prefixedProp] = prefixedValue;
        }

        // Firefox < 97
        if (prop === 'printColorAdjust') {
          resolvedStyle.colorAdjust = prefixedValue;
        }
      }
    }
  }

  return resolvedStyle;
};

export default createReactDOMStyle;
