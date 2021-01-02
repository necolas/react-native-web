/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act } from 'react-dom/test-utils';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  describeWithPointerEvent,
  clearPointers,
  createEventTarget,
  setPointerEvent,
} from 'dom-event-testing-library';
import useHover from '..';
import { testOnly_resetActiveModality } from '../../modality';

function createRoot(rootNode) {
  return {
    render(element) {
      ReactDOM.render(element, rootNode);
    },
  };
}

describeWithPointerEvent('useHover', (hasPointerEvents) => {
  let root;
  let rootNode;

  beforeEach(() => {
    setPointerEvent(hasPointerEvents);
    rootNode = document.createElement('div');
    document.body.appendChild(rootNode);
    root = createRoot(rootNode);
  });

  afterEach(() => {
    root.render(null);
    document.body.removeChild(rootNode);
    rootNode = null;
    root = null;
    testOnly_resetActiveModality();
    // make sure all tests reset state machine tracking pointers on the mock surface
    clearPointers();
  });

  describe('contain', () => {
    let onHoverChange, onHoverStart, onHoverUpdate, onHoverEnd, ref, childRef;

    const componentInit = () => {
      onHoverChange = jest.fn();
      onHoverStart = jest.fn();
      onHoverUpdate = jest.fn();
      onHoverEnd = jest.fn();
      ref = React.createRef();
      childRef = React.createRef();
      const Component = () => {
        useHover(ref, {
          onHoverChange,
          onHoverStart,
          onHoverUpdate,
          onHoverEnd,
        });
        useHover(childRef, { contain: true });
        return (
          <div ref={ref}>
            <div ref={childRef} />
          </div>
        );
      };
      act(() => {
        root.render(<Component />);
      });
    };

    test('contains the hover gesture', () => {
      componentInit();
      const target = createEventTarget(ref.current);
      const child = createEventTarget(childRef.current);
      act(() => {
        target.pointerover();
        target.pointerout();
        child.pointerover();
      });
      expect(onHoverEnd).toBeCalled();
      act(() => {
        child.pointerout();
      });
      expect(onHoverStart).toBeCalled();
    });
  });

  describe('disabled', () => {
    let onHoverChange, onHoverStart, onHoverUpdate, onHoverEnd, ref;

    const componentInit = () => {
      onHoverChange = jest.fn();
      onHoverStart = jest.fn();
      onHoverUpdate = jest.fn();
      onHoverEnd = jest.fn();
      ref = React.createRef();
      const Component = () => {
        useHover(ref, {
          disabled: true,
          onHoverChange,
          onHoverStart,
          onHoverUpdate,
          onHoverEnd,
        });
        return <div ref={ref} />;
      };
      act(() => {
        root.render(<Component />);
      });
    };

    test('does not call callbacks', () => {
      componentInit();
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerover();
        target.pointerout();
      });
      expect(onHoverChange).not.toBeCalled();
      expect(onHoverStart).not.toBeCalled();
      expect(onHoverUpdate).not.toBeCalled();
      expect(onHoverEnd).not.toBeCalled();
    });
  });

  describe('onHoverStart', () => {
    let onHoverStart, ref;

    const componentInit = () => {
      onHoverStart = jest.fn();
      ref = React.createRef();
      const Component = () => {
        useHover(ref, { onHoverStart });
        return <div ref={ref} />;
      };
      act(() => {
        root.render(<Component />);
      });
    };

    test('is called for mouse pointers', () => {
      componentInit();
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerover({ pointerType: 'mouse' });
      });
      expect(onHoverStart).toBeCalledTimes(1);
    });

    test('is not called for touch pointers', () => {
      componentInit();
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerdown({ pointerType: 'touch' });
        target.pointerup({ pointerType: 'touch' });
      });
      expect(onHoverStart).not.toBeCalled();
    });

    test('is called if a mouse pointer is used after a touch pointer', () => {
      componentInit();
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerdown({ pointerType: 'touch' });
        target.pointerup({ pointerType: 'touch' });
        target.pointerover({ pointerType: 'mouse' });
      });
      expect(onHoverStart).toBeCalledTimes(1);
    });
  });

  describe('onHoverChange', () => {
    let onHoverChange, ref;

    const componentInit = () => {
      onHoverChange = jest.fn();
      ref = React.createRef();
      const Component = () => {
        useHover(ref, { onHoverChange });
        return <div ref={ref} />;
      };
      act(() => {
        root.render(<Component />);
      });
    };

    test('is called for mouse pointers', () => {
      componentInit();
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerover();
      });
      expect(onHoverChange).toBeCalledTimes(1);
      expect(onHoverChange).toBeCalledWith(true);
      act(() => {
        target.pointerout();
      });
      expect(onHoverChange).toBeCalledTimes(2);
      expect(onHoverChange).toBeCalledWith(false);
    });

    test('is not called for touch pointers', () => {
      componentInit();
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerdown({ pointerType: 'touch' });
        target.pointerup({ pointerType: 'touch' });
      });
      expect(onHoverChange).not.toBeCalled();
    });
  });

  describe('onHoverEnd', () => {
    let onHoverEnd, ref, childRef;

    const componentInit = () => {
      onHoverEnd = jest.fn();
      ref = React.createRef();
      childRef = React.createRef();
      const Component = () => {
        useHover(ref, { onHoverEnd });
        return (
          <div ref={ref}>
            <div ref={childRef} />
          </div>
        );
      };
      act(() => {
        root.render(<Component />);
      });
    };

    test('is called for mouse pointers', () => {
      componentInit();
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerover();
        target.pointerout();
      });
      expect(onHoverEnd).toBeCalledTimes(1);
    });

    test('is not called for touch pointers', () => {
      componentInit();
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerdown({ pointerType: 'touch' });
        target.pointerup({ pointerType: 'touch' });
      });
      expect(onHoverEnd).not.toBeCalled();
    });

    test('is not called when entering children of the target', () => {
      componentInit();
      const target = createEventTarget(ref.current);
      const child = createEventTarget(childRef.current);
      act(() => {
        target.pointerover();
        target.pointerout({ relatedTarget: childRef.current });
        child.pointerover({ relatedTarget: target.node });
      });
      expect(onHoverEnd).not.toBeCalled();
    });
  });

  describe('onHoverUpdate', () => {
    test('is called after the active pointer moves"', () => {
      const onHoverUpdate = jest.fn();
      const ref = React.createRef();
      const Component = () => {
        useHover(ref, { onHoverUpdate });
        return <div ref={ref} />;
      };
      act(() => {
        root.render(<Component />);
      });

      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerover();
        target.pointerhover({ x: 0, y: 0 });
        target.pointerhover({ x: 1, y: 1 });
      });
      expect(onHoverUpdate).toBeCalledTimes(2);
    });
  });

  describe('repeat use', () => {
    let onHoverChange, onHoverStart, onHoverUpdate, onHoverEnd, ref;

    const componentInit = () => {
      onHoverChange = jest.fn();
      onHoverStart = jest.fn();
      onHoverUpdate = jest.fn();
      onHoverEnd = jest.fn();
      ref = React.createRef();
      const Component = () => {
        useHover(ref, {
          onHoverChange,
          onHoverStart,
          onHoverUpdate,
          onHoverEnd,
        });
        return <div ref={ref} />;
      };
      act(() => {
        root.render(<Component />);
      });
    };

    test('callbacks are called each time', () => {
      componentInit();
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerover();
        target.pointerhover({ x: 1, y: 1 });
        target.pointerout();
      });
      expect(onHoverStart).toBeCalledTimes(1);
      expect(onHoverUpdate).toBeCalledTimes(1);
      expect(onHoverEnd).toBeCalledTimes(1);
      expect(onHoverChange).toBeCalledTimes(2);
      act(() => {
        target.pointerover();
        target.pointerhover({ x: 1, y: 1 });
        target.pointerout();
      });
      expect(onHoverStart).toBeCalledTimes(2);
      expect(onHoverUpdate).toBeCalledTimes(2);
      expect(onHoverEnd).toBeCalledTimes(2);
      expect(onHoverChange).toBeCalledTimes(4);
    });
  });
});
