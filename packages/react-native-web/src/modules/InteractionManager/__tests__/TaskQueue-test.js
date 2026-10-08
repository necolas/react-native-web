/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function expectToHaveBeenCalledOnce(fn) {
  expect(fn.mock.calls.length).toBe(1);
}

function clearTaskQueue(taskQueue) {
  while (taskQueue.hasTasksToProcess()) {
    taskQueue.processNext();
  }
}

describe('TaskQueue', () => {
  let taskQueue;
  let sequenceId;

  function createSequenceTask(expectedSequenceId) {
    return jest.fn(() => {
      expect(++sequenceId).toBe(expectedSequenceId);
    });
  }

  beforeEach(() => {
    jest.resetModules();
    const TaskQueue = require('../TaskQueue');
    taskQueue = new TaskQueue();
    sequenceId = 0;
  });

  it('should run a basic task', () => {
    const task1 = createSequenceTask(1);
    taskQueue.enqueue(task1);
    expect(taskQueue.hasTasksToProcess()).toBe(true);
    taskQueue.processNext();
    expectToHaveBeenCalledOnce(task1);
  });

  it('should handle nested tasks', () => {
    const task1 = jest.fn(() => {
      expect(++sequenceId).toBe(1);
      taskQueue.enqueue(task3);
    });
    const task2 = createSequenceTask(2);
    const task3 = createSequenceTask(3);
    taskQueue.enqueue(task1);
    taskQueue.enqueue(task2); // not blocked by task 1

    clearTaskQueue(taskQueue);

    expectToHaveBeenCalledOnce(task1);
    expectToHaveBeenCalledOnce(task2);
    expectToHaveBeenCalledOnce(task3);
  });

  it('should be able to cancel tasks', () => {
    const task1 = jest.fn();
    const task2 = createSequenceTask(1);
    const task3 = jest.fn();
    const task4 = createSequenceTask(2);
    taskQueue.enqueue(task1);
    taskQueue.enqueue(task2);
    taskQueue.enqueue(task3);
    taskQueue.enqueue(task4);
    taskQueue.cancelTasks([task1, task3]);
    clearTaskQueue(taskQueue);
    expect(task1).not.toHaveBeenCalled();
    expect(task3).not.toHaveBeenCalled();
    expectToHaveBeenCalledOnce(task2);
    expectToHaveBeenCalledOnce(task4);
    expect(taskQueue.hasTasksToProcess()).toBe(false);
  });

  it('should not crash when last task is cancelled', () => {
    const task1 = jest.fn();
    taskQueue.enqueue(task1);
    taskQueue.cancelTasks([task1]);
    clearTaskQueue(taskQueue);
    expect(task1).not.toHaveBeenCalled();
    expect(taskQueue.hasTasksToProcess()).toBe(false);
  });
});
