/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import invariant from 'fbjs/lib/invariant';

const InteractionManager = {
  Events: {
    interactionStart: 'interactionStart',
    interactionComplete: 'interactionComplete'
  },

  /**
   * Schedule a function to run after all interactions have completed.
   */
  runAfterInteractions(task: ?Function): { then: Function, done: Function, cancel: Function } {
    console.warn('InteractionManager is not supported on web');
    const promise = new Promise(resolve => {
      if (task) {
        resolve(task());
      }
    });
    return {
      then: promise.then.bind(promise),
      done: () => {},
      cancel: () => {}
    };
  },

  /**
   * Notify manager that an interaction has started.
   */
  createInteractionHandle() {
    return 1;
  },

  /**
   * Notify manager that an interaction has completed.
   */
  clearInteractionHandle(handle: number) {
    invariant(!!handle, 'Must provide a handle to clear.');
  },

  addListener: () => {}
};

export default InteractionManager;
