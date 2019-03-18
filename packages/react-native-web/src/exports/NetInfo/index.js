/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
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
  const result = {
    effectiveType: 'unknown',
    type: 'unknown'
  };
  if (!connection) {
    return result;
  }
  for (const prop in connection) {
    const value = connection[prop];
    if (typeof value !== 'function' && value != null) {
      result[prop] = value;
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
const netInfoListeners = [];

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

    const wrappedHandler = () => handler(getConnectionInfoObject());
    netInfoListeners.push([handler, wrappedHandler]);
    connection.addEventListener(eventTypesMap[type], wrappedHandler);
    return {
      remove: () => NetInfo.removeEventListener(eventTypesMap[type], handler)
    };
  },

  removeEventListener(type: string, handler: Function): void {
    invariant(
      eventTypes.indexOf(type) !== -1,
      'Trying to unsubscribe from unknown event: "%s"',
      type
    );
    if (type === 'change') {
      console.warn('Listening to event `change` is deprecated. Use `connectionChange` instead.');
    }

    const listenerIndex = findIndex(netInfoListeners, pair => pair[0] === handler);
    invariant(listenerIndex !== -1, 'Trying to remove NetInfo listener for unregistered handler');
    const [, wrappedHandler] = netInfoListeners[listenerIndex];
    connection.removeEventListener(eventTypesMap[type], wrappedHandler);
    netInfoListeners.splice(listenerIndex, 1);
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
      resolve(getConnectionInfoObject());
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
