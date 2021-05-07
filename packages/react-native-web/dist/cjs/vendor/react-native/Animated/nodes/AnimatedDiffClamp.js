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

var _AnimatedNode = _interopRequireDefault(require("./AnimatedNode"));

var _AnimatedWithChildren2 = _interopRequireDefault(require("./AnimatedWithChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AnimatedDiffClamp = /*#__PURE__*/function (_AnimatedWithChildren) {
  _inheritsLoose(AnimatedDiffClamp, _AnimatedWithChildren);

  function AnimatedDiffClamp(a, min, max) {
    var _this;

    _this = _AnimatedWithChildren.call(this) || this;
    _this._a = a;
    _this._min = min;
    _this._max = max;
    _this._value = _this._lastValue = _this._a.__getValue();
    return _this;
  }

  var _proto = AnimatedDiffClamp.prototype;

  _proto.__makeNative = function __makeNative() {
    this._a.__makeNative();

    _AnimatedWithChildren.prototype.__makeNative.call(this);
  };

  _proto.interpolate = function interpolate(config) {
    return new _AnimatedInterpolation.default(this, config);
  };

  _proto.__getValue = function __getValue() {
    var value = this._a.__getValue();

    var diff = value - this._lastValue;
    this._lastValue = value;
    this._value = Math.min(Math.max(this._value + diff, this._min), this._max);
    return this._value;
  };

  _proto.__attach = function __attach() {
    this._a.__addChild(this);
  };

  _proto.__detach = function __detach() {
    this._a.__removeChild(this);

    _AnimatedWithChildren.prototype.__detach.call(this);
  };

  _proto.__getNativeConfig = function __getNativeConfig() {
    return {
      type: 'diffclamp',
      input: this._a.__getNativeTag(),
      min: this._min,
      max: this._max
    };
  };

  return AnimatedDiffClamp;
}(_AnimatedWithChildren2.default);

var _default = AnimatedDiffClamp;
exports.default = _default;
module.exports = exports.default;