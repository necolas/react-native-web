/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule AppState
 * @noflow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import findIndex from 'array-find-index';
import invariant from 'fbjs/lib/invariant';

// Android 4.4 browser
const isPrefixed =
  canUseDOM && !document.hasOwnProperty('hidden') && document.hasOwnProperty('webkitHidden');

const EVENT_TYPES = ['change'];
const VISIBILITY_CHANGE_EVENT = isPrefixed ? 'webkitvisibilitychange' : 'visibilitychange';
const VISIBILITY_STATE_PROPERTY = isPrefixed ? 'webkitVisibilityState' : 'visibilityState';

const AppStates = {
  BACKGROUND: 'background',
  ACTIVE: 'active'
};

const listeners = [];

export default class AppState {
  static isAvailable = canUseDOM && document[VISIBILITY_STATE_PROPERTY];

  static get currentState() {
    if (!AppState.isAvailable) {
      return AppStates.ACTIVE;
    }

    switch (document[VISIBILITY_STATE_PROPERTY]) {
      case 'hidden':
      case 'prerender':
      case 'unloaded':
        return AppStates.BACKGROUND;
      default:
        return AppStates.ACTIVE;
    }
  }

  static addEventListener(type: string, handler: Function) {
    if (AppState.isAvailable) {
      invariant(
        EVENT_TYPES.indexOf(type) !== -1,
        'Trying to subscribe to unknown event: "%s"',
        type
      );
      const callback = () => handler(AppState.currentState);
      listeners.push([handler, callback]);
      document.addEventListener(VISIBILITY_CHANGE_EVENT, callback, false);
    }
  }

  static removeEventListener(type: string, handler: Function) {
    if (AppState.isAvailable) {
      invariant(
        EVENT_TYPES.indexOf(type) !== -1,
        'Trying to remove listener for unknown event: "%s"',
        type
      );
      const listenerIndex = findIndex(listeners, pair => pair[0] === handler);
      invariant(
        listenerIndex !== -1,
        'Trying to remove AppState listener for unregistered handler'
      );
      const callback = listeners[listenerIndex][1];
      document.removeEventListener(VISIBILITY_CHANGE_EVENT, callback, false);
      listeners.splice(listenerIndex, 1);
    }
  }
}
