/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isUnitlessNumber from '../../../modules/isUnitlessNumber';
import type { Nullable } from '../../../types';
import normalizeColor from './normalizeColor';

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

export default function normalizeValue<T>(value: T): T | string {
  return typeof value === 'number' ? `${value}px` : value;
}

export function normalizeValueWithProperty<T>(
  value: T,
  property: string
): T | string | undefined {
  if (typeof value === 'number' && !isUnitlessNumber(property)) {
    return `${value}px`;
  }
  if (
    (typeof value === 'number' || typeof value === 'string') &&
    colorProps.has(property)
  ) {
    return normalizeColor(value);
  }
  return value;
}
