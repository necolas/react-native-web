/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import { Component } from 'react';
import findNodeHandle from '../findNodeHandle';
import UIManager from '../../apis/UIManager';

type MeasureInWindowOnSuccessCallback = (
  x: number,
  y: number,
  width: number,
  height: number,
) => void

type MeasureLayoutOnSuccessCallback = (
  left: number,
  top: number,
  width: number,
  height: number
) => void

type MeasureOnSuccessCallback = (
  x: number,
  y: number,
  width: number,
  height: number,
  pageX: number,
  pageY: number
) => void

const NativeMethodsMixin = {
  /**
   * Removes focus from an input or view. This is the opposite of `focus()`.
   */
  blur() {
    UIManager.blur(findNodeHandle(this));
  },

  /**
   * Requests focus for the given input or view.
   * The exact behavior triggered will depend the type of view.
   */
  focus() {
    UIManager.focus(findNodeHandle(this));
  },

  /**
   * Determines the position and dimensions of the view
   */
  measure(callback: MeasureOnSuccessCallback) {
    UIManager.measure(
      findNodeHandle(this),
      mountSafeCallback(this, callback)
    );
  },

  /**
   * Determines the location of the given view in the window and returns the
   * values via an async callback. If the React root view is embedded in
   * another native view, this will give you the absolute coordinates. If
   * successful, the callback will be called be called with the following
   * arguments:
   *
   *  - x
   *  - y
   *  - width
   *  - height
   *
   * Note that these measurements are not available until after the rendering
   * has been completed in native.
   */
  measureInWindow(callback: MeasureInWindowOnSuccessCallback) {
    UIManager.measureInWindow(
      findNodeHandle(this),
      mountSafeCallback(this, callback)
    );
  },

  /**
   * Measures the view relative to another view (usually an ancestor)
   */
  measureLayout(
    relativeToNativeNode: Object,
    onSuccess: MeasureLayoutOnSuccessCallback,
    onFail: () => void /* currently unused */
  ) {
    UIManager.measureLayout(
      findNodeHandle(this),
      relativeToNativeNode,
      mountSafeCallback(this, onFail),
      mountSafeCallback(this, onSuccess)
    );
  },

  /**
   * This function sends props straight to the underlying DOM node.
   */
  setNativeProps(nativeProps: Object) {
    UIManager.updateView(
      findNodeHandle(this),
      nativeProps,
      this
    );
  }
};

/**
 * In the future, we should cleanup callbacks by cancelling them instead of
 * using this.
 */
const mountSafeCallback = (context: Component, callback: ?Function) => (...args) => {
  if (!callback) {
    return undefined;
  }
  return callback.apply(context, args);
};

module.exports = NativeMethodsMixin;
