/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Mock } from 'vitest';

import type InteractionManagerType from '..';

function expectToHaveBeenCalledOnce(fn: Mock) {
  expect(fn).toHaveBeenCalledOnce();
}

describe('InteractionManager', () => {
  let InteractionManager: typeof InteractionManagerType;

  beforeEach(async () => {
    vi.resetModules();
    InteractionManager = (await import('../index.js')).default;
  });

  it('run tasks asynchronously when there are interactions', () => {
    const task = vi.fn();
    InteractionManager.runAfterInteractions(task);
    expect(task).not.toHaveBeenCalled();

    vi.runAllTimers();
    expect(task).toHaveBeenCalled();
  });

  it('runs tasks when interactions complete', () => {
    const task = vi.fn();
    const handle = InteractionManager.createInteractionHandle();
    InteractionManager.runAfterInteractions(task);

    vi.runAllTimers();
    InteractionManager.clearInteractionHandle(handle);
    expect(task).not.toHaveBeenCalled();

    vi.runAllTimers();
    expect(task).toHaveBeenCalled();
  });

  it('runs tasks when an interaction starts and ends before the update', () => {
    const task = vi.fn();
    const handle = InteractionManager.createInteractionHandle();
    InteractionManager.runAfterInteractions(task);
    InteractionManager.clearInteractionHandle(handle);

    vi.runAllTimers();
    expect(task).toHaveBeenCalled();
  });

  it('does not run tasks twice', () => {
    const task1 = vi.fn();
    const task2 = vi.fn();
    InteractionManager.runAfterInteractions(task1);
    vi.runAllTimers();

    InteractionManager.runAfterInteractions(task2);
    vi.runAllTimers();

    expectToHaveBeenCalledOnce(task1);
  });

  it('runs tasks added while processing previous tasks', () => {
    const task1 = vi.fn(() => {
      InteractionManager.runAfterInteractions(task2);
    });
    const task2 = vi.fn();

    InteractionManager.runAfterInteractions(task1);
    expect(task2).not.toHaveBeenCalled();

    vi.runAllTimers();

    expect(task1).toHaveBeenCalled();
    expect(task2).toHaveBeenCalled();
  });

  it('allows tasks to be cancelled', () => {
    const task1 = vi.fn();
    const task2 = vi.fn();
    const pending1 = InteractionManager.runAfterInteractions(task1);
    InteractionManager.runAfterInteractions(task2);
    expect(task1).not.toHaveBeenCalled();
    expect(task2).not.toHaveBeenCalled();
    pending1.cancel();

    vi.runAllTimers();
    expect(task1).not.toHaveBeenCalled();
    expect(task2).toHaveBeenCalled();
  });
});
