"use strict";

exports.__esModule = true;
exports.default = void 0;

var _dismissKeyboard = _interopRequireDefault(require("../../modules/dismissKeyboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var Keyboard = {
  addListener: function addListener() {
    return {
      remove: function remove() {}
    };
  },
  dismiss: function dismiss() {
    (0, _dismissKeyboard.default)();
  },
  removeAllListeners: function removeAllListeners() {},
  removeListener: function removeListener() {}
};
var _default = Keyboard;
exports.default = _default;
module.exports = exports.default;