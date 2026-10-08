import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import VirtualizedList from '../';

function setScrollMetrics(node, horizontal, offset, length = 500) {
  const position = horizontal ? 'scrollLeft' : 'scrollTop';
  let current = offset;
  Object.defineProperties(node, {
    [horizontal ? 'scrollWidth' : 'scrollHeight']: {
      configurable: true,
      value: length
    },
    [horizontal ? 'clientWidth' : 'clientHeight']: {
      configurable: true,
      value: 100
    },
    [position]: {
      configurable: true,
      get: () => current,
      set: (value) => {
        current = Math.max(0, Math.min(value, length - 100));
      }
    }
  });
  return () => current;
}

describe.each([false, true])(
  'VirtualizedList inverted wheel, horizontal=%s',
  (horizontal) => {
    function setup(inverted = true) {
      const { getByTestId } = render(
        <VirtualizedList
          data={[0]}
          getItem={(data, index) => data[index]}
          getItemCount={(data) => data.length}
          getItemLayout={(data, index) => ({ length: 500, offset: 0, index })}
          horizontal={horizontal}
          inverted={inverted}
          keyExtractor={String}
          renderItem={() => (
            <div data-testid="item">
              <div data-testid="nested">Nested scrollable</div>
            </div>
          )}
          testID="list"
        />
      );
      const list = getByTestId('list');
      const position = setScrollMetrics(list, horizontal, 200);
      return { list, position, getByTestId };
    }

    function wheel(target, delta) {
      const event = new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        [horizontal ? 'deltaX' : 'deltaY']: delta
      });
      fireEvent(target, event);
      return event;
    }

    test.each([
      [200, 20, 180],
      [200, -20, 220],
      [390, 20, 370]
    ])(
      'scrolls its own surface from %s by inverted delta %s',
      (offset, delta, expected) => {
        const { list } = setup();
        const position = setScrollMetrics(list, horizontal, offset);
        const event = wheel(list, delta);
        expect(position()).toBe(expected);
        expect(event.defaultPrevented).toBe(true);
      }
    );

    test('inverts a wheel over a non-scrollable row', () => {
      const { position, getByTestId } = setup();
      const item = getByTestId('item');
      setScrollMetrics(item, horizontal, 0, 100);
      expect(wheel(item, 20).defaultPrevented).toBe(true);
      expect(position()).toBe(180);
    });

    test.each([
      [50, 20, 70, 200],
      [195, 20, 200, 185],
      [5, -20, 0, 215]
    ])(
      'consumes a descendant at %s before passing leftover delta %s',
      (offset, delta, expectedChild, expectedList) => {
        const { position, getByTestId } = setup();
        const nested = getByTestId('nested');
        const childPosition = setScrollMetrics(nested, horizontal, offset, 300);
        expect(wheel(nested, delta).defaultPrevented).toBe(true);
        expect(childPosition()).toBe(expectedChild);
        expect(position()).toBe(expectedList);
      }
    );

    test('leaves non-inverted wheel scrolling to the browser', () => {
      const { list, position } = setup(false);
      expect(wheel(list, 20).defaultPrevented).toBe(false);
      expect(position()).toBe(200);
    });
  }
);
