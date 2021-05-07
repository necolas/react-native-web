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
exports.default = void 0;

var _NativeAnimatedHelper = _interopRequireDefault(require("../NativeAnimatedHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startNativeAnimationNextId = 1; // Important note: start() and stop() will only be called at most once.
// Once an animation has been stopped or finished its course, it will
// not be reused.

var Animation = /*#__PURE__*/function () {
  function Animation() {}

  var _proto = Animation.prototype;

  _proto.start = function start(fromValue, onUpdate, onEnd, previousAnimation, animatedValue) {};

  _proto.stop = function stop() {
    if (this.__nativeId) {
      _NativeAnimatedHelper.default.API.stopAnimation(this.__nativeId);
    }
  };

  _proto.__getNativeAnimationConfig = function __getNativeAnimationConfig() {
    // Subclasses that have corresponding animation implementation done in native
    // should override this method
    throw new Error('This animation type cannot be offloaded to native');
  } // Helper function for subclasses to make sure onEnd is only called once.
  ;

  _proto.__debouncedOnEnd = function __debouncedOnEnd(result) {
    var onEnd = this.__onEnd;
    this.__onEnd = null;
    onEnd && onEnd(result);
  };

  _proto.__startNativeAnimation = function __startNativeAnimation(animatedValue) {
    var startNativeAnimationWaitId = startNativeAnimationNextId + ":startAnimation";
    startNativeAnimationNextId += 1;

    _NativeAnimatedHelper.default.API.setWaitingForIdentifier(startNativeAnimationWaitId);

    try {
      animatedValue.__makeNative();

      this.__nativeId = _NativeAnimatedHelper.default.generateNewAnimationId();

      _NativeAnimatedHelper.default.API.startAnimatingNode(this.__nativeId, animatedValue.__getNativeTag(), this.__getNativeAnimationConfig(), this.__debouncedOnEnd.bind(this));
    } catch (e) {
      throw e;
    } finally {
      _NativeAnimatedHelper.default.API.unsetWaitingForIdentifier(startNativeAnimationWaitId);
    }
  };

  return Animation;
}();

var _default = Animation;
exports.default = _default;
module.exports = exports.default;