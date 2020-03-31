/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import AccessibilityUtil from '../../modules/AccessibilityUtil';
import createDOMProps from '../../modules/createDOMProps';
import React from 'react';

const createElement = (component, props, ...children) => {
  // Use equivalent platform elements where possible.
  let accessibilityComponent;
  if (component && component.constructor === String) {
    accessibilityComponent = AccessibilityUtil.propsToAccessibilityComponent(props);
  }
  const Component = accessibilityComponent || component;
  const domProps = createDOMProps(Component, props);
  const { onClick, role } = domProps;
  const isButtonLikeRole = AccessibilityUtil.buttonLikeRoles[role];
  const isDisabled = AccessibilityUtil.isDisabled(domProps);

  // Button-like roles should not trigger 'onClick' if they are disabled.
  if (isButtonLikeRole && isDisabled && domProps.onClick != null) {
    domProps.onClick = undefined;
  }

  // Button-like roles should trigger 'onClick' if SPACE or ENTER keys are pressed.
  if (isButtonLikeRole && !isDisabled) {
    domProps.onKeyDown = function(e) {
      if (!e.isDefaultPrevented() && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        if (onClick != null) {
          onClick(e);
        }
      }
    };
  }

  return React.createElement(Component, domProps, ...children);
};

export default createElement;
