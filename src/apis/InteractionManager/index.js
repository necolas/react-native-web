/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule InteractionManager
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
  runAfterInteractions(callback: Function) {
    invariant(typeof callback === 'function', 'Must specify a function to schedule.');
    callback();
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
