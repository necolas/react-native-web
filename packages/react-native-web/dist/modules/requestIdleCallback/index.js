/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

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

var isSupported = canUseDOM && typeof window.requestIdleCallback !== 'undefined';
var requestIdleCallback = isSupported ? window.requestIdleCallback : _requestIdleCallback;
var cancelIdleCallback = isSupported ? window.cancelIdleCallback : _cancelIdleCallback;
export default requestIdleCallback;
export { cancelIdleCallback };