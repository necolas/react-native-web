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

const adjustProps = domProps => {
  const { onClick, role } = domProps;

  const isButtonLikeRole = AccessibilityUtil.buttonLikeRoles[role];
  const isDisabled = AccessibilityUtil.isDisabled(domProps);

  // Button-like roles should not trigger 'onClick' if they are disabled.
  if (isButtonLikeRole && isDisabled && domProps.onClick != null) {
    domProps.onClick = undefined;
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
