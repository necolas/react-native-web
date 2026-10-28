/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import normalizeColor from './compiler/normalizeColor';
import normalizeValueWithProperty from './compiler/normalizeValueWithProperty';

const emptyObject: { [string]: any } = {};

/**
 * Shadows
 */

const defaultOffset = { height: 0, width: 0 };

export const createBoxShadowValue = (style: Object): void | string => {
  const { shadowColor, shadowOffset, shadowOpacity, shadowRadius } = style;
  const { height, width } = shadowOffset || defaultOffset;
  const offsetX = normalizeValueWithProperty(width);
  const offsetY = normalizeValueWithProperty(height);
  const blurRadius = normalizeValueWithProperty(shadowRadius || 0);
  const color = normalizeColor(shadowColor || 'black', shadowOpacity);
  if (
    color != null &&
    offsetX != null &&
    offsetY != null &&
    blurRadius != null
  ) {
    return `${offsetX} ${offsetY} ${blurRadius} ${color}`;
  }
};

export const createTextShadowValue = (style: Object): void | string => {
  const { textShadowColor, textShadowOffset, textShadowRadius } = style;
  const { height, width } = textShadowOffset || defaultOffset;
  const radius = textShadowRadius || 0;
  const offsetX = normalizeValueWithProperty(width);
  const offsetY = normalizeValueWithProperty(height);
  const blurRadius = normalizeValueWithProperty(radius);
  const color = normalizeValueWithProperty(textShadowColor, 'textShadowColor');

  if (
    color &&
    (height !== 0 || width !== 0 || radius !== 0) &&
    offsetX != null &&
    offsetY != null &&
    blurRadius != null
  ) {
    return `${offsetX} ${offsetY} ${blurRadius} ${color}`;
  }
};

// { offsetX: 1, offsetY: 2, blurRadius: 3, spreadDistance: 4, color: 'rgba(255, 0, 0)', inset: true }
// => 'rgba(255, 0, 0) 1px 2px 3px 4px inset'
const mapBoxShadow = (boxShadow: Object | string): string => {
  if (typeof boxShadow === 'string') {
    return boxShadow;
  }
  const offsetX = normalizeValueWithProperty(boxShadow.offsetX) || 0;
  const offsetY = normalizeValueWithProperty(boxShadow.offsetY) || 0;
  const blurRadius = normalizeValueWithProperty(boxShadow.blurRadius) || 0;
  const spreadDistance =
    normalizeValueWithProperty(boxShadow.spreadDistance) || 0;
  const color = normalizeColor(boxShadow.color) || 'black';
  const position = boxShadow.inset ? 'inset ' : '';
  return `${position}${offsetX} ${offsetY} ${blurRadius} ${spreadDistance} ${color}`;
};
export const createBoxShadowArrayValue = (value: Array<Object>): string => {
  return value.map(mapBoxShadow).join(', ');
};

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
export const createTransformValue = (value: Array<Object>): string => {
  return value.map(mapTransform).join(' ');
};

// [2, '30%', 10] => '2px 30% 10px'
export const createTransformOriginValue = (
  value: Array<number | string>
): string => {
  return value.map((v) => normalizeValueWithProperty(v)).join(' ');
};

const STYLISTIC_SETS: { [key: string]: string } = {
  'stylistic-one': "'ss01'",
  'stylistic-two': "'ss02'",
  'stylistic-three': "'ss03'",
  'stylistic-four': "'ss04'",
  'stylistic-five': "'ss05'",
  'stylistic-six': "'ss06'",
  'stylistic-seven': "'ss07'",
  'stylistic-eight': "'ss08'",
  'stylistic-nine': "'ss09'",
  'stylistic-ten': "'ss10'",
  'stylistic-eleven': "'ss11'",
  'stylistic-twelve': "'ss12'",
  'stylistic-thirteen': "'ss13'",
  'stylistic-fourteen': "'ss14'",
  'stylistic-fifteen': "'ss15'",
  'stylistic-sixteen': "'ss16'",
  'stylistic-seventeen': "'ss17'",
  'stylistic-eighteen': "'ss18'",
  'stylistic-nineteen': "'ss19'",
  'stylistic-twenty': "'ss20'"
};

const hasFeatures = (value: ?string): boolean =>
  value != null && value !== 'normal';

// 'normal' and null can't be part of a feature list, but are kept when the
// other side has no features so they can override an earlier style object
const mergeFontFeatureSettings = (a: ?string, b: ?string): ?string => {
  if (hasFeatures(a) && hasFeatures(b)) {
    return `${String(a)}, ${String(b)}`;
  }
  if (hasFeatures(b) || a === undefined) {
    return b;
  }
  return a;
};

