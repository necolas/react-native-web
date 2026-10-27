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
import useAnimatedColor from '..';

describe('useAnimatedColor', () => {
  test('returns an Animated.Color with the initial value', () => {
    let value;

    function Component(): React.Node {
      value = useAnimatedColor({ r: 255, g: 0, b: 0, a: 1 });
      return null;
    }

    render(<Component />);
    expect(value).toBeInstanceOf(Animated.Color);
    expect(value && value.__getValue()).toBe('rgba(255, 0, 0, 1)');
  });

  test('returns the same instance across rerenders', () => {
    const values = [];

    function Component({ inputValue }): React.Node {
      values.push(useAnimatedColor(inputValue));
      return null;
    }

    const { rerender } = render(
      <Component inputValue={{ r: 0, g: 0, b: 0, a: 1 }} />
    );
    rerender(<Component inputValue={{ r: 255, g: 255, b: 255, a: 1 }} />);
    expect(values).toHaveLength(2);
    expect(values[0]).toBe(values[1]);
    expect(values[1].__getValue()).toBe('rgba(0, 0, 0, 1)');
  });
});
