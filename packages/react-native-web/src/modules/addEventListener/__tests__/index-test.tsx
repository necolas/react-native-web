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

import { addEventListener } from '..';

describe('addEventListener', () => {
  describe('addEventListener()', () => {
    test('event dispatched on target', () => {
      const listener = vi.fn();
      const targetRef = createRef<HTMLDivElement>();

      function Component() {
        useEffect(() => {
          assert(targetRef.current != null);
          return addEventListener(targetRef.current, 'click', listener);
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
        useEffect(() => {
          assert(targetRef.current != null);
          const removeClickListener = addEventListener(
            targetRef.current,
            'click',
            listener
          );
          const removeClickCaptureListener = addEventListener(
            targetRef.current,
            'click',
            listenerCapture,
            { capture: true }
          );
          return () => {
            removeClickListener();
            removeClickCaptureListener();
          };
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
        useEffect(() => {
          assert(targetRef.current != null);
          const removeClickListener = addEventListener(
            targetRef.current,
            'click',
            listener
          );
          const removeClickCaptureListener = addEventListener(
            targetRef.current,
            'click',
            listenerCapture,
            { capture: true }
          );
          return () => {
            removeClickListener();
            removeClickCaptureListener();
          };
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
        useEffect(() => {
          assert(targetRef.current != null);
          return addEventListener(targetRef.current, 'click', listener);
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

    test('listener can be attached to document', () => {
      const listener = vi.fn();
      const targetRef = createRef<HTMLDivElement>();

      function Component({ target }: { target: EventTarget }) {
        useEffect(() => {
          return addEventListener(target, 'click', listener);
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
        useEffect(() => {
          return addEventListener(target, 'click', listener);
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

    test('custom event dispatched on target', () => {
      const listener = vi.fn();
      const targetRef = createRef<HTMLDivElement>();

      function Component() {
        useEffect(() => {
          assert(targetRef.current != null);
          return addEventListener(targetRef.current, 'magic-event', listener);
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

      const listener = vi.fn((e: Event & { currentTarget: HTMLElement }) => {
        log.push(['bubble', e.currentTarget.id]);
      });
      const listenerCapture = vi.fn(
        (e: Event & { currentTarget: HTMLElement }) => {
          log.push(['capture', e.currentTarget.id]);
        }
      );

      function Component() {
        useEffect(() => {
          assert(targetRef.current != null);
          assert(parentRef.current != null);
          // the same event handle is used to set listeners on different targets
          addEventListener(targetRef.current, 'click', listener);
          addEventListener(parentRef.current, 'click', listener);
          addEventListener(targetRef.current, 'click', listenerCapture, {
            capture: true
          });
          addEventListener(parentRef.current, 'click', listenerCapture, {
            capture: true
          });
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
        useEffect(() => {
          assert(targetRef.current != null);
          addEventListener(targetRef.current, 'click', listener);
          addEventListener(targetRef.current, 'click', listenerAlt);
          addEventListener(targetRef.current, 'click', listenerCapture, {
            capture: true
          });
          addEventListener(targetRef.current, 'click', listenerCaptureAlt, {
            capture: true
          });
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

  describe('stopPropagation and stopImmediatePropagation', () => {
    test('stopPropagation works as expected', () => {
      const childListener = vi.fn((e: Event) => {
        e.stopPropagation();
      });
      const targetListener = vi.fn();
      const targetRef = createRef<HTMLDivElement>();
      const childRef = createRef<HTMLDivElement>();

      function Component() {
        useEffect(() => {
          assert(childRef.current != null);
          assert(targetRef.current != null);
          addEventListener(childRef.current, 'click', childListener);
          addEventListener(targetRef.current, 'click', targetListener);
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
        useEffect(() => {
          assert(targetRef.current != null);
          addEventListener(targetRef.current, 'click', firstListener);
          addEventListener(targetRef.current, 'click', secondListener);
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
