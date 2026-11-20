/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isUnitlessNumber from '../../../modules/isUnitlessNumber';
import normalizeColor from './normalizeColor';
import type { Nullable } from '../../../types';

export type StyleValue =
  | number
  | string
  | ReadonlyArray<StyleValue>
  | { readonly [key: string]: Nullable<StyleValue> };

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
  property?: Nullable<string>
): T | string | void {
  if (
    typeof value === 'number' &&
    (property == null || !isUnitlessNumber(property))
  ) {
    return `${value}px`;
  } else if (property != null && colorProps.has(property)) {
    return normalizeColor(value as number | string);
  }
  return value;
}
