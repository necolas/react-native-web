/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

exports.__esModule = true;
exports.get = get;
exports.getEnforcing = getEnforcing;

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function get(name) {
  return null;
}

function getEnforcing(name) {
  var module = get(name);
  (0, _invariant.default)(module != null, "TurboModuleRegistry.getEnforcing(...): '" + name + "' could not be found. " + 'Verify that a module by this name is registered in the native binary.');
  return module;
}