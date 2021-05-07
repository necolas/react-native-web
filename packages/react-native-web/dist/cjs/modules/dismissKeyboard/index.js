"use strict";

exports.__esModule = true;
exports.default = void 0;

var _TextInputState = _interopRequireDefault(require("../TextInputState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var dismissKeyboard = function dismissKeyboard() {
  _TextInputState.default.blurTextInput(_TextInputState.default.currentlyFocusedField());
};

var _default = dismissKeyboard;
exports.default = _default;
module.exports = exports.default;