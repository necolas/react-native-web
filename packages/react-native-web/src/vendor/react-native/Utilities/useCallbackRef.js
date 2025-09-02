/*
 *  Helper to keep the same ref of a function accross renders 
 * 
 */
import { useLayoutEffect, useEffect, useRef } from 'react';

export default function useCallbackRef(callback) {
  const callbackRef = useRef(callback);
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return callbackRef;
}
