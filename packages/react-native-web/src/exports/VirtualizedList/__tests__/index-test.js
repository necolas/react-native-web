import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import VirtualizedList from '../';

function mockScrollMetrics(node, scrollTop, scrollHeight) {
  const clientHeight = 100;
  let current = scrollTop;
  Object.defineProperties(node, {
    clientHeight: { configurable: true, value: clientHeight },
    scrollHeight: { configurable: true, value: scrollHeight },
    scrollTop: {
      configurable: true,
      get: () => current,
      set: (value) => {
        current = Math.max(0, Math.min(value, scrollHeight - clientHeight));
      }
    }
  });
}

function renderInvertedList() {
  return render(
    <VirtualizedList
      data={[0]}
      getItem={(data, index) => data[index]}
      getItemCount={(data) => data.length}
      getItemLayout={(data, index) => ({ length: 500, offset: 0, index })}
      inverted
      keyExtractor={String}
      renderItem={() => <div data-testid="nested" />}
      testID="list"
    />
  );
}

function wheel(target, deltaY) {
  fireEvent(
    target,
    new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY })
  );
}

describe('components/VirtualizedList', () => {
  describe('prop "inverted"', () => {
    test('wheel over the list itself scrolls in the inverted direction', () => {
      const { getByTestId } = renderInvertedList();
      const list = getByTestId('list');
      mockScrollMetrics(list, 200, 500);
      wheel(list, 20);
      expect(list.scrollTop).toBe(180);
    });

    test('wheel over the list itself near the end does not oscillate', () => {
      const { getByTestId } = renderInvertedList();
      const list = getByTestId('list');
      mockScrollMetrics(list, 390, 500);
      wheel(list, 20);
      expect(list.scrollTop).toBe(370);
    });

    test('wheel over a nested scrollable scrolls it first, then the list', () => {
      const { getByTestId } = renderInvertedList();
      const list = getByTestId('list');
      const nested = getByTestId('nested');
      mockScrollMetrics(list, 200, 500);
      mockScrollMetrics(nested, 195, 300);
      wheel(nested, 20);
      expect(nested.scrollTop).toBe(200);
      expect(list.scrollTop).toBe(185);
    });
  });
});
