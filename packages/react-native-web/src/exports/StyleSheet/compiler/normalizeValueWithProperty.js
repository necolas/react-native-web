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

export type StyleValue =
  | number
  | string
  | ReadonlyArray<StyleValue>
  | Readonly<Record<string, ?StyleValue>>;

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

export default function normalizeValueWithProperty<T>(
  value: T,
  property?: ?string
): T | string | void {
  if (
    typeof value === 'number' &&
    (property == null || !isUnitlessNumber(property))
  ) {
    return `${value}px`;
  } else if (property != null && colorProps.has(property)) {
    // $FlowFixMe[incompatible-type] color props hold a number or a string
    return normalizeColor(value);
  }
  return value;
}
