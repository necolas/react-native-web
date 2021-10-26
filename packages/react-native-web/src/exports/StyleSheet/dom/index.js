/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { OrderedCSSStyleSheet } from './createOrderedCSSStyleSheet';

import createCSSStyleSheet from './createCSSStyleSheet';
import createOrderedCSSStyleSheet from './createOrderedCSSStyleSheet';

export function createSheet(id: string): OrderedCSSStyleSheet {
  return createOrderedCSSStyleSheet(createCSSStyleSheet(id));
}
