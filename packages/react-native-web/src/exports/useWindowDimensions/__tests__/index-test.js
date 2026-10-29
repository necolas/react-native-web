/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { act, render } from '@testing-library/react';
import useWindowDimensions from '..';

function Component() {
  const { width, height } = useWindowDimensions();
  return <div>{`${width}x${height}`}</div>;
}

describe('useWindowDimensions', () => {
  const { innerWidth, innerHeight } = window;

  afterEach(() => {
    act(() => {
      window.innerWidth = innerWidth;
      window.innerHeight = innerHeight;
      window.dispatchEvent(new Event('resize'));
    });
  });

  test('returns the window dimensions', () => {
    const { container } = render(<Component />);
    expect(container.textContent).toBe(`${innerWidth}x${innerHeight}`);
  });

  test('updates when the window is resized', () => {
    const { container } = render(<Component />);
    act(() => {
      window.innerWidth = 320;
      window.innerHeight = 480;
      window.dispatchEvent(new Event('resize'));
    });
    expect(container.textContent).toBe('320x480');
  });

  test('matches the server HTML during hydration', async () => {
    const container = document.createElement('div');
    container.innerHTML = '<div>0x0</div>';
    document.body.appendChild(container);
    const onRecoverableError = jest.fn();

    let root;

    await act(async () => {
      root = hydrateRoot(container, <Component />, { onRecoverableError });
    });

    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(container.textContent).toBe(`${innerWidth}x${innerHeight}`);

    act(() => {
      root.unmount();
    });

    document.body.removeChild(container);
  });
});
