/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, render, type RenderResult } from '@testing-library/react';
import { createRef, type Ref } from 'react';

import useMergeRefs from '..';
import type { Nullable } from '../../../types';

describe('modules/useMergeRefs', () => {
  function TestComponent({
    refs,
    ...rest
  }: {
    refs: ReadonlyArray<Nullable<Ref<HTMLDivElement>>>;
    id?: string;
  }) {
    const mergedRef = useMergeRefs(...refs);
    return <div ref={mergedRef} {...rest} />;
  }

  test('handles no refs', () => {
    act(() => {
      render(<TestComponent refs={[]} />);
    });
  });

  test('merges any number of varying refs', () => {
    const callbackRef1 = vi.fn();
    const callbackRef2 = vi.fn();
    const objectRef1 = createRef<HTMLDivElement>();
    const objectRef2 = createRef<HTMLDivElement>();
    const nullRef = null;

    act(() => {
      render(
        <TestComponent
          refs={[callbackRef1, callbackRef2, objectRef1, objectRef2, nullRef]}
        />
      );
    });

    expect(callbackRef1).toHaveBeenCalledOnce();
    expect(callbackRef2).toHaveBeenCalledOnce();
    expect(objectRef1.current).toBeInstanceOf(HTMLDivElement);
    expect(objectRef2.current).toBeInstanceOf(HTMLDivElement);
  });

  test('ref is called when ref changes', () => {
    const ref = vi.fn();
    const nextRef = vi.fn();
    let rerender: RenderResult['rerender'];

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
    const ref = vi.fn();
    let rerender: RenderResult['rerender'];

    act(() => {
      ({ rerender } = render(<TestComponent refs={[ref]} />));
    });
    expect(ref).toHaveBeenCalledOnce();
    act(() => {
      rerender(<TestComponent refs={[ref]} />);
    });
    expect(ref).toHaveBeenCalledOnce();
  });

  test('ref is not called for props changes', () => {
    const ref = vi.fn();
    let rerender: RenderResult['rerender'];

    act(() => {
      ({ rerender } = render(<TestComponent id="foo" refs={[ref]} />));
    });
    expect(ref).toHaveBeenCalledOnce();
    act(() => {
      rerender(<TestComponent id="bar" refs={[ref]} />);
    });
    expect(ref).toHaveBeenCalledOnce();
  });
});
