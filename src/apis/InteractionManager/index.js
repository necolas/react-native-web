/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import keyMirror from 'fbjs/lib/keyMirror'
import invariant from 'fbjs/lib/invariant'

const InteractionManager = {
  Events: keyMirror({
    interactionStart: true,
    interactionComplete: true
  }),

  /**
   * Schedule a function to run after all interactions have completed.
   */
  runAfterInteractions(callback: Function) {
    invariant(
      typeof callback === 'function',
      'Must specify a function to schedule.'
    )
    callback()
  },

  /**
   * Notify manager that an interaction has started.
   */
  createInteractionHandle() {
    return 1
  },

  /**
   * Notify manager that an interaction has completed.
   */
  clearInteractionHandle(handle) {
    invariant(
      !!handle,
      'Must provide a handle to clear.'
    )
  },

  addListener: () => {}
}

export default InteractionManager
