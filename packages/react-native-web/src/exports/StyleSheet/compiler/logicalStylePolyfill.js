/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import multiplyStyleLengthValue from '../../../modules/multiplyStyleLengthValue';

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
const additiveInverse = (value: string | number) => multiplyStyleLengthValue(value, -1);

const logicalStylePolyfill = <T: {| [key: string]: any |}>(
  originalStyle: T,
  isRTL?: boolean
): T => {
  const style = originalStyle || emptyObject;
  const frozenProps = {};
  const nextStyle = {};

  for (const originalProp in style) {
    const originalValue = style[originalProp];

    if (!Object.prototype.hasOwnProperty.call(style, originalProp) || originalValue == null) {
      continue;
    }
    let prop = originalProp;
    let value = originalValue;

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

    // Create finalized style
    if (isRTL && prop === 'textShadowOffset') {
      const invertedValue = additiveInverse((value: any).width);
      (value: any).width = invertedValue;
      nextStyle[prop] = value;
    } else if (!frozenProps[prop]) {
      nextStyle[prop] = value;
    }

    if (PROPERTIES_I18N[originalProp]) {
      frozenProps[prop] = true;
    }
  }

  // $FlowIgnore
  return nextStyle;
};

export default logicalStylePolyfill;
