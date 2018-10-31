/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const emptyArray = [];
const emptyFunction = () => {};

const getRect = node => {
  if (node) {
    const isElement = node.nodeType === 1 /* Node.ELEMENT_NODE */;
    if (isElement && typeof node.getBoundingClientRect === 'function') {
      return node.getBoundingClientRect();
    }
  }
};

// Mobile Safari re-uses touch objects, so we copy the properties we want and normalize the identifier
const normalizeTouches = touches => {
  if (!touches) {
    return emptyArray;
  }

  return Array.prototype.slice.call(touches).map(touch => {
    const identifier = touch.identifier > 20 ? touch.identifier % 20 : touch.identifier;
    let rect;

    return {
      _normalized: true,
      clientX: touch.clientX,
      clientY: touch.clientY,
      force: touch.force,
      get locationX() {
        rect = rect || getRect(touch.target);
        if (rect) {
          return touch.pageX - rect.left;
        }
      },
      get locationY() {
        rect = rect || getRect(touch.target);
        if (rect) {
          return touch.pageY - rect.top;
        }
      },
      identifier: identifier,
      pageX: touch.pageX,
      pageY: touch.pageY,
      radiusX: touch.radiusX,
      radiusY: touch.radiusY,
      rotationAngle: touch.rotationAngle,
      screenX: touch.screenX,
      screenY: touch.screenY,
      target: touch.target,
      // normalize the timestamp
      // https://stackoverflow.com/questions/26177087/ios-8-mobile-safari-wrong-timestamp-on-touch-events
      timestamp: Date.now()
    };
  });
};

function normalizeTouchEvent(nativeEvent) {
  const changedTouches = normalizeTouches(nativeEvent.changedTouches);
  const touches = normalizeTouches(nativeEvent.touches);

  const preventDefault =
    typeof nativeEvent.preventDefault === 'function'
      ? nativeEvent.preventDefault.bind(nativeEvent)
      : emptyFunction;
  const stopImmediatePropagation =
    typeof nativeEvent.stopImmediatePropagation === 'function'
      ? nativeEvent.stopImmediatePropagation.bind(nativeEvent)
      : emptyFunction;
  const stopPropagation =
    typeof nativeEvent.stopPropagation === 'function'
      ? nativeEvent.stopPropagation.bind(nativeEvent)
      : emptyFunction;
  const singleChangedTouch = changedTouches[0];

  const event = {
    _normalized: true,
    bubbles: nativeEvent.bubbles,
    cancelable: nativeEvent.cancelable,
    changedTouches,
    defaultPrevented: nativeEvent.defaultPrevented,
    identifier: singleChangedTouch ? singleChangedTouch.identifier : undefined,
    get locationX() {
      return singleChangedTouch ? singleChangedTouch.locationX : undefined;
    },
    get locationY() {
      return singleChangedTouch ? singleChangedTouch.locationY : undefined;
    },
    pageX: singleChangedTouch ? singleChangedTouch.pageX : nativeEvent.pageX,
    pageY: singleChangedTouch ? singleChangedTouch.pageY : nativeEvent.pageY,
    preventDefault,
    stopImmediatePropagation,
    stopPropagation,
    target: nativeEvent.target,
    // normalize the timestamp
    // https://stackoverflow.com/questions/26177087/ios-8-mobile-safari-wrong-timestamp-on-touch-events
    timestamp: Date.now(),
    touches,
    type: nativeEvent.type,
    which: nativeEvent.which
  };

  return event;
}

function normalizeMouseEvent(nativeEvent) {
  let rect;

  const touches = [
    {
      _normalized: true,
      clientX: nativeEvent.clientX,
      clientY: nativeEvent.clientY,
      force: nativeEvent.force,
      identifier: 0,
      get locationX() {
        rect = rect || getRect(nativeEvent.target);
        if (rect) {
          return nativeEvent.pageX - rect.left;
        }
      },
      get locationY() {
        rect = rect || getRect(nativeEvent.target);
        if (rect) {
          return nativeEvent.pageY - rect.top;
        }
      },
      pageX: nativeEvent.pageX,
      pageY: nativeEvent.pageY,
      screenX: nativeEvent.screenX,
      screenY: nativeEvent.screenY,
      target: nativeEvent.target,
      timestamp: Date.now()
    }
  ];

  const preventDefault =
    typeof nativeEvent.preventDefault === 'function'
      ? nativeEvent.preventDefault.bind(nativeEvent)
      : emptyFunction;
  const stopImmediatePropagation =
    typeof nativeEvent.stopImmediatePropagation === 'function'
      ? nativeEvent.stopImmediatePropagation.bind(nativeEvent)
      : emptyFunction;
  const stopPropagation =
    typeof nativeEvent.stopPropagation === 'function'
      ? nativeEvent.stopPropagation.bind(nativeEvent)
      : emptyFunction;

  return {
    _normalized: true,
    bubbles: nativeEvent.bubbles,
    cancelable: nativeEvent.cancelable,
    changedTouches: touches,
    defaultPrevented: nativeEvent.defaultPrevented,
    identifier: touches[0].identifier,
    get locationX() {
      return touches[0].locationX;
    },
    get locationY() {
      return touches[0].locationY;
    },
    pageX: nativeEvent.pageX,
    pageY: nativeEvent.pageY,
    preventDefault,
    stopImmediatePropagation,
    stopPropagation,
    target: nativeEvent.target,
    timestamp: touches[0].timestamp,
    touches: nativeEvent.type === 'mouseup' ? emptyArray : touches,
    type: nativeEvent.type,
    which: nativeEvent.which
  };
}

// TODO: how to best handle keyboard events?
function normalizeNativeEvent(nativeEvent: Object) {
  if (!nativeEvent || nativeEvent._normalized) {
    return nativeEvent;
  }
  const eventType = nativeEvent.type || '';
  const mouse = eventType.indexOf('mouse') >= 0;
  if (mouse) {
    return normalizeMouseEvent(nativeEvent);
  } else {
    return normalizeTouchEvent(nativeEvent);
  }
}

export default normalizeNativeEvent;
