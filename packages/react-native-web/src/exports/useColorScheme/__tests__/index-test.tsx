/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, render } from '@testing-library/react';
import { type ReactNode, useEffect } from 'react';

import useColorScheme from '..';
import Appearance from '../../Appearance';

describe('useColorScheme', () => {
  afterEach(() => {
    Appearance.setColorScheme('auto');
  });

  test('keeps its subscription active across rerenders', () => {
    const remove = vi.fn();
    const addChangeListener = vi
      .spyOn(Appearance, 'addChangeListener')
      .mockReturnValue({ remove });

    function Component({ label }: { label: string }): ReactNode {
      const colorScheme = useColorScheme();
      return <div>{`${label}:${colorScheme}`}</div>;
    }

    const { rerender, unmount } = render(<Component label="first" />);
    expect(addChangeListener).toHaveBeenCalledOnce();
    expect(remove).not.toHaveBeenCalled();

    rerender(<Component label="second" />);
    expect(addChangeListener).toHaveBeenCalledOnce();
    expect(remove).not.toHaveBeenCalled();

    unmount();
    expect(remove).toHaveBeenCalledOnce();
  });

  test('returns the color scheme set by a child mount effect', () => {
    function Child(): ReactNode {
      useEffect(() => {
        Appearance.setColorScheme('dark');
      }, []);
      return null;
    }

    function Parent(): ReactNode {
      const colorScheme = useColorScheme();
      return (
        <div>
          {colorScheme}
          <Child />
        </div>
      );
    }

    const { container } = render(<Parent />);
    expect(container.textContent).toBe('dark');

    act(() => {
      Appearance.setColorScheme('light');
    });
    expect(container.textContent).toBe('light');
  });
});
