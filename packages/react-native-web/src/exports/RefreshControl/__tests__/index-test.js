/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Pressable from '../../Pressable';
import React from 'react';
import RefreshControl from '..';
import { act, render } from '@testing-library/react';
import { createEventTarget } from 'dom-event-testing-library';

function getCircle(container) {
  return container.querySelector('[role="progressbar"]').parentNode;
}

function getIndicator(container) {
  return getCircle(container).parentNode;
}

function renderWithContent(props) {
  const result = render(
    <RefreshControl refreshing={false} {...props}>
      <div data-testid="content" />
    </RefreshControl>
  );
  const content = result.getByTestId('content');
  return { ...result, content, target: createEventTarget(content) };
}

// Moves one finger from (0, 0) to (x, y). The "end" event lifts the finger.
function pull(target, { end = 'pointerup', preventDefault, x = 0, y }) {
  act(() => {
    target.pointerdown({ pointerType: 'touch', x: 0, y: 0 });
    target.pointermove({ pointerType: 'touch', preventDefault, x, y });
    if (end != null) {
      target[end]({ pointerType: 'touch', x, y });
    }
  });
}

describe('components/RefreshControl', () => {
  test('renders the children', () => {
    const { getByTestId } = render(
      <RefreshControl refreshing={false}>
        <div data-testid="child" />
      </RefreshControl>
    );
    expect(getByTestId('child')).not.toBeNull();
  });

  describe('pull to refresh', () => {
    test('a pull past the threshold calls "onRefresh"', () => {
      const onRefresh = jest.fn();
      const { target } = renderWithContent({ onRefresh });
      pull(target, { y: 200 });
      expect(onRefresh).toHaveBeenCalledTimes(1);
    });

    test('a pull stops the browser scroll', () => {
      const preventDefault = jest.fn();
      const { target } = renderWithContent({ onRefresh: () => {} });
      pull(target, { preventDefault, y: 200 });
      expect(preventDefault).toHaveBeenCalled();
    });

    test('the indicator follows the pull and goes back on release', () => {
      const { container, target } = renderWithContent({ onRefresh: () => {} });
      pull(target, { end: null, y: 100 });
      const indicator = getIndicator(container);
      // The finger moves 100px and the indicator moves 50px from -40px.
      expect(indicator.style.transform).toBe('translateY(10px)');
      expect(indicator.getAttribute('aria-hidden')).not.toBe('true');
      act(() => {
        target.pointerup({ pointerType: 'touch', x: 0, y: 100 });
      });
      expect(indicator.style.transform).toBe('translateY(-40px)');
      expect(indicator.getAttribute('aria-hidden')).toBe('true');
    });

    test('a short pull does not call "onRefresh"', () => {
      const onRefresh = jest.fn();
      const { target } = renderWithContent({ onRefresh });
      pull(target, { y: 100 });
      expect(onRefresh).not.toHaveBeenCalled();
    });

    test('a canceled pull does not call "onRefresh"', () => {
      const onRefresh = jest.fn();
      const { target } = renderWithContent({ onRefresh });
      pull(target, { end: 'pointercancel', y: 200 });
      expect(onRefresh).not.toHaveBeenCalled();
    });

    test('an upward move does not start a pull', () => {
      const onRefresh = jest.fn();
      const preventDefault = jest.fn();
      const { target } = renderWithContent({ onRefresh });
      pull(target, { preventDefault, y: -200 });
      expect(onRefresh).not.toHaveBeenCalled();
      expect(preventDefault).not.toHaveBeenCalled();
    });

    test('a sideways move does not start a pull', () => {
      const onRefresh = jest.fn();
      const preventDefault = jest.fn();
      const { target } = renderWithContent({ onRefresh });
      pull(target, { preventDefault, x: 200, y: 150 });
      expect(onRefresh).not.toHaveBeenCalled();
      expect(preventDefault).not.toHaveBeenCalled();
    });

    test('a pull does not start when the content is not at the top', () => {
      const onRefresh = jest.fn();
      const preventDefault = jest.fn();
      const { content, target } = renderWithContent({ onRefresh });
      Object.defineProperty(content, 'scrollTop', { value: 10 });
      pull(target, { preventDefault, y: 200 });
      expect(onRefresh).not.toHaveBeenCalled();
      expect(preventDefault).not.toHaveBeenCalled();
    });

    test('a pull in a vertically flipped refresh control moves up', () => {
      const onRefresh = jest.fn();
      const { target } = renderWithContent({
        onRefresh,
        style: { transform: 'matrix(1, 0, 0, -1, 0, 0)' }
      });
      pull(target, { y: 200 });
      expect(onRefresh).not.toHaveBeenCalled();
      pull(target, { y: -200 });
      expect(onRefresh).toHaveBeenCalledTimes(1);
    });

    test('a pull ends the press of a pressable item', () => {
      const onPressIn = jest.fn();
      const onPressOut = jest.fn();
      const { getByTestId } = render(
        <RefreshControl onRefresh={() => {}} refreshing={false}>
          <Pressable
            delayPressIn={0}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            testID="item"
          />
        </RefreshControl>
      );
      pull(createEventTarget(getByTestId('item')), { end: null, y: 200 });
      expect(onPressIn).toHaveBeenCalledTimes(1);
      expect(onPressOut).toHaveBeenCalledTimes(1);
    });
  });

  describe('prop "colors"', () => {
    test('first color is the indicator color', () => {
      const { container } = render(
        <RefreshControl colors={['red', 'blue']} refreshing={true} />
      );
      expect(container.querySelector('circle').style.stroke).toBe('red');
    });

    test('takes priority over "tintColor"', () => {
      const { container } = render(
        <RefreshControl colors={['red']} refreshing={true} tintColor="green" />
      );
      expect(container.querySelector('circle').style.stroke).toBe('red');
    });
  });

  test('prop "progressBackgroundColor"', () => {
    const { container } = render(
      <RefreshControl progressBackgroundColor="yellow" refreshing={true} />
    );
    const circle = getCircle(container);
    expect(circle.style.backgroundColor).toBe('rgb(255, 255, 0)');
  });

  test('prop "progressViewOffset"', () => {
    const { container } = render(
      <RefreshControl progressViewOffset={60} refreshing={true} />
    );
    const indicator = getIndicator(container);
    expect(indicator.style.transform).toBe('translateY(84px)');
  });

  test('prop "enabled" is "false"', () => {
    const onRefresh = jest.fn();
    const preventDefault = jest.fn();
    const { target } = renderWithContent({ enabled: false, onRefresh });
    pull(target, { preventDefault, y: 200 });
    expect(onRefresh).not.toHaveBeenCalled();
    expect(preventDefault).not.toHaveBeenCalled();
  });

  describe('prop "refreshing"', () => {
    test('is "true"', () => {
      const { container } = render(<RefreshControl refreshing={true} />);
      const indicator = getIndicator(container);
      expect(indicator.getAttribute('aria-hidden')).not.toBe('true');
      expect(indicator.style.opacity).toBe('1');
      expect(indicator.style.transform).toBe('translateY(24px)');
    });

    test('is "false"', () => {
      const { container } = render(<RefreshControl refreshing={false} />);
      const indicator = getIndicator(container);
      expect(indicator.getAttribute('aria-hidden')).toBe('true');
      expect(indicator.style.opacity).toBe('0');
      expect(indicator.style.transform).toBe('translateY(-40px)');
    });

    test('a pull does not start while "refreshing" is "true"', () => {
      const onRefresh = jest.fn();
      const { target } = renderWithContent({ onRefresh, refreshing: true });
      pull(target, { y: 200 });
      expect(onRefresh).not.toHaveBeenCalled();
    });
  });

  describe('prop "size"', () => {
    test('is "default"', () => {
      const { container } = render(<RefreshControl refreshing={true} />);
      const circle = getCircle(container);
      expect(getComputedStyle(circle).width).toBe('40px');
    });

    test('is "large"', () => {
      const { container } = render(
        <RefreshControl refreshing={true} size="large" />
      );
      const circle = getCircle(container);
      expect(getComputedStyle(circle).width).toBe('56px');
    });

    test('is 1', () => {
      const { container } = render(
        <RefreshControl refreshing={true} size={1} />
      );
      const circle = getCircle(container);
      expect(getComputedStyle(circle).width).toBe('56px');
    });
  });

  test('prop "tintColor"', () => {
    const { container } = render(
      <RefreshControl refreshing={true} tintColor="green" />
    );
    expect(container.querySelector('circle').style.stroke).toBe('green');
  });
});
