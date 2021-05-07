"use strict";

exports.__esModule = true;
exports.default = normalizeValueWithProperty;

var _unitlessNumbers = _interopRequireDefault(require("../../modules/unitlessNumbers"));

var _normalizeColor = _interopRequireDefault(require("../../modules/normalizeColor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var colorProps = {
  backgroundColor: true,
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderBottomColor: true,
  borderLeftColor: true,
  color: true,
  shadowColor: true,
  textDecorationColor: true,
  textShadowColor: true
};

function normalizeValueWithProperty(value, property) {
  var returnValue = value;

  if ((property == null || !_unitlessNumbers.default[property]) && typeof value === 'number') {
    returnValue = value + "px";
  } else if (property != null && colorProps[property]) {
    returnValue = (0, _normalizeColor.default)(value);
  }

  return returnValue;
}

module.exports = exports.default;