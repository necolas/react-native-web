/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function expectToBeCalledOnce(fn) {
  expect(fn.mock.calls.length).toBe(1);
}

describe('InteractionManager', () => {
  let InteractionManager;
  let interactionStart;
  let interactionComplete;

  beforeEach(() => {
    jest.resetModules();
    InteractionManager = require('..');

    interactionStart = jest.fn();
    interactionComplete = jest.fn();

    InteractionManager.addListener(
      InteractionManager.Events.interactionStart,
      interactionStart
    );

    InteractionManager.addListener(
      InteractionManager.Events.interactionComplete,
      interactionComplete
    );
  });

  it('throws when clearing an undefined handle', () => {
    expect(() => InteractionManager.clearInteractionHandle()).toThrow();
  });

  it('notifies asynchronously when interaction starts', () => {
    InteractionManager.createInteractionHandle();
    expect(interactionStart).not.toBeCalled();

    jest.runAllTimers();
    expect(interactionStart).toBeCalled();
    expect(interactionComplete).not.toBeCalled();
  });

  it('notifies asynchronously when interaction stops', () => {
    const handle = InteractionManager.createInteractionHandle();
    jest.runAllTimers();
    interactionStart.mockClear();
    InteractionManager.clearInteractionHandle(handle);
    expect(interactionComplete).not.toBeCalled();

    jest.runAllTimers();
    expect(interactionStart).not.toBeCalled();
    expect(interactionComplete).toBeCalled();
  });

  it('does not notify when started & stoped in same event loop', () => {
    const handle = InteractionManager.createInteractionHandle();
    InteractionManager.clearInteractionHandle(handle);

    jest.runAllTimers();
    expect(interactionStart).not.toBeCalled();
    expect(interactionComplete).not.toBeCalled();
  });

  it('does not notify when going from two -> one active interactions', () => {
    InteractionManager.createInteractionHandle();
    const handle = InteractionManager.createInteractionHandle();
    jest.runAllTimers();

    interactionStart.mockClear();
    interactionComplete.mockClear();

    InteractionManager.clearInteractionHandle(handle);
    jest.runAllTimers();
    expect(interactionStart).not.toBeCalled();
    expect(interactionComplete).not.toBeCalled();
  });

  it('run tasks asynchronously when there are interactions', () => {
    const task = jest.fn();
    InteractionManager.runAfterInteractions(task);
    expect(task).not.toBeCalled();

    jest.runAllTimers();
    expect(task).toBeCalled();
  });

  it('runs tasks when interactions complete', () => {
    const task = jest.fn();
    const handle = InteractionManager.createInteractionHandle();
    InteractionManager.runAfterInteractions(task);

    jest.runAllTimers();
    InteractionManager.clearInteractionHandle(handle);
    expect(task).not.toBeCalled();

    jest.runAllTimers();
    expect(task).toBeCalled();
  });

  it('does not run tasks twice', () => {
    const task1 = jest.fn();
    const task2 = jest.fn();
    InteractionManager.runAfterInteractions(task1);
    jest.runAllTimers();

    InteractionManager.runAfterInteractions(task2);
    jest.runAllTimers();

    expectToBeCalledOnce(task1);
  });

  it('runs tasks added while processing previous tasks', () => {
    const task1 = jest.fn(() => {
      InteractionManager.runAfterInteractions(task2);
    });
    const task2 = jest.fn();

    InteractionManager.runAfterInteractions(task1);
    expect(task2).not.toBeCalled();

    jest.runAllTimers();

    expect(task1).toBeCalled();
    expect(task2).toBeCalled();
  });

  it('allows tasks to be cancelled', () => {
    const task1 = jest.fn();
    const task2 = jest.fn();
    const promise1 = InteractionManager.runAfterInteractions(task1);
    InteractionManager.runAfterInteractions(task2);
    expect(task1).not.toBeCalled();
    expect(task2).not.toBeCalled();
    promise1.cancel();

    jest.runAllTimers();
    expect(task1).not.toBeCalled();
    expect(task2).toBeCalled();
  });

  it('should support promise variant', () => {
    expect.assertions(1);
    const task = jest.fn();
    const promise = InteractionManager.runAfterInteractions()
      .done(task)
      .then(() => {
        expect(task).toBeCalled();
      });
    jest.runAllTimers();
    return promise;
  });
});

