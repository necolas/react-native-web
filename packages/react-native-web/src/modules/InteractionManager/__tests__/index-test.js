/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function expectToHaveBeenCalledOnce(fn) {
  expect(fn.mock.calls.length).toBe(1);
}

describe('InteractionManager', () => {
  let InteractionManager;

  beforeEach(() => {
    jest.resetModules();
    InteractionManager = require('..');
  });

  it('run tasks asynchronously when there are interactions', () => {
    const task = jest.fn();
    InteractionManager.runAfterInteractions(task);
    expect(task).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(task).toHaveBeenCalled();
  });

  it('runs tasks when interactions complete', () => {
    const task = jest.fn();
    const handle = InteractionManager.createInteractionHandle();
    InteractionManager.runAfterInteractions(task);

    jest.runAllTimers();
    InteractionManager.clearInteractionHandle(handle);
    expect(task).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(task).toHaveBeenCalled();
  });

  it('runs tasks when an interaction starts and ends before the update', () => {
    const task = jest.fn();
    const handle = InteractionManager.createInteractionHandle();
    InteractionManager.runAfterInteractions(task);
    InteractionManager.clearInteractionHandle(handle);

    jest.runAllTimers();
    expect(task).toHaveBeenCalled();
  });

  it('does not run tasks twice', () => {
    const task1 = jest.fn();
    const task2 = jest.fn();
    InteractionManager.runAfterInteractions(task1);
    jest.runAllTimers();

    InteractionManager.runAfterInteractions(task2);
    jest.runAllTimers();

    expectToHaveBeenCalledOnce(task1);
  });

  it('runs tasks added while processing previous tasks', () => {
    const task1 = jest.fn(() => {
      InteractionManager.runAfterInteractions(task2);
    });
    const task2 = jest.fn();

    InteractionManager.runAfterInteractions(task1);
    expect(task2).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(task1).toHaveBeenCalled();
    expect(task2).toHaveBeenCalled();
  });

  it('allows tasks to be cancelled', () => {
    const task1 = jest.fn();
    const task2 = jest.fn();
    const pending1 = InteractionManager.runAfterInteractions(task1);
    InteractionManager.runAfterInteractions(task2);
    expect(task1).not.toHaveBeenCalled();
    expect(task2).not.toHaveBeenCalled();
    pending1.cancel();

    jest.runAllTimers();
    expect(task1).not.toHaveBeenCalled();
    expect(task2).toHaveBeenCalled();
  });
});
