/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

const _requestIdleCallback = function(cb: Function, options?: Object) {
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

// $FlowFixMe (TimeoutID type is not recognized by eslint)
const _cancelIdleCallback = function(id) {
  clearTimeout(id);
};

const isSupported = canUseDOM && typeof window.requestIdleCallback !== 'undefined';

const requestIdleCallback = isSupported ? window.requestIdleCallback : _requestIdleCallback;
const cancelIdleCallback = isSupported ? window.cancelIdleCallback : _cancelIdleCallback;

export default requestIdleCallback;
export { cancelIdleCallback };
