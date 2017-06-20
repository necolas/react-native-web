/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Clipboard
 * @flow
 */

export default class Clipboard {
  static isAvailable() {
    return (
      typeof document.queryCommandSupported === 'function' && document.queryCommandSupported('copy')
    );
  }

  static getString() {
    return Promise.resolve('');
  }

  static setString(text) {
    let success = false;
    const body = document.body;

    if (body) {
      // add the text to a hidden node
      const node = document.createElement('span');
      node.textContent = text;
      node.style.position = 'absolute';
      node.style.opacity = '0';
      body.appendChild(node);

      // select the text
      const selection = window.getSelection();
      selection.removeAllRanges();
      const range = document.createRange();
      range.selectNodeContents(node);
      selection.addRange(range);

      // attempt to copy
      try {
        document.execCommand('copy');
        success = true;
      } catch (e) {}

      // remove selection and node
      selection.removeAllRanges();
      body.removeChild(node);
    }

    return success;
  }
}
