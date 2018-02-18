/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule AnimatedWithChildren
 * @flow
 * @format
 */
'use strict';

const AnimatedNode = require('./AnimatedNode');
const NativeAnimatedHelper = require('../NativeAnimatedHelper');

class AnimatedWithChildren extends AnimatedNode {
  _children: Array<AnimatedNode>;

  constructor() {
    super();
    this._children = [];
  }

  __makeNative() {
    if (!this.__isNative) {
      this.__isNative = true;
      for (const child of this._children) {
        child.__makeNative();
        NativeAnimatedHelper.API.connectAnimatedNodes(
          this.__getNativeTag(),
          child.__getNativeTag()
        );
      }
    }
  }

  __addChild(child: AnimatedNode): void {
    if (this._children.length === 0) {
      this.__attach();
    }
    this._children.push(child);
    if (this.__isNative) {
      // Only accept "native" animated nodes as children
      child.__makeNative();
      NativeAnimatedHelper.API.connectAnimatedNodes(this.__getNativeTag(), child.__getNativeTag());
    }
  }

  __removeChild(child: AnimatedNode): void {
    const index = this._children.indexOf(child);
    if (index === -1) {
      console.warn("Trying to remove a child that doesn't exist");
      return;
    }
    if (this.__isNative && child.__isNative) {
      NativeAnimatedHelper.API.disconnectAnimatedNodes(
        this.__getNativeTag(),
        child.__getNativeTag()
      );
    }
    this._children.splice(index, 1);
    if (this._children.length === 0) {
      this.__detach();
    }
  }

  __getChildren(): Array<AnimatedNode> {
    return this._children;
  }
}

module.exports = AnimatedWithChildren;
