/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule NativeMethodsMixin
 * @flow
 */

import createDOMProps from '../createDOMProps';
import findNodeHandle from '../findNodeHandle';
import i18nStyle from '../../apis/StyleSheet/i18nStyle';
import StyleRegistry from '../../apis/StyleSheet/registry';
import UIManager from '../../apis/UIManager';

const hyphenPattern = /-([a-z])/g;
const toCamelCase = str => str.replace(hyphenPattern, m => m[1].toUpperCase());

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
    // Copy of existing DOM state
    const node = findNodeHandle(this);
    const nodeStyle = node.style;
    const classList = Array.prototype.slice.call(node.classList);
    const style = {};
    // DOM style is a CSSStyleDeclaration
    // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
    for (let i = 0; i < node.style.length; i += 1) {
      const property = nodeStyle.item(i);
      if (property) {
        // DOM style uses hyphenated prop names and may include vendor prefixes
        // Transform back into React DOM style.
        style[toCamelCase(property)] = nodeStyle.getPropertyValue(property);
      }
    }
    const domStyleProps = { classList, style };

    // Next DOM state
    const domProps = createDOMProps(null, i18nStyle(nativeProps), style =>
      StyleRegistry.resolveStateful(style, domStyleProps, { i18n: false })
    );
    UIManager.updateView(node, domProps, this);
  }
};

export default NativeMethodsMixin;
