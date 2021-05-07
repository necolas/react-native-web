"use strict";

exports.__esModule = true;
exports.default = void 0;

var _isWebColor = _interopRequireDefault(require("../isWebColor"));

var _processColor = _interopRequireDefault(require("../../exports/processColor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var normalizeColor = function normalizeColor(color, opacity) {
  if (opacity === void 0) {
    opacity = 1;
  }

  if (color == null) return;

  if (typeof color === 'string' && (0, _isWebColor.default)(color)) {
    return color;
  }

  var colorInt = (0, _processColor.default)(color);

  if (colorInt != null) {
    var r = colorInt >> 16 & 255;
    var g = colorInt >> 8 & 255;
    var b = colorInt & 255;
    var a = (colorInt >> 24 & 255) / 255;
    var alpha = (a * opacity).toFixed(2);
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }
};

var _default = normalizeColor;
exports.default = _default;
module.exports = exports.default;