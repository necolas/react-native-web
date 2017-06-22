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

/**
 * Map of property names to their BiDi equivalent.
 */
const PROPERTIES_TO_SWAP = {
  borderTopLeftRadius: 'borderTopRightRadius',
  borderTopRightRadius: 'borderTopLeftRadius',
  borderBottomLeftRadius: 'borderBottomRightRadius',
  borderBottomRightRadius: 'borderBottomLeftRadius',
  borderLeftColor: 'borderRightColor',
  borderLeftStyle: 'borderRightStyle',
  borderLeftWidth: 'borderRightWidth',
  borderRightColor: 'borderLeftColor',
  borderRightWidth: 'borderLeftWidth',
  borderRightStyle: 'borderLeftStyle',
  left: 'right',
  marginLeft: 'marginRight',
  marginRight: 'marginLeft',
  paddingLeft: 'paddingRight',
  paddingRight: 'paddingLeft',
  right: 'left'
};

const PROPERTIES_SWAP_LEFT_RIGHT = {
  clear: true,
  float: true,
  textAlign: true
};

/**
 * Invert the sign of a numeric-like value
 */
const additiveInverse = (value: String | Number) => multiplyStyleLengthValue(value, -1);

/**
 * BiDi flip the given property.
 */
const flipProperty = (prop: String): String => {
  return PROPERTIES_TO_SWAP.hasOwnProperty(prop) ? PROPERTIES_TO_SWAP[prop] : prop;
};

const swapLeftRight = (value: String): String => {
  return value === 'left' ? 'right' : value === 'right' ? 'left' : value;
};

const i18nStyle = originalStyle => {
  if (!I18nManager.isRTL) {
    return originalStyle;
  }

  const style = originalStyle || emptyObject;
  const nextStyle = {};

  for (const prop in style) {
    if (!Object.prototype.hasOwnProperty.call(style, prop)) {
      continue;
    }

    const value = style[prop];

    if (PROPERTIES_TO_SWAP[prop]) {
      const newProp = flipProperty(prop);
      nextStyle[newProp] = value;
    } else if (PROPERTIES_SWAP_LEFT_RIGHT[prop]) {
      nextStyle[prop] = swapLeftRight(value);
    } else if (prop === 'textShadowOffset') {
      nextStyle[prop] = value;
      nextStyle[prop].width = additiveInverse(value.width);
    } else {
      nextStyle[prop] = style[prop];
    }
  }

  return nextStyle;
};

export default i18nStyle;
