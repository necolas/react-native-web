/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import type { ReactNode } from 'react';

import useStable from '..';

describe('useStable', () => {
  let spy: { value?: number | null } = {};

  const TestComponent = ({
    initialValueCallback
  }: {
    initialValueCallback: () => number | null;
  }): ReactNode => {
    const value = useStable(initialValueCallback);
    spy.value = value;
    return null;
  };

  beforeEach(() => {
    spy = {};
  });

  test('correctly sets the initial value', () => {
    const initialValueCallback = () => 5;
    render(<TestComponent initialValueCallback={initialValueCallback} />);
    expect(spy.value).toBe(5);
  });

  test('does not change the value', () => {
    let counter = 0;
    const initialValueCallback = () => counter++;
    const { rerender } = render(
      <TestComponent initialValueCallback={initialValueCallback} />
    );
    expect(spy.value).toBe(0);
    rerender(<TestComponent initialValueCallback={initialValueCallback} />);
    expect(spy.value).toBe(0);
  });

  test('only calls the callback once', () => {
    let counter = 0;
    const initialValueCallback = () => counter++;
    const { rerender } = render(
      <TestComponent initialValueCallback={initialValueCallback} />
    );
    expect(counter).toBe(1);
    rerender(<TestComponent initialValueCallback={initialValueCallback} />);
    expect(counter).toBe(1);
  });

  test('does not change the value if the callback initially returns null', () => {
    let counter = 0;
    const initialValueCallback = () => {
      if (counter === 0) {
        counter++;
        return null;
      }
      return counter++;
    };
    const { rerender } = render(
      <TestComponent initialValueCallback={initialValueCallback} />
    );
    expect(spy.value).toBeNull();
    rerender(<TestComponent initialValueCallback={initialValueCallback} />);
    expect(spy.value).toBeNull();
  });
});
