"use strict";

exports.__esModule = true;
exports.default = useEvent;

var _createEventHandle = _interopRequireDefault(require("../createEventHandle"));

var _useLayoutEffect = _interopRequireDefault(require("../useLayoutEffect"));

var _useStable = _interopRequireDefault(require("../useStable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * This can be used with any event type include custom events.
 *
 * const click = useEvent('click', options);
 * useEffect(() => {
 *   click.setListener(target, onClick);
 *   return () => click.clear();
 * }).
 */
function useEvent(event, options) {
  var targetListeners = (0, _useStable.default)(function () {
    return new Map();
  });
  var addListener = (0, _useStable.default)(function () {
    var addEventListener = (0, _createEventHandle.default)(event, options);
    return function (target, callback) {
      var removeTargetListener = targetListeners.get(target);

      if (removeTargetListener != null) {
        removeTargetListener();
      }

      if (callback == null) {
        targetListeners.delete(target);
      }

      var removeEventListener = addEventListener(target, callback);
      targetListeners.set(target, removeEventListener);
      return removeEventListener;
    };
  });
  (0, _useLayoutEffect.default)(function () {
    return function () {
      targetListeners.forEach(function (removeListener) {
        removeListener();
      });
      targetListeners.clear();
    };
  }, []);
  return addListener;
}

module.exports = exports.default;