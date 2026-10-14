/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import isUnitlessNumber from '../../../modules/isUnitlessNumber';
import normalizeColor from './normalizeColor';

const colorProps: { [string]: boolean } = {
  backgroundColor: true,
  borderBottomColor: true,
  borderColor: true,
  borderLeftColor: true,
  borderRightColor: true,
  borderTopColor: true,
  color: true,
  shadowColor: true,
  textDecorationColor: true,
  textEmphasisColor: true,
  textShadowColor: true
};

export default function normalizeValueWithProperty(
  value: any,
  property?: ?string
): any {
  if (
    (property == null || !isUnitlessNumber(property)) &&
    typeof value === 'number'
  ) {
    return `${value}px`;
  } else if (property != null && colorProps[property]) {
    return normalizeColor(value);
  }
  return value;
}
