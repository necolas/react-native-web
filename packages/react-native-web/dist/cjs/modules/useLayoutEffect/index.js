"use strict";

exports.__esModule = true;
exports.default = void 0;

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _react = require("react");

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * useLayoutEffect throws an error on the server. On the few occasions where is
 * problematic, use this hook.
 *
 * 
 */
var useLayoutEffectImpl = _ExecutionEnvironment.canUseDOM ? _react.useLayoutEffect : _react.useEffect;
var _default = useLayoutEffectImpl;
exports.default = _default;
module.exports = exports.default;