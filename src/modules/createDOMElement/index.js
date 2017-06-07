import '../injectResponderEventPlugin';

import AccessibilityUtil from '../AccessibilityUtil';
import createDOMProps from '../createDOMProps';
import modality from '../modality';
import normalizeNativeEvent from '../normalizeNativeEvent';
import React from 'react';

modality();

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

const wrapEventHandler = handler => e => {
  e.nativeEvent = normalizeNativeEvent(e.nativeEvent);
  return handler(e);
};

const createDOMElement = (component, props) => {
  // use equivalent platform elements where possible
  const accessibilityComponent = AccessibilityUtil.propsToAccessibilityComponent(props);
  const Component = accessibilityComponent || component;
  const domProps = createDOMProps(props);

  // normalize DOM events to match React Native events
  // TODO: move this out of the render path
  Object.keys(domProps).forEach(propName => {
    const prop = domProps[propName];
    const isEventHandler = typeof prop === 'function' && eventHandlerNames[propName];
    if (isEventHandler) {
      domProps[propName] = wrapEventHandler(prop);
    }
  });

  return <Component {...domProps} />;
};

module.exports = createDOMElement;
