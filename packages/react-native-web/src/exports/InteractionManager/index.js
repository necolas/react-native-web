/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import invariant from 'fbjs/lib/invariant';
import requestIdleCallback, { cancelIdleCallback } from '../../modules/requestIdleCallback';

const InteractionManager = {
  Events: {
    interactionStart: 'interactionStart',
    interactionComplete: 'interactionComplete'
  },

  /**
   * Schedule a function to run after all interactions have completed.
   */
  runAfterInteractions(task: ?Function): { then: Function, done: Function, cancel: Function } {
    let handle;

    const promise = new Promise(resolve => {
      handle = requestIdleCallback(() => {
        if (task) {
          resolve(task());
        }
      });
    });
    return {
      then: promise.then.bind(promise),
      done: promise.then.bind(promise),
      cancel: () => {
        cancelIdleCallback(handle);
      }
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
