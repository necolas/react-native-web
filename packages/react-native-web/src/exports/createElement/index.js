/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import AccessibilityUtil from '../../modules/AccessibilityUtil';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import createDOMProps from '../../modules/createDOMProps';
import { injectEventPluginsByName } from 'react-dom/unstable-native-dependencies';
import normalizeNativeEvent from '../../modules/normalizeNativeEvent';
import React from 'react';
import ResponderEventPlugin from '../../modules/ResponderEventPlugin';

if (canUseDOM) {
  try {
    injectEventPluginsByName({
      ResponderEventPlugin
    });
  } catch (error) {
    // Ignore errors caused by attempting to re-inject the plugin when app
    // scripts are being re-evaluated (e.g., development hot reloading) while
    // the ReactDOM instance is preserved.
  }
}

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

/**
 * Ensure event handlers receive an event of the expected shape. The 'button'
 * role – for accessibility reasons and functional equivalence to the native
 * button element – must also support synthetic keyboard activation of onclick,
 * and remove event handlers when disabled.
 */
const eventHandlerNames = {
  onBlur: true,
  onClick: true,
  onClickCapture: true,
  onContextMenu: true,
  onFocus: true,
  onResponderRelease: true,
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
  const { onClick, onResponderRelease, role } = domProps;

  const isButtonLikeRole = AccessibilityUtil.buttonLikeRoles[role];
  const isDisabled = AccessibilityUtil.isDisabled(domProps);
  const isLinkRole = role === 'link';

  Object.keys(domProps).forEach(propName => {
    const prop = domProps[propName];
    const isEventHandler = typeof prop === 'function' && eventHandlerNames[propName];
    if (isEventHandler) {
      if (isButtonLikeRole && isDisabled) {
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

  // Cancel click events if the responder system is being used on a link
  // element. Click events are not an expected part of the React Native API,
  // and browsers dispatch click events that cannot otherwise be cancelled from
  // preceding mouse events in the responder system.
  if (isLinkRole && onResponderRelease) {
    domProps.onClick = function(e) {
      if (!e.isDefaultPrevented() && !isModifiedEvent(e.nativeEvent) && !domProps.target) {
        e.preventDefault();
      }
    };
  }

  // Button-like roles should trigger 'onClick' if SPACE or ENTER keys are pressed.
  if (isButtonLikeRole && !isDisabled) {
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
  let accessibilityComponent;
  if (component && component.constructor === String) {
    accessibilityComponent = AccessibilityUtil.propsToAccessibilityComponent(props);
  }
  const Component = accessibilityComponent || component;
  const domProps = createDOMProps(Component, props);
  adjustProps(domProps);
  return React.createElement(Component, domProps, ...children);
};

export default createElement;
