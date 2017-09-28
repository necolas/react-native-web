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

// Prevent the underlying event handlers from leaking and include additional
// properties available in browsers
const getConnectionInfoObject = () => {
  const result = {};
  if (!connection) {
    return result;
  }
  for (const prop in connection) {
    if (typeof connection[prop] !== 'function') {
      result[prop] = connection[prop];
    }
  }
  return result;
};

// Map React Native events to browser equivalents
const eventTypesMap = {
  change: 'change',
  connectionChange: 'change'
};
const eventTypes = Object.keys(eventTypesMap);

const connectionListeners = [];

/**
 * Navigator online: https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
 * Network Connection API: https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
 */
const NetInfo = {
  addEventListener(type: string, handler: Function): { remove: () => void } {
    invariant(eventTypes.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
    if (type === 'change') {
      console.warn('Listening to event `change` is deprecated. Use `connectionChange` instead.');
    }
    if (!connection) {
      console.error(
        'Network Connection API is not supported. Not listening for connection type changes.'
      );
      return {
        remove: () => {}
      };
    }

    connection.addEventListener(eventTypesMap[type], handler);
    return {
      remove: () => NetInfo.removeEventListener(eventTypesMap[type], handler)
    };
  },

  removeEventListener(type: string, handler: Function): void {
    invariant(eventTypes.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
    if (type === 'change') {
      console.warn('Listening to event `change` is deprecated. Use `connectionChange` instead.');
    }
    if (!connection) {
      return;
    }
    connection.removeEventListener(eventTypesMap[type], handler);
  },

  fetch(): Promise<any> {
    console.warn('`fetch` is deprecated. Use `getConnectionInfo` instead.');
    return new Promise((resolve, reject) => {
      try {
        resolve(connection.type);
      } catch (err) {
        resolve('unknown');
      }
    });
  },

  getConnectionInfo(): Promise<Object> {
    return new Promise((resolve, reject) => {
      resolve({
        effectiveType: 'unknown',
        type: 'unknown',
        ...getConnectionInfoObject()
      });
    });
  },

  isConnected: {
    addEventListener(type: string, handler: Function): { remove: () => void } {
      invariant(
        eventTypes.indexOf(type) !== -1,
        'Trying to subscribe to unknown event: "%s"',
        type
      );
      if (type === 'change') {
        console.warn('Listening to event `change` is deprecated. Use `connectionChange` instead.');
      }

      const onlineCallback = () => handler(true);
      const offlineCallback = () => handler(false);
      connectionListeners.push([handler, onlineCallback, offlineCallback]);

      window.addEventListener('online', onlineCallback, false);
      window.addEventListener('offline', offlineCallback, false);

      return {
        remove: () => NetInfo.isConnected.removeEventListener(eventTypesMap[type], handler)
      };
    },

    removeEventListener(type: string, handler: Function): void {
      invariant(
        eventTypes.indexOf(type) !== -1,
        'Trying to subscribe to unknown event: "%s"',
        type
      );
      if (type === 'change') {
        console.warn('Listening to event `change` is deprecated. Use `connectionChange` instead.');
      }

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

    fetch(): Promise<boolean> {
      console.warn('`fetch` is deprecated. Use `getConnectionInfo` instead.');
      return NetInfo.isConnected.getConnectionInfo();
    },

    getConnectionInfo(): Promise<boolean> {
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
