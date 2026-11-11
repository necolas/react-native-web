/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {
  ResponderTouchHistoryStore,
  TouchHistory
} from './ResponderTouchHistoryStore';
import type {
  ResponderDOMEvent,
  Touch,
  TouchEvent
} from './ResponderEventTypes';
import type { ResponderNode } from './utils';

import getBoundingClientRect from '../../modules/getBoundingClientRect';

export type ResponderEvent = {
  bubbles: boolean,
  cancelable: boolean,
  currentTarget: ?ResponderNode,
  defaultPrevented: ?boolean,
  dispatchConfig: {
    registrationName?: string,
    phasedRegistrationNames?: {
      bubbled: string,
      captured: string
    }
  },
  eventPhase: ?number,
  isDefaultPrevented: () => boolean,
  isPropagationStopped: () => boolean,
  isTrusted: ?boolean,
  preventDefault: () => void,
  stopPropagation: () => void,
  nativeEvent: TouchEvent,
  persist: () => void,
  target: ?EventTarget,
  timeStamp: number,
  touchHistory: TouchHistory
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
  domEvent: ResponderDOMEvent,
  responderTouchHistoryStore: ResponderTouchHistoryStore
): ResponderEvent {
  let rect: ?{ left: number, top: number, width: number, height: number, ... };
  let propagationWasStopped = false;
  let changedTouches: Array<Touch>;
  let touches: Array<Touch>;

  const domEventChangedTouches = domEvent.changedTouches;
  const domEventType = domEvent.type;

  const metaKey = domEvent.metaKey === true;
  const shiftKey = domEvent.shiftKey === true;
  const force = domEventChangedTouches?.[0].force || 0;
  const identifier = normalizeIdentifier(
    domEventChangedTouches?.[0].identifier || 0
  );
  const clientX: number =
    // $FlowFixMe[incompatible-type] mouse and touch events have coordinates
    domEventChangedTouches?.[0].clientX || domEvent.clientX;
  const clientY: number =
    // $FlowFixMe[incompatible-type] mouse and touch events have coordinates
    domEventChangedTouches?.[0].clientY || domEvent.clientY;
  // $FlowFixMe[incompatible-type] mouse and touch events have coordinates
  const pageX: number = domEventChangedTouches?.[0].pageX || domEvent.pageX;
  // $FlowFixMe[incompatible-type] mouse and touch events have coordinates
  const pageY: number = domEventChangedTouches?.[0].pageY || domEvent.pageY;
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
    // $FlowFixMe[incompatible-type] touch events have touches
    touches = normalizeTouches(domEvent.touches);
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
  function locationX(x: number): number | void {
    rect = rect || getBoundingClientRect(responderEvent.currentTarget);
    if (rect) {
      // $FlowFixMe[incompatible-use] rect is only set when currentTarget is set
      const offsetWidth = responderEvent.currentTarget.offsetWidth;
      return (x - rect.left) / getScale(rect.width, offsetWidth);
    }
  }
  function locationY(y: number): number | void {
    rect = rect || getBoundingClientRect(responderEvent.currentTarget);
    if (rect) {
      // $FlowFixMe[incompatible-use] rect is only set when currentTarget is set
      const offsetHeight = responderEvent.currentTarget.offsetHeight;
      return (y - rect.top) / getScale(rect.height, offsetHeight);
    }
  }

  return responderEvent;
}
