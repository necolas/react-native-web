import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import VirtualizedList from '../';

function mockScrollMetrics(node, offset, length, horizontal = false) {
  const clientLength = 100;
  let current = offset;
  Object.defineProperties(node, {
    [horizontal ? 'clientWidth' : 'clientHeight']: {
      configurable: true,
      value: clientLength
    },
    [horizontal ? 'scrollWidth' : 'scrollHeight']: {
      configurable: true,
      value: length
    },
    [horizontal ? 'scrollLeft' : 'scrollTop']: {
      configurable: true,
      get: () => current,
      set: (value) => {
        current = Math.max(0, Math.min(value, length - clientLength));
      }
    }
  });
}

function renderList({ horizontal = false, inverted = true } = {}) {
  return render(
    <VirtualizedList
      data={[0]}
      getItem={(data, index) => data[index]}
      getItemCount={(data) => data.length}
      getItemLayout={(data, index) => ({ length: 500, offset: 0, index })}
      horizontal={horizontal}
      inverted={inverted}
      keyExtractor={String}
      renderItem={() => <div data-testid="nested" />}
      testID="list"
    />
  );
}

function wheel(target, delta, horizontal = false) {
  const event = new WheelEvent('wheel', {
    bubbles: true,
    cancelable: true,
    [horizontal ? 'deltaX' : 'deltaY']: delta
  });
  fireEvent(target, event);
  return event;
}

describe('components/VirtualizedList', () => {
  describe('prop "inverted"', () => {
    test('wheel over the list itself scrolls in the inverted direction', () => {
      const { getByTestId } = renderList();
      const list = getByTestId('list');
      mockScrollMetrics(list, 200, 500);
      expect(wheel(list, 20).defaultPrevented).toBe(true);
      expect(list.scrollTop).toBe(180);
    });

    test('wheel over the list itself near the end does not oscillate', () => {
      const { getByTestId } = renderList();
      const list = getByTestId('list');
      mockScrollMetrics(list, 390, 500);
      expect(wheel(list, 20).defaultPrevented).toBe(true);
      expect(list.scrollTop).toBe(370);
    });

    test('wheel over a nested scrollable scrolls it first, then the list', () => {
      const { getByTestId } = renderList();
      const list = getByTestId('list');
      const nested = getByTestId('nested');
      mockScrollMetrics(list, 200, 500);
      mockScrollMetrics(nested, 195, 300);
      expect(wheel(nested, 20).defaultPrevented).toBe(true);
      expect(nested.scrollTop).toBe(200);
      expect(list.scrollTop).toBe(185);
    });

    test('horizontal wheel over the list itself scrolls in the inverted direction', () => {
      const { getByTestId } = renderList({ horizontal: true });
      const list = getByTestId('list');
      mockScrollMetrics(list, 200, 500, true);
      expect(wheel(list, 20, true).defaultPrevented).toBe(true);
      expect(list.scrollLeft).toBe(180);
    });

    test('wheel over a non-inverted list is left to the browser', () => {
      const { getByTestId } = renderList({ inverted: false });
      const list = getByTestId('list');
      mockScrollMetrics(list, 200, 500);
      expect(wheel(list, 20).defaultPrevented).toBe(false);
      expect(list.scrollTop).toBe(200);
    });

    test('negative wheel over a nested scrollable scrolls it first, then the list', () => {
      const { getByTestId } = renderList();
      const list = getByTestId('list');
      const nested = getByTestId('nested');
      mockScrollMetrics(list, 200, 500);
      mockScrollMetrics(nested, 5, 300);
      expect(wheel(nested, -20).defaultPrevented).toBe(true);
      expect(nested.scrollTop).toBe(0);
      expect(list.scrollTop).toBe(215);
    });
  });
});
