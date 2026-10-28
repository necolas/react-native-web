/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import useElementLayout from '..';

describe('modules/useElementLayout', () => {
  const observe = jest.fn();
  const unobserve = jest.fn();

  beforeAll(() => {
    window.ResizeObserver = jest.fn(() => ({ observe, unobserve }));
  });

  afterAll(() => {
    delete window.ResizeObserver;
  });

  beforeEach(() => {
    observe.mockClear();
    unobserve.mockClear();
  });

  const Component = ({ onLayout }) => {
    const ref = React.useRef(null);
    useElementLayout(ref, onLayout);
    return <div ref={ref} />;
  };

  test('observes the node when "onLayout" is set', () => {
    render(<Component onLayout={() => {}} />);
    expect(observe).toHaveBeenCalledTimes(1);
  });

  test('does not observe the node when "onLayout" is not set', () => {
    render(<Component />);
    expect(observe).not.toHaveBeenCalled();
  });

  test('observes the node when "onLayout" is added after mount', () => {
    const { rerender } = render(<Component />);
    rerender(<Component onLayout={() => {}} />);
    expect(observe).toHaveBeenCalledTimes(1);
  });

  test('unobserves the node when "onLayout" is removed', () => {
    const { rerender } = render(<Component onLayout={() => {}} />);
    rerender(<Component />);
    expect(unobserve).toHaveBeenCalledTimes(1);
  });

  test('does not observe again when "onLayout" changes', () => {
    const { rerender } = render(<Component onLayout={() => {}} />);
    rerender(<Component onLayout={() => {}} />);
    expect(observe).toHaveBeenCalledTimes(1);
    expect(unobserve).not.toHaveBeenCalled();
  });
});
