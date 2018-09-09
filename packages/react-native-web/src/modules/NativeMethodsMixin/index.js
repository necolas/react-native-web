/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import createDOMProps from '../createDOMProps';
import findNodeHandle from '../../exports/findNodeHandle';
import styleResolver from '../../exports/StyleSheet/styleResolver';
import UIManager from '../../exports/UIManager';

type MeasureOnSuccessCallback = (
  x: number,
  y: number,
  width: number,
  height: number,
  pageX: number,
  pageY: number
) => void;

type MeasureInWindowOnSuccessCallback = (
  x: number,
  y: number,
  width: number,
  height: number
) => void;

type MeasureLayoutOnSuccessCallback = (
  left: number,
  top: number,
  width: number,
  height: number
) => void;

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
    UIManager.measure(findNodeHandle(this), callback);
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
   * has been completed.
   */
  measureInWindow(callback: MeasureInWindowOnSuccessCallback) {
    UIManager.measureInWindow(findNodeHandle(this), callback);
  },

  /**
   * Measures the view relative to another view (usually an ancestor)
   */
  measureLayout(
    relativeToNativeNode: Object,
    onSuccess: MeasureLayoutOnSuccessCallback,
    onFail: () => void
  ) {
    UIManager.measureLayout(findNodeHandle(this), relativeToNativeNode, onFail, onSuccess);
  },

  /**
   * This function sends props straight to the underlying DOM node.
   * This works as if all styles were set as inline styles. Since a DOM node
   * may aleady be styled with class names and inline styles, we need to get
   * the initial styles from the DOM node and merge them with incoming props.
   */
  setNativeProps(nativeProps: Object) {
    if (!nativeProps) {
      return;
    }
    const node = findNodeHandle(this);
    if (node) {
      // Next state is determined by comparison to existing state (in the DOM).
      // Existing state has already gone through i18n transform
      const domProps = createDOMProps(null, nativeProps, style =>
        styleResolver.resolveWithNode(style, node)
      );
      UIManager.updateView(node, domProps, this);
    }
  }
};

export default NativeMethodsMixin;
