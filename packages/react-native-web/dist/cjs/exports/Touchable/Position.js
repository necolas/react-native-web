"use strict";

exports.__esModule = true;
exports.default = void 0;

var _PooledClass = _interopRequireDefault(require("../../vendor/react-native/PooledClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var twoArgumentPooler = _PooledClass.default.twoArgumentPooler;

function Position(left, top) {
  this.left = left;
  this.top = top;
}

Position.prototype.destructor = function () {
  this.left = null;
  this.top = null;
};

_PooledClass.default.addPoolingTo(Position, twoArgumentPooler);

var _default = Position;
exports.default = _default;
module.exports = exports.default;