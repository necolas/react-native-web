const _requestIdleCallback = function (cb) {
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

const _cancelIdleCallback = function (id) {
  clearTimeout(id);
};

const requestIdleCallback = window.requestIdleCallback || _requestIdleCallback;
const cancelIdleCallback = window.cancelIdleCallback || _cancelIdleCallback;

export default requestIdleCallback;
export { cancelIdleCallback };
