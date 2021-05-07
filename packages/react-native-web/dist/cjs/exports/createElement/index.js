"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AccessibilityUtil = _interopRequireDefault(require("../../modules/AccessibilityUtil"));

var _createDOMProps = _interopRequireDefault(require("../../modules/createDOMProps"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var createElement = function createElement(component, props) {
  // Use equivalent platform elements where possible.
  var accessibilityComponent;

  if (component && component.constructor === String) {
    accessibilityComponent = _AccessibilityUtil.default.propsToAccessibilityComponent(props);
  }

  var Component = accessibilityComponent || component;
  var domProps = (0, _createDOMProps.default)(Component, props);

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return /*#__PURE__*/_react.default.createElement.apply(_react.default, [Component, domProps].concat(children));
};

var _default = createElement;
exports.default = _default;
module.exports = exports.default;