"use strict";

exports.__esModule = true;
exports.default = void 0;

var _buttonLikeRoles = _interopRequireDefault(require("./buttonLikeRoles"));

var _isDisabled = _interopRequireDefault(require("./isDisabled"));

var _propsToAccessibilityComponent = _interopRequireDefault(require("./propsToAccessibilityComponent"));

var _propsToAriaRole = _interopRequireDefault(require("./propsToAriaRole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var AccessibilityUtil = {
  buttonLikeRoles: _buttonLikeRoles.default,
  isDisabled: _isDisabled.default,
  propsToAccessibilityComponent: _propsToAccessibilityComponent.default,
  propsToAriaRole: _propsToAriaRole.default
};
var _default = AccessibilityUtil;
exports.default = _default;
module.exports = exports.default;