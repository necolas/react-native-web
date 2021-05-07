/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import unitlessNumbers from '../../modules/unitlessNumbers';
import normalizeColor from '../../modules/normalizeColor';
var colorProps = {
  backgroundColor: true,
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderBottomColor: true,
  borderLeftColor: true,
  color: true,
  shadowColor: true,
  textDecorationColor: true,
  textShadowColor: true
};
export default function normalizeValueWithProperty(value, property) {
  var returnValue = value;

  if ((property == null || !unitlessNumbers[property]) && typeof value === 'number') {
    returnValue = value + "px";
  } else if (property != null && colorProps[property]) {
    returnValue = normalizeColor(value);
  }

  return returnValue;
}