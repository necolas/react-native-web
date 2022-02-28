/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import { hydrate as domHydrate, render as domRender } from 'react-dom';
import { createSheet } from '../StyleSheet/dom';

export function hydrate(element, root, callback) {
  createSheet(root);
  return domHydrate(element, root, callback);
}

export default function render(element, root, callback) {
  createSheet(root);
  return domRender(element, root, callback);
}
