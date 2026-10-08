/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import TaskQueue from './TaskQueue';
import requestIdleCallback from '../../modules/requestIdleCallback';

/**
 * `InteractionManager` has been removed from React Native, so it is no longer
 * exported here. It is only kept for `vendor/`.
 *
 * TODO: Delete this module once no internals rely on it.
 */
const InteractionManager = {
  /**
   * Schedule a function to run after all interactions have completed.
   */
  runAfterInteractions(task: () => void): { cancel: () => void } {
    const tasks = [task];
    _taskQueue.enqueueTasks(tasks);
    _scheduleUpdate();
    return {
      cancel: () => {
        _taskQueue.cancelTasks(tasks);
      }
    };
  },

  /**
   * Notify manager that an interaction has started.
   */
  createInteractionHandle(): number {
    const handle = ++_inc;
    _interactionSet.add(handle);
    return handle;
  },

  /**
   * Notify manager that an interaction has completed.
   */
  clearInteractionHandle(handle: number) {
    _interactionSet.delete(handle);
    _scheduleUpdate();
  }
};

const _interactionSet = new Set<number>();
const _taskQueue = new TaskQueue({ onMoreTasks: _scheduleUpdate });
let _nextUpdateHandle: TimeoutID | number = 0;
let _inc = 0;

/**
 * Schedule an asynchronous update to the interaction state.
 */
function _scheduleUpdate() {
  if (!_nextUpdateHandle) {
    _nextUpdateHandle = requestIdleCallback(_processUpdate);
  }
}

/**
 * Process the queue.
 */
function _processUpdate() {
  _nextUpdateHandle = 0;

  if (_interactionSet.size === 0) {
    while (_taskQueue.hasTasksToProcess()) {
      _taskQueue.processNext();
    }
  }
}

export default InteractionManager;
