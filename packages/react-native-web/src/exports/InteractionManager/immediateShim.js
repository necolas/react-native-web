/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// Globally Unique Immediate ID.
let GUID = 1;

// A global set of the currently cleared immediate id.
const clearedIds: Set<number> = new Set();

const scheduleMicrotask =
  typeof window !== 'undefined' && typeof window.queueMicrotask === 'function'
    ? window.queueMicrotask
    : typeof Promise !== 'undefined'
    ? (callback) =>
        Promise.resolve(null)
          .then(callback)
          .catch((error) => {
            setTimeout(() => {
              throw error;
            });
          })
    : setTimeout;

/**
 * Shim the setImmediate API on top of queueMicrotask.
 * @param {function} callback Callback to be invoked before the end of the
 * current JavaScript execution loop.
 * @param args
 */
function setImmediate(callback: Function, ...args: any): number {
  if (arguments.length < 1) {
    throw new TypeError(
      'setImmediate must be called with at least one argument (a function to call)'
    );
  }
  if (typeof callback !== 'function') {
    throw new TypeError(
      'The first argument to setImmediate must be a function.'
    );
  }

  const id = GUID++;
  // This is an edge case in which the sequentially assigned ID has been
  // "guessed" and "cleared" ahead of time, so we need to clear it up first.
  if (clearedIds.has(id)) {
    clearedIds.delete(id);
  }

  scheduleMicrotask(() => {
    if (!clearedIds.has(id)) {
      callback.apply(undefined, args);
    } else {
      // Free up the Set entry.
      clearedIds.delete(id);
    }
  });

  return id;
}

/**
 * @param {number} immediateID The ID of the immediate to be cleared.
 */
function clearImmediate(immediateID: number) {
  clearedIds.add(immediateID);
}

export { setImmediate, clearImmediate };
