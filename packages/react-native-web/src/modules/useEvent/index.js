/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import createEventHandle from '../createEventHandle';
import useLayoutEffect from '../useLayoutEffect';
import useStable from '../useStable';

type Callback = null | ((any) => void);
type AddListener = (target: EventTarget, listener: null | ((any) => void)) => () => void;

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
  event: string,
  options?: ?{
    capture?: boolean,
    passive?: boolean
  }
): AddListener {
  const targetListeners = useStable(() => new Map());

  const addListener = useStable(() => {
    const addEventListener = createEventHandle(event, options);
    return (target: EventTarget, callback: Callback) => {
      const removeTargetListener = targetListeners.get(target);
      if (removeTargetListener != null) {
        removeTargetListener();
      }
      if (callback == null) {
        targetListeners.delete(target);
      }
      const removeEventListener = addEventListener(target, callback);
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
  }, []);

  return addListener;
}
