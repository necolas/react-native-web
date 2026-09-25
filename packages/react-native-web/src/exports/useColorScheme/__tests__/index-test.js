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
import Appearance from '../../Appearance';
import useColorScheme from '..';

describe('useColorScheme', () => {
  test('keeps its subscription active across rerenders', () => {
    const remove = jest.fn();
    const addChangeListener = jest
      .spyOn(Appearance, 'addChangeListener')
      .mockReturnValue({ remove });

    function Component({ label }): React.Node {
      const colorScheme = useColorScheme();
      return <div>{`${label}:${colorScheme}`}</div>;
    }

    const { rerender, unmount } = render(<Component label="first" />);
    expect(addChangeListener).toHaveBeenCalledTimes(1);
    expect(remove).not.toHaveBeenCalled();

    rerender(<Component label="second" />);
    expect(addChangeListener).toHaveBeenCalledTimes(1);
    expect(remove).not.toHaveBeenCalled();

    unmount();
    expect(remove).toHaveBeenCalledTimes(1);
  });
});
