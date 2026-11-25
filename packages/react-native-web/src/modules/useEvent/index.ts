/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useLayoutEffect } from 'react';

import type { Nullable } from '../../types';
import { type EventOptions, addEventListener } from '../addEventListener';
import useStable from '../useStable';

type Callback<E> = null | ((e: E) => void);
type AddListener<E> = (
  target: EventTarget,
  listener: Callback<E>
) => () => void;

/**
 * This can be used with any event type include custom events.
 *
 * const click = useEvent('click', options);
 * useEffect(() => {
 *   click.setListener(target, onClick);
 *   return () => click.clear();
 * }).
 */
export default function useEvent<E extends Event = Event>(
  eventType: string,
  options?: Nullable<EventOptions>
): AddListener<E> {
  const targetListeners = useStable(() => new Map<EventTarget, () => void>());

  const addListener = useStable(() => {
    return (target: EventTarget, callback: Callback<E>) => {
      const removeTargetListener = targetListeners.get(target);
      if (removeTargetListener != null) {
        removeTargetListener();
      }
      if (callback == null) {
        targetListeners.delete(target);
        callback = () => {};
      }
      const removeEventListener = addEventListener(
        target,
        eventType,
        callback,
        options
      );
      targetListeners.set(target, removeEventListener);
      return removeEventListener;
    };
  });

  useLayoutEffect(() => {
    return () => {
      targetListeners.forEach((removeListener) => {
        removeListener();
      });
      targetListeners.clear();
    };
  }, [targetListeners]);

  return addListener;
}
