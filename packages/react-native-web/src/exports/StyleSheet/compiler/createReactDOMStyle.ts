/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import hyphenateStyleName from './hyphenateStyleName';
import normalizeValueWithProperty from './normalizeValueWithProperty';

type Style = Record<string, unknown>;

/**
 * The browser implements the CSS cascade, where the order of properties is a
 * factor in determining which styles to paint. React Native is different. It
 * gives precedence to the more specific style property. For example, the value
 * of `paddingTop` takes precedence over that of `padding`.
 *
 * This module creates mutually exclusive inline style declarations by expanding
 * React Native's supported shortform properties (e.g. `padding`) to their
 * longform equivalents. Static styles rely on the rules order instead.
 */

const emptyObject = {};

const MONOSPACE_FONT_STACK = 'monospace,monospace';

const SYSTEM_FONT_STACK =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

const SHORT_FORM_EXPANSIONS: Record<string, Array<string>> = {
  borderBlockColor: ['borderBlockStartColor', 'borderBlockEndColor'],
  borderBlockStyle: ['borderBlockStartStyle', 'borderBlockEndStyle'],
  borderBlockWidth: ['borderBlockStartWidth', 'borderBlockEndWidth'],
  borderColor: [
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor'
  ],
  borderInlineColor: ['borderInlineStartColor', 'borderInlineEndColor'],
  borderInlineStyle: ['borderInlineStartStyle', 'borderInlineEndStyle'],
  borderInlineWidth: ['borderInlineStartWidth', 'borderInlineEndWidth'],
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
  gap: ['rowGap', 'columnGap'],
  inset: ['top', 'right', 'bottom', 'left'],
  insetBlock: ['insetBlockStart', 'insetBlockEnd'],
  insetInline: ['insetInlineStart', 'insetInlineEnd'],
  margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
  marginBlock: ['marginBlockStart', 'marginBlockEnd'],
  marginHorizontal: ['marginLeft', 'marginRight'],
  marginInline: ['marginInlineStart', 'marginInlineEnd'],
  marginVertical: ['marginTop', 'marginBottom'],
  overflow: ['overflowX', 'overflowY'],
  overscrollBehavior: ['overscrollBehaviorX', 'overscrollBehaviorY'],
  padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
  paddingBlock: ['paddingBlockStart', 'paddingBlockEnd'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  paddingInline: ['paddingInlineStart', 'paddingInlineEnd'],
  paddingVertical: ['paddingTop', 'paddingBottom']
};

// Static styles expand these shortforms too
const STATIC_SHORT_FORMS = new Set([
  'borderColor',
  'borderRadius',
  'borderStyle',
  'borderWidth',
  'marginHorizontal',
  'marginVertical',
  'overflow',
  'overscrollBehavior',
  'paddingHorizontal',
  'paddingVertical'
]);

const PHYSICAL_TO_LOGICAL: Array<[physical: string[], logical: string[]]> = [
  [
    ['top', 'bottom'],
    ['insetBlockStart', 'insetBlockEnd']
  ],
  [
    ['left', 'right'],
    ['insetInlineStart', 'insetInlineEnd']
  ],
  [
    ['marginTop', 'marginBottom'],
    ['marginBlockStart', 'marginBlockEnd']
  ],
  [
    ['marginLeft', 'marginRight'],
    ['marginInlineStart', 'marginInlineEnd']
  ],
  [
    ['paddingTop', 'paddingBottom'],
    ['paddingBlockStart', 'paddingBlockEnd']
  ],
  [
    ['paddingLeft', 'paddingRight'],
    ['paddingInlineStart', 'paddingInlineEnd']
  ],
  [
    ['borderTopColor', 'borderBottomColor'],
    ['borderBlockStartColor', 'borderBlockEndColor']
  ],
  [
    ['borderLeftColor', 'borderRightColor'],
    ['borderInlineStartColor', 'borderInlineEndColor']
  ],
  [
    ['borderTopStyle', 'borderBottomStyle'],
    ['borderBlockStartStyle', 'borderBlockEndStyle']
  ],
  [
    ['borderLeftStyle', 'borderRightStyle'],
    ['borderInlineStartStyle', 'borderInlineEndStyle']
  ],
  [
    ['borderTopWidth', 'borderBottomWidth'],
    ['borderBlockStartWidth', 'borderBlockEndWidth']
  ],
  [
    ['borderLeftWidth', 'borderRightWidth'],
    ['borderInlineStartWidth', 'borderInlineEndWidth']
  ],
  [
    [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomRightRadius',
      'borderBottomLeftRadius'
    ],
    [
      'borderStartStartRadius',
      'borderStartEndRadius',
      'borderEndEndRadius',
      'borderEndStartRadius'
    ]
  ]
];

const LOGICAL_LONGHANDS: Record<string, { prop: string; group: string[] }> = {};
const PHYSICAL_LONGHANDS: Record<string, string> = {};

for (const [physical, logical] of PHYSICAL_TO_LOGICAL) {
  for (const [index, prop] of physical.entries()) {
    LOGICAL_LONGHANDS[prop] = { prop: logical[index], group: logical };
    PHYSICAL_LONGHANDS[logical[index]] = prop;
  }
}

const AXIS_SHORT_FORM_NAMES = new Set<string>();

// Physical longform to its axis shortforms,
// e.g. 'marginTop' => ['marginBlock', 'marginVertical']
const AXIS_SHORT_FORMS: Record<string, string[]> = {};

for (const [shortForm, longForms] of Object.entries(SHORT_FORM_EXPANSIONS)) {
  if (/Block|Inline|Horizontal|Vertical/.test(shortForm)) {
    AXIS_SHORT_FORM_NAMES.add(shortForm);

    for (const longForm of longForms) {
      const physical = PHYSICAL_LONGHANDS[longForm] ?? longForm;
      (AXIS_SHORT_FORMS[physical] ??= []).push(shortForm);
    }
  }
}

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

const prefixValue = <T>(
  prop: string,
  value: T
): T | string | [string, string] => {
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

const createReactDOMStyle = (
  style: Readonly<Record<string, unknown>>,
  isInline?: boolean
): Style => {
  if (!style) {
    return emptyObject;
  }

  const resolvedStyle: Style = {};

  // The value of any longform property in the original styles takes
  // precedence over the shortform's value.
  const setLongForm = (shortForm: string, longForm: string, value: unknown) => {
    let prop = longForm;

    // Axis shortforms (e.g. 'marginInline') only expand to their own longforms
    if (!AXIS_SHORT_FORM_NAMES.has(shortForm)) {
      // An axis shortform set in the original styles takes precedence
      if (AXIS_SHORT_FORMS[longForm]?.some((p) => style[p] != null)) {
        return;
      }

      const logical = LOGICAL_LONGHANDS[longForm];

      if (logical?.group.some((p) => style[p] != null)) {
        prop = logical.prop;
      }
    }

    if (style[prop] == null) {
      resolvedStyle[prop] = value;
    }
  };

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
      resolvedStyle[prop] =
        typeof value === 'string'
          ? value.replace('System', SYSTEM_FONT_STACK)
          : value;
    } else if (prop === 'fontFamily') {
      if (typeof value === 'string' && value.indexOf('System') > -1) {
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
      const longFormProperties =
        isInline || STATIC_SHORT_FORMS.has(prop)
          ? SHORT_FORM_EXPANSIONS[prop]
          : undefined;
      if (longFormProperties != null) {
        for (const longForm of longFormProperties) {
          setLongForm(prop, longForm, value);
        }
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
