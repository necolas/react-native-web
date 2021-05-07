"use strict";

exports.__esModule = true;
exports.default = void 0;

var _reactDom = require("react-dom");

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var findNodeHandle = function findNodeHandle(component) {
  var node;

  try {
    node = (0, _reactDom.findDOMNode)(component);
  } catch (e) {}

  return node;
};

var _default = findNodeHandle;
exports.default = _default;
module.exports = exports.default;