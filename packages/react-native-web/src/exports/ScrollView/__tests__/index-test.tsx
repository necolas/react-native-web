import { act, render, type RenderResult } from '@testing-library/react';
import { createEventTarget } from 'dom-event-testing-library';
import { createRef } from 'react';

import ScrollView, { type ScrollViewNode } from '../';

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
      const onScroll = vi.fn();
      const ref = createRef<ScrollViewNode>();
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

    test('is not called when descendant scrolls', () => {
      const onScroll = vi.fn();
      const ref = createRef<HTMLDivElement>();
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
      const ref = vi.fn();
      render(<ScrollView ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    test('is not called for prop changes', () => {
      const ref = vi.fn();
      let rerender: RenderResult['rerender'];
      act(() => {
        ({ rerender } = render(
          <ScrollView id="123" ref={ref} style={{ borderWidth: 5 }} />
        ));
      });
      expect(ref).toHaveBeenCalledOnce();
      act(() => {
        rerender(<ScrollView id="1234" ref={ref} style={{ borderWidth: 6 }} />);
      });
      expect(ref).toHaveBeenCalledOnce();
    });

    test('node has imperative methods', () => {
      const ref = createRef<ScrollViewNode>();
      act(() => {
        render(<ScrollView ref={ref} />);
      });
      const node = ref.current;

      // Did we get an HTMLElement?
      expect(node?.tagName === 'DIV').toBe(true);
      // Does it have the "platform" methods?
      expect(node?.measure).toBeTypeOf('function');
      expect(node?.measureLayout).toBeTypeOf('function');
      expect(node?.measureInWindow).toBeTypeOf('function');
      expect(node?.setNativeProps).toBeTypeOf('function');
      // Does it have the scrollview methods?
      expect(node?.getScrollResponder).toBeTypeOf('function');
      expect(node?.getScrollableNode).toBeTypeOf('function');
      expect(node?.getInnerViewNode).toBeTypeOf('function');
      expect(node?.getInnerViewRef).toBeTypeOf('function');
      expect(node?.getNativeScrollRef).toBeTypeOf('function');
      expect(node?.scrollTo).toBeTypeOf('function');
      expect(node?.scrollToEnd).toBeTypeOf('function');
      expect(node?.flashScrollIndicators).toBeTypeOf('function');
      expect(node?.scrollResponderZoomTo).toBeTypeOf('function');
      expect(node?.scrollResponderScrollNativeHandleToKeyboard).toBeTypeOf(
        'function'
      );
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
