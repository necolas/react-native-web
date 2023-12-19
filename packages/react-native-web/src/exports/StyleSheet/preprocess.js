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
import { warnOnce } from '../../modules/warnOnce';

const emptyObject = {};

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

const ignoredProps = {
  elevation: true,
  overlayColor: true,
  resizeMode: true,
  tintColor: true
};

/**
 * Preprocess styles
 */
export const preprocess = <T: {| [key: string]: any |}>(
  originalStyle: T,
  options?: { shadow?: boolean, textShadow?: boolean } = {}
): T => {
  const style = originalStyle || emptyObject;
  const nextStyle = {};

  // Convert shadow styles
  if (
    (options.shadow === true,
    style.shadowColor != null ||
      style.shadowOffset != null ||
      style.shadowOpacity != null ||
      style.shadowRadius != null)
  ) {
    warnOnce(
      'shadowStyles',
      `"shadow*" style props are deprecated. Use "boxShadow".`
    );
    const boxShadowValue = createBoxShadowValue(style);
    if (boxShadowValue != null && nextStyle.boxShadow == null) {
      const { boxShadow } = style;
      const value = boxShadow
        ? `${boxShadow}, ${boxShadowValue}`
        : boxShadowValue;
      nextStyle.boxShadow = value;
    }
  }

  // Convert text shadow styles
  if (
    (options.textShadow === true,
    style.textShadowColor != null ||
      style.textShadowOffset != null ||
      style.textShadowRadius != null)
  ) {
    warnOnce(
      'textShadowStyles',
      `"textShadow*" style props are deprecated. Use "textShadow".`
    );
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
      !Object.prototype.hasOwnProperty.call(style, originalProp) ||
      (prop !== originalProp && style[prop] != null)
    ) {
      continue;
    }

    if (prop === 'aspectRatio' && typeof value === 'number') {
      nextStyle[prop] = value.toString();
    } else if (prop === 'fontVariant') {
      if (Array.isArray(value) && value.length > 0) {
        warnOnce(
          'fontVariant',
          '"fontVariant" style array value is deprecated. Use space-separated values.'
        );
        value = value.join(' ');
      }
      nextStyle[prop] = value;
    } else if (prop === 'textAlignVertical') {
      warnOnce(
        'textAlignVertical',
        '"textAlignVertical" style is deprecated. Use "verticalAlign".'
      );
      if (style.verticalAlign == null) {
        nextStyle.verticalAlign = value === 'center' ? 'middle' : value;
      }
    } else if (prop === 'transform') {
      if (Array.isArray(value)) {
        value = createTransformValue(value);
      }
      nextStyle.transform = value;
    } else {
      nextStyle[prop] = value;
    }
  }

  // $FlowIgnore
  return nextStyle;
};

export default preprocess;
