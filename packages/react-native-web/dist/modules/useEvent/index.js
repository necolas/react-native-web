/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import createEventHandle from '../createEventHandle';
import useLayoutEffect from '../useLayoutEffect';
import useStable from '../useStable';

/**
 * This can be used with any event type include custom events.
 *
 * const click = useEvent('click', options);
 * useEffect(() => {
 *   click.setListener(target, onClick);
 *   return () => click.clear();
 * }).
 */
export default function useEvent(event, options) {
  var targetListeners = useStable(function () {
    return new Map();
  });
  var addListener = useStable(function () {
    var addEventListener = createEventHandle(event, options);
    return function (target, callback) {
      var removeTargetListener = targetListeners.get(target);

      if (removeTargetListener != null) {
        removeTargetListener();
      }

      if (callback == null) {
        targetListeners.delete(target);
      }

      var removeEventListener = addEventListener(target, callback);
      targetListeners.set(target, removeEventListener);
      return removeEventListener;
    };
  });
  useLayoutEffect(function () {
    return function () {
      targetListeners.forEach(function (removeListener) {
        removeListener();
      });
      targetListeners.clear();
    };
  }, []);
  return addListener;
}