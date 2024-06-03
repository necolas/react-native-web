/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

'use client';

import {
  hydrate as domLegacyHydrate,
  render as domLegacyRender
} from 'react-dom';
import {
  createRoot as domCreateRoot,
  hydrateRoot as domHydrateRoot
} from 'react-dom/client';

import unmountComponentAtNode from '../unmountComponentAtNode';
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
  domLegacyHydrate(element, root, callback);
  return {
    unmount: function () {
      return unmountComponentAtNode(root);
    }
  };
}

export default function renderLegacy(element, root, callback) {
  createSheet(root);
  domLegacyRender(element, root, callback);
  return {
    unmount: function () {
      return unmountComponentAtNode(root);
    }
  };
}
