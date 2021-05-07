"use strict";

exports.__esModule = true;
exports.cancelIdleCallback = exports.default = void 0;

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var _requestIdleCallback = function _requestIdleCallback(cb, options) {
  return setTimeout(function () {
    var start = Date.now();
    cb({
      didTimeout: false,
      timeRemaining: function timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

var _cancelIdleCallback = function _cancelIdleCallback(id) {
  clearTimeout(id);
};

var isSupported = _ExecutionEnvironment.canUseDOM && typeof window.requestIdleCallback !== 'undefined';
var requestIdleCallback = isSupported ? window.requestIdleCallback : _requestIdleCallback;
var cancelIdleCallback = isSupported ? window.cancelIdleCallback : _cancelIdleCallback;
exports.cancelIdleCallback = cancelIdleCallback;
var _default = requestIdleCallback;
exports.default = _default;