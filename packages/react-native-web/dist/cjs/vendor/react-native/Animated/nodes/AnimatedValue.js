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

var _AnimatedInterpolation = _interopRequireDefault(require("./AnimatedInterpolation"));

var _AnimatedWithChildren2 = _interopRequireDefault(require("./AnimatedWithChildren"));

var _InteractionManager = _interopRequireDefault(require("../../../../exports/InteractionManager"));

var _NativeAnimatedHelper = _interopRequireDefault(require("../NativeAnimatedHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NativeAnimatedAPI = _NativeAnimatedHelper.default.API;
/**
 * Animated works by building a directed acyclic graph of dependencies
 * transparently when you render your Animated components.
 *
 *               new Animated.Value(0)
 *     .interpolate()        .interpolate()    new Animated.Value(1)
 *         opacity               translateY      scale
 *          style                         transform
 *         View#234                         style
 *                                         View#123
 *
 * A) Top Down phase
 * When an Animated.Value is updated, we recursively go down through this
 * graph in order to find leaf nodes: the views that we flag as needing
 * an update.
 *
 * B) Bottom Up phase
 * When a view is flagged as needing an update, we recursively go back up
 * in order to build the new value that it needs. The reason why we need
 * this two-phases process is to deal with composite props such as
 * transform which can receive values from multiple parents.
 */

function _flush(rootNode) {
  var animatedStyles = new Set();

  function findAnimatedStyles(node) {
    /* $FlowFixMe(>=0.68.0 site=react_native_fb) This comment suppresses an
     * error found when Flow v0.68 was deployed. To see the error delete this
     * comment and run Flow. */
    if (typeof node.update === 'function') {
      animatedStyles.add(node);
    } else {
      node.__getChildren().forEach(findAnimatedStyles);
    }
  }

  findAnimatedStyles(rootNode);
  /* $FlowFixMe */

  animatedStyles.forEach(function (animatedStyle) {
    return animatedStyle.update();
  });
}
/**
 * Standard value for driving animations.  One `Animated.Value` can drive
 * multiple properties in a synchronized fashion, but can only be driven by one
 * mechanism at a time.  Using a new mechanism (e.g. starting a new animation,
 * or calling `setValue`) will stop any previous ones.
 *
 * See https://reactnative.dev/docs/animatedvalue.html
 */


var AnimatedValue = /*#__PURE__*/function (_AnimatedWithChildren) {
  _inheritsLoose(AnimatedValue, _AnimatedWithChildren);

  function AnimatedValue(value) {
    var _this;

    _this = _AnimatedWithChildren.call(this) || this;

    if (typeof value !== 'number') {
      throw new Error('AnimatedValue: Attempting to set value to undefined');
    }

    _this._startingValue = _this._value = value;
    _this._offset = 0;
    _this._animation = null;
    return _this;
  }

  var _proto = AnimatedValue.prototype;

  _proto.__detach = function __detach() {
    var _this2 = this;

    if (this.__isNative) {
      NativeAnimatedAPI.getValue(this.__getNativeTag(), function (value) {
        _this2._value = value;
      });
    }

    this.stopAnimation();

    _AnimatedWithChildren.prototype.__detach.call(this);
  };

  _proto.__getValue = function __getValue() {
    return this._value + this._offset;
  }
  /**
   * Directly set the value.  This will stop any animations running on the value
   * and update all the bound properties.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#setvalue
   */
  ;

  _proto.setValue = function setValue(value) {
    if (this._animation) {
      this._animation.stop();

      this._animation = null;
    }

    this._updateValue(value, !this.__isNative
    /* don't perform a flush for natively driven values */
    );

    if (this.__isNative) {
      NativeAnimatedAPI.setAnimatedNodeValue(this.__getNativeTag(), value);
    }
  }
  /**
   * Sets an offset that is applied on top of whatever value is set, whether via
   * `setValue`, an animation, or `Animated.event`.  Useful for compensating
   * things like the start of a pan gesture.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#setoffset
   */
  ;

  _proto.setOffset = function setOffset(offset) {
    this._offset = offset;

    if (this.__isNative) {
      NativeAnimatedAPI.setAnimatedNodeOffset(this.__getNativeTag(), offset);
    }
  }
  /**
   * Merges the offset value into the base value and resets the offset to zero.
   * The final output of the value is unchanged.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#flattenoffset
   */
  ;

  _proto.flattenOffset = function flattenOffset() {
    this._value += this._offset;
    this._offset = 0;

    if (this.__isNative) {
      NativeAnimatedAPI.flattenAnimatedNodeOffset(this.__getNativeTag());
    }
  }
  /**
   * Sets the offset value to the base value, and resets the base value to zero.
   * The final output of the value is unchanged.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#extractoffset
   */
  ;

  _proto.extractOffset = function extractOffset() {
    this._offset += this._value;
    this._value = 0;

    if (this.__isNative) {
      NativeAnimatedAPI.extractAnimatedNodeOffset(this.__getNativeTag());
    }
  }
  /**
   * Stops any running animation or tracking. `callback` is invoked with the
   * final value after stopping the animation, which is useful for updating
   * state to match the animation position with layout.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#stopanimation
   */
  ;

  _proto.stopAnimation = function stopAnimation(callback) {
    this.stopTracking();
    this._animation && this._animation.stop();
    this._animation = null;
    callback && callback(this.__getValue());
  }
  /**
   * Stops any animation and resets the value to its original.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#resetanimation
   */
  ;

  _proto.resetAnimation = function resetAnimation(callback) {
    this.stopAnimation(callback);
    this._value = this._startingValue;
  };

  _proto._onAnimatedValueUpdateReceived = function _onAnimatedValueUpdateReceived(value) {
    this._updateValue(value, false
    /*flush*/
    );
  }
  /**
   * Interpolates the value before updating the property, e.g. mapping 0-1 to
   * 0-10.
   */
  ;

  _proto.interpolate = function interpolate(config) {
    return new _AnimatedInterpolation.default(this, config);
  }
  /**
   * Typically only used internally, but could be used by a custom Animation
   * class.
   *
   * See https://reactnative.dev/docs/animatedvalue.html#animate
   */
  ;

  _proto.animate = function animate(animation, callback) {
    var _this3 = this;

    var handle = null;

    if (animation.__isInteraction) {
      handle = _InteractionManager.default.createInteractionHandle();
    }

    var previousAnimation = this._animation;
    this._animation && this._animation.stop();
    this._animation = animation;
    animation.start(this._value, function (value) {
      // Natively driven animations will never call into that callback, therefore we can always
      // pass flush = true to allow the updated value to propagate to native with setNativeProps
      _this3._updateValue(value, true
      /* flush */
      );
    }, function (result) {
      _this3._animation = null;

      if (handle !== null) {
        _InteractionManager.default.clearInteractionHandle(handle);
      }

      callback && callback(result);
    }, previousAnimation, this);
  }
  /**
   * Typically only used internally.
   */
  ;

  _proto.stopTracking = function stopTracking() {
    this._tracking && this._tracking.__detach();
    this._tracking = null;
  }
  /**
   * Typically only used internally.
   */
  ;

  _proto.track = function track(tracking) {
    this.stopTracking();
    this._tracking = tracking;
  };

  _proto._updateValue = function _updateValue(value, flush) {
    if (value === undefined) {
      throw new Error('AnimatedValue: Attempting to set value to undefined');
    }

    this._value = value;

    if (flush) {
      _flush(this);
    }

    _AnimatedWithChildren.prototype.__callListeners.call(this, this.__getValue());
  };

  _proto.__getNativeConfig = function __getNativeConfig() {
    return {
      type: 'value',
      value: this._value,
      offset: this._offset
    };
  };

  return AnimatedValue;
}(_AnimatedWithChildren2.default);

var _default = AnimatedValue;
exports.default = _default;
module.exports = exports.default;