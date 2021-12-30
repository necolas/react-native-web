/* eslint-env jasmine, jest */

import { act } from 'react-dom/test-utils';
import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import useResponderEvents from '..';
import ResponderSystem from '../ResponderSystem';
import {
  buttonType,
  buttonsType,
  clearPointers,
  createEventTarget,
  testWithPointerType
} from 'dom-event-testing-library';
import StyleSheetManager from '../../../exports/StyleSheet/StyleSheetManager';

describe('useResponderEvents', () => {
  let container;
  let responderSystem;

  function render(element) {
    ReactDOM.render(
      <StyleSheetManager _responderSystem={responderSystem} rootTag={container}>
        {element}
      </StyleSheetManager>,
      container
    );
  }

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    responderSystem = new ResponderSystem(window);
  });

  afterEach(() => {
    render(null);
    document.body.removeChild(container);
    container = null;
    // make sure all tests end with the current responder being reset
    responderSystem.terminateResponder();
    // make sure all tests reset state machine tracking pointers on the mock surface
    clearPointers();
  });

  testWithPointerType('does nothing when no elements want to respond', (pointerType) => {
    const targetRef = createRef();
    const Component = () => {
      useResponderEvents(targetRef, {
        onStartShouldSetResponder: jest.fn()
      });
      return <div ref={targetRef} />;
    };

    // render
    act(() => {
      render(<Component />);
    });
    const target = createEventTarget(targetRef.current);
    // gesture
    act(() => {
      target.pointerdown({ pointerType });
    });
    // no responder should be active
    expect(responderSystem.getResponderNode()).toBe(null);
  });

  test('does nothing for "mousedown" with non-primary buttons', () => {
    const targetRef = createRef();
    const Component = () => {
      useResponderEvents(targetRef, {
        onStartShouldSetResponderCapture: jest.fn(() => true),
        onStartShouldSetResponder: jest.fn(() => true)
      });
      return <div ref={targetRef} />;
    };

    // render
    act(() => {
      render(<Component />);
    });
    const target = createEventTarget(targetRef.current);
    const buttons = [1, 2, 3, 4];
    // gesture
    act(() => {
      buttons.forEach((button) => {
        target.pointerdown({
          pointerType: 'mouse',
          button: buttonType.auxiliary,
          buttons: buttonsType.auxiliary
        });
      });
    });
    expect(responderSystem.getResponderNode()).toBe(null);
  });

  test('does nothing for "mousedown" with ignored modifier keys', () => {
    const targetRef = createRef();
    const Component = () => {
      useResponderEvents(targetRef, {
        onStartShouldSetResponderCapture: jest.fn(() => true),
        onStartShouldSetResponder: jest.fn(() => true)
      });
      return <div ref={targetRef} />;
    };

    // render
    act(() => {
      render(<Component />);
    });
    const target = createEventTarget(targetRef.current);
    const acceptedModifierKeys = ['metaKey', 'shiftKey'];
    const ignoredModifierKeys = ['altKey', 'ctrlKey'];
    // gesture
    act(() => {
      ignoredModifierKeys.forEach((modifierKey) => {
        target.pointerdown({ pointerType: 'mouse', [modifierKey]: true });
      });
    });
    expect(responderSystem.getResponderNode()).toBe(null);
    // gesture
    act(() => {
      acceptedModifierKeys.forEach((modifierKey) => {
        target.pointerdown({ pointerType: 'mouse', [modifierKey]: true });
      });
    });
    expect(responderSystem.getResponderNode()).not.toBe(null);
  });

  test('recognizes mouse interactions after touch interactions', () => {
    const targetRef = createRef();
    const targetCallbacks = {
      onStartShouldSetResponder: jest.fn(() => true),
      onResponderGrant: jest.fn()
    };
    const Component = () => {
      useResponderEvents(targetRef, targetCallbacks);
      return <div ref={targetRef} />;
    };

    // render
    act(() => {
      render(<Component />);
    });
    const target = createEventTarget(targetRef.current);
    // touch gesture
    act(() => {
      target.pointerdown({ pointerType: 'touch' });
      target.pointerup({ pointerType: 'touch' });
    });
    expect(targetCallbacks.onResponderGrant).toBeCalledTimes(1);
    // mouse gesture
    act(() => {
      target.pointerdown({ pointerType: 'mouse' });
      target.pointerup({ pointerType: 'mouse' });
    });
    expect(targetCallbacks.onResponderGrant).toBeCalledTimes(2);
    // touch gesture with move
    act(() => {
      target.pointerdown({ pointerType: 'touch' });
      target.pointermove({ pointerType: 'touch' });
      target.pointerup({ pointerType: 'touch' });
    });
    expect(targetCallbacks.onResponderGrant).toBeCalledTimes(3);
    // mouse gesture
    act(() => {
      target.pointerdown({ pointerType: 'mouse' });
      target.pointerup({ pointerType: 'mouse' });
    });
    expect(targetCallbacks.onResponderGrant).toBeCalledTimes(4);
  });

  // NOTE: this is only needed for performance reasons while the
  // `touchBank` is an array.
  test('normalizes touch identifiers', () => {
    const targetRef = createRef();
    let identifier;
    const Component = () => {
      useResponderEvents(targetRef, {
        onStartShouldSetResponder: () => true,
        onResponderStart: jest.fn((e) => {
          identifier = e.nativeEvent.identifier;
        })
      });
      return <div ref={targetRef} />;
    };

    // render
    act(() => {
      render(<Component />);
    });
    const target = createEventTarget(targetRef.current);
    // gesture
    act(() => {
      target.pointerdown({ pointerId: 123456, pointerType: 'touch' });
    });
    expect(identifier <= 20).toBe(true);
  });

  /**
   * SET: onStartShouldSetResponderCapture
   */

  describe('onStartShouldSetResponderCapture', () => {
    let grandParentRef;
    let parentRef;
    let targetRef;

    beforeEach(() => {
      grandParentRef = createRef();
      parentRef = createRef();
      targetRef = createRef();
    });

    testWithPointerType('start grants responder to grandParent', (pointerType) => {
      let grantCurrentTarget;
      const grandParentCallbacks = {
        onStartShouldSetResponderCapture: jest.fn((e) => {
          return true;
        }),
        onResponderGrant: jest.fn((e) => {
          grantCurrentTarget = e.currentTarget;
        })
      };
      const parentCallbacks = {
        onStartShouldSetResponderCapture: jest.fn(() => true)
      };
      const targetCallbacks = {
        onStartShouldSetResponderCapture: jest.fn(() => true)
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start
      act(() => {
        target.pointerdown({ pointerType });
      });
      // responder set (capture phase)
      expect(grandParentCallbacks.onStartShouldSetResponderCapture).toBeCalledTimes(1);
      expect(parentCallbacks.onStartShouldSetResponderCapture).not.toBeCalled();
      expect(targetCallbacks.onStartShouldSetResponderCapture).not.toBeCalled();
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(grandParentRef.current);
      expect(grandParentCallbacks.onResponderGrant).toBeCalledTimes(1);
      expect(grantCurrentTarget).toBe(grandParentRef.current);
      // gesture end
      act(() => {
        target.pointerup({ pointerType });
      });
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    testWithPointerType('start grants responder to parent', (pointerType) => {
      const grandParentCallbacks = {
        onStartShouldSetResponderCapture: jest.fn(() => false)
      };
      const parentCallbacks = {
        onStartShouldSetResponderCapture: jest.fn(() => true),
        onResponderGrant: jest.fn()
      };
      const targetCallbacks = {
        onStartShouldSetResponderCapture: jest.fn(() => true)
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start
      act(() => {
        target.pointerdown({ pointerType });
      });
      // responder set (capture phase)
      expect(grandParentCallbacks.onStartShouldSetResponderCapture).toBeCalledTimes(1);
      expect(parentCallbacks.onStartShouldSetResponderCapture).toBeCalledTimes(1);
      expect(targetCallbacks.onStartShouldSetResponderCapture).not.toBeCalled();
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(parentRef.current);
      expect(parentCallbacks.onResponderGrant).toBeCalledTimes(1);
      // gesture end
      act(() => {
        target.pointerup({ pointerType });
      });
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    testWithPointerType('start grants responder to child', (pointerType) => {
      const grandParentCallbacks = {
        onStartShouldSetResponderCapture: jest.fn(() => false)
      };
      const parentCallbacks = {
        onStartShouldSetResponderCapture: jest.fn(() => false)
      };
      const targetCallbacks = {
        onStartShouldSetResponderCapture: jest.fn(() => true),
        onResponderGrant: jest.fn()
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start
      act(() => {
        target.pointerdown({ pointerType });
      });
      // responder set (capture phase)
      expect(grandParentCallbacks.onStartShouldSetResponderCapture).toBeCalledTimes(1);
      expect(parentCallbacks.onStartShouldSetResponderCapture).toBeCalledTimes(1);
      expect(targetCallbacks.onStartShouldSetResponderCapture).toBeCalledTimes(1);
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(targetCallbacks.onResponderGrant).toBeCalledTimes(1);
      // gesture end
      act(() => {
        target.pointerup({ pointerType });
      });
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });
  });

  /**
   * SET: onStartShouldSetResponder
   */

  describe('onStartShouldSetResponder', () => {
    let targetRef;
    let parentRef;
    let grandParentRef;

    beforeEach(() => {
      targetRef = createRef();
      parentRef = createRef();
      grandParentRef = createRef();
    });

    testWithPointerType('start grants responder to child', (pointerType) => {
      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderGrant: jest.fn()
      };
      const parentCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true)
      };
      const grandParentCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true)
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start
      act(() => {
        target.pointerdown({ pointerType });
      });
      // responder set (bubble phase)
      expect(targetCallbacks.onStartShouldSetResponder).toBeCalledTimes(1);
      expect(parentCallbacks.onStartShouldSetResponder).not.toBeCalled();
      expect(grandParentCallbacks.onStartShouldSetResponder).not.toBeCalled();
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(targetCallbacks.onResponderGrant).toBeCalledTimes(1);
      // gesture end
      act(() => {
        target.pointerup({ pointerType });
      });
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    testWithPointerType('start grants responder to parent', (pointerType) => {
      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => false)
      };
      const parentCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderGrant: jest.fn()
      };
      const grandParentCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true)
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start
      act(() => {
        target.pointerdown({ pointerType });
      });
      // responder set (bubble phase)
      expect(targetCallbacks.onStartShouldSetResponder).toBeCalledTimes(1);
      expect(parentCallbacks.onStartShouldSetResponder).toBeCalledTimes(1);
      expect(grandParentCallbacks.onStartShouldSetResponder).not.toBeCalled();
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(parentRef.current);
      expect(parentCallbacks.onResponderGrant).toBeCalledTimes(1);
      // gesture end
      act(() => {
        target.pointerup({ pointerType });
      });
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    testWithPointerType('start grants responder to grandParent', (pointerType) => {
      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => false)
      };
      const parentCallbacks = {
        onStartShouldSetResponder: jest.fn(() => false)
      };
      const grandParentCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderGrant: jest.fn()
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start
      act(() => {
        target.pointerdown({ pointerType });
      });
      // responder set (bubble phase)
      expect(targetCallbacks.onStartShouldSetResponder).toBeCalledTimes(1);
      expect(parentCallbacks.onStartShouldSetResponder).toBeCalledTimes(1);
      expect(grandParentCallbacks.onStartShouldSetResponder).toBeCalledTimes(1);
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(grandParentRef.current);
      expect(grandParentCallbacks.onResponderGrant).toBeCalledTimes(1);
      // gesture end
      act(() => {
        target.pointerup({ pointerType });
      });
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });
  });

  /**
   * SET: onMoveShouldSetResponderCapture
   */

  describe('onMoveShouldSetResponderCapture', () => {
    let grandParentRef;
    let parentRef;
    let targetRef;

    beforeEach(() => {
      grandParentRef = createRef();
      parentRef = createRef();
      targetRef = createRef();
    });

    testWithPointerType('move grants responder to grandParent', (pointerType) => {
      const grandParentCallbacks = {
        onMoveShouldSetResponderCapture: jest.fn(() => true),
        onResponderGrant: jest.fn()
      };
      const parentCallbacks = {
        onMoveShouldSetResponderCapture: jest.fn(() => true)
      };
      const targetCallbacks = {
        onMoveShouldSetResponderCapture: jest.fn(() => true)
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start & move
      act(() => {
        target.pointerdown({ pointerType });
        target.pointermove({ pointerType });
      });
      // responder set (capture phase)
      expect(grandParentCallbacks.onMoveShouldSetResponderCapture).toBeCalledTimes(1);
      expect(parentCallbacks.onMoveShouldSetResponderCapture).not.toBeCalled();
      expect(targetCallbacks.onMoveShouldSetResponderCapture).not.toBeCalled();
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(grandParentRef.current);
      expect(grandParentCallbacks.onResponderGrant).toBeCalledTimes(1);
      // gesture end
      act(() => {
        target.pointerup({ pointerType });
      });
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    testWithPointerType('move grants responder to parent', (pointerType) => {
      const grandParentCallbacks = {
        onMoveShouldSetResponderCapture: jest.fn(() => false)
      };
      const parentCallbacks = {
        onMoveShouldSetResponderCapture: jest.fn(() => true),
        onResponderGrant: jest.fn()
      };
      const targetCallbacks = {
        onMoveShouldSetResponderCapture: jest.fn(() => true)
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start & move
      act(() => {
        target.pointerdown({ pointerType });
        target.pointermove({ pointerType });
      });
      // responder set (capture phase)
      expect(grandParentCallbacks.onMoveShouldSetResponderCapture).toBeCalledTimes(1);
      expect(parentCallbacks.onMoveShouldSetResponderCapture).toBeCalledTimes(1);
      expect(targetCallbacks.onMoveShouldSetResponderCapture).not.toBeCalled();
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(parentRef.current);
      expect(parentCallbacks.onResponderGrant).toBeCalledTimes(1);
      // gesture end
      act(() => {
        target.pointerup({ pointerType });
      });
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    testWithPointerType('move grants responder to child', (pointerType) => {
      const grandParentCallbacks = {
        onMoveShouldSetResponderCapture: jest.fn(() => false)
      };
      const parentCallbacks = {
        onMoveShouldSetResponderCapture: jest.fn(() => false)
      };
      const targetCallbacks = {
        onMoveShouldSetResponderCapture: jest.fn(() => true),
        onResponderGrant: jest.fn()
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start & move
      act(() => {
        target.pointerdown({ pointerType });
        target.pointermove({ pointerType });
      });
      // responder set (capture phase)
      expect(grandParentCallbacks.onMoveShouldSetResponderCapture).toBeCalledTimes(1);
      expect(parentCallbacks.onMoveShouldSetResponderCapture).toBeCalledTimes(1);
      expect(targetCallbacks.onMoveShouldSetResponderCapture).toBeCalledTimes(1);
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(targetCallbacks.onResponderGrant).toBeCalledTimes(1);
      // gesture end
      act(() => {
        target.pointerup({ pointerType });
      });
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });
  });

  /**
   * SET: onMoveShouldSetResponder
   */

  describe('onMoveShouldSetResponder', () => {
    let targetRef;
    let parentRef;
    let grandParentRef;

    beforeEach(() => {
      targetRef = createRef();
      parentRef = createRef();
      grandParentRef = createRef();
    });

    testWithPointerType('move grants responder to child', (pointerType) => {
      const targetCallbacks = {
        onMoveShouldSetResponder: jest.fn(() => true),
        onResponderGrant: jest.fn()
      };
      const parentCallbacks = {
        onMoveShouldSetResponder: jest.fn(() => true)
      };
      const grandParentCallbacks = {
        onMoveShouldSetResponder: jest.fn(() => true)
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start & move
      act(() => {
        target.pointerdown({ pointerType });
        target.pointermove({ pointerType });
      });
      // responder set (bubble phase)
      expect(targetCallbacks.onMoveShouldSetResponder).toBeCalledTimes(1);
      expect(parentCallbacks.onMoveShouldSetResponder).not.toBeCalled();
      expect(grandParentCallbacks.onMoveShouldSetResponder).not.toBeCalled();
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(targetCallbacks.onResponderGrant).toBeCalledTimes(1);
      // gesture end
      act(() => {
        target.pointerup({ pointerType });
      });
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    testWithPointerType('move grants responder to parent', (pointerType) => {
      const targetCallbacks = {
        onMoveShouldSetResponder: jest.fn(() => false)
      };
      const parentCallbacks = {
        onMoveShouldSetResponder: jest.fn(() => true),
        onResponderGrant: jest.fn()
      };
      const grandParentCallbacks = {
        onMoveShouldSetResponder: jest.fn(() => true)
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);

        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start & move
      act(() => {
        target.pointerdown({ pointerType });
        target.pointermove({ pointerType });
      });
      // responder set (bubble phase)
      expect(targetCallbacks.onMoveShouldSetResponder).toBeCalledTimes(1);
      expect(parentCallbacks.onMoveShouldSetResponder).toBeCalledTimes(1);
      expect(grandParentCallbacks.onMoveShouldSetResponder).not.toBeCalled();
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(parentRef.current);
      expect(parentCallbacks.onResponderGrant).toBeCalledTimes(1);
      // gesture end
      act(() => {
        target.pointerup({ pointerType });
      });
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    testWithPointerType('move grants responder to grandParent', (pointerType) => {
      const targetCallbacks = {
        onMoveShouldSetResponder: jest.fn(() => false)
      };
      const parentCallbacks = {
        onMoveShouldSetResponder: jest.fn(() => false)
      };
      const grandParentCallbacks = {
        onMoveShouldSetResponder: jest.fn(() => true),
        onResponderGrant: jest.fn()
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start & move
      act(() => {
        target.pointerdown({ pointerType });
        target.pointermove({ pointerType });
      });
      // responder set (bubble phase)
      expect(targetCallbacks.onMoveShouldSetResponder).toBeCalled();
      expect(parentCallbacks.onMoveShouldSetResponder).toBeCalled();
      expect(grandParentCallbacks.onMoveShouldSetResponder).toBeCalled();
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(grandParentRef.current);
      expect(grandParentCallbacks.onResponderGrant).toBeCalledTimes(1);
      // gesture end
      act(() => {
        target.pointerup({ pointerType });
      });
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });
  });

  /**
   * SET: onScrollShouldSetResponderCapture
   */

  describe('onScrollShouldSetResponderCapture', () => {
    let targetRef;
    let parentRef;

    beforeEach(() => {
      targetRef = createRef();
      parentRef = createRef();
    });

    testWithPointerType('scroll grants responder to parent if a pointer is down', (pointerType) => {
      const parentCallbacks = {
        onScrollShouldSetResponderCapture: jest.fn(() => true),
        onResponderGrant: jest.fn()
      };
      const targetCallbacks = {
        onScrollShouldSetResponderCapture: jest.fn(() => false)
      };

      const Component = () => {
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={parentRef}>
            <div ref={targetRef} />
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start
      act(() => {
        target.pointerdown({ pointerType });
        target.scroll();
      });
      // responder set (capture phase)
      expect(parentCallbacks.onScrollShouldSetResponderCapture).toBeCalledTimes(1);
      expect(targetCallbacks.onScrollShouldSetResponderCapture).toBeCalledTimes(0);
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(parentRef.current);
      expect(parentCallbacks.onResponderGrant).toBeCalledTimes(1);
    });

    testWithPointerType('scroll grants responder to target if a pointer is down', (pointerType) => {
      const parentCallbacks = {
        onScrollShouldSetResponderCapture: jest.fn(() => false)
      };
      const targetCallbacks = {
        onScrollShouldSetResponderCapture: jest.fn(() => true),
        onResponderGrant: jest.fn()
      };

      const Component = () => {
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={parentRef}>
            <div ref={targetRef} />
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start
      act(() => {
        target.pointerdown({ pointerType });
        target.scroll();
      });
      // responder set (capture phase)
      expect(parentCallbacks.onScrollShouldSetResponderCapture).toBeCalledTimes(1);
      expect(targetCallbacks.onScrollShouldSetResponderCapture).toBeCalledTimes(1);
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(targetCallbacks.onResponderGrant).toBeCalledTimes(1);
    });
  });

  /**
   * SET: onScrollShouldSetResponder
   */

  describe('onScrollShouldSetResponder', () => {
    let targetRef;
    let parentRef;

    beforeEach(() => {
      targetRef = createRef();
      parentRef = createRef();
    });

    test('scroll does not bubble to parent', () => {
      const parentCallbacks = {
        onScrollShouldSetResponder: jest.fn(() => true)
      };

      const Component = () => {
        useResponderEvents(parentRef, parentCallbacks);
        return (
          <div ref={parentRef}>
            <div ref={targetRef} />
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start
      act(() => {
        target.pointerdown();
        target.scroll();
      });
      // no bubble
      expect(parentCallbacks.onScrollShouldSetResponder).toBeCalledTimes(0);
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    testWithPointerType('scroll grants responder to target if a pointer is down', (pointerType) => {
      const targetCallbacks = {
        onScrollShouldSetResponder: jest.fn(() => true),
        onResponderGrant: jest.fn(),
        onResponderRelease: jest.fn()
      };

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return <div ref={targetRef} />;
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start
      act(() => {
        target.pointerdown({ pointerType });
        target.scroll();
        target.scroll();
      });
      // responder set (bubble phase)
      expect(targetCallbacks.onScrollShouldSetResponder).toBeCalledTimes(1);
      // responder grant
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(targetCallbacks.onResponderGrant).toBeCalledTimes(1);
      // gesture end
      act(() => {
        target.pointerup({ pointerType });
      });
      // make sure release is called
      expect(responderSystem.getResponderNode()).toBe(null);
      expect(targetCallbacks.onResponderRelease).toBeCalledTimes(1);
    });
  });

  /**
   * SET: onSelectionChangeShouldSetResponderCapture
   * Not implemented. Expected behevior is not clear. Always terminate the responder
   * and let the native system take over.
   */

  describe.skip('onSelectionChangeShouldSetResponderCapture', () => {});

  /**
   * SET: onSelectionChangeShouldSetResponder
   * Not implemented. Expected behevior is not clear. Always terminate the responder
   * and let the native system take over.
   */

  describe.skip('onSelectionChangeShouldSetResponder', () => {});

  /**
   * onResponderStart
   */

  describe('onResponderStart', () => {
    let targetRef;

    beforeEach(() => {
      targetRef = createRef();
    });

    testWithPointerType(
      'is called after "start" event on the view that became the responder',
      (pointerType) => {
        const targetCallbacks = {
          onStartShouldSetResponder: jest.fn(() => true),
          onResponderStart: jest.fn()
        };

        const Component = () => {
          useResponderEvents(targetRef, targetCallbacks);
          return <div ref={targetRef} />;
        };

        // render
        act(() => {
          render(<Component />);
        });
        const target = createEventTarget(targetRef.current);
        // gesture start
        act(() => {
          target.pointerdown({ pointerType });
        });
        // responder start
        expect(targetCallbacks.onResponderStart).toBeCalledTimes(1);
        expect(targetCallbacks.onResponderStart).toBeCalledWith(
          expect.objectContaining({
            currentTarget: targetRef.current
          })
        );
      }
    );
  });

  /**
   * onResponderMove
   */

  describe('onResponderMove', () => {
    let targetRef;

    beforeEach(() => {
      targetRef = createRef();
    });

    // Assert that 'onResponderMove' after a move event, is called however the responder became active
    ['onStartShouldSetResponder', 'onMoveShouldSetResponder'].forEach((shouldSetResponder) => {
      testWithPointerType(
        `is called after "move" event on responder (${shouldSetResponder})`,
        (pointerType) => {
          const targetCallbacks = {
            [shouldSetResponder]: jest.fn(() => true),
            onResponderMove: jest.fn()
          };

          const Component = () => {
            useResponderEvents(targetRef, targetCallbacks);
            return <div ref={targetRef} />;
          };

          // render
          act(() => {
            render(<Component />);
          });
          const target = createEventTarget(targetRef.current);
          // gesture start & move
          act(() => {
            target.pointerdown({ pointerType });
            target.pointermove({ pointerType });
          });
          // responder move
          expect(targetCallbacks.onResponderMove).toBeCalledTimes(1);
          expect(targetCallbacks.onResponderMove).toBeCalledWith(
            expect.objectContaining({
              currentTarget: targetRef.current
            })
          );
        }
      );
    });
  });

  /**
   * onResponderEnd
   */

  describe('onResponderEnd', () => {
    let targetRef;

    beforeEach(() => {
      targetRef = createRef();
    });

    testWithPointerType('is called after "end" event on responder', (pointerType) => {
      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderEnd: jest.fn()
      };

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return <div ref={targetRef} />;
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start & end
      act(() => {
        target.pointerdown({ pointerType });
        target.pointerup({ pointerType });
      });
      // responder end
      expect(targetCallbacks.onResponderEnd).toBeCalledTimes(1);
      expect(targetCallbacks.onResponderEnd).toBeCalledWith(
        expect.objectContaining({
          currentTarget: targetRef.current
        })
      );
    });
  });

  /**
   * onResponderRelease
   */

  describe('onResponderRelease', () => {
    let targetRef;

    beforeEach(() => {
      targetRef = createRef();
    });

    testWithPointerType('is called after all touches with responder end', (pointerType) => {
      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderRelease: jest.fn()
      };

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return <div ref={targetRef} />;
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture
      act(() => {
        target.pointerdown({ pointerType, pointerId: 1 });
        target.pointerdown({ pointerType, pointerId: 2 });
        target.pointerup({ pointerType, pointerId: 2 });
        target.pointerup({ pointerType, pointerId: 1 });
      });
      // responder release
      expect(targetCallbacks.onResponderRelease).toBeCalledTimes(1);
      expect(targetCallbacks.onResponderRelease).toBeCalledWith(
        expect.objectContaining({
          currentTarget: targetRef.current
        })
      );
    });
  });

  /**
   * onResponderTerminate
   */

  describe('onResponderTerminate', () => {
    let targetRef;

    beforeEach(() => {
      targetRef = createRef();
    });

    testWithPointerType('is called if pointer cancels', (pointerType) => {
      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderEnd: jest.fn(),
        onResponderTerminate: jest.fn(),
        onResponderTerminationRequest: jest.fn(() => false)
      };

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return <div ref={targetRef} />;
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // gesture start & cancel
      act(() => {
        target.pointerdown({ pointerType });
        target.pointercancel({ pointerType });
      });
      // responder terminates
      expect(targetCallbacks.onResponderEnd).toBeCalledTimes(1);
      expect(targetCallbacks.onResponderTerminate).toBeCalledTimes(1);
      expect(targetCallbacks.onResponderTerminate).toBeCalledWith(
        expect.objectContaining({
          currentTarget: targetRef.current
        })
      );
    });

    testWithPointerType('is called if input "select" occurs', (pointerType) => {
      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderTerminate: jest.fn(),
        onResponderTerminationRequest: jest.fn(() => false)
      };

      const inputRef = createRef();

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div>
            <div ref={targetRef} />
            <input ref={inputRef} />
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      const input = createEventTarget(inputRef.current);
      // getSelection is not supported in jest
      act(() => {
        target.pointerdown({ pointerType });
        input.select({});
      });
      // responder terminates
      expect(targetCallbacks.onResponderTerminate).toBeCalledTimes(1);
      // responder should not be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    testWithPointerType('is called if "selectionchange" occurs', (pointerType) => {
      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderTerminate: jest.fn()
      };

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return <div ref={targetRef}>text selection test</div>;
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      const doc = createEventTarget(document);
      // getSelection is not supported in jest
      window.getSelection = jest.fn(() => {
        const node = targetRef.current;
        const anchorNode = node != null && node.firstChild != null ? node.firstChild : node;
        return {
          anchorNode,
          toString() {
            return 'text';
          }
        };
      });
      act(() => {
        target.pointerdown({ pointerType });
        target.pointermove({ pointerType });
        doc.selectionchange({});
      });
      // responder terminates
      expect(targetCallbacks.onResponderTerminate).toBeCalledTimes(1);
      // responder should not be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    test('is called if ancestor scrolls', () => {
      const pointerType = 'touch';
      const parentRef = createRef();

      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderTerminate: jest.fn()
      };

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={parentRef}>
            <div ref={targetRef} />
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      const parent = createEventTarget(parentRef.current);
      // gesture start & scroll
      act(() => {
        target.pointerdown({ pointerType });
        // ancestor scrolls
        parent.scroll();
      });
      // responder terminates
      expect(targetCallbacks.onResponderTerminate).toBeCalledTimes(1);
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    test('is called if document scrolls', () => {
      const pointerType = 'touch';
      const parentRef = createRef();

      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderTerminate: jest.fn()
      };

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={parentRef}>
            <div ref={targetRef} />
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      const doc = createEventTarget(document);
      // gesture start & scroll
      act(() => {
        target.pointerdown({ pointerType });
        // document scrolls
        doc.scroll();
      });
      // responder end
      expect(targetCallbacks.onResponderTerminate).toBeCalledTimes(1);
      // no responder should be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    test('is not called if sibling scrolls', () => {
      const pointerType = 'touch';
      const siblingRef = createRef();

      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderTerminate: jest.fn()
      };

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div>
            <div ref={targetRef} />
            <div ref={siblingRef} />
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      const sibling = createEventTarget(siblingRef.current);
      // gesture start & scroll
      act(() => {
        target.pointerdown({ pointerType });
        // sibling scrolls
        sibling.scroll();
      });
      // responder doesn't terminate
      expect(targetCallbacks.onResponderTerminate).not.toBeCalled();
      // responder should still be set
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
    });

    test('is called if responder blurs', () => {
      const pointerType = 'touch';
      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderTerminate: jest.fn(),
        onResponderTerminationRequest: jest.fn(() => false)
      };

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return <div ref={targetRef} />;
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      const doc = createEventTarget(document);
      // gesture start & blur
      act(() => {
        target.pointerdown({ pointerType });
        doc.focus({ relatedTarget: target.node });
      });
      // responder terminates
      expect(targetCallbacks.onResponderTerminate).toBeCalledTimes(1);
      // responder should still be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    test('is called if window blurs', () => {
      const pointerType = 'touch';
      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderTerminate: jest.fn(),
        onResponderTerminationRequest: jest.fn(() => false)
      };

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return <div ref={targetRef} />;
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      const win = createEventTarget(window);
      // gesture start & blur
      act(() => {
        target.pointerdown({ pointerType });
        win.blur({ relatedTarget: target.node });
      });
      // responder terminates
      expect(targetCallbacks.onResponderTerminate).toBeCalledTimes(1);
      // responder should not be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    test('is not called if sibling blurs', () => {
      const pointerType = 'touch';
      const siblingRef = createRef();

      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderTerminate: jest.fn()
      };

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div>
            <div ref={targetRef} />
            <div ref={siblingRef} />
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      const sibling = createEventTarget(siblingRef.current);
      // gesture start & blur
      act(() => {
        target.pointerdown({ pointerType });
        // sibling blurs
        sibling.blur({ relatedTarget: target.node });
      });
      // responder doesn't terminate
      expect(targetCallbacks.onResponderTerminate).not.toBeCalled();
      // responder should still be set
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
    });

    test('is called if contextmenu opens', () => {
      // only test 'touch' because nothing can become the responder
      // when using mouse right-click to open a context menu
      const pointerType = 'touch';
      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderTerminate: jest.fn(),
        onResponderTerminationRequest: jest.fn()
      };

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return <div ref={targetRef} />;
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // contextmenu sequence includes pointerdown "start"
      act(() => {
        target.contextmenu({ pointerType });
      });
      // responder terminates
      expect(targetCallbacks.onResponderTerminate).toBeCalledTimes(1);
      // responder should not be set
      expect(responderSystem.getResponderNode()).toBe(null);
    });

    test('can be denied for "contextmenu", "scroll", and "selectionchange" events', () => {
      const targetCallbacks = {
        onStartShouldSetResponder: jest.fn(() => true),
        onResponderTerminate: jest.fn(),
        onResponderTerminationRequest: jest.fn(() => false)
      };

      const Component = () => {
        useResponderEvents(targetRef, targetCallbacks);
        return <div ref={targetRef} />;
      };

      function assertAndCleanUp() {
        expect(targetCallbacks.onResponderTerminate).toBeCalledTimes(0);
        expect(responderSystem.getResponderNode()).toBe(targetRef.current);
        responderSystem.terminateResponder();
        clearPointers();
        targetCallbacks.onResponderTerminate.mockClear();
      }

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      const doc = createEventTarget(document);
      // contextmenu
      act(() => {
        target.contextmenu({ pointerType: 'touch' });
      });
      assertAndCleanUp();
      // scroll
      act(() => {
        target.pointerdown({ pointerType: 'touch' });
        doc.scroll();
      });
      assertAndCleanUp();
      // selectionchange
      act(() => {
        target.pointerdown({ pointerType: 'mouse' });
        doc.selectionchange({});
      });
      assertAndCleanUp();
    });
  });

  /**
   * Negotiation of responder from common ancestor
   */

  describe('Negotiation', () => {
    let grandParentRef;
    let parentRef;
    let siblingRef;
    let targetRef;

    beforeEach(() => {
      grandParentRef = createRef();
      parentRef = createRef();
      siblingRef = createRef();
      targetRef = createRef();
    });

    /**
     * When there is an active responder, negotiation of the active pointer captures to
     * and bubbles from the closest common ancestor registered with the system. The
     * responder is transferred and maintained for subsequent events of the same type.
     */
    test('negotiates single-touch from first registered ancestor of responder and transfers', () => {
      const pointerType = 'touch';
      const eventLog = [];
      const grandParentCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('grandParent: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('grandParent: onStartShouldSetResponder');
          return false;
        },
        onMoveShouldSetResponderCapture() {
          eventLog.push('grandParent: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder() {
          eventLog.push('grandParent: onMoveShouldSetResponder');
          return true;
        },
        onResponderGrant() {
          eventLog.push('grandParent: onResponderGrant');
        },
        onResponderStart() {
          eventLog.push('grandParent: onResponderStart');
        },
        onResponderMove() {
          eventLog.push('grandParent: onResponderMove');
        },
        onResponderEnd() {
          eventLog.push('grandParent: onResponderEnd');
        },
        onResponderRelease() {
          eventLog.push('grandParent: onResponderRelease');
        },
        onResponderTerminate() {
          eventLog.push('grandParent: onResponderTerminate');
        },
        onResponderTerminationRequest() {
          eventLog.push('grandParent: onResponderTerminationRequest');
          return true;
        }
      };
      const parentCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('parent: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('parent: onStartShouldSetResponder');
          return false;
        },
        onMoveShouldSetResponderCapture() {
          eventLog.push('parent: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder() {
          eventLog.push('parent: onMoveShouldSetResponder');
          return false;
        },
        onResponderGrant() {
          eventLog.push('parent: onResponderGrant');
        },
        onResponderStart() {
          eventLog.push('parent: onResponderStart');
        },
        onResponderMove() {
          eventLog.push('parent: onResponderMove');
        },
        onResponderEnd() {
          eventLog.push('parent: onResponderEnd');
        },
        onResponderRelease() {
          eventLog.push('parent: onResponderRelease');
        },
        onResponderTerminate() {
          eventLog.push('parent: onResponderTerminate');
        },
        onResponderTerminationRequest() {
          eventLog.push('parent: onResponderTerminationRequest');
          return true;
        }
      };
      const targetCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('target: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('target: onStartShouldSetResponder');
          return true;
        },
        onMoveShouldSetResponderCapture() {
          eventLog.push('target: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder() {
          eventLog.push('target: onMoveShouldSetResponder');
          return false;
        },
        onResponderGrant() {
          eventLog.push('target: onResponderGrant');
        },
        onResponderStart() {
          eventLog.push('target: onResponderStart');
        },
        onResponderMove() {
          eventLog.push('target: onResponderMove');
        },
        onResponderEnd() {
          eventLog.push('target: onResponderEnd');
        },
        onResponderRelease() {
          eventLog.push('target: onResponderRelease');
        },
        onResponderTerminate() {
          eventLog.push('target: onResponderTerminate');
        },
        onResponderTerminationRequest() {
          eventLog.push('target: onResponderTerminationRequest');
          return true;
        }
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);

      // gesture start
      act(() => {
        target.pointerdown({ pointerType, pointerId: 1 });
        target.pointermove({ pointerType, pointerId: 1 });
        target.pointermove({ pointerType, pointerId: 1 });
      });
      expect(eventLog).toEqual([
        'grandParent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponderCapture',
        'target: onStartShouldSetResponderCapture',
        'target: onStartShouldSetResponder',
        'target: onResponderGrant',
        'target: onResponderStart',
        'grandParent: onMoveShouldSetResponderCapture',
        'parent: onMoveShouldSetResponderCapture',
        'parent: onMoveShouldSetResponder',
        'grandParent: onMoveShouldSetResponder',
        'target: onResponderTerminationRequest',
        'target: onResponderTerminate',
        'grandParent: onResponderGrant',
        'grandParent: onResponderMove',
        // Continues calling 'move' rather than entering into negotiation again
        'grandParent: onResponderMove'
      ]);
    });

    /**
     * When there is an active responder, negotiation of a second pointer captures to
     * and bubbles from the closest common ancestor registered with the system. The
     * responder is transferred andvthe relevant termination events are called.
     */
    test('negotiates multi-touch from first registered ancestor of responder and transfers', () => {
      const pointerType = 'touch';
      let eventLog = [];
      const grandParentCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('grandParent: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('grandParent: onStartShouldSetResponder');
          return false;
        },
        onMoveShouldSetResponderCapture() {
          eventLog.push('grandParent: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder() {
          eventLog.push('grandParent: onMoveShouldSetResponder');
          return true;
        },
        onResponderGrant() {
          eventLog.push('grandParent: onResponderGrant');
        },
        onResponderStart() {
          eventLog.push('grandParent: onResponderStart');
        },
        onResponderMove() {
          eventLog.push('grandParent: onResponderMove');
        },
        onResponderEnd() {
          eventLog.push('grandParent: onResponderEnd');
        },
        onResponderRelease() {
          eventLog.push('grandParent: onResponderRelease');
        },
        onResponderTerminate() {
          eventLog.push('grandParent: onResponderTerminate');
        },
        onResponderTerminationRequest() {
          eventLog.push('grandParent: onResponderTerminationRequest');
          return true;
        }
      };
      const parentCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('parent: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('parent: onStartShouldSetResponder');
          return false;
        },
        onMoveShouldSetResponderCapture() {
          eventLog.push('parent: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder() {
          eventLog.push('parent: onMoveShouldSetResponder');
          return true;
        },
        onResponderGrant() {
          eventLog.push('parent: onResponderGrant');
        },
        onResponderStart() {
          eventLog.push('parent: onResponderStart');
        },
        onResponderMove() {
          eventLog.push('parent: onResponderMove');
        },
        onResponderEnd() {
          eventLog.push('parent: onResponderEnd');
        },
        onResponderRelease() {
          eventLog.push('parent: onResponderRelease');
        },
        onResponderTerminate() {
          eventLog.push('parent: onResponderTerminate');
        },
        onResponderTerminationRequest() {
          eventLog.push('parent: onResponderTerminationRequest');
          return true;
        }
      };
      const targetCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('target: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('target: onStartShouldSetResponder');
          return true;
        },
        onMoveShouldSetResponderCapture() {
          eventLog.push('target: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder() {
          eventLog.push('target: onMoveShouldSetResponder');
          return false;
        },
        onResponderGrant() {
          eventLog.push('target: onResponderGrant');
        },
        onResponderStart() {
          eventLog.push('target: onResponderStart');
        },
        onResponderMove() {
          eventLog.push('target: onResponderMove');
        },
        onResponderEnd() {
          eventLog.push('target: onResponderEnd');
        },
        onResponderRelease() {
          eventLog.push('target: onResponderRelease');
        },
        onResponderTerminate() {
          eventLog.push('target: onResponderTerminate');
        },
        onResponderTerminationRequest() {
          eventLog.push('target: onResponderTerminationRequest');
          return true;
        }
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);

      // gesture start
      act(() => {
        target.pointerdown({ pointerType, pointerId: 1 });
      });
      // target becomes responder
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(eventLog).toEqual([
        'grandParent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponderCapture',
        'target: onStartShouldSetResponderCapture',
        'target: onStartShouldSetResponder',
        'target: onResponderGrant',
        'target: onResponderStart'
      ]);
      eventLog = [];
      // second gesture start
      act(() => {
        target.pointerdown({ pointerType, pointerId: 2 });
      });
      // target remains responder for start event
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(eventLog).toEqual([
        'grandParent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponder',
        'grandParent: onStartShouldSetResponder',
        'target: onResponderStart'
      ]);
      eventLog = [];
      // first move gesture
      act(() => {
        target.pointermove({ pointerType, pointerId: 1 });
      });
      // parent becomes responder, target terminates
      expect(responderSystem.getResponderNode()).toBe(parentRef.current);
      expect(eventLog).toEqual([
        'grandParent: onMoveShouldSetResponderCapture',
        'parent: onMoveShouldSetResponderCapture',
        'parent: onMoveShouldSetResponder',
        'target: onResponderTerminationRequest',
        'target: onResponderTerminate',
        'parent: onResponderGrant',
        'parent: onResponderMove'
      ]);
      eventLog = [];
      // second move gesture
      act(() => {
        target.pointermove({ pointerType, pointerId: 1 });
        target.pointermove({ pointerType, pointerId: 2 });
      });
      // grand parent becomes responder, parent terminates
      expect(responderSystem.getResponderNode()).toBe(grandParentRef.current);
      expect(eventLog).toEqual([
        'grandParent: onMoveShouldSetResponderCapture',
        'grandParent: onMoveShouldSetResponder',
        'parent: onResponderTerminationRequest',
        'parent: onResponderTerminate',
        'grandParent: onResponderGrant',
        'grandParent: onResponderMove',
        'grandParent: onResponderMove'
      ]);
      eventLog = [];
      // end gestures
      act(() => {
        target.pointerup({ pointerType, pointerId: 2 });
        target.pointerup({ pointerType, pointerId: 1 });
      });
      expect(responderSystem.getResponderNode()).toBe(null);
      expect(eventLog).toEqual([
        'grandParent: onResponderEnd',
        'grandParent: onResponderEnd',
        'grandParent: onResponderRelease'
      ]);
    });

    /**
     * If nothing is responder, then the negotiation should propagate directly to
     * the deepest target in the second touch. Once there are no more pointers
     * that started within the responder, it should be released (even if there are
     * active pointers elsewhere on the screen)
     */
    test('negotiates with deepest target on second touch if nothing is responder', () => {
      const pointerType = 'touch';
      let eventLog = [];
      const grandParentCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('grandParent: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('grandParent: onStartShouldSetResponder');
          return false;
        },
        onMoveShouldSetResponderCapture() {
          eventLog.push('grandParent: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder() {
          eventLog.push('grandParent: onMoveShouldSetResponder');
          return false;
        }
      };
      const parentCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('parent: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('parent: onStartShouldSetResponder');
          return false;
        },
        onMoveShouldSetResponderCapture() {
          eventLog.push('parent: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder() {
          eventLog.push('parent: onMoveShouldSetResponder');
          return false;
        }
      };
      const targetCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('target: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('target: onStartShouldSetResponder');
          return true;
        },
        onResponderGrant() {
          eventLog.push('target: onResponderGrant');
        },
        onResponderStart() {
          eventLog.push('target: onResponderStart');
        },
        onResponderMove() {
          eventLog.push('target: onResponderMove');
        },
        onResponderEnd() {
          eventLog.push('target: onResponderEnd');
        },
        onResponderRelease() {
          eventLog.push('target: onResponderRelease');
        }
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const parent = createEventTarget(parentRef.current);
      const target = createEventTarget(targetRef.current);

      // gesture start on parent
      act(() => {
        parent.pointerdown({ pointerType, pointerId: 1 });
      });
      // initially nothing wants to become the responder
      expect(responderSystem.getResponderNode()).toBe(null);
      expect(eventLog).toEqual([
        'grandParent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponder',
        'grandParent: onStartShouldSetResponder'
      ]);
      eventLog = [];
      // second gesture start on target
      act(() => {
        target.pointerdown({ pointerType, pointerId: 2 });
      });
      // target should become responder
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(eventLog).toEqual([
        'grandParent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponderCapture',
        'target: onStartShouldSetResponderCapture',
        'target: onStartShouldSetResponder',
        'target: onResponderGrant',
        'target: onResponderStart'
      ]);
      eventLog = [];
      // remove first touch, keep second touch that
      // started within the current responder (target).
      act(() => {
        parent.pointerup({ pointerType, pointerId: 1 });
      });
      // responder doesn't change, "end" event called on responder
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(eventLog).toEqual(['target: onResponderEnd']);
      eventLog = [];
      // add touch back on parent
      act(() => {
        parent.pointerdown({ pointerType, pointerId: 1 });
      });
      // responder doesn't change, "start" event called on responder
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(eventLog).toEqual([
        'grandParent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponder',
        'grandParent: onStartShouldSetResponder',
        'target: onResponderStart'
      ]);
      eventLog = [];
      // move touch on parent
      act(() => {
        parent.pointermove({ pointerType, pointerId: 1 });
      });
      // responder doesn't change, "move" event dispatched on responder
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(eventLog).toEqual([
        'grandParent: onMoveShouldSetResponderCapture',
        'parent: onMoveShouldSetResponderCapture',
        'parent: onMoveShouldSetResponder',
        'grandParent: onMoveShouldSetResponder',
        'target: onResponderMove'
      ]);
      eventLog = [];
      // remove touch that started within current responder
      act(() => {
        target.pointerup({ pointerType, pointerId: 2 });
      });
      // responder is released
      expect(responderSystem.getResponderNode()).toBe(null);
      expect(eventLog).toEqual(['target: onResponderEnd', 'target: onResponderRelease']);
    });

    /**
     * If a node is responder, then the negotiation with a sibling should
     * capture to and bubble from the first common ancestor.
     */
    test('negotiate from first common ancestor when there are siblings', () => {
      const pointerType = 'touch';
      let eventLog = [];
      const grandParentCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('grandParent: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('grandParent: onStartShouldSetResponder');
          return false;
        },
        onMoveShouldSetResponderCapture() {
          eventLog.push('grandParent: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder() {
          eventLog.push('grandParent: onMoveShouldSetResponder');
          return false;
        }
      };
      const parentCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('parent: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('parent: onStartShouldSetResponder');
          return false;
        },
        onMoveShouldSetResponderCapture() {
          eventLog.push('parent: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder() {
          eventLog.push('parent: onMoveShouldSetResponder');
          return false;
        },
        onResponderGrant() {
          eventLog.push('parent: onResponderGrant');
        },
        onResponderStart() {
          eventLog.push('parent: onResponderStart');
        }
      };
      const targetCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('target: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('target: onStartShouldSetResponder');
          return true;
        },
        onMoveShouldSetResponderCapture() {
          eventLog.push('target: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder() {
          eventLog.push('target: onMoveShouldSetResponder');
          return false;
        },
        onResponderGrant() {
          eventLog.push('target: onResponderGrant');
        },
        onResponderStart() {
          eventLog.push('target: onResponderStart');
        },
        onResponderMove() {
          eventLog.push('target: onResponderMove');
        }
      };
      const siblingCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('sibling: onStartShouldSetResponderCapture');
          return true;
        },
        onResponderGrant() {
          eventLog.push('sibling: onResponderGrant');
        },
        onResponderStart() {
          eventLog.push('sibling: onResponderStart');
        }
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        useResponderEvents(siblingRef, siblingCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
              <div ref={siblingRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      const sibling = createEventTarget(siblingRef.current);
      // gesture start on target
      act(() => {
        target.pointerdown({ pointerType, pointerId: 1 });
      });
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(eventLog).toEqual([
        'grandParent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponderCapture',
        'target: onStartShouldSetResponderCapture',
        'target: onStartShouldSetResponder',
        'target: onResponderGrant',
        'target: onResponderStart'
      ]);
      eventLog = [];
      // second gesture start on sibling
      act(() => {
        sibling.pointerdown({ pointerType, pointerId: 2 });
      });
      // target remains responder
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      // negotiates from first common ancestor of current responder and sibling (i.e., parent)
      expect(eventLog).toEqual([
        'grandParent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponder',
        'grandParent: onStartShouldSetResponder',
        'target: onResponderStart'
      ]);
      eventLog = [];
      // gesture move on target
      act(() => {
        target.pointermove({ pointerType, pointerId: 1 });
      });
      // target remains responder
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      // negotiates from first common ancestor
      expect(eventLog).toEqual([
        'grandParent: onMoveShouldSetResponderCapture',
        'parent: onMoveShouldSetResponderCapture',
        'parent: onMoveShouldSetResponder',
        'grandParent: onMoveShouldSetResponder',
        'target: onResponderMove'
      ]);
      eventLog = [];
      // gesture move on sibling
      act(() => {
        sibling.pointermove({ pointerType, pointerId: 2 });
      });
      // target remains responder
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      // negotiates from first common ancestor
      expect(eventLog).toEqual([
        'grandParent: onMoveShouldSetResponderCapture',
        'parent: onMoveShouldSetResponderCapture',
        'parent: onMoveShouldSetResponder',
        'grandParent: onMoveShouldSetResponder',
        'target: onResponderMove'
      ]);
    });

    /**
     * If siblings are connected to the responder system but have no ancestors
     * connected, there should be no negotiation between siblings after one
     * becomes the active responder.
     */
    test('no negotation between siblings with no responder ancestors', () => {
      const pointerType = 'mouse';
      const eventLog = [];

      const targetConfig = {
        onStartShouldSetResponderCapture(e) {
          eventLog.push('target: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder(e) {
          eventLog.push('target: onStartShouldSetResponder');
          return true;
        },
        onMoveShouldSetResponderCapture(e) {
          eventLog.push('target: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder(e) {
          eventLog.push('target: onMoveShouldSetResponder');
          return false;
        },
        onResponderGrant(e) {
          eventLog.push('target: onResponderGrant');
        },
        onResponderStart(e) {
          eventLog.push('target: onResponderStart');
        },
        onResponderMove(e) {
          eventLog.push('target: onResponderMove');
        }
      };
      const siblingConfig = {
        onStartShouldSetResponderCapture(e) {
          eventLog.push('sibling: onStartShouldSetResponderCapture');
          return true;
        },
        onStartShouldSetResponder(e) {
          eventLog.push('sibling: onStartShouldSetResponder');
          return true;
        },
        onMoveShouldSetResponderCapture(e) {
          eventLog.push('sibling: onMoveShouldSetResponderCapture');
          return true;
        },
        onMoveShouldSetResponder(e) {
          eventLog.push('sibling: onMoveShouldSetResponder');
          return true;
        },
        onResponderGrant(e) {
          eventLog.push('sibling: onResponderGrant');
        },
        onResponderStart(e) {
          eventLog.push('sibling: onResponderStart');
        },
        onResponderMove(e) {
          eventLog.push('sibling: onResponderMove');
        }
      };

      const Component = () => {
        useResponderEvents(targetRef, targetConfig);
        useResponderEvents(siblingRef, siblingConfig);
        return (
          <div id="grandParent">
            <div id="parent">
              <div id="target" ref={targetRef} />
              <div id="sibling" ref={siblingRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      const sibling = createEventTarget(siblingRef.current);
      // gesture start and move on target
      act(() => {
        target.pointerdown({ pointerType });
        target.pointermove({ pointerType });
        sibling.pointermove({ pointerType });
      });
      // target remains responder, no negotation occurs
      expect(eventLog).toEqual([
        'target: onStartShouldSetResponderCapture',
        'target: onStartShouldSetResponder',
        'target: onResponderGrant',
        'target: onResponderStart',
        'target: onResponderMove',
        'target: onResponderMove'
      ]);
    });

    /**
     * If a node is responder and it rejects a termination request, it
     * should continue to receive responder events.
     */
    test('negotiation rejects and current responder receives events', () => {
      const pointerType = 'touch';
      let eventLog = [];
      const grandParentCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('grandParent: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('grandParent: onStartShouldSetResponder');
          return false;
        },
        onMoveShouldSetResponderCapture() {
          eventLog.push('grandParent: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder() {
          eventLog.push('grandParent: onMoveShouldSetResponder');
          return false;
        }
      };
      const parentCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('parent: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('parent: onStartShouldSetResponder');
          return true;
        },
        onMoveShouldSetResponderCapture() {
          eventLog.push('parent: onMoveShouldSetResponderCapture');
          return false;
        },
        onMoveShouldSetResponder() {
          eventLog.push('parent: onMoveShouldSetResponder');
          return true;
        },
        onResponderReject() {
          eventLog.push('parent: onResponderReject');
        }
      };
      const targetCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('target: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('target: onStartShouldSetResponder');
          return true;
        },
        onResponderGrant() {
          eventLog.push('target: onResponderGrant');
        },
        onResponderStart() {
          eventLog.push('target: onResponderStart');
        },
        onResponderMove() {
          eventLog.push('target: onResponderMove');
        },
        onResponderTerminationRequest() {
          eventLog.push('target: onResponderTerminationRequest');
          return false;
        }
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      // first touch
      act(() => {
        target.pointerdown({ pointerType });
      });
      // target becomes responder
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(eventLog).toEqual([
        'grandParent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponderCapture',
        'target: onStartShouldSetResponderCapture',
        'target: onStartShouldSetResponder',
        'target: onResponderGrant',
        'target: onResponderStart'
      ]);
      eventLog = [];
      // move first touch
      act(() => {
        target.pointermove({ pointerType });
      });
      // target remains responder, parent was rejected
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(eventLog).toEqual([
        'grandParent: onMoveShouldSetResponderCapture',
        'parent: onMoveShouldSetResponderCapture',
        'parent: onMoveShouldSetResponder',
        'target: onResponderTerminationRequest',
        'parent: onResponderReject',
        'target: onResponderMove'
      ]);
      eventLog = [];
      // add second touch
      act(() => {
        target.pointerdown({ pointerType, pointerId: 2 });
      });
      // target remains responder, parent was rejected
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(eventLog).toEqual([
        'grandParent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponder',
        'target: onResponderTerminationRequest',
        'parent: onResponderReject',
        'target: onResponderStart'
      ]);
    });

    test('negotiate scroll', () => {
      const pointerType = 'touch';
      let eventLog = [];
      const grandParentCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('grandParent: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('grandParent: onStartShouldSetResponder');
          return false;
        },
        onScrollShouldSetResponderCapture() {
          eventLog.push('grandParent: onScrollShouldSetResponderCapture');
          return false;
        },
        onScrollShouldSetResponder() {
          eventLog.push('grandParent: onScrollShouldSetResponder');
          return false;
        }
      };
      const parentCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('parent: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('parent: onStartShouldSetResponder');
          return false;
        },
        onScrollShouldSetResponderCapture() {
          eventLog.push('parent: onScrollShouldSetResponderCapture');
          return false;
        },
        onScrollShouldSetResponder() {
          eventLog.push('parent: onScrollShouldSetResponder');
          return true;
        },
        onResponderGrant() {
          eventLog.push('parent: onResponderGrant');
        },
        onResponderReject() {
          eventLog.push('parent: onResponderReject');
        }
      };
      const targetCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('target: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('target: onStartShouldSetResponder');
          return true;
        },
        onResponderGrant() {
          eventLog.push('target: onResponderGrant');
        },
        onResponderStart() {
          eventLog.push('target: onResponderStart');
        },
        onResponderMove() {
          eventLog.push('target: onResponderMove');
        },
        onResponderTerminate() {
          eventLog.push('target: onResponderTerminate');
        },
        onResponderTerminationRequest() {
          eventLog.push('target: onResponderTerminationRequest');
          // responders can avoid termination only for scroll events
          return false;
        }
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      const parent = createEventTarget(parentRef.current);
      // first touch
      act(() => {
        target.pointerdown({ pointerType });
      });
      // target becomes responder
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(eventLog).toEqual([
        'grandParent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponderCapture',
        'target: onStartShouldSetResponderCapture',
        'target: onStartShouldSetResponder',
        'target: onResponderGrant',
        'target: onResponderStart'
      ]);
      eventLog = [];
      // then scroll
      act(() => {
        parent.scroll();
      });
      // target remains responder, parent rejected
      expect(responderSystem.getResponderNode()).toBe(targetRef.current);
      expect(eventLog).toEqual([
        'grandParent: onScrollShouldSetResponderCapture',
        'parent: onScrollShouldSetResponderCapture',
        'parent: onScrollShouldSetResponder',
        'target: onResponderTerminationRequest',
        'parent: onResponderReject'
      ]);
      eventLog = [];
      // now let the parent scroll take over
      targetCallbacks.onResponderTerminationRequest = function () {
        eventLog.push('target: onResponderTerminationRequest');
        return true;
      };
      // scroll
      act(() => {
        parent.scroll();
      });
      expect(responderSystem.getResponderNode()).toBe(parentRef.current);
      expect(eventLog).toEqual([
        'grandParent: onScrollShouldSetResponderCapture',
        'parent: onScrollShouldSetResponderCapture',
        'parent: onScrollShouldSetResponder',
        'target: onResponderTerminationRequest',
        'target: onResponderTerminate',
        'parent: onResponderGrant'
      ]);
    });

    test('event stopPropagation  ', () => {
      const pointerType = 'touch';
      const eventLog = [];
      const grandParentCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('grandParent: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('grandParent: onStartShouldSetResponder');
          return false;
        }
      };
      const parentCallbacks = {
        onStartShouldSetResponderCapture(e) {
          eventLog.push('parent: onStartShouldSetResponderCapture');
          e.stopPropagation();
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('parent: onStartShouldSetResponder');
          return false;
        }
      };
      const targetCallbacks = {
        onStartShouldSetResponderCapture() {
          eventLog.push('target: onStartShouldSetResponderCapture');
          return false;
        },
        onStartShouldSetResponder() {
          eventLog.push('target: onStartShouldSetResponder');
          return true;
        }
      };

      const Component = () => {
        useResponderEvents(grandParentRef, grandParentCallbacks);
        useResponderEvents(parentRef, parentCallbacks);
        useResponderEvents(targetRef, targetCallbacks);
        return (
          <div ref={grandParentRef}>
            <div ref={parentRef}>
              <div ref={targetRef} />
            </div>
          </div>
        );
      };

      // render
      act(() => {
        render(<Component />);
      });
      const target = createEventTarget(targetRef.current);
      act(() => {
        target.pointerdown({ pointerType });
      }); //
      expect(eventLog).toEqual([
        'grandParent: onStartShouldSetResponderCapture',
        'parent: onStartShouldSetResponderCapture'
      ]);
      expect(responderSystem.getResponderNode()).toBe(null);
    });
  });
});
