/* global window */
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

const _requestIdleCallback = function(cb) {
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

const _cancelIdleCallback = function(id: number) {
  clearTimeout(id);
};

const isSupported = canUseDOM && typeof window.requestIdleCallback !== 'undefined';

const requestIdleCallback = isSupported ? window.requestIdleCallback : _requestIdleCallback;
const cancelIdleCallback = isSupported ? window.cancelIdleCallback : _cancelIdleCallback;

export default requestIdleCallback;
export { cancelIdleCallback };
