/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export default function isSelectionValid(): boolean {
  const selection = window.getSelection();
  if (selection == null) {
    return false;
  }
  const string = selection.toString();
  const anchorNode = selection.anchorNode;
  const focusNode = selection.focusNode;
  const isTextNode =
    anchorNode?.nodeType === window.Node.TEXT_NODE ||
    focusNode?.nodeType === window.Node.TEXT_NODE;
  return string.length >= 1 && string !== '\n' && isTextNode === true;
}
