import React from 'react';
import ScrollView from '../';
import { act } from 'react-dom/test-utils';
import { createEventTarget } from 'dom-event-testing-library';
import { findDOMNode } from 'react-dom';
import { render } from '@testing-library/react';

describe('components/ScrollView', () => {
  describe('prop "onScroll"', () => {
    test('is called when element scrolls', () => {
      const onScroll = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<ScrollView onScroll={onScroll} ref={ref} scrollEventThrottle={16} />);
      });
      const target = createEventTarget(findDOMNode(ref.current));
      act(() => {
        target.scroll();
        target.scroll();
      });
      expect(onScroll).toBeCalled();
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
      expect(onScroll).not.toBeCalled();
    });
  });
});
