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
import Animated from '../../Animated';
import useAnimatedValueXY from '..';

describe('useAnimatedValueXY', () => {
  test('returns an Animated.ValueXY with the initial value', () => {
    let value;

    function Component(): React.Node {
      value = useAnimatedValueXY({ x: 1, y: 2 });
      return null;
    }

    render(<Component />);
    expect(value).toBeInstanceOf(Animated.ValueXY);
    expect(value && value.__getValue()).toEqual({ x: 1, y: 2 });
  });

  test('returns the same instance across rerenders', () => {
    const values = [];

    function Component({ initialValue }): React.Node {
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
