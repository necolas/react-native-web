/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import findNodeHandle from '../findNodeHandle';
import StyleRegistry from '../../apis/StyleSheet/registry';
import UIManager from '../../apis/UIManager';

const emptyObject = {};
const REGEX_CLASSNAME_SPLIT = /\s+/;
const REGEX_STYLE_PROP = /rn-(.*):.*/;

const classNameFilter = (className) => { return className !== ''; };
const classNameToList = (className = '') => className.split(REGEX_CLASSNAME_SPLIT).filter(classNameFilter);
const getStyleProp = (className) => {
  const match = className.match(REGEX_STYLE_PROP);
  if (match) {
    return match[1];
  }
};

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
  measure(callback) {
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
  measureInWindow(callback) {
    UIManager.measureInWindow(findNodeHandle(this), callback);
  },

  /**
   * Measures the view relative to another view (usually an ancestor)
   */
  measureLayout(relativeToNativeNode, onSuccess, onFail) {
    UIManager.measureLayout(findNodeHandle(this), relativeToNativeNode, onFail, onSuccess);
  },

  /**
   * This function sends props straight to the underlying DOM node.
   * This works as if all styles were set as inline styles. Since a DOM node
   * may aleady be styled with class names and inline styles, we need to get
   * the initial styles from the DOM node and merge them with incoming props.
   */
  setNativeProps(nativeProps: Object) {
    // DOM state
    const node = findNodeHandle(this);
    const domClassList = [ ...node.classList ];

    // Resolved state
    const resolvedProps = StyleRegistry.resolve(nativeProps.style) || emptyObject;
    const resolvedClassList = classNameToList(resolvedProps.className);

    // Merged state
    const classList = [];
    const style = { ...resolvedProps.style };

    // The node has class names that we need to override.
    // Only pass on a class name when the style is unchanged.
    domClassList.forEach((c) => {
      const prop = getStyleProp(c);
      const className = resolvedProps.className;
      if (!className || className.indexOf(prop) === -1) {
        classList.push(c);
      }
    });

    // The node has styles that we need to override.
    // Remove any inline style that may collide with a new class name.
    resolvedClassList.forEach((c) => {
      const prop = getStyleProp(c);
      classList.push(c);
      style[prop] = null;
    });

    const className = `\n${classList.sort().join('\n')}`;

    const props = {
      ...nativeProps,
      className,
      style
    };

    UIManager.updateView(node, props, this);
  }
};

module.exports = NativeMethodsMixin;
