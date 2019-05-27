/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import ReactDom from 'react-dom';
import Animated from '../Animated';
import AlertOverlay from './AlertOverlay';
import AlertDefaultComponent from './AlertDefaultComponent';
import AlertDefaultButton from './AlertDefaultButton';

export type AlertButton = {
  text: string,
  onPress: () => {},
  style?: 'default' | 'cancel' | 'destructive'
};

export type AlertOptions = {
  cancelable?: boolean,
  onDismiss?: boolean
};

class Alert {
  static alert = function(
    title: string,
    message: string,
    buttons: Array<AlertButton>,
    options: AlertOptions = { cancelable: true }
  ): void {
    const node = createAnchorNode();

    const alert = renderOverlay({
      onClose: () => unmountNode(node),
      title,
      message,
      buttons,
      options: {
        onDismiss: () => {},
        cancelable: true,
        ...options
      }
    });

    hideBackgroundFromScreenReaders(node);

    ReactDom.render(alert, node);

    /*
    if( options.cancelable ){
      dismissOnEscape()
    }
    */

    saveAndDeactivateBackgroundFocus(node);
  };
}

export default Alert;

// HELPERS
function createAnchorNode() {
  const div = document.createElement('div');
  div.id = 'rnw_alert' + Math.round(Math.random() * 1000);
  document.body.appendChild(div);
  return div;
}

function renderOverlay(props) {
  return (
    <AlertOverlay
      Alert={AlertDefaultComponent}
      Button={AlertDefaultButton}
      animatedValue={new Animated.Value(0)}
      {...props}
    />
  );
}

function unmountNode(node) {
  showBackgroundToScreeReaders();
  document.body.removeChild(node);
  restoreBackgroundFocus(node);
}

function hideBackgroundFromScreenReaders(node) {
  Array.prototype.forEach.call(document.body.children, target => {
    if (target === node) return;

    const ariaHidden = target.getAttribute('aria-hidden') || 'null';
    target.setAttribute('data-ah', ariaHidden);
    target.setAttribute('aria-hidden', 'true');
  });
}

function showBackgroundToScreeReaders() {
  Array.prototype.forEach.call(document.body.children, target => {
    const prevAH = target.getAttribute('data-ah');
    if (prevAH === 'null') {
      target.setAttribute('aria-hidden', prevAH);
    } else {
      target.removeAttribute('aria-hidden');
    }

    target.removeAttribute('data-ah');
  });
}

let prevActiveElement;
let focusTrap;
let bodySelect;
function saveAndDeactivateBackgroundFocus(node) {
  // Save active element for later
  prevActiveElement = document.activeElement;
  // Trap the tab key
  window.addEventListener('keydown', trapTabKey);
  // Focus the trap
  focusTrap = document.querySelector('[data-focustrap=alert]');
  focusTrap.focus();
  // turn body into a focusable element
  document.body.tabIndex = 0;
  // Deactivate text selection
  bodySelect = document.body.style.userSelect;
  document.body.style.userSelect = 'none';
}

function restoreBackgroundFocus(node) {
  // Open the trap
  window.removeEventListener('keydown', trapTabKey);
  // Focus previous active element
  prevActiveElement.focus();
  // Reactivate text selection
  document.body.style.userSelect = bodySelect;
  // Clean up
  focusTrap = false;
  prevActiveElement = false;
  bodySelect = false;
  document.body.removeAttribute('tabIndex');
}

function trapTabKey(e) {
  if (e.which !== 9) return;

  // If the body (first element) is focused and hit the key tab, go to trap
  if (document.activeElement === document.body && !e.shiftKey) {
    e.preventDefault();
    focusTrap.focus();
  }

  // If the trap is focused and hit the shift+tab, go to body
  if (document.activeElement === focusTrap && e.shiftKey) {
    e.preventDefault();
    document.body.focus();
  }
}
