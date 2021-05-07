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

var _AnimatedValue = _interopRequireDefault(require("./AnimatedValue"));

var _AnimatedWithChildren2 = _interopRequireDefault(require("./AnimatedWithChildren"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _uniqueId = 1;
/**
 * 2D Value for driving 2D animations, such as pan gestures. Almost identical
 * API to normal `Animated.Value`, but multiplexed.
 *
 * See https://reactnative.dev/docs/animatedvaluexy.html
 */

var AnimatedValueXY = /*#__PURE__*/function (_AnimatedWithChildren) {
  _inheritsLoose(AnimatedValueXY, _AnimatedWithChildren);

  function AnimatedValueXY(valueIn) {
    var _this;

    _this = _AnimatedWithChildren.call(this) || this;
    var value = valueIn || {
      x: 0,
      y: 0
    }; // fixme: shouldn't need `: any`

    if (typeof value.x === 'number' && typeof value.y === 'number') {
      _this.x = new _AnimatedValue.default(value.x);
      _this.y = new _AnimatedValue.default(value.y);
    } else {
      (0, _invariant.default)(value.x instanceof _AnimatedValue.default && value.y instanceof _AnimatedValue.default, 'AnimatedValueXY must be initialized with an object of numbers or ' + 'AnimatedValues.');
      _this.x = value.x;
      _this.y = value.y;
    }

    _this._listeners = {};
    return _this;
  }
  /**
   * Directly set the value. This will stop any animations running on the value
   * and update all the bound properties.
   *
   * See https://reactnative.dev/docs/animatedvaluexy.html#setvalue
   */


  var _proto = AnimatedValueXY.prototype;

  _proto.setValue = function setValue(value) {
    this.x.setValue(value.x);
    this.y.setValue(value.y);
  }
  /**
   * Sets an offset that is applied on top of whatever value is set, whether
   * via `setValue`, an animation, or `Animated.event`. Useful for compensating
   * things like the start of a pan gesture.
   *
   * See https://reactnative.dev/docs/animatedvaluexy.html#setoffset
   */
  ;

  _proto.setOffset = function setOffset(offset) {
    this.x.setOffset(offset.x);
    this.y.setOffset(offset.y);
  }
  /**
   * Merges the offset value into the base value and resets the offset to zero.
   * The final output of the value is unchanged.
   *
   * See https://reactnative.dev/docs/animatedvaluexy.html#flattenoffset
   */
  ;

  _proto.flattenOffset = function flattenOffset() {
    this.x.flattenOffset();
    this.y.flattenOffset();
  }
  /**
   * Sets the offset value to the base value, and resets the base value to
   * zero. The final output of the value is unchanged.
   *
   * See https://reactnative.dev/docs/animatedvaluexy.html#extractoffset
   */
  ;

  _proto.extractOffset = function extractOffset() {
    this.x.extractOffset();
    this.y.extractOffset();
  };

  _proto.__getValue = function __getValue() {
    return {
      x: this.x.__getValue(),
      y: this.y.__getValue()
    };
  }
  /**
   * Stops any animation and resets the value to its original.
   *
   * See https://reactnative.dev/docs/animatedvaluexy.html#resetanimation
   */
  ;

  _proto.resetAnimation = function resetAnimation(callback) {
    this.x.resetAnimation();
    this.y.resetAnimation();
    callback && callback(this.__getValue());
  }
  /**
   * Stops any running animation or tracking. `callback` is invoked with the
   * final value after stopping the animation, which is useful for updating
   * state to match the animation position with layout.
   *
   * See https://reactnative.dev/docs/animatedvaluexy.html#stopanimation
   */
  ;

  _proto.stopAnimation = function stopAnimation(callback) {
    this.x.stopAnimation();
    this.y.stopAnimation();
    callback && callback(this.__getValue());
  }
  /**
   * Adds an asynchronous listener to the value so you can observe updates from
   * animations.  This is useful because there is no way to synchronously read
   * the value because it might be driven natively.
   *
   * Returns a string that serves as an identifier for the listener.
   *
   * See https://reactnative.dev/docs/animatedvaluexy.html#addlistener
   */
  ;

  _proto.addListener = function addListener(callback) {
    var _this2 = this;

    var id = String(_uniqueId++);

    var jointCallback = function jointCallback(_ref) {
      var number = _ref.value;
      callback(_this2.__getValue());
    };

    this._listeners[id] = {
      x: this.x.addListener(jointCallback),
      y: this.y.addListener(jointCallback)
    };
    return id;
  }
  /**
   * Unregister a listener. The `id` param shall match the identifier
   * previously returned by `addListener()`.
   *
   * See https://reactnative.dev/docs/animatedvaluexy.html#removelistener
   */
  ;

  _proto.removeListener = function removeListener(id) {
    this.x.removeListener(this._listeners[id].x);
    this.y.removeListener(this._listeners[id].y);
    delete this._listeners[id];
  }
  /**
   * Remove all registered listeners.
   *
   * See https://reactnative.dev/docs/animatedvaluexy.html#removealllisteners
   */
  ;

  _proto.removeAllListeners = function removeAllListeners() {
    this.x.removeAllListeners();
    this.y.removeAllListeners();
    this._listeners = {};
  }
  /**
   * Converts `{x, y}` into `{left, top}` for use in style.
   *
   * See https://reactnative.dev/docs/animatedvaluexy.html#getlayout
   */
  ;

  _proto.getLayout = function getLayout() {
    return {
      left: this.x,
      top: this.y
    };
  }
  /**
   * Converts `{x, y}` into a useable translation transform.
   *
   * See https://reactnative.dev/docs/animatedvaluexy.html#gettranslatetransform
   */
  ;

  _proto.getTranslateTransform = function getTranslateTransform() {
    return [{
      translateX: this.x
    }, {
      translateY: this.y
    }];
  };

  return AnimatedValueXY;
}(_AnimatedWithChildren2.default);

var _default = AnimatedValueXY;
exports.default = _default;
module.exports = exports.default;