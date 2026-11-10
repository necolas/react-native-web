/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use client';

import {
  createRoot as domCreateRoot,
  hydrateRoot as domHydrateRoot
} from 'react-dom/client';

import type { Node } from 'react';

import { createSheet } from '../StyleSheet/dom';

export type Root = {
  render: (children: Node) => void,
  unmount: () => void,
  ...
};

export function hydrate(element: Node, root: HTMLElement): Root {
  createSheet(root);
  return domHydrateRoot(root, element);
}

export default function render(element: Node, root: HTMLElement): Root {
  createSheet(root);
  const reactRoot = domCreateRoot(root);
  reactRoot.render(element);
  return reactRoot;
}
