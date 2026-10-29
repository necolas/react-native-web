/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { useLayoutEffect } from 'react';
import useEvent from '../useEvent';

/**
 * Types
 */

export type HoverEventsConfig = {
  disabled?: ?boolean,
  onHoverStart?: ?(e: any) => void,
  onHoverChange?: ?(boolean: boolean) => void,
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
    detail?: { [key: string]: unknown }
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
  const { disabled, onHoverStart, onHoverChange, onHoverEnd } = config;

  const addEnterListener = useEvent('pointerenter', opts);
  const addLeaveListener = useEvent('pointerleave', opts);
  // These custom events end the hover of ancestors while a descendant is hovered.
  const addLockListener = useEvent(lockEventType, opts);
  const addUnlockListener = useEvent(unlockEventType, opts);

  useLayoutEffect(() => {
    const target = targetRef.current;
    if (target !== null) {
      /**
       * End the hover gesture
       */
      const hoverEnd = function (e: any) {
        if (onHoverEnd != null) {
          onHoverEnd(e);
        }
        if (onHoverChange != null) {
          onHoverChange(false);
        }
        // Remove the listeners once finished.
        addLeaveListener(target, null);
      };

      /**
       * Leave element
       */
      const leaveListener = function (e: any) {
        const target = targetRef.current;
        if (target != null && e.pointerType !== 'touch') {
          dispatchCustomEvent(target, unlockEventType);
          hoverEnd(e);
        }
      };

      /**
       * Start the hover gesture
       */
      const hoverStart = function (e: any) {
        if (onHoverStart != null) {
          onHoverStart(e);
        }
        if (onHoverChange != null) {
          onHoverChange(true);
        }
        // Set the listeners needed for the rest of the hover gesture.
        addLeaveListener(target, !disabled ? leaveListener : null);
      };

      /**
       * Enter element
       */
      const enterListener = function (e: any) {
        const target = targetRef.current;
        if (target != null && e.pointerType !== 'touch') {
          dispatchCustomEvent(target, lockEventType);
          hoverStart(e);
          const lockListener = function (lockEvent: Event) {
            if (lockEvent.target !== target) {
              hoverEnd(e);
            }
          };
          const unlockListener = function (lockEvent: Event) {
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
    addLeaveListener,
    addLockListener,
    addUnlockListener,
    disabled,
    onHoverStart,
    onHoverChange,
    onHoverEnd,
    targetRef
  ]);
}
