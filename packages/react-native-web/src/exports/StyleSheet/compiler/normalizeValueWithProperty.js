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

const colorProps = new Set([
  'backgroundColor',
  'borderBottomColor',
  'borderColor',
  'borderLeftColor',
  'borderRightColor',
  'borderTopColor',
  'color',
  'shadowColor',
  'textDecorationColor',
  'textEmphasisColor',
  'textShadowColor'
]);

export default function normalizeValueWithProperty(
  value: any,
  property?: ?string
): any {
  if (
    typeof value === 'number' &&
    (property == null || !isUnitlessNumber(property))
  ) {
    return `${value}px`;
  } else if (property != null && colorProps.has(property)) {
    return normalizeColor(value);
  }
  return value;
}
