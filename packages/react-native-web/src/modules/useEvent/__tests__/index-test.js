/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { createEventTarget } from 'dom-event-testing-library';
import useEvent from '..';

function createRoot(rootNode) {
  if (React.version.startsWith('18')) {
    return ReactDOMClient.createRoot(rootNode);
  } else {
    return {
      render(element) {
        ReactDOM.render(element, rootNode);
      }
    };
  }
}

describe('use-event', () => {
  let root;
  let rootNode;

  beforeEach(() => {
    rootNode = document.createElement('div');
    document.body.appendChild(rootNode);
    root = createRoot(rootNode);
  });

  afterEach(() => {
    root.render(null);
    document.body.removeChild(rootNode);
    rootNode = null;
    root = null;
  });

  describe('setListener()', () => {
    test('event dispatched on target', () => {
      const listener = jest.fn();
      const targetRef = React.createRef();

      function Component() {
        const addClickListener = useEvent('click');
        React.useEffect(() => {
          addClickListener(targetRef.current, listener);
        });
        return <div ref={targetRef} />;
      }

      act(() => {
        root.render(<Component />);
      });

      const target = createEventTarget(targetRef.current);

      act(() => {
        target.click();
      });

      expect(listener).toBeCalledTimes(1);
    });

    test('event dispatched on parent', () => {
      const listener = jest.fn();
      const listenerCapture = jest.fn();
      const targetRef = React.createRef();
      const parentRef = React.createRef();

      function Component() {
        const addClickListener = useEvent('click');
        const addClickCaptureListener = useEvent('click', { capture: true });

        React.useEffect(() => {
          addClickListener(targetRef.current, listener);
          addClickCaptureListener(targetRef.current, listenerCapture);
        });
        return (
          <div ref={parentRef}>
            <div ref={targetRef} />
          </div>
        );
      }

      act(() => {
        root.render(<Component />);
      });

      const parent = createEventTarget(parentRef.current);

      act(() => {
        parent.click();
      });

      expect(listener).toBeCalledTimes(0);
      expect(listenerCapture).toBeCalledTimes(0);
    });

    test('event dispatched on child', () => {
      const log = [];
      const listener = jest.fn(() => {
        log.push('bubble');
      });
      const listenerCapture = jest.fn(() => {
        log.push('capture');
      });
      const targetRef = React.createRef();
      const childRef = React.createRef();

      function Component() {
        const addClickListener = useEvent('click');
        const addClickCaptureListener = useEvent('click', { capture: true });

        React.useEffect(() => {
          addClickListener(targetRef.current, listener);
          addClickCaptureListener(targetRef.current, listenerCapture);
        });
        return (
          <div ref={targetRef}>
            <div ref={childRef} />
          </div>
        );
      }

      act(() => {
        root.render(<Component />);
      });

      const child = createEventTarget(childRef.current);

      act(() => {
        child.click();
      });

      expect(listenerCapture).toBeCalledTimes(1);
      expect(listener).toBeCalledTimes(1);
      expect(log).toEqual(['capture', 'bubble']);
    });

    test('event dispatched on text node', () => {
      const listener = jest.fn();
      const targetRef = React.createRef();
      const childRef = React.createRef();

      function Component() {
        const addClickListener = useEvent('click');
        React.useEffect(() => {
          addClickListener(targetRef.current, listener);
        });
        return (
          <div ref={targetRef}>
            <div ref={childRef}>text</div>
          </div>
        );
      }

      act(() => {
        root.render(<Component />);
      });

      const text = createEventTarget(childRef.current.firstChild);

      act(() => {
        text.click();
      });

      expect(listener).toBeCalledTimes(1);
    });

    test('listener can be attached to document ', () => {
      const listener = jest.fn();
      const targetRef = React.createRef();

      function Component({ target }) {
        const addClickListener = useEvent('click');
        React.useEffect(() => {
          addClickListener(target, listener);
        });
        return <div ref={targetRef} />;
      }

      act(() => {
        root.render(<Component target={document} />);
      });
      const target = createEventTarget(targetRef.current);
      act(() => {
        target.click();
      });

      expect(listener).toBeCalledTimes(1);
    });

    test('listener can be attached to window ', () => {
      const listener = jest.fn();
      const targetRef = React.createRef();

      function Component({ target }) {
        const addClickListener = useEvent('click');
        React.useEffect(() => {
          addClickListener(target, listener);
        });
        return <div ref={targetRef} />;
      }

      act(() => {
        root.render(<Component target={window} />);
      });
      const target = createEventTarget(targetRef.current);
      act(() => {
        target.click();
      });

      expect(listener).toBeCalledTimes(1);
    });

    test('listener is replaceable', () => {
      const listener = jest.fn();
      const listenerAlt = jest.fn();
      const targetRef = React.createRef();

      function Component({ onClick }) {
        const addClickListener = useEvent('click');
        React.useEffect(() => {
          addClickListener(targetRef.current, onClick);
        });
        return <div ref={targetRef} />;
      }

      act(() => {
        root.render(<Component onClick={listener} />);
      });
      const target = createEventTarget(targetRef.current);
      act(() => {
        target.click();
      });
      expect(listener).toBeCalledTimes(1);
      act(() => {
        // this should replace the listener
        root.render(<Component onClick={listenerAlt} />);
      });
      act(() => {
        target.click();
      });
      expect(listener).toBeCalledTimes(1);
      expect(listenerAlt).toBeCalledTimes(1);
    });

    test('listener is removed when value is null', () => {
      const listener = jest.fn();
      const targetRef = React.createRef();

      function Component({ off }) {
        const addClickListener = useEvent('click');
        React.useEffect(() => {
          addClickListener(targetRef.current, off ? null : listener);
        });
        return <div ref={targetRef} />;
      }

      act(() => {
        root.render(<Component off={false} />);
      });
      const target = createEventTarget(targetRef.current);
      act(() => {
        target.click();
      });
      expect(listener).toBeCalledTimes(1);
      act(() => {
        // this should unset the listener
        root.render(<Component off={true} />);
      });
      listener.mockClear();
      act(() => {
        target.click();
      });
      expect(listener).toBeCalledTimes(0);
    });

    test('custom event dispatched on target', () => {
      const listener = jest.fn();
      const targetRef = React.createRef();

      function Component() {
        const addMagicEventListener = useEvent('magic-event');
        React.useEffect(() => {
          addMagicEventListener(targetRef.current, listener);
        });
        return <div ref={targetRef} />;
      }

      act(() => {
        root.render(<Component />);
      });

      act(() => {
        const event = new CustomEvent('magic-event', { bubbles: true });
        targetRef.current.dispatchEvent(event);
      });

      expect(listener).toBeCalledTimes(1);
    });

    test('listeners can be set on multiple targets simultaneously', () => {
      const log = [];
      const targetRef = React.createRef();
      const parentRef = React.createRef();
      const childRef = React.createRef();

      const listener = jest.fn((e) => {
        log.push(['bubble', e.currentTarget.id]);
      });
      const listenerCapture = jest.fn((e) => {
        log.push(['capture', e.currentTarget.id]);
      });

      function Component() {
        const addClickListener = useEvent('click');
        const addClickCaptureListener = useEvent('click', { capture: true });
        React.useEffect(() => {
          // the same event handle is used to set listeners on different targets
          addClickListener(targetRef.current, listener);
          addClickListener(parentRef.current, listener);
          addClickCaptureListener(targetRef.current, listenerCapture);
          addClickCaptureListener(parentRef.current, listenerCapture);
        });
        return (
          <div id="parent" ref={parentRef}>
            <div id="target" ref={targetRef}>
              <div ref={childRef} />
            </div>
          </div>
        );
      }

      act(() => {
        root.render(<Component />);
      });

      const child = createEventTarget(childRef.current);

      act(() => {
        child.click();
      });

      expect(listenerCapture).toBeCalledTimes(2);
      expect(listener).toBeCalledTimes(2);
      expect(log).toEqual([
        ['capture', 'parent'],
        ['capture', 'target'],
        ['bubble', 'target'],
        ['bubble', 'parent']
      ]);
    });

    test('listeners are specific to each event handle', () => {
      const log = [];
      const targetRef = React.createRef();
      const childRef = React.createRef();

      const listener = jest.fn((e) => {
        log.push(['bubble', 'target']);
      });
      const listenerAlt = jest.fn((e) => {
        log.push(['bubble', 'target-alt']);
      });
      const listenerCapture = jest.fn((e) => {
        log.push(['capture', 'target']);
      });
      const listenerCaptureAlt = jest.fn((e) => {
        log.push(['capture', 'target-alt']);
      });

      function Component() {
        const addClickListener = useEvent('click');
        const addClickAltListener = useEvent('click');
        const addClickCaptureListener = useEvent('click', { capture: true });
        const addClickCaptureAltListener = useEvent('click', { capture: true });
        React.useEffect(() => {
          addClickListener(targetRef.current, listener);
          addClickAltListener(targetRef.current, listenerAlt);
          addClickCaptureListener(targetRef.current, listenerCapture);
          addClickCaptureAltListener(targetRef.current, listenerCaptureAlt);
        });
        return (
          <div id="target" ref={targetRef}>
            <div ref={childRef} />
          </div>
        );
      }

      act(() => {
        root.render(<Component />);
      });

      const child = createEventTarget(childRef.current);

      act(() => {
        child.click();
      });

      expect(listenerCapture).toBeCalledTimes(1);
      expect(listenerCaptureAlt).toBeCalledTimes(1);
      expect(listener).toBeCalledTimes(1);
      expect(listenerAlt).toBeCalledTimes(1);
      expect(log).toEqual([
        ['capture', 'target'],
        ['capture', 'target-alt'],
        ['bubble', 'target'],
        ['bubble', 'target-alt']
      ]);
    });
  });

  describe('cleanup', () => {
    test('removes all listeners for given event type from targets', () => {
      const clickListener = jest.fn();
      function Component() {
        const addClickListener = useEvent('click');
        React.useEffect(() => {
          addClickListener(document, clickListener);
        });
        return <div />;
      }

      act(() => {
        root.render(<Component />);
        root.render(null);
      });

      const target = createEventTarget(document);

      act(() => {
        target.click();
      });

      expect(clickListener).toBeCalledTimes(0);
    });
  });

  describe('stopPropagation and stopImmediatePropagation', () => {
    test('stopPropagation works as expected', () => {
      const childListener = jest.fn((e) => {
        e.stopPropagation();
      });
      const targetListener = jest.fn();
      const targetRef = React.createRef();
      const childRef = React.createRef();

      function Component() {
        const addClickListener = useEvent('click');
        React.useEffect(() => {
          addClickListener(childRef.current, childListener);
          addClickListener(targetRef.current, targetListener);
        });
        return (
          <div ref={targetRef}>
            <div ref={childRef} />
          </div>
        );
      }

      act(() => {
        root.render(<Component />);
      });

      const child = createEventTarget(childRef.current);

      act(() => {
        child.click();
      });

      expect(childListener).toBeCalledTimes(1);
      expect(targetListener).toBeCalledTimes(0);
    });

    test('stopImmediatePropagation works as expected', () => {
      const firstListener = jest.fn((e) => {
        e.stopImmediatePropagation();
      });
      const secondListener = jest.fn();
      const targetRef = React.createRef();

      function Component() {
        const addFirstClickListener = useEvent('click');
        const addSecondClickListener = useEvent('click');
        React.useEffect(() => {
          addFirstClickListener(targetRef.current, firstListener);
          addSecondClickListener(targetRef.current, secondListener);
        });
        return <div ref={targetRef} />;
      }

      act(() => {
        root.render(<Component />);
      });

      const target = createEventTarget(targetRef.current);

      act(() => {
        target.click();
      });

      expect(firstListener).toBeCalledTimes(1);
      expect(secondListener).toBeCalledTimes(0);
    });
  });
});
