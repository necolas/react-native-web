/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import RefreshControl from '..';
import { render } from '@testing-library/react';

function getCircle(container) {
  return container.querySelector('[role="progressbar"]').parentNode;
}

function getIndicator(container) {
  return getCircle(container).parentNode;
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
