/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import I18nManager from '../I18nManager';
import multiplyStyleLengthValue from '../../modules/multiplyStyleLengthValue';

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

// Invert the sign of a numeric-like value
const additiveInverse = (value: String | Number) => multiplyStyleLengthValue(value, -1);

// Convert I18N properties and values
const convertProperty = (prop: String): String => {
  return PROPERTIES_I18N.hasOwnProperty(prop) ? PROPERTIES_I18N[prop] : prop;
};
const convertValue = (value: String): String => {
  return value === 'start' ? 'left' : value === 'end' ? 'right' : value;
};

// BiDi flip properties and values
const flipProperty = (prop: String): String => {
  return PROPERTIES_FLIP.hasOwnProperty(prop) ? PROPERTIES_FLIP[prop] : prop;
};
const flipValue = (value: String): String => {
  return value === 'left' ? 'right' : value === 'right' ? 'left' : value;
};

const i18nStyle = originalStyle => {
  const isRTL = I18nManager.isRTL;

  const style = originalStyle || emptyObject;
  const nextStyle = {};
  const frozenProps = {};

  for (const originalProp in style) {
    if (!Object.prototype.hasOwnProperty.call(style, originalProp)) {
      continue;
    }

    let prop = originalProp;
    let value = style[originalProp];
    let shouldFreezeProp = false;

    // Process I18N properties and values
    if (PROPERTIES_I18N[prop]) {
      prop = convertProperty(prop);
      // I18N properties takes precendence over left/right
      shouldFreezeProp = true;
    } else if (PROPERTIES_VALUE[prop]) {
      value = convertValue(value);
    }

    if (isRTL) {
      if (PROPERTIES_FLIP[prop]) {
        const newProp = flipProperty(prop);
        if (!frozenProps[prop]) {
          nextStyle[newProp] = value;
        }
      } else if (PROPERTIES_VALUE[prop]) {
        nextStyle[prop] = flipValue(value);
      } else if (prop === 'textShadowOffset') {
        nextStyle[prop] = value;
        nextStyle[prop].width = additiveInverse(value.width);
      } else {
        nextStyle[prop] = style[prop];
      }
    } else {
      if (!frozenProps[prop]) {
        nextStyle[prop] = value;
      }
    }

    // Mark the style prop as frozen
    if (shouldFreezeProp) {
      frozenProps[prop] = true;
    }
  }

  return nextStyle;
};

export default i18nStyle;
