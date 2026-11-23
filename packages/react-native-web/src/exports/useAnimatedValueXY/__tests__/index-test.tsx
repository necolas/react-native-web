/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import * as React from 'react';

import useAnimatedValueXY from '..';
import Animated from '../../Animated';

describe('useAnimatedValueXY', () => {
  test('returns an Animated.ValueXY with the initial value', () => {
    let value: ReturnType<typeof useAnimatedValueXY> | undefined;

    function Component(): React.ReactNode {
      value = useAnimatedValueXY({ x: 1, y: 2 });
      return null;
    }

    render(<Component />);
    expect(value).toBeInstanceOf(Animated.ValueXY);
    expect(value && value.__getValue()).toEqual({ x: 1, y: 2 });
  });

  test('returns the same instance across rerenders', () => {
    const values: Array<ReturnType<typeof useAnimatedValueXY>> = [];

    function Component({
      initialValue
    }: {
      initialValue: Parameters<typeof useAnimatedValueXY>[0];
    }): React.ReactNode {
      values.push(useAnimatedValueXY(initialValue));
      return null;
    }

    const { rerender } = render(<Component initialValue={{ x: 0, y: 0 }} />);
    rerender(<Component initialValue={{ x: 10, y: 10 }} />);
    expect(values).toHaveLength(2);
    expect(values[0]).toBe(values[1]);
    expect(values[1].__getValue()).toEqual({ x: 0, y: 0 });
  });
});
