/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import {
  hydrate as domLegacyHydrate,
  render as domLegacyRender
} from 'react-dom';
import {
  createRoot as domCreateRoot,
  hydrateRoot as domHydrateRoot
} from 'react-dom/client';

import { createSheet } from '../StyleSheet/dom';

export function hydrate(element, root) {
  createSheet(root);
  return domHydrateRoot(root, element);
}

export function render(element, root) {
  createSheet(root);
  const reactRoot = domCreateRoot(root);
  reactRoot.render(element);
  return reactRoot;
}

export function hydrateLegacy(element, root, callback) {
  createSheet(root);
  return domLegacyHydrate(element, root, callback);
}

export default function renderLegacy(element, root, callback) {
  createSheet(root);
  return domLegacyRender(element, root, callback);
}
