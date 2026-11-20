import React from 'react';
import ScrollView from '../';
import { createEventTarget } from 'dom-event-testing-library';
import { act, render } from '@testing-library/react';

describe('components/ScrollView', () => {
  describe('prop "centerContent"', () => {
    test('without', () => {
      const { container } = render(
        <ScrollView style={{ backgroundColor: 'blue' }} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('with', () => {
      const { container } = render(
        <ScrollView centerContent style={{ backgroundColor: 'blue' }} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onScroll"', () => {
    test('is called when element scrolls', () => {
      const onScroll = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(
          <ScrollView onScroll={onScroll} ref={ref} scrollEventThrottle={16} />
        );
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.scroll();
        target.scroll();
      });
      expect(onScroll).toHaveBeenCalled();
    });

    test('does not call the pending scroll-end handler after unmount', () => {
      const onScroll = jest.fn();
      const ref = React.createRef();
      const { unmount } = render(
        <ScrollView onScroll={onScroll} ref={ref} scrollEventThrottle={16} />
      );
      act(() => createEventTarget(ref.current).scroll());
      expect(onScroll).toHaveBeenCalledTimes(1);
      unmount();
      act(() => jest.advanceTimersByTime(100));
      expect(onScroll).toHaveBeenCalledTimes(1);
    });

    test('clears the latest scroll-end timer after repeated scrolls in StrictMode', () => {
      const onScroll = jest.fn();
      const ref = React.createRef();
      const { unmount } = render(
        <React.StrictMode>
          <ScrollView onScroll={onScroll} ref={ref} scrollEventThrottle={16} />
        </React.StrictMode>
      );
      act(() => createEventTarget(ref.current).scroll());
      act(() => jest.advanceTimersByTime(50));
      act(() => createEventTarget(ref.current).scroll());
      expect(onScroll).toHaveBeenCalledTimes(2);
      unmount();
      act(() => jest.advanceTimersByTime(100));
      expect(onScroll).toHaveBeenCalledTimes(2);
    });

    test('unmounting one ScrollView preserves another scroll-end timer', () => {
      const first = jest.fn();
      const second = jest.fn();
      const firstRef = React.createRef();
      const secondRef = React.createRef();
      const App = ({ showFirst }) => (
        <>
          {showFirst && (
            <ScrollView
              key="first"
              onScroll={first}
              ref={firstRef}
              scrollEventThrottle={16}
            />
          )}
          <ScrollView
            key="second"
            onScroll={second}
            ref={secondRef}
            scrollEventThrottle={16}
          />
        </>
      );
      const { rerender } = render(<App showFirst={true} />);
      act(() => {
        createEventTarget(firstRef.current).scroll();
        createEventTarget(secondRef.current).scroll();
      });
      rerender(<App showFirst={false} />);
      act(() => jest.advanceTimersByTime(100));
      expect(first).toHaveBeenCalledTimes(1);
      expect(second).toHaveBeenCalledTimes(2);
    });

    test('calls the final scroll handler while mounted', () => {
      const onScroll = jest.fn();
      const ref = React.createRef();
      render(
        <ScrollView onScroll={onScroll} ref={ref} scrollEventThrottle={16} />
      );
      act(() => createEventTarget(ref.current).scroll());
      expect(onScroll).toHaveBeenCalledTimes(1);
      act(() => jest.advanceTimersByTime(100));
      expect(onScroll).toHaveBeenCalledTimes(2);
    });

    test('is not called when descendant scrolls', () => {
      const onScroll = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(
          <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
            <div ref={ref} />
          </ScrollView>
        );
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.scroll();
      });
      expect(onScroll).not.toHaveBeenCalled();
    });
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = jest.fn();
      render(<ScrollView ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    test('is not called for prop changes', () => {
      const ref = jest.fn();
      let rerender;
      act(() => {
        ({ rerender } = render(
          <ScrollView id="123" ref={ref} style={{ borderWidth: 5 }} />
        ));
      });
      expect(ref).toHaveBeenCalledTimes(1);
      act(() => {
        rerender(<ScrollView id="1234" ref={ref} style={{ borderWidth: 6 }} />);
      });
      expect(ref).toHaveBeenCalledTimes(1);
    });

    test('node has imperative methods', () => {
      const ref = React.createRef();
      act(() => {
        render(<ScrollView ref={ref} />);
      });
      const node = ref.current;

      // Did we get an HTMLElement?
      expect(node.tagName === 'DIV').toBe(true);
      // Does it have the "platform" methods?
      expect(typeof node.measure === 'function').toBe(true);
      expect(typeof node.measureLayout === 'function').toBe(true);
      expect(typeof node.measureInWindow === 'function').toBe(true);
      expect(typeof node.setNativeProps === 'function').toBe(true);
      // Does it have the scrollview methods?
      expect(typeof node.getScrollResponder === 'function').toBe(true);
      expect(typeof node.getScrollableNode === 'function').toBe(true);
      expect(typeof node.getInnerViewNode === 'function').toBe(true);
      expect(typeof node.getInnerViewRef === 'function').toBe(true);
      expect(typeof node.getNativeScrollRef === 'function').toBe(true);
      expect(typeof node.scrollTo === 'function').toBe(true);
      expect(typeof node.scrollToEnd === 'function').toBe(true);
      expect(typeof node.flashScrollIndicators === 'function').toBe(true);
      expect(typeof node.scrollResponderZoomTo === 'function').toBe(true);
      expect(
        typeof node.scrollResponderScrollNativeHandleToKeyboard === 'function'
      ).toBe(true);
    });
  });

  describe('prop "refreshControl"', () => {
    test('without', () => {
      const { container } = render(
        <ScrollView style={{ backgroundColor: 'red' }} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('with', () => {
      const { container } = render(
        <ScrollView
          refreshControl={<div id="refresh-control" />}
          style={{ backgroundColor: 'red' }}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
