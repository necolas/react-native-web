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
import {
  mountAnchorNode,
  unmountAnchorNode,
  deactivateBackground,
  reactivateBackground
} from './alertDOMUtils';

export type AlertButton = {
  text: string,
  onPress: () => {},
  style?: 'default' | 'cancel' | 'destructive'
};

export type AlertOptions = {
  cancelable?: boolean,
  onDismiss?: () => {}
};

class Alert {
  static alert = function(
    title: string,
    message: string,
    buttons: Array<AlertButton>,
    options: AlertOptions = { cancelable: true }
  ): void {
    const node = mountAnchorNode();
    const alert = renderOverlay({ title, message, buttons, options }, node);

    ReactDom.render(alert, node);
    deactivateBackground(node);
    addURLParamter();
  };

  static Component = AlertDefaultComponent;
  static Button = AlertDefaultButton;
}

export default Alert;

// HELPERS
function renderOverlay(args, node) {
  const props = {
    ...args,
    onClose: () => onClose(node),
    options: {
      onDismiss: function() {},
      cancelable: true,
      ...args.options
    }
  };

  return (
    <AlertOverlay
      Alert={Alert.Component}
      Button={Alert.Button}
      animatedValue={new Animated.Value(0)}
      {...props}
    />
  );
}

function onClose(node) {
  unmountAnchorNode(node);
  reactivateBackground(node);
  removeURLParameter();
}

const URL_PARAM = 'rnwalert';
function addURLParamter() {
  if (getURLParameter()) return;

  const href = window.location.href;
  const link = href.indexOf('?') === -1 ? '&' : '?';
  window.history.pushState({}, '', `${href}${link}${URL_PARAM}`);
}

function removeURLParameter() {
  const param = getURLParameter();
  if (param) {
    window.history.back();
  }
}

const URL_REGEX = new RegExp(`[&?]${URL_PARAM}`);
function getURLParameter() {
  const href = window.location.href;
  const match = href.match(URL_REGEX);
  return match && match[0];
}
