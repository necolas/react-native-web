/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import invariant from 'fbjs/lib/invariant';

const connection = ExecutionEnvironment.canUseDOM && (
  window.navigator.connection ||
  window.navigator.mozConnection ||
  window.navigator.webkitConnection
);

const eventTypes = [ 'change' ];

/**
 * Navigator online: https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
 * Network Connection API: https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
 */
const NetInfo = {
  addEventListener(type: string, handler: Function): { remove: () => void } {
    invariant(eventTypes.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
    if (!connection) {
      console.error('Network Connection API is not supported. Not listening for connection type changes.');
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
    if (!connection) { return; }
    connection.removeEventListener(type, handler);
  },

  fetch(): Promise {
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
      invariant(eventTypes.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
      window.addEventListener('online', handler.bind(null, true), false);
      window.addEventListener('offline', handler.bind(null, false), false);

      return {
        remove: () => NetInfo.isConnected.removeEventListener(type, handler)
      };
    },

    removeEventListener(type: string, handler: Function): void {
      invariant(eventTypes.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
      window.removeEventListener('online', handler.bind(null, true), false);
      window.removeEventListener('offline', handler.bind(null, false), false);
    },

    fetch(): Promise {
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

module.exports = NetInfo;
