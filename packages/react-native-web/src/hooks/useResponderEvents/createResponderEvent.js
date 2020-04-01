/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { TouchEvent } from './ResponderEventTypes';

import getBoundingClientRect from '../../modules/getBoundingClientRect';
import ResponderTouchHistoryStore from './ResponderTouchHistoryStore';

export type ResponderEvent = {|
  currentTarget: any,
  defaultPrevented: ?boolean,
  dispatchConfig: {},
  eventPhase: ?number,
  isDefaultPrevented: () => boolean,
  isPropagationStopped: () => boolean,
  isTrusted: ?boolean,
  preventDefault: () => void,
  stopPropagation: () => void,
  nativeEvent: TouchEvent,
  persist: () => void,
  target: ?any,
  timeStamp: number,
  touchHistory: $ReadOnly<{|
    indexOfSingleActiveTouch: number,
    mostRecentTimeStamp: number,
    numberActiveTouches: number,
    touchBank: Array<{|
      currentPageX: number,
      currentPageY: number,
      currentTimeStamp: number,
      previousPageX: number,
      previousPageY: number,
      previousTimeStamp: number,
      startPageX: number,
      startPageY: number,
      startTimeStamp: number,
      touchActive: boolean
    |}>
  |}>
|};

const emptyFunction = () => {};
const emptyObject = {};
const emptyArray = [];

/**
 * Converts a native DOM event to a ResponderEvent.
 * Mouse events are transformed into fake touch events.
 */
export default function createResponderEvent(domEvent: any): ResponderEvent {
  let rect;
  let propagationWasStopped = false;
  let changedTouches;
  let touches;

  const domEventChangedTouches = domEvent.changedTouches;

  const force = (domEventChangedTouches && domEventChangedTouches[0].force) || 0;
  const identifier = (domEventChangedTouches && domEventChangedTouches[0].identifier) || 0;
  const clientX = (domEventChangedTouches && domEventChangedTouches[0].clientX) || domEvent.clientX;
  const clientY = (domEventChangedTouches && domEventChangedTouches[0].clientY) || domEvent.clientY;
  const pageX = (domEventChangedTouches && domEventChangedTouches[0].pageX) || domEvent.pageX;
  const pageY = (domEventChangedTouches && domEventChangedTouches[0].pageY) || domEvent.pageY;
  const preventDefault =
    typeof domEvent.preventDefault === 'function'
      ? domEvent.preventDefault.bind(domEvent)
      : emptyFunction;
  const timestamp = domEvent.timeStamp;

  function normalizeTouches(touches) {
    return Array.prototype.slice.call(touches).map(touch => {
      touch.timestamp = timestamp;
      return touch;
    });
  }

  if (domEventChangedTouches != null) {
    changedTouches = normalizeTouches(domEventChangedTouches);
    touches = normalizeTouches(domEvent.touches);
  } else {
    const emulatedTouches = [
      {
        force,
        identifier,
        get locationX() {
          return locationX();
        },
        get locationY() {
          return locationY();
        },
        pageX,
        pageY,
        target: domEvent.target,
        timestamp
      }
    ];
    changedTouches = emulatedTouches;
    touches =
      domEvent.type === 'mouseup' || domEvent.type === 'dragstart' ? emptyArray : emulatedTouches;
  }

  const responderEvent = {
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
      changedTouches,
      force,
      identifier,
      get locationX() {
        return locationX();
      },
      get locationY() {
        return locationY();
      },
      pageX,
      pageY,
      target: domEvent.target,
      timestamp,
      touches
    },
    persist: emptyFunction,
    preventDefault,
    stopPropagation() {
      propagationWasStopped = true;
    },
    target: domEvent.target,
    timeStamp: timestamp,
    touchHistory: ResponderTouchHistoryStore.touchHistory
  };

  // Using getters and functions serves two purposes:
  // 1) The value of `currentTarget` is not initially available.
  // 2) Measuring the clientRect may cause layout jank and should only be done on-demand.
  function locationX() {
    rect = rect || getBoundingClientRect(responderEvent.currentTarget);
    if (rect) {
      return clientX - rect.left;
    }
  }
  function locationY() {
    rect = rect || getBoundingClientRect(responderEvent.currentTarget);
    if (rect) {
      return clientY - rect.top;
    }
  }

  return responderEvent;
}
