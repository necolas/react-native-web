/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import { Component } from 'react'
import ReactDOM from 'react-dom'
import UIManager from '../../apis/UIManager'

type MeasureOnSuccessCallback = (
  x: number,
  y: number,
  width: number,
  height: number,
  pageX: number,
  pageY: number
) => void

type MeasureLayoutOnSuccessCallback = (
  left: number,
  top: number,
  width: number,
  height: number
) => void

const NativeMethodsMixin = {
  /**
   * Removes focus from an input or view. This is the opposite of `focus()`.
   */
  blur() {
    ReactDOM.findDOMNode(this).blur()
  },

  /**
   * Requests focus for the given input or view.
   * The exact behavior triggered will depend the type of view.
   */
  focus() {
    ReactDOM.findDOMNode(this).focus()
  },

  /**
   * Determines the position and dimensions of the view
   */
  measure(callback: MeasureOnSuccessCallback) {
    UIManager.measure(
      ReactDOM.findDOMNode(this),
      mountSafeCallback(this, callback)
    )
  },

  /**
   * Measures the view relative to another view (usually an ancestor)
   */
  measureLayout(
    relativeToNativeNode: number,
    onSuccess: MeasureLayoutOnSuccessCallback,
    onFail: () => void /* currently unused */
  ) {
    UIManager.measureLayout(
      ReactDOM.findDOMNode(this),
      relativeToNativeNode,
      mountSafeCallback(this, onFail),
      mountSafeCallback(this, onSuccess)
    )
  },

  /**
   * This function sends props straight to the underlying DOM node.
   */
  setNativeProps(nativeProps: Object) {
    UIManager.updateView(
      ReactDOM.findDOMNode(this),
      nativeProps
    )
  }
}

/**
 * In the future, we should cleanup callbacks by cancelling them instead of
 * using this.
 */
const mountSafeCallback = (context: Component, callback: ?Function) => () => {
  if (!callback || (context.isMounted && !context.isMounted())) {
    return
  }
  return callback.apply(context, arguments)
}

export default NativeMethodsMixin

export const nativeMethodsDecorator = (Component) => {
  Object.keys(NativeMethodsMixin).forEach((method) => {
    Component.prototype[method] = NativeMethodsMixin[method]
  })
  return Component
}
