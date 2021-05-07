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

var _AnimatedValue = _interopRequireDefault(require("./AnimatedValue"));

var _AnimatedWithChildren2 = _interopRequireDefault(require("./AnimatedWithChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AnimatedDivision = /*#__PURE__*/function (_AnimatedWithChildren) {
  _inheritsLoose(AnimatedDivision, _AnimatedWithChildren);

  function AnimatedDivision(a, b) {
    var _this;

    _this = _AnimatedWithChildren.call(this) || this;
    _this._warnedAboutDivideByZero = false;

    if (b === 0 || b instanceof _AnimatedNode.default && b.__getValue() === 0) {
      console.error('Detected potential division by zero in AnimatedDivision');
    }

    _this._a = typeof a === 'number' ? new _AnimatedValue.default(a) : a;
    _this._b = typeof b === 'number' ? new _AnimatedValue.default(b) : b;
    return _this;
  }

  var _proto = AnimatedDivision.prototype;

  _proto.__makeNative = function __makeNative() {
    this._a.__makeNative();

    this._b.__makeNative();

    _AnimatedWithChildren.prototype.__makeNative.call(this);
  };

  _proto.__getValue = function __getValue() {
    var a = this._a.__getValue();

    var b = this._b.__getValue();

    if (b === 0) {
      // Prevent spamming the console/LogBox
      if (!this._warnedAboutDivideByZero) {
        console.error('Detected division by zero in AnimatedDivision');
        this._warnedAboutDivideByZero = true;
      } // Passing infinity/NaN to Fabric will cause a native crash


      return 0;
    }

    this._warnedAboutDivideByZero = false;
    return a / b;
  };

  _proto.interpolate = function interpolate(config) {
    return new _AnimatedInterpolation.default(this, config);
  };

  _proto.__attach = function __attach() {
    this._a.__addChild(this);

    this._b.__addChild(this);
  };

  _proto.__detach = function __detach() {
    this._a.__removeChild(this);

    this._b.__removeChild(this);

    _AnimatedWithChildren.prototype.__detach.call(this);
  };

  _proto.__getNativeConfig = function __getNativeConfig() {
    return {
      type: 'division',
      input: [this._a.__getNativeTag(), this._b.__getNativeTag()]
    };
  };

  return AnimatedDivision;
}(_AnimatedWithChildren2.default);

var _default = AnimatedDivision;
exports.default = _default;
module.exports = exports.default;