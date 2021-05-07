"use strict";

exports.__esModule = true;
exports.default = void 0;

var _UIManager = _interopRequireDefault(require("../UIManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// NativeModules shim
var NativeModules = {
  UIManager: _UIManager.default
};
var _default = NativeModules;
exports.default = _default;
module.exports = exports.default;