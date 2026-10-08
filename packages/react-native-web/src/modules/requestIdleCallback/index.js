/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import canUseDOM from '../canUseDom';

const _requestIdleCallback = function (cb: Function, options?: Object) {
  return setTimeout(() => {
    const start = Date.now();
    cb({
      didTimeout: false,
      timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

const isSupported =
  canUseDOM && typeof window.requestIdleCallback !== 'undefined';

const requestIdleCallback: (cb: any, options?: any) => TimeoutID = isSupported
  ? window.requestIdleCallback
  : _requestIdleCallback;

export default requestIdleCallback;
