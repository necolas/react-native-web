/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { Root } from '../render';

export default function unmountComponentAtNode(rootTag: Root): boolean {
  rootTag.unmount();
  return true;
}
