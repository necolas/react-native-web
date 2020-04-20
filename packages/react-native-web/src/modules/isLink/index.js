/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export default function isLink(node: HTMLElement) {
  return (
    (node.nodeName === 'A' && node.getAttribute('href') != null) ||
    node.getAttribute('role') === 'link'
  );
}
