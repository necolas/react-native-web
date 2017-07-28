/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule NetInfo
 * @flow
 */

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import findIndex from 'array-find-index';
import invariant from 'fbjs/lib/invariant';

const connection =
  ExecutionEnvironment.canUseDOM &&
  (window.navigator.connection ||
    window.navigator.mozConnection ||
    window.navigator.webkitConnection);

const eventTypes = ['change'];

const connectionListeners = [];

/**
 * Navigator online: https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
 * Network Connection API: https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
 */
const NetInfo = {
  addEventListener(type: string, handler: Function): { remove: () => void } {
    invariant(eventTypes.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
    if (!connection) {
      console.error(
        'Network Connection API is not supported. Not listening for connection type changes.'
      );
      return {
        remove: () => {}
      };
    }

    connection.addEventListener(type, handler);
    return {
      remove: () => NetInfo.removeEventListener(type, handler)
    };
  },

  removeEventListener(type: string, handler: Function): void {
    invariant(eventTypes.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
    if (!connection) {
      return;
    }
    connection.removeEventListener(type, handler);
  },

  fetch(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(connection.type);
      } catch (err) {
        resolve('unknown');
      }
    });
  },

  isConnected: {
    addEventListener(type: string, handler: Function): { remove: () => void } {
      invariant(
        eventTypes.indexOf(type) !== -1,
        'Trying to subscribe to unknown event: "%s"',
        type
      );
      const onlineCallback = () => handler(true);
      const offlineCallback = () => handler(false);
      connectionListeners.push([handler, onlineCallback, offlineCallback]);

      window.addEventListener('online', onlineCallback, false);
      window.addEventListener('offline', offlineCallback, false);

      return {
        remove: () => NetInfo.isConnected.removeEventListener(type, handler)
      };
    },

    removeEventListener(type: string, handler: Function): void {
      invariant(
        eventTypes.indexOf(type) !== -1,
        'Trying to subscribe to unknown event: "%s"',
        type
      );

      const listenerIndex = findIndex(connectionListeners, pair => pair[0] === handler);
      invariant(
        listenerIndex !== -1,
        'Trying to remove NetInfo connection listener for unregistered handler'
      );
      const [, onlineCallback, offlineCallback] = connectionListeners[listenerIndex];

      window.removeEventListener('online', onlineCallback, false);
      window.removeEventListener('offline', offlineCallback, false);

      connectionListeners.splice(listenerIndex, 1);
    },

    fetch(): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          resolve(window.navigator.onLine);
        } catch (err) {
          resolve(true);
        }
      });
    }
  }
};

export default NetInfo;
