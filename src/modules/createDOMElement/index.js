import '../injectResponderEventPlugin';

import createDOMProps from '../createDOMProps';
import getAccessibilityRole from '../getAccessibilityRole';
import normalizeNativeEvent from '../normalizeNativeEvent';
import React from 'react';
import StyleRegistry from '../../apis/StyleSheet/registry';

const emptyObject = {};

const roleComponents = {
  article: 'article',
  banner: 'header',
  button: 'button',
  complementary: 'aside',
  contentinfo: 'footer',
  form: 'form',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section'
};

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

const getAccessibilityComponent = (props = emptyObject) => {
  const role = getAccessibilityRole(props);
  if (role === 'heading') {
    const level = props['aria-level'] || 1;
    return `h${level}`;
  }
  return roleComponents[role];
};

const createDOMElement = (component, rnProps) => {
  // use equivalent platform elements where possible
  const accessibilityComponent = getAccessibilityComponent(rnProps);
  const Component = accessibilityComponent || component;

  const domProps = createDOMProps(rnProps, style => StyleRegistry.resolve(style));

  // normalize DOM events to match React Native events
  // TODO: move this out of the render path
  for (const prop in domProps) {
    if (Object.prototype.hasOwnProperty.call(domProps, prop)) {
      const isEventHandler = typeof prop === 'function' && eventHandlerNames[prop];
      if (isEventHandler) {
        domProps[prop] = wrapEventHandler(prop);
      }
    }
  }

  return <Component {...domProps} />;
};

module.exports = createDOMElement;
