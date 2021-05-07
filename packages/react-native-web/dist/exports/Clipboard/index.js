/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var clipboardAvailable;

var Clipboard = /*#__PURE__*/function () {
  function Clipboard() {}

  Clipboard.isAvailable = function isAvailable() {
    if (clipboardAvailable === undefined) {
      clipboardAvailable = typeof document.queryCommandSupported === 'function' && document.queryCommandSupported('copy');
    }

    return clipboardAvailable;
  };

  Clipboard.getString = function getString() {
    return Promise.resolve('');
  };

  Clipboard.setString = function setString(text) {
    var success = false;
    var body = document.body;

    if (body) {
      // add the text to a hidden node
      var node = document.createElement('span');
      node.textContent = text;
      node.style.opacity = '0';
      node.style.position = 'absolute';
      node.style.whiteSpace = 'pre-wrap';
      node.style.userSelect = 'auto';
      body.appendChild(node); // select the text

      var selection = window.getSelection();
      selection.removeAllRanges();
      var range = document.createRange();
      range.selectNodeContents(node);
      selection.addRange(range); // attempt to copy

      try {
        document.execCommand('copy');
        success = true;
      } catch (e) {} // remove selection and node


      selection.removeAllRanges();
      body.removeChild(node);
    }

    return success;
  };

  return Clipboard;
}();

export { Clipboard as default };