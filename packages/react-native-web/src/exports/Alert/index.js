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
    options: AlertOptions = {}
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
    ReactDom.render(alert, node);
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
  document.body.removeChild(node);
}
