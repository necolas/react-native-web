import '../injectResponderEventPlugin';

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
  heading: 'h1',
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

const createDOMElement = (component, rnProps) => {
  const {
    accessibilityLabel,
    accessibilityLiveRegion,
    accessibilityRole,
    accessible = true,
    style: rnStyle,
    testID,
    type,
    ...domProps
  } = rnProps || emptyObject;

  // use equivalent platform elements where possible
  const accessibilityComponent = accessibilityRole && roleComponents[accessibilityRole];
  const Component = accessibilityComponent || component;

  // convert React Native styles to DOM styles
  const { className, style } = StyleRegistry.resolve(rnStyle) || emptyObject;

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

  if (!accessible) {
    domProps['aria-hidden'] = true;
  }
  if (accessibilityLabel) {
    domProps['aria-label'] = accessibilityLabel;
  }
  if (accessibilityLiveRegion) {
    domProps['aria-live'] = accessibilityLiveRegion;
  }
  if (testID) {
    domProps['data-testid'] = testID;
  }
  if (accessibilityRole) {
    domProps.role = accessibilityRole;
    if (accessibilityRole === 'button') {
      domProps.type = 'button';
    } else if (accessibilityRole === 'link' && domProps.target === '_blank') {
      domProps.rel = `${domProps.rel || ''} noopener noreferrer`;
    }
  }
  if (className && className !== '') {
    domProps.className = domProps.className ? `${domProps.className} ${className}` : className;
  }
  if (style) {
    domProps.style = style;
  }
  if (type) {
    domProps.type = type;
  }

  return <Component {...domProps} />;
};

module.exports = createDOMElement;
