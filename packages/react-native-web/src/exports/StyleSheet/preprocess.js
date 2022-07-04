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

/**
 * Preprocess styles
 */
export const preprocess = <T: {| [key: string]: any |}>(
  originalStyle: T
): T => {
  const style = originalStyle || emptyObject;
  const nextStyle = {};

  for (const originalProp in style) {
    const originalValue = style[originalProp];
    let prop = originalProp;
    let value = originalValue;

    if (
      !Object.prototype.hasOwnProperty.call(style, originalProp) ||
      originalValue == null
    ) {
      continue;
    }

    // Convert shadow styles
    if (
      prop === 'shadowColor' ||
      prop === 'shadowOffset' ||
      prop === 'shadowOpacity' ||
      prop === 'shadowRadius'
    ) {
      const boxShadowValue = createBoxShadowValue(style);
      if (boxShadowValue != null && nextStyle.boxShadow == null) {
        const { boxShadow } = style;
        prop = 'boxShadow';
        value = boxShadow ? `${boxShadow}, ${boxShadowValue}` : boxShadowValue;
      } else {
        continue;
      }
    }

    // Convert text shadow styles
    if (
      prop === 'textShadowColor' ||
      prop === 'textShadowOffset' ||
      prop === 'textShadowRadius'
    ) {
      const textShadowValue = createTextShadowValue(style);
      if (textShadowValue != null && nextStyle.textShadow == null) {
        const { textShadow } = style;
        prop = 'textShadow';
        value = textShadow
          ? `${textShadow}, ${textShadowValue}`
          : textShadowValue;
      } else {
        continue;
      }
    }

    nextStyle[prop] = value;
  }

  // $FlowIgnore
  return nextStyle;
};

export default preprocess;