const PROPERTIES_STANDARD: { [key: string]: string } = {
  borderBottomEndRadius: 'borderEndEndRadius',
  borderBottomStartRadius: 'borderEndStartRadius',
  borderTopEndRadius: 'borderStartEndRadius',
  borderTopStartRadius: 'borderStartStartRadius',
  borderEndColor: 'borderInlineEndColor',
  borderEndStyle: 'borderInlineEndStyle',
  borderEndWidth: 'borderInlineEndWidth',
  borderStartColor: 'borderInlineStartColor',
  borderStartStyle: 'borderInlineStartStyle',
  borderStartWidth: 'borderInlineStartWidth',
  end: 'insetInlineEnd',
  marginEnd: 'marginInlineEnd',
  marginHorizontal: 'marginInline',
  marginStart: 'marginInlineStart',
  marginVertical: 'marginBlock',
  paddingEnd: 'paddingInlineEnd',
  paddingHorizontal: 'paddingInline',
  paddingStart: 'paddingInlineStart',
  paddingVertical: 'paddingBlock',
  start: 'insetInlineStart'
};

const ignoredProps: { [string]: boolean } = {
  elevation: true,
  overlayColor: true,
  resizeMode: true,
  tintColor: true
};

/**
 * Preprocess styles
 */
export const preprocess = <T extends {| [key: string]: any |}>(
  originalStyle: T,
  options?: { readonly shadow?: boolean, readonly textShadow?: boolean } = {}
): T => {
  const style = originalStyle || emptyObject;
  const nextStyle: { [string]: any } = {};

  // Convert shadow styles
  if (
    options.shadow === true &&
    (style.shadowColor != null ||
      style.shadowOffset != null ||
      style.shadowOpacity != null ||
      style.shadowRadius != null)
  ) {
    const boxShadowValue = createBoxShadowValue(style);
    if (boxShadowValue != null) {
      nextStyle.boxShadow = boxShadowValue;
    }
  }

  // Convert text shadow styles
  if (
    options.textShadow === true &&
    (style.textShadowColor != null ||
      style.textShadowOffset != null ||
      style.textShadowRadius != null)
  ) {
    const textShadowValue = createTextShadowValue(style);
    if (textShadowValue != null && nextStyle.textShadow == null) {
      const { textShadow } = style;
      const value = textShadow
        ? `${textShadow}, ${textShadowValue}`
        : textShadowValue;
      nextStyle.textShadow = value;
    }
  }

  for (const originalProp in style) {
    if (
      // Ignore some React Native styles
      ignoredProps[originalProp] != null ||
      originalProp === 'shadowColor' ||
      originalProp === 'shadowOffset' ||
      originalProp === 'shadowOpacity' ||
      originalProp === 'shadowRadius' ||
      originalProp === 'textShadowColor' ||
      originalProp === 'textShadowOffset' ||
      originalProp === 'textShadowRadius'
    ) {
      continue;
    }

    const originalValue = style[originalProp];
    const prop = PROPERTIES_STANDARD[originalProp] || originalProp;
    let value = originalValue;

    if (
      // $FlowFixMe[invalid-this-arg]
      !Object.prototype.hasOwnProperty.call(style, originalProp) ||
      (prop !== originalProp && style[prop] != null)
    ) {
      continue;
    }

    if (prop === 'aspectRatio' && typeof value === 'number') {
      nextStyle[prop] = value.toString();
    } else if (prop === 'boxShadow') {
      if (Array.isArray(value)) {
        value = createBoxShadowArrayValue(value);
      }
      const { boxShadow } = nextStyle;
      nextStyle.boxShadow = boxShadow ? `${value}, ${boxShadow}` : value;
    } else if (prop === 'fontFeatureSettings') {
      nextStyle.fontFeatureSettings = mergeFontFeatureSettings(
        value,
        nextStyle.fontFeatureSettings
      );
    } else if (prop === 'fontVariant') {
      if (value == null) {
        nextStyle.fontVariant = value;
        if (value === null) {
          // Also clear stylistic sets applied by an earlier inline style
          nextStyle.fontFeatureSettings = mergeFontFeatureSettings(
            nextStyle.fontFeatureSettings,
            null
          );
        }
        continue;
      }
      const variants = typeof value === 'string' ? value.split(' ') : value;
      const fontVariant = [];
      const features = [];
      variants.forEach((variant) => {
        const feature = STYLISTIC_SETS[variant];
        if (feature != null) {
          features.push(feature);
        } else if (variant) {
          fontVariant.push(variant);
        }
      });
      // Reset values set by an earlier style object
      nextStyle.fontVariant =
        fontVariant.length > 0 ? fontVariant.join(' ') : 'normal';
      nextStyle.fontFeatureSettings = mergeFontFeatureSettings(
        nextStyle.fontFeatureSettings,
        features.length > 0 ? features.join(', ') : 'normal'
      );
    } else if (prop === 'textAlignVertical') {
      if (style.verticalAlign == null) {
        nextStyle.verticalAlign = value === 'center' ? 'middle' : value;
      }
    } else if (prop === 'transform') {
      if (Array.isArray(value)) {
        value = createTransformValue(value);
      }
      nextStyle.transform = value;
    } else if (prop === 'transformOrigin') {
      if (Array.isArray(value)) {
        value = createTransformOriginValue(value);
      }
      nextStyle.transformOrigin = value;
    } else {
      nextStyle[prop] = value;
    }
  }

  return nextStyle as any;
};

export default preprocess;
