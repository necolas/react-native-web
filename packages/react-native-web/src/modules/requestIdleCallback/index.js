/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import canUseDOM from '../canUseDom';

interface Deadline {
  readonly didTimeout: boolean;
  timeRemaining(): number;
}

type Callback = (deadline: Deadline) => unknown;

type Options = { readonly timeout?: number };

const _requestIdleCallback = function (
  cb: Callback,
  options?: Options
): number {
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

const requestIdleCallback: typeof _requestIdleCallback = isSupported
  ? (cb, options) => window.requestIdleCallback(cb, options)
  : _requestIdleCallback;

export default requestIdleCallback;
