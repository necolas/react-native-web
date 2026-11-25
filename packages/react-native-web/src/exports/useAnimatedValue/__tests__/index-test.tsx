/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import type { ReactNode } from 'react';

import useAnimatedValue from '..';
import Animated from '../../Animated';

describe('useAnimatedValue', () => {
  test('returns an Animated.Value with the initial value', () => {
    let value: ReturnType<typeof useAnimatedValue> | undefined;

    function Component(): ReactNode {
      value = useAnimatedValue(5);
      return null;
    }

    render(<Component />);
    expect(value).toBeInstanceOf(Animated.Value);
    expect(value && value.__getValue()).toBe(5);
  });

  test('returns the same instance across rerenders', () => {
    const values: Array<ReturnType<typeof useAnimatedValue>> = [];

    function Component({
      initialValue
    }: {
      initialValue: Parameters<typeof useAnimatedValue>[0];
    }): ReactNode {
      values.push(useAnimatedValue(initialValue));
      return null;
    }

    const { rerender } = render(<Component initialValue={0} />);
    rerender(<Component initialValue={10} />);
    expect(values).toHaveLength(2);
    expect(values[0]).toBe(values[1]);
    expect(values[1].__getValue()).toBe(0);
  });
});
