/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup, render } from '@testing-library/react';
import useMergeRefs from '..';

describe('modules/useMergeRefs', () => {
  function TestComponent({ refs, ...rest }) {
    const mergedRef = useMergeRefs(...refs);
    return <div ref={mergedRef} {...rest} />;
  }

  afterEach(cleanup);

  it('handles no refs', () => {
    act(() => {
      render(<TestComponent refs={[]} />);
    });
  });

  test('merges any number of varying refs', () => {
    const callbackRefs = Array(10).map(() => jest.fn());
    const objectRefs = Array(10).map(() => ({ current: null }));
    const nullRefs = Array(10).map(() => null);

    act(() => {
      render(<TestComponent refs={[...callbackRefs, ...objectRefs, ...nullRefs]} />);
    });

    callbackRefs.forEach(ref => {
      expect(ref).toHaveBeenCalledTimes(1);
    });

    objectRefs.forEach(ref => {
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  test('ref is called when ref changes', () => {
    const ref = jest.fn();
    const nextRef = jest.fn();
    let rerender;

    act(() => {
      ({ rerender } = render(<TestComponent refs={[ref]} />));
    });
    expect(ref).toHaveBeenCalled();
    act(() => {
      rerender(<TestComponent refs={[nextRef]} />);
    });
    expect(nextRef).toHaveBeenCalled();
  });

  test('ref is not called for each rerender', () => {
    const ref = jest.fn();
    let rerender;

    act(() => {
      ({ rerender } = render(<TestComponent refs={[ref]} />));
    });
    expect(ref).toHaveBeenCalledTimes(1);
    act(() => {
      rerender(<TestComponent refs={[ref]} />);
    });
    expect(ref).toHaveBeenCalledTimes(1);
  });

  test('ref is not called for props changes', () => {
    const ref = jest.fn();
    let rerender;

    act(() => {
      ({ rerender } = render(<TestComponent id="foo" refs={[ref]} />));
    });
    expect(ref).toHaveBeenCalledTimes(1);
    act(() => {
      rerender(<TestComponent id="bar" refs={[ref]} />);
    });
    expect(ref).toHaveBeenCalledTimes(1);
  });
});
