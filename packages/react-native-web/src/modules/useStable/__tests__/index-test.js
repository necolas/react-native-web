/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import useStable from '..';

describe('useStable', () => {
  let spy = {};

  const TestComponent = ({ initialValueCallback }): React.Node => {
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
    expect(spy.value).toBe(null);
    rerender(<TestComponent initialValueCallback={initialValueCallback} />);
    expect(spy.value).toBe(null);
  });
});