describe('promise tasks', () => {
  let InteractionManager;
  let sequenceId;

  function createSequenceTask(expectedSequenceId) {
    return jest.fn(() => {
      expect(++sequenceId).toBe(expectedSequenceId);
    });
  }

  beforeEach(() => {
    jest.resetModules();
    InteractionManager = require('..');
    sequenceId = 0;
  });

  it('should run a basic promise task', () => {
    const task1 = jest.fn(() => {
      expect(++sequenceId).toBe(1);
      return new Promise((resolve) => resolve());
    });
    InteractionManager.runAfterInteractions({ gen: task1, name: 'gen1' });
    jest.runAllTimers();
    expectToBeCalledOnce(task1);
  });

  it('should handle nested promises', () => {
    const task1 = jest.fn(() => {
      expect(++sequenceId).toBe(1);
      return new Promise((resolve) => {
        InteractionManager.runAfterInteractions({
          gen: task2,
          name: 'gen2'
        }).then(resolve);
      });
    });
    const task2 = jest.fn(() => {
      expect(++sequenceId).toBe(2);
      return new Promise((resolve) => resolve());
    });
    InteractionManager.runAfterInteractions({ gen: task1, name: 'gen1' });
    jest.runAllTimers();
    expectToBeCalledOnce(task1);
    expectToBeCalledOnce(task2);
  });

  it('should pause promise tasks during interactions then resume', () => {
    const task1 = createSequenceTask(1);
    const task2 = jest.fn(() => {
      expect(++sequenceId).toBe(2);
      return new Promise((resolve) => {
        setTimeout(() => {
          InteractionManager.runAfterInteractions(task3).then(resolve);
        }, 1);
      });
    });
    const task3 = createSequenceTask(3);
    InteractionManager.runAfterInteractions(task1);
    InteractionManager.runAfterInteractions({ gen: task2, name: 'gen2' });
    jest.runOnlyPendingTimers();
    expectToBeCalledOnce(task1);
    expectToBeCalledOnce(task2);
    const handle = InteractionManager.createInteractionHandle();
    jest.runAllTimers();
    jest.runAllTimers(); // Just to be sure...
    expect(task3).not.toBeCalled();
    InteractionManager.clearInteractionHandle(handle);
    jest.runAllTimers();
    expectToBeCalledOnce(task3);
  });

  it('should execute tasks in loop within deadline', () => {
    InteractionManager.setDeadline(100);
    const task1 = createSequenceTask(1);
    const task2 = createSequenceTask(2);
    InteractionManager.runAfterInteractions(task1);
    InteractionManager.runAfterInteractions(task2);

    jest.runOnlyPendingTimers();
    expectToBeCalledOnce(task1);
    expectToBeCalledOnce(task2);
  });

  it('should execute tasks one at a time if deadline exceeded', () => {
    InteractionManager.setDeadline(100);
    const task1 = jest.fn(() => {
      expect(++sequenceId).toBe(1);
      jest.setSystemTime(Date.now() + 200);
    });
    const task2 = createSequenceTask(2);
    InteractionManager.runAfterInteractions(task1);
    InteractionManager.runAfterInteractions(task2);

    jest.runOnlyPendingTimers();

    expectToBeCalledOnce(task1);
    expect(task2).not.toBeCalled();

    jest.runOnlyPendingTimers();

    expectToBeCalledOnce(task2);
  });

  const bigAsyncTest = (resolveTest) => {
    const task1 = createSequenceTask(1);
    const task2 = jest.fn(() => {
      expect(++sequenceId).toBe(2);
      return new Promise((resolve) => {
        InteractionManager.runAfterInteractions(task3);
        setTimeout(() => {
          InteractionManager.runAfterInteractions({
            gen: task4,
            name: 'gen4'
          })
            .then(resolve)
            .then(() => {
              // Explicit exhaustion of the task queue is required
              jest.runAllTimers();
            });
        }, 1);
      });
    });
    const task3 = createSequenceTask(3);
    const task4 = jest.fn(() => {
      expect(++sequenceId).toBe(4);
      return new Promise((resolve) => {
        InteractionManager.runAfterInteractions(task5)
          .then(resolve)
          .then(() => {
            // Explicit exhaustion of the task queue is required
            jest.runAllTimers();
          });
      });
    });
    const task5 = createSequenceTask(5);
    const task6 = createSequenceTask(6);

    InteractionManager.runAfterInteractions(task1);
    InteractionManager.runAfterInteractions({ gen: task2, name: 'gen2' });
    InteractionManager.runAfterInteractions(task6).then(() => {
      expectToBeCalledOnce(task1);
      expectToBeCalledOnce(task2);
      expectToBeCalledOnce(task3);
      expectToBeCalledOnce(task4);
      expectToBeCalledOnce(task5);
      expectToBeCalledOnce(task6);
      resolveTest();
    });

    jest.runAllTimers();
  };

  it('resolves async tasks recursively before other queued tasks', () => {
    return new Promise(bigAsyncTest);
  });

  it('should also work with a deadline', () => {
    InteractionManager.setDeadline(100);
    const task = jest.fn(() => {
      jest.setSystemTime(Date.now() + 200);
    });
    InteractionManager.runAfterInteractions(task);
    return new Promise(bigAsyncTest);
  });
});
