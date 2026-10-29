/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { EventOptions } from '../addEventListener';

import { useLayoutEffect } from 'react';
import { addEventListener } from '../addEventListener';
import useStable from '../useStable';

type Callback = null | ((any) => void);
type AddListener = (
  target: EventTarget,
  listener: null | ((any) => void)
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
export default function useEvent(
  eventType: string,
  options?: ?EventOptions
): AddListener {
  const targetListeners = useStable(() => new Map<EventTarget, () => void>());

  const addListener = useStable(() => {
    return (target: EventTarget, callback: Callback) => {
      const removeTargetListener = targetListeners.get(target);
      if (removeTargetListener != null) {
        removeTargetListener();
      }
      if (callback == null) {
        // $FlowFixMe[react-rule-hook-mutation]
        targetListeners.delete(target);
        callback = () => {};
      }
      const removeEventListener = addEventListener(
        target,
        eventType,
        callback,
        options
      );
      // $FlowFixMe[react-rule-hook-mutation]
      targetListeners.set(target, removeEventListener);
      return removeEventListener;
    };
  });

  useLayoutEffect(() => {
    return () => {
      targetListeners.forEach((removeListener) => {
        removeListener();
      });
      // $FlowFixMe[react-rule-hook-mutation]
      targetListeners.clear();
    };
  }, [targetListeners]);

  return addListener;
}
