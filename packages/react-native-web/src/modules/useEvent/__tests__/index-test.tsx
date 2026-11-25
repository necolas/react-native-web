/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, render } from '@testing-library/react';
import { createEventTarget } from 'dom-event-testing-library';
import { createRef, useEffect } from 'react';
import { assert } from 'vitest';

import useEvent from '..';

type ElementEvent = Event & { currentTarget: HTMLElement };

describe('use-event', () => {
  describe('setListener()', () => {
    test('event dispatched on target', () => {
      const listener = vi.fn();
      const targetRef = createRef<HTMLDivElement>();

      function Component() {
        const addClickListener = useEvent('click');
        useEffect(() => {
          assert(targetRef.current != null);
          addClickListener(targetRef.current, listener);
        });
        return <div ref={targetRef} />;
      }

      render(<Component />);

      const target = createEventTarget(targetRef.current);

      act(() => {
        target.click();
      });

      expect(listener).toHaveBeenCalledOnce();
    });

    test('event dispatched on parent', () => {
      const listener = vi.fn();
      const listenerCapture = vi.fn();
      const targetRef = createRef<HTMLDivElement>();
      const parentRef = createRef<HTMLDivElement>();

      function Component() {
        const addClickListener = useEvent('click');
        const addClickCaptureListener = useEvent('click', { capture: true });

        useEffect(() => {
          assert(targetRef.current != null);
          addClickListener(targetRef.current, listener);
          addClickCaptureListener(targetRef.current, listenerCapture);
        });
        return (
          <div ref={parentRef}>
            <div ref={targetRef} />
          </div>
        );
      }

      render(<Component />);

      const parent = createEventTarget(parentRef.current);

      act(() => {
        parent.click();
      });

      expect(listener).not.toHaveBeenCalled();
      expect(listenerCapture).not.toHaveBeenCalled();
    });

    test('event dispatched on child', () => {
      const log: string[] = [];
      const listener = vi.fn(() => {
        log.push('bubble');
      });
      const listenerCapture = vi.fn(() => {
        log.push('capture');
      });
      const targetRef = createRef<HTMLDivElement>();
      const childRef = createRef<HTMLDivElement>();

      function Component() {
        const addClickListener = useEvent('click');
        const addClickCaptureListener = useEvent('click', { capture: true });

        useEffect(() => {
          assert(targetRef.current != null);
          addClickListener(targetRef.current, listener);
          addClickCaptureListener(targetRef.current, listenerCapture);
        });
        return (
          <div ref={targetRef}>
            <div ref={childRef} />
          </div>
        );
      }

      render(<Component />);

      const child = createEventTarget(childRef.current);

      act(() => {
        child.click();
      });

      expect(listenerCapture).toHaveBeenCalledOnce();
      expect(listener).toHaveBeenCalledOnce();
      expect(log).toEqual(['capture', 'bubble']);
    });

    test('event dispatched on text node', () => {
      const listener = vi.fn();
      const targetRef = createRef<HTMLDivElement>();
      const childRef = createRef<HTMLDivElement>();

      function Component() {
        const addClickListener = useEvent('click');
        useEffect(() => {
          assert(targetRef.current != null);
          addClickListener(targetRef.current, listener);
        });
        return (
          <div ref={targetRef}>
            <div ref={childRef}>text</div>
          </div>
        );
      }

      render(<Component />);

      const text = createEventTarget(childRef.current?.firstChild);

      act(() => {
        text.click();
      });

      expect(listener).toHaveBeenCalledOnce();
    });

    test('listener can be attached to document ', () => {
      const listener = vi.fn();
      const targetRef = createRef<HTMLDivElement>();

      function Component({ target }: { target: EventTarget }) {
        const addClickListener = useEvent('click');
        useEffect(() => {
          addClickListener(target, listener);
        });
        return <div ref={targetRef} />;
      }

      render(<Component target={document} />);

      const target = createEventTarget(targetRef.current);
      act(() => {
        target.click();
      });

      expect(listener).toHaveBeenCalledOnce();
    });

    test('listener can be attached to window ', () => {
      const listener = vi.fn();
      const targetRef = createRef<HTMLDivElement>();

      function Component({ target }: { target: EventTarget }) {
        const addClickListener = useEvent('click');
        useEffect(() => {
          addClickListener(target, listener);
        });
        return <div ref={targetRef} />;
      }

      render(<Component target={window} />);

      const target = createEventTarget(targetRef.current);
      act(() => {
        target.click();
      });

      expect(listener).toHaveBeenCalledOnce();
    });

    test('listener is replaceable', () => {
      const listener = vi.fn();
      const listenerAlt = vi.fn();
      const targetRef = createRef<HTMLDivElement>();

      function Component({ onClick }: { onClick: (e: Event) => void }) {
        const addClickListener = useEvent('click');
        useEffect(() => {
          assert(targetRef.current != null);
          addClickListener(targetRef.current, onClick);
        });
        return <div ref={targetRef} />;
      }

      const { rerender } = render(<Component onClick={listener} />);

      const target = createEventTarget(targetRef.current);
      act(() => {
        target.click();
      });
      expect(listener).toHaveBeenCalledOnce();

      rerender(<Component onClick={listenerAlt} />);

      act(() => {
        target.click();
      });
      expect(listener).toHaveBeenCalledOnce();
      expect(listenerAlt).toHaveBeenCalledOnce();
    });

    test('listener is removed when value is null', () => {
      const listener = vi.fn();
      const targetRef = createRef<HTMLDivElement>();

      function Component({ off }: { off: boolean }) {
        const addClickListener = useEvent('click');
        useEffect(() => {
          assert(targetRef.current != null);
          addClickListener(targetRef.current, off ? null : listener);
        });
        return <div ref={targetRef} />;
      }

      const { unmount } = render(<Component off={false} />);

      const target = createEventTarget(targetRef.current);
      act(() => {
        target.click();
      });
      expect(listener).toHaveBeenCalledOnce();

      // this should unset the listener
      unmount();

      listener.mockClear();
      act(() => {
        target.click();
      });
      expect(listener).not.toHaveBeenCalled();
    });

    test('custom event dispatched on target', () => {
      const listener = vi.fn();
      const targetRef = createRef<HTMLDivElement>();

      function Component() {
        const addMagicEventListener = useEvent('magic-event');
        useEffect(() => {
          assert(targetRef.current != null);
          addMagicEventListener(targetRef.current, listener);
        });
        return <div ref={targetRef} />;
      }

      render(<Component />);

      act(() => {
        const event = new CustomEvent('magic-event', { bubbles: true });
        targetRef.current?.dispatchEvent(event);
      });

      expect(listener).toHaveBeenCalledOnce();
    });

    test('listeners can be set on multiple targets simultaneously', () => {
      const log: [string, string][] = [];
      const targetRef = createRef<HTMLDivElement>();
      const parentRef = createRef<HTMLDivElement>();
      const childRef = createRef<HTMLDivElement>();

      const listener = vi.fn((e: ElementEvent) => {
        log.push(['bubble', e.currentTarget.id]);
      });
      const listenerCapture = vi.fn((e: ElementEvent) => {
        log.push(['capture', e.currentTarget.id]);
      });

      function Component() {
        const addClickListener = useEvent<ElementEvent>('click');
        const addClickCaptureListener = useEvent<ElementEvent>('click', {
          capture: true
        });
        useEffect(() => {
          assert(targetRef.current != null);
          assert(parentRef.current != null);
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

      render(<Component />);

      const child = createEventTarget(childRef.current);

      act(() => {
        child.click();
      });

      expect(listenerCapture).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenCalledTimes(2);
      expect(log).toEqual([
        ['capture', 'parent'],
        ['capture', 'target'],
        ['bubble', 'target'],
        ['bubble', 'parent']
      ]);
    });

    test('listeners are specific to each event handle', () => {
      const log: [string, string][] = [];
      const targetRef = createRef<HTMLDivElement>();
      const childRef = createRef<HTMLDivElement>();

      const listener = vi.fn((e: Event) => {
        log.push(['bubble', 'target']);
      });
      const listenerAlt = vi.fn((e: Event) => {
        log.push(['bubble', 'target-alt']);
      });
      const listenerCapture = vi.fn((e: Event) => {
        log.push(['capture', 'target']);
      });
      const listenerCaptureAlt = vi.fn((e: Event) => {
        log.push(['capture', 'target-alt']);
      });

      function Component() {
        const addClickListener = useEvent('click');
        const addClickAltListener = useEvent('click');
        const addClickCaptureListener = useEvent('click', { capture: true });
        const addClickCaptureAltListener = useEvent('click', { capture: true });
        useEffect(() => {
          assert(targetRef.current != null);
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

      render(<Component />);

      const child = createEventTarget(childRef.current);

      act(() => {
        child.click();
      });

      expect(listenerCapture).toHaveBeenCalledOnce();
      expect(listenerCaptureAlt).toHaveBeenCalledOnce();
      expect(listener).toHaveBeenCalledOnce();
      expect(listenerAlt).toHaveBeenCalledOnce();
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
      const clickListener = vi.fn();
      function Component() {
        const addClickListener = useEvent('click');
        useEffect(() => {
          addClickListener(document, clickListener);
        });
        return <div />;
      }

      const { unmount } = render(<Component />);
      unmount();

      const target = createEventTarget(document);

      act(() => {
        target.click();
      });

      expect(clickListener).not.toHaveBeenCalled();
    });
  });

  describe('stopPropagation and stopImmediatePropagation', () => {
    test('stopPropagation works as expected', () => {
      const childListener = vi.fn((e: Event) => {
        e.stopPropagation();
      });
      const targetListener = vi.fn();
      const targetRef = createRef<HTMLDivElement>();
      const childRef = createRef<HTMLDivElement>();

      function Component() {
        const addClickListener = useEvent('click');
        useEffect(() => {
          assert(childRef.current != null);
          assert(targetRef.current != null);
          addClickListener(childRef.current, childListener);
          addClickListener(targetRef.current, targetListener);
        });
        return (
          <div ref={targetRef}>
            <div ref={childRef} />
          </div>
        );
      }

      render(<Component />);

      const child = createEventTarget(childRef.current);

      act(() => {
        child.click();
      });

      expect(childListener).toHaveBeenCalledOnce();
      expect(targetListener).not.toHaveBeenCalled();
    });

    test('stopImmediatePropagation works as expected', () => {
      const firstListener = vi.fn((e: Event) => {
        e.stopImmediatePropagation();
      });
      const secondListener = vi.fn();
      const targetRef = createRef<HTMLDivElement>();

      function Component() {
        const addFirstClickListener = useEvent('click');
        const addSecondClickListener = useEvent('click');
        useEffect(() => {
          assert(targetRef.current != null);
          addFirstClickListener(targetRef.current, firstListener);
          addSecondClickListener(targetRef.current, secondListener);
        });
        return <div ref={targetRef} />;
      }

      render(<Component />);

      const target = createEventTarget(targetRef.current);

      act(() => {
        target.click();
      });

      expect(firstListener).toHaveBeenCalledOnce();
      expect(secondListener).not.toHaveBeenCalled();
    });
  });
});
