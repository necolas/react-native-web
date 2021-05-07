"use strict";

exports.__esModule = true;
exports.default = createCSSStyleSheet;

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// $FlowFixMe: HTMLStyleElement is incorrectly typed - https://github.com/facebook/flow/issues/2696
function createCSSStyleSheet(id) {
  if (_ExecutionEnvironment.canUseDOM) {
    var element = document.getElementById(id);

    if (element != null) {
      // $FlowFixMe: HTMLElement is incorrectly typed
      return element.sheet;
    } else {
      var _element = document.createElement('style');

      _element.setAttribute('id', id);

      var head = document.head;

      if (head) {
        head.insertBefore(_element, head.firstChild);
      }

      return _element.sheet;
    }
  } else {
    return null;
  }
}

module.exports = exports.default;