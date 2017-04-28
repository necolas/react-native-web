/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * @providesModule NativeMethodsMixin
 */
'use strict';

import UIManager from 'UIManager';

import ReactDOM from 'react-dom';
import setNativeProps from './setNativeProps.web';

var NativeMethodsMixin = {
  /**
   * Determines the location on screen, width, and height of the given view and
   * returns the values via an async callback. If successful, the callback will
   * be called with the following arguments:
   *
   *  - x
   *  - y
   *  - width
   *  - height
   *  - pageX
   *  - pageY
   *
   * Note that these measurements are not available until after the rendering
   * has been completed in native. If you need the measurements as soon as
   * possible, consider using the [`onLayout`
   * prop](/react-native/docs/view.html#onlayout) instead.
   */
  measure: function(callback) {
    UIManager.measure(
      ReactDOM.findDOMNode(this),
      mountSafeCallback(this, callback)
    );
  },

  /**
   * Like [`measure()`](#measure), but measures the view relative an ancestor,
   * specified as `relativeToNativeNode`. This means that the returned x, y
   * are relative to the origin x, y of the ancestor view.
   *
   * As always, to obtain a native node handle for a component, you can use
   * `ReactDOM.findDOMNode(component)`.
   */
  measureLayout: function(relativeToNativeNode, onSuccess, onFail) {
    UIManager.measureLayout(
      ReactDOM.findDOMNode(this),
      relativeToNativeNode,
      mountSafeCallback(this, onFail),
      mountSafeCallback(this, onSuccess)
    );
  },

  /**
   * This function sends props straight to native. They will not participate in
   * future diff process - this means that if you do not include them in the
   * next render, they will remain active (see [Direct
   * Manipulation](/react-native/docs/direct-manipulation.html)).
   */
  setNativeProps: function(nativeProps) {
    setNativeProps(ReactDOM.findDOMNode(this), nativeProps, this._reactInternalInstance);
  },

  /**
   * Requests focus for the given input or view. The exact behavior triggered
   * will depend on the platform and type of view.
   */
  focus: function() {
    ReactDOM.findDOMNode(this).focus();
  },

  /**
   * Removes focus from an input or view. This is the opposite of `focus()`.
   */
  blur: function() {
    ReactDOM.findDOMNode(this).blur();
  }
};

/**
 * In the future, we should cleanup callbacks by cancelling them instead of
 * using this.
 */
var mountSafeCallback = function(context, callback) {
  return function() {
    if (!callback || context.isMounted && !context.isMounted()) {
      return;
    }
    return callback.apply(context, arguments);
  };
};

module.exports = { Mixin: NativeMethodsMixin };
