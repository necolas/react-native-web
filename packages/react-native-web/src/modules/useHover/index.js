/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import useEvent from '../useEvent';
import useLayoutEffect from '../useLayoutEffect';

/**
 * Types
 */

export type HoverEventsConfig = {
  contain?: ?boolean,
  disabled?: ?boolean,
  onHoverStart?: ?(e: any) => void,
  onHoverChange?: ?(bool: boolean) => void,
  onHoverUpdate?: ?(e: any) => void,
  onHoverEnd?: ?(e: any) => void
};

/**
 * Implementation
 */

const emptyObject = {};
const opts = { passive: true };
const lockEventType = 'react-gui:hover:lock';
const unlockEventType = 'react-gui:hover:unlock';

function dispatchCustomEvent(
  target: EventTarget,
  type: string,
  payload?: {
    bubbles?: boolean,
    cancelable?: boolean,
    detail?: { [key: string]: mixed }
  }
) {
  const { bubbles = true, cancelable = true, detail } = payload || emptyObject;
  const event = new CustomEvent(type, { bubbles, cancelable, detail });
  target.dispatchEvent(event);
}

export default function useHover(
  targetRef: any,
  config: HoverEventsConfig
): void {
  const {
    contain,
    disabled,
    onHoverStart,
    onHoverChange,
    onHoverUpdate,
    onHoverEnd
  } = config;

  const addMoveListener = useEvent('pointermove', opts);
  const addEnterListener = useEvent('pointerenter', opts);
  const addLeaveListener = useEvent('pointerleave', opts);
  // These custom events are used to implement the "contain" prop.
  const addLockListener = useEvent(lockEventType, opts);
  const addUnlockListener = useEvent(unlockEventType, opts);

  useLayoutEffect(() => {
    const target = targetRef.current;
    if (target !== null) {
      /**
       * End the hover gesture
       */
      const hoverEnd = function (e) {
        if (onHoverEnd != null) {
          onHoverEnd(e);
        }
        if (onHoverChange != null) {
          onHoverChange(false);
        }
        // Remove the listeners once finished.
        addMoveListener(target, null);
        addLeaveListener(target, null);
      };

      /**
       * Leave element
       */
      const leaveListener = function (e) {
        const target = targetRef.current;
        if (target != null && e.pointerType !== 'touch') {
          if (contain) {
            dispatchCustomEvent(target, unlockEventType);
          }
          hoverEnd(e);
        }
      };

      /**
       * Move within element
       */
      const moveListener = function (e) {
        if (e.pointerType !== 'touch') {
          if (onHoverUpdate != null) {
            onHoverUpdate(e);
          }
        }
      };

      /**
       * Start the hover gesture
       */
      const hoverStart = function (e) {
        if (onHoverStart != null) {
          onHoverStart(e);
        }
        if (onHoverChange != null) {
          onHoverChange(true);
        }
        // Set the listeners needed for the rest of the hover gesture.
        if (onHoverUpdate != null) {
          addMoveListener(target, !disabled ? moveListener : null);
        }
        addLeaveListener(target, !disabled ? leaveListener : null);
      };

      /**
       * Enter element
       */
      const enterListener = function (e) {
        const target = targetRef.current;
        if (target != null && e.pointerType !== 'touch') {
          if (contain) {
            dispatchCustomEvent(target, lockEventType);
          }
          hoverStart(e);
          const lockListener = function (lockEvent) {
            if (lockEvent.target !== target) {
              hoverEnd(e);
            }
          };
          const unlockListener = function (lockEvent) {
            if (lockEvent.target !== target) {
              hoverStart(e);
            }
          };
          addLockListener(target, !disabled ? lockListener : null);
          addUnlockListener(target, !disabled ? unlockListener : null);
        }
      };

      addEnterListener(target, !disabled ? enterListener : null);
    }
  }, [
    addEnterListener,
    addMoveListener,
    addLeaveListener,
    addLockListener,
    addUnlockListener,
    contain,
    disabled,
    onHoverStart,
    onHoverChange,
    onHoverUpdate,
    onHoverEnd,
    targetRef
  ]);
}
