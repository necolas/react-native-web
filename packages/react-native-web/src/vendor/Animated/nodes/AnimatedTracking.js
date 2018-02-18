/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule AnimatedTracking
 * @flow
 * @format
 */
'use strict';

const AnimatedValue = require('./AnimatedValue');
const AnimatedNode = require('./AnimatedNode');

import type { EndCallback } from '../animations/Animation';

class AnimatedTracking extends AnimatedNode {
  _value: AnimatedValue;
  _parent: AnimatedNode;
  _callback: ?EndCallback;
  _animationConfig: Object;
  _animationClass: any;

  constructor(
    value: AnimatedValue,
    parent: AnimatedNode,
    animationClass: any,
    animationConfig: Object,
    callback?: ?EndCallback
  ) {
    super();
    this._value = value;
    this._parent = parent;
    this._animationClass = animationClass;
    this._animationConfig = animationConfig;
    this._callback = callback;
    this.__attach();
  }

  __getValue(): Object {
    return this._parent.__getValue();
  }

  __attach(): void {
    this._parent.__addChild(this);
  }

  __detach(): void {
    this._parent.__removeChild(this);
    super.__detach();
  }

  update(): void {
    this._value.animate(
      new this._animationClass({
        ...this._animationConfig,
        toValue: (this._animationConfig.toValue: any).__getValue()
      }),
      this._callback
    );
  }
}

module.exports = AnimatedTracking;
