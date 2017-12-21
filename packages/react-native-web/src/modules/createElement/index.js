/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import '../injectResponderEventPlugin';

import AccessibilityUtil from '../AccessibilityUtil';
import createDOMProps from '../createDOMProps';
import normalizeNativeEvent from '../normalizeNativeEvent';
import React from 'react';

/**
 * Ensure event handlers receive an event of the expected shape. The 'button'
 * role – for accessibility reasons and functional equivalence to the native
 * button element – must also support synthetic keyboard activation of onclick,
 * and remove event handlers when disabled.
 */
const eventHandlerNames = {
  onClick: true,
  onClickCapture: true,
  onMoveShouldSetResponder: true,
  onMoveShouldSetResponderCapture: true,
  onResponderGrant: true,
  onResponderMove: true,
  onResponderReject: true,
  onResponderRelease: true,
  onResponderTerminate: true,
  onResponderTerminationRequest: true,
  onStartShouldSetResponder: true,
  onStartShouldSetResponderCapture: true,
  onTouchCancel: true,
  onTouchCancelCapture: true,
  onTouchEnd: true,
  onTouchEndCapture: true,
  onTouchMove: true,
  onTouchMoveCapture: true,
  onTouchStart: true,
  onTouchStartCapture: true
};
const adjustProps = domProps => {
  const isButtonRole = domProps.role === 'button';
  const isDisabled = AccessibilityUtil.isDisabled(domProps);

  Object.keys(domProps).forEach(propName => {
    const prop = domProps[propName];
    const isEventHandler = typeof prop === 'function' && eventHandlerNames[propName];
    if (isEventHandler) {
      if (isButtonRole && isDisabled) {
        domProps[propName] = undefined;
      } else {
        // TODO: move this out of the render path
        domProps[propName] = e => {
          e.nativeEvent = normalizeNativeEvent(e.nativeEvent);
          return prop(e);
        };
      }
    }
  });

  // Button role should trigger 'onClick' if SPACE or ENTER keys are pressed
  if (isButtonRole && !isDisabled) {
    const { onClick } = domProps;
    domProps.onKeyPress = function(e) {
      if (!e.isDefaultPrevented() && (e.which === 13 || e.which === 32)) {
        e.preventDefault();
        if (onClick) {
          onClick(e);
        }
      }
    };
  }
};

const createElement = (component, props, ...children) => {
  // use equivalent platform elements where possible
  const accessibilityComponent = AccessibilityUtil.propsToAccessibilityComponent(props);
  const Component = accessibilityComponent || component;
  const domProps = createDOMProps(Component, props);
  adjustProps(domProps);
  return React.createElement(Component, domProps, ...children);
};

export default createElement;
