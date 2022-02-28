/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import normalizeColor from './normalizeColor';
import normalizeValueWithProperty from './normalizeValueWithProperty';

const emptyObject = {};

const borderTopLeftRadius = 'borderTopLeftRadius';
const borderTopRightRadius = 'borderTopRightRadius';
const borderBottomLeftRadius = 'borderBottomLeftRadius';
const borderBottomRightRadius = 'borderBottomRightRadius';
const borderLeftColor = 'borderLeftColor';
const borderLeftStyle = 'borderLeftStyle';
const borderLeftWidth = 'borderLeftWidth';
const borderRightColor = 'borderRightColor';
const borderRightStyle = 'borderRightStyle';
const borderRightWidth = 'borderRightWidth';
const right = 'right';
const marginLeft = 'marginLeft';
const marginRight = 'marginRight';
const paddingLeft = 'paddingLeft';
const paddingRight = 'paddingRight';
const left = 'left';

// Map of LTR property names to their BiDi equivalent.
const PROPERTIES_FLIP = {
  borderTopLeftRadius: borderTopRightRadius,
  borderTopRightRadius: borderTopLeftRadius,
  borderBottomLeftRadius: borderBottomRightRadius,
  borderBottomRightRadius: borderBottomLeftRadius,
  borderLeftColor: borderRightColor,
  borderLeftStyle: borderRightStyle,
  borderLeftWidth: borderRightWidth,
  borderRightColor: borderLeftColor,
  borderRightStyle: borderLeftStyle,
  borderRightWidth: borderLeftWidth,
  left: right,
  marginLeft: marginRight,
  marginRight: marginLeft,
  paddingLeft: paddingRight,
  paddingRight: paddingLeft,
  right: left
};

// Map of I18N property names to their LTR equivalent.
const PROPERTIES_I18N = {
  borderTopStartRadius: borderTopLeftRadius,
  borderTopEndRadius: borderTopRightRadius,
  borderBottomStartRadius: borderBottomLeftRadius,
  borderBottomEndRadius: borderBottomRightRadius,
  borderStartColor: borderLeftColor,
  borderStartStyle: borderLeftStyle,
  borderStartWidth: borderLeftWidth,
  borderEndColor: borderRightColor,
  borderEndStyle: borderRightStyle,
  borderEndWidth: borderRightWidth,
  end: right,
  marginStart: marginLeft,
  marginEnd: marginRight,
  paddingStart: paddingLeft,
  paddingEnd: paddingRight,
  start: left
};

const PROPERTIES_VALUE = {
  clear: true,
  float: true,
  textAlign: true
};

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
  if (color != null && offsetX != null && offsetY != null && blurRadius != null) {
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
const preprocess = <T: {| [key: string]: any |}>(originalStyle: T, isRTL?: boolean): T => {
  const style = originalStyle || emptyObject;
  const frozenProps = {};
  const nextStyle = {};

  for (const originalProp in style) {
    const originalValue = style[originalProp];
    let prop = originalProp;
    let value = originalValue;

    if (!Object.prototype.hasOwnProperty.call(style, originalProp) || originalValue == null) {
      continue;
    }

    // BiDi flip properties
    if (PROPERTIES_I18N.hasOwnProperty(originalProp)) {
      // convert start/end
      const convertedProp = PROPERTIES_I18N[originalProp];
      prop = isRTL ? PROPERTIES_FLIP[convertedProp] : convertedProp;
    }

    // BiDi flip values
    if (PROPERTIES_VALUE.hasOwnProperty(originalProp)) {
      if (originalValue === 'start') {
        value = isRTL ? 'right' : 'left';
      } else if (originalValue === 'end') {
        value = isRTL ? 'left' : 'right';
      }
    }

    // BiDi flip transitionProperty value
    if (prop === 'transitionProperty') {
      // BiDi flip properties
      if (PROPERTIES_I18N.hasOwnProperty(value)) {
        // convert start/end
        const convertedValue = PROPERTIES_I18N[originalValue];
        value = isRTL ? PROPERTIES_FLIP[convertedValue] : convertedValue;
      }
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
    if (prop === 'textShadowColor' || prop === 'textShadowOffset' || prop === 'textShadowRadius') {
      const textShadowValue = createTextShadowValue(style);
      if (textShadowValue != null && nextStyle.textShadow == null) {
        const { textShadow } = style;
        prop = 'textShadow';
        value = textShadow ? `${textShadow}, ${textShadowValue}` : textShadowValue;
      } else {
        continue;
      }
    }

    // Create finalized style
    if (!frozenProps[prop]) {
      nextStyle[prop] = value;
    }

    if (PROPERTIES_I18N[originalProp]) {
      frozenProps[prop] = true;
    }
  }

  // $FlowIgnore
  return nextStyle;
};

export default preprocess;
