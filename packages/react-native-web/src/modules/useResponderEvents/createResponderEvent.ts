/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getBoundingClientRect from '../../modules/getBoundingClientRect';
import type { Nullable } from '../../types';
import {
  type NativeTouchEvent,
  type Touch,
  isMouseEvent,
  isTouchEvent
} from './ResponderEventTypes';
import type {
  ResponderTouchHistoryStore,
  TouchHistory
} from './ResponderTouchHistoryStore';
import type { ResponderNode } from './utils';

export type ResponderEvent = {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: Nullable<ResponderNode>;
  defaultPrevented: Nullable<boolean>;
  dispatchConfig: {
    registrationName?: string;
    phasedRegistrationNames?: {
      bubbled: string;
      captured: string;
    };
  };
  eventPhase: Nullable<number>;
  isDefaultPrevented: () => boolean;
  isPropagationStopped: () => boolean;
  isTrusted: Nullable<boolean>;
  preventDefault: () => void;
  stopPropagation: () => void;
  nativeEvent: NativeTouchEvent;
  persist: () => void;
  target: Nullable<EventTarget>;
  timeStamp: number;
  touchHistory: TouchHistory;
};

const emptyFunction = () => {};
const emptyObject: ResponderEvent['dispatchConfig'] = {};
const emptyArray: Array<Touch> = [];

/**
 * Safari produces very large identifiers that would cause the `touchBank` array
 * length to be so large as to crash the browser, if not normalized like this.
 * In the future the `touchBank` should use an object/map instead.
 */
function normalizeIdentifier(identifier: number): number {
  return identifier > 20 ? identifier % 20 : identifier;
}

/**
 * The client rect includes CSS transforms (e.g. scale) but the offset size
 * does not. The offset size is rounded, so ignore differences below 1px.
 */
const getScale = (rectSize: number, offsetSize: number = 0): number =>
  offsetSize > 0 && Math.abs(rectSize - offsetSize) >= 1
    ? rectSize / offsetSize
    : 1;

/**
 * Converts a native DOM event to a ResponderEvent.
 * Mouse events are transformed into fake touch events.
 */
export default function createResponderEvent(
  domEvent: Event,
  responderTouchHistoryStore: ResponderTouchHistoryStore
): ResponderEvent {
  let rect: Nullable<{
    left: number;
    top: number;
    width: number;
    height: number;
  }>;

  let propagationWasStopped = false;
  let changedTouches: Array<Touch>;
  let touches: Array<Touch>;

  const domTouchEvent = isTouchEvent(domEvent) ? domEvent : undefined;
  const domMouseEvent = isMouseEvent(domEvent) ? domEvent : undefined;
  const domEventChangedTouches = domTouchEvent?.changedTouches;
  const domFirstChangedTouch = domEventChangedTouches?.[0];
  const domEventType = domEvent.type;

  const metaKey = (domTouchEvent ?? domMouseEvent)?.metaKey === true;
  const shiftKey = (domTouchEvent ?? domMouseEvent)?.shiftKey === true;

  const force = domFirstChangedTouch?.force || 0;
  const identifier = normalizeIdentifier(domFirstChangedTouch?.identifier || 0);
  const clientX = domFirstChangedTouch?.clientX || domMouseEvent?.clientX || 0;
  const clientY = domFirstChangedTouch?.clientY || domMouseEvent?.clientY || 0;
  const pageX = domFirstChangedTouch?.pageX || domMouseEvent?.pageX || 0;
  const pageY = domFirstChangedTouch?.pageY || domMouseEvent?.pageY || 0;

  const preventDefault =
    typeof domEvent.preventDefault === 'function'
      ? domEvent.preventDefault.bind(domEvent)
      : emptyFunction;
  const timestamp = domEvent.timeStamp;

  function normalizeTouches(touches: TouchList): Array<Touch> {
    return Array.from(touches).map((touch) => {
      return {
        force: touch.force,
        identifier: normalizeIdentifier(touch.identifier),
        get locationX() {
          return locationX(touch.clientX);
        },
        get locationY() {
          return locationY(touch.clientY);
        },
        pageX: touch.pageX,
        pageY: touch.pageY,
        target: touch.target,
        timestamp
      };
    });
  }

  if (domEventChangedTouches != null) {
    changedTouches = normalizeTouches(domEventChangedTouches);
    touches =
      domTouchEvent?.touches != null
        ? normalizeTouches(domTouchEvent.touches)
        : emptyArray;
  } else {
    const emulatedTouches: Array<Touch> = [
      {
        force,
        identifier,
        get locationX() {
          return locationX(clientX);
        },
        get locationY() {
          return locationY(clientY);
        },
        pageX,
        pageY,
        target: domEvent.target,
        timestamp
      }
    ];
    changedTouches = emulatedTouches;
    touches =
      domEventType === 'mouseup' || domEventType === 'dragstart'
        ? emptyArray
        : emulatedTouches;
  }

  const responderEvent: ResponderEvent = {
    bubbles: true,
    cancelable: true,
    // `currentTarget` is set before dispatch
    currentTarget: null,
    defaultPrevented: domEvent.defaultPrevented,
    dispatchConfig: emptyObject,
    eventPhase: domEvent.eventPhase,
    isDefaultPrevented() {
      return domEvent.defaultPrevented;
    },
    isPropagationStopped() {
      return propagationWasStopped;
    },
    isTrusted: domEvent.isTrusted,
    nativeEvent: {
      altKey: false,
      ctrlKey: false,
      metaKey,
      shiftKey,
      changedTouches,
      force,
      identifier,
      get locationX() {
        return locationX(clientX);
      },
      get locationY() {
        return locationY(clientY);
      },
      pageX,
      pageY,
      target: domEvent.target,
      timestamp,
      touches,
      type: domEventType
    },
    persist: emptyFunction,
    preventDefault,
    stopPropagation() {
      propagationWasStopped = true;
    },
    target: domEvent.target,
    timeStamp: timestamp,
    touchHistory: responderTouchHistoryStore.touchHistory
  };

  // Using getters and functions serves two purposes:
  // 1) The value of `currentTarget` is not initially available.
  // 2) Measuring the clientRect may cause layout jank and should only be done on-demand.
  function locationX(x: number): number | undefined {
    const currentTarget = responderEvent.currentTarget;
    rect = rect || getBoundingClientRect(currentTarget);
    if (rect && currentTarget != null) {
      const offsetWidth = currentTarget.offsetWidth;
      return (x - rect.left) / getScale(rect.width, offsetWidth);
    }
  }
  function locationY(y: number): number | undefined {
    const currentTarget = responderEvent.currentTarget;
    rect = rect || getBoundingClientRect(currentTarget);
    if (rect && currentTarget != null) {
      const offsetHeight = currentTarget.offsetHeight;
      return (y - rect.top) / getScale(rect.height, offsetHeight);
    }
  }

  return responderEvent;
}
