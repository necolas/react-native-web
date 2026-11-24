/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Nullable } from '../../types';
import normalizeColor from './compiler/normalizeColor';
import normalizeValueWithProperty from './compiler/normalizeValueWithProperty';

const emptyObject: Readonly<Record<string, never>> = {};

/**
 * Shadows
 */

const defaultOffset = { height: 0, width: 0 };

type ShadowOffset = {
  readonly height?: Nullable<number | string>;
  readonly width?: Nullable<number | string>;
};

type ShadowStyle = {
  readonly shadowColor?: Nullable<number | string>;
  readonly shadowOffset?: Nullable<ShadowOffset>;
  readonly shadowOpacity?: number | null;
  readonly shadowRadius?: Nullable<number | string>;
};

type TextShadowStyle = {
  readonly textShadowColor?: Nullable<number | string>;
  readonly textShadowOffset?: Nullable<ShadowOffset>;
  readonly textShadowRadius?: Nullable<number | string>;
};

type BoxShadow = {
  readonly offsetX?: Nullable<number | string>;
  readonly offsetY?: Nullable<number | string>;
  readonly blurRadius?: Nullable<number | string>;
  readonly spreadDistance?: Nullable<number | string>;
  readonly color?: number | string;
  readonly inset?: Nullable<boolean>;
};

type TransformStyle = Readonly<
  Record<string, number | string | ReadonlyArray<number>>
>;

export const createBoxShadowValue = (
  style: ShadowStyle
): string | undefined => {
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

const createTextShadowValue = (style: TextShadowStyle): string | undefined => {
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
const mapBoxShadow = (boxShadow: BoxShadow | string): string => {
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

// { scale: 2 } => 'scale(2)'
// { translateX: 20 } => 'translateX(20px)'
// { matrix: [1,2,3,4,5,6] } => 'matrix(1,2,3,4,5,6)'
const mapTransform = (transform: TransformStyle): string => {
  const type = Object.keys(transform)[0];
  const value = transform[type];
  if ((type === 'matrix' || type === 'matrix3d') && typeof value === 'object') {
    return `${type}(${value.join(',')})`;
  } else {
    const normalizedValue = normalizeValueWithProperty(value, type);
    return `${type}(${normalizedValue})`;
  }
};

const STYLISTIC_SETS: Record<string, string> = {
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

const hasFeatures = (value: unknown): boolean =>
  value != null && value !== 'normal';

// Keep 'normal' and null to override an earlier style object
const mergeFontFeatureSettings = (a: unknown, b: unknown): unknown => {
  if (hasFeatures(a) && hasFeatures(b)) {
    return `${String(a)}, ${String(b)}`;
  }
  if (hasFeatures(b) || a === undefined) {
    return b;
  }
  return a;
};

export const PROPERTIES_STANDARD: Record<string, string> = {
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

const ignoredProps = new Set([
  'elevation',
  'overlayColor',
  'resizeMode',
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'textShadowColor',
  'textShadowOffset',
  'textShadowRadius',
  'tintColor'
]);

export type PreprocessOptions = {
  readonly shadow?: boolean;
  readonly textShadow?: boolean;
};

/**
 * Preprocess styles
 */
export const preprocess = <T extends Readonly<Record<string, unknown>>>(
  originalStyle: T,
  options: PreprocessOptions = {}
): T => {
  const style = originalStyle || emptyObject;
  const nextStyle: Record<string, unknown> = {};

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
    // Ignore some React Native styles
    if (ignoredProps.has(originalProp)) {
      continue;
    }

    const originalValue = style[originalProp];
    const prop = PROPERTIES_STANDARD[originalProp] || originalProp;
    let value: unknown = originalValue;

    if (
      !Object.prototype.hasOwnProperty.call(style, originalProp) ||
      (prop !== originalProp && style[prop] != null)
    ) {
      continue;
    }

    if (prop === 'aspectRatio' && typeof value === 'number') {
      nextStyle[prop] = value.toString();
    } else if (prop === 'boxShadow') {
      if (Array.isArray(value)) {
        value = value.map(mapBoxShadow).join(', ');
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
        if (value !== undefined) {
          // Also clear stylistic sets applied by an earlier inline style
          nextStyle.fontFeatureSettings = mergeFontFeatureSettings(
            nextStyle.fontFeatureSettings,
            null
          );
        }
        continue;
      }
      const variants =
        typeof value === 'string'
          ? value.split(' ')
          : (value as ReadonlyArray<string>);
      const fontVariant: Array<string> = [];
      const features: Array<string> = [];
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
        value = value.map(mapTransform).join(' ');
      }
      nextStyle.transform = value;
    } else if (prop === 'transformOrigin') {
      if (Array.isArray(value)) {
        // [2, '30%', 10] => '2px 30% 10px'
        value = value.map((v) => normalizeValueWithProperty(v)).join(' ');
      }
      nextStyle.transformOrigin = value;
    } else {
      nextStyle[prop] = value;
    }
  }

  return nextStyle as T;
};

export default preprocess;
