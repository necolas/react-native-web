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

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import AnimatedInterpolation from './AnimatedInterpolation';
import AnimatedNode from './AnimatedNode';
import AnimatedWithChildren from './AnimatedWithChildren';

var AnimatedModulo = /*#__PURE__*/function (_AnimatedWithChildren) {
  _inheritsLoose(AnimatedModulo, _AnimatedWithChildren);

  function AnimatedModulo(a, modulus) {
    var _this;

    _this = _AnimatedWithChildren.call(this) || this;
    _this._a = a;
    _this._modulus = modulus;
    return _this;
  }

  var _proto = AnimatedModulo.prototype;

  _proto.__makeNative = function __makeNative() {
    this._a.__makeNative();

    _AnimatedWithChildren.prototype.__makeNative.call(this);
  };

  _proto.__getValue = function __getValue() {
    return (this._a.__getValue() % this._modulus + this._modulus) % this._modulus;
  };

  _proto.interpolate = function interpolate(config) {
    return new AnimatedInterpolation(this, config);
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
      type: 'modulus',
      input: this._a.__getNativeTag(),
      modulus: this._modulus
    };
  };

  return AnimatedModulo;
}(AnimatedWithChildren);

export default AnimatedModulo;