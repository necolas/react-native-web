/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

const emptyArray = [];

// Mobile Safari re-uses touch objects, so we copy the properties we want and normalize the identifier
const normalizeTouches = (touches = emptyArray) =>
  Array.prototype.slice.call(touches).map(touch => {
    const identifier = touch.identifier > 20 ? touch.identifier % 20 : touch.identifier;

    const rect = touch.target && touch.target.getBoundingClientRect();
    const locationX = touch.pageX - rect.left;
    const locationY = touch.pageY - rect.top;

    return {
      _normalized: true,
      clientX: touch.clientX,
      clientY: touch.clientY,
      force: touch.force,
      locationX: locationX,
      locationY: locationY,
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

function normalizeTouchEvent(nativeEvent) {
  const changedTouches = normalizeTouches(nativeEvent.changedTouches);
  const touches = normalizeTouches(nativeEvent.touches);

  const preventDefault = nativeEvent.preventDefault != null
    ? nativeEvent.preventDefault.bind(nativeEvent)
    : () => {};

  const stopImmediatePropagation = nativeEvent.stopImmediatePropagation != null
    ? nativeEvent.preventDefault.bind(nativeEvent)
    : () => {};

  const stopPropagation = nativeEvent.stopPropagation != null
    ? nativeEvent.stopPropagation.bind(nativeEvent)
    : () => {};

  const event = {
    _normalized: true,
    changedTouches,
    pageX: nativeEvent.pageX,
    pageY: nativeEvent.pageY,
    preventDefault: preventDefault,
    stopImmediatePropagation: stopImmediatePropagation,
    stopPropagation: stopPropagation,
    target: nativeEvent.target,
    // normalize the timestamp
    // https://stackoverflow.com/questions/26177087/ios-8-mobile-safari-wrong-timestamp-on-touch-events
    timestamp: Date.now(),
    touches
  };

  if (changedTouches[0]) {
    event.identifier = changedTouches[0].identifier;
    event.pageX = changedTouches[0].pageX;
    event.pageY = changedTouches[0].pageY;
    event.locationX = changedTouches[0].locationX;
    event.locationY = changedTouches[0].locationY;
  }

  return event;
}

function normalizeMouseEvent(nativeEvent) {
  const touches = [
    {
      _normalized: true,
      clientX: nativeEvent.clientX,
      clientY: nativeEvent.clientY,
      force: nativeEvent.force,
      locationX: nativeEvent.clientX,
      locationY: nativeEvent.clientY,
      identifier: 0,
      pageX: nativeEvent.pageX,
      pageY: nativeEvent.pageY,
      screenX: nativeEvent.screenX,
      screenY: nativeEvent.screenY,
      target: nativeEvent.target,
      timestamp: Date.now()
    }
  ];

  const preventDefault = nativeEvent.preventDefault != null
    ? nativeEvent.preventDefault.bind(nativeEvent)
    : () => {};

  const stopImmediatePropagation = nativeEvent.stopImmediatePropagation != null
    ? nativeEvent.preventDefault.bind(nativeEvent)
    : () => {};

  const stopPropagation = nativeEvent.stopPropagation != null
    ? nativeEvent.stopPropagation.bind(nativeEvent)
    : () => {};

  return {
    _normalized: true,
    changedTouches: touches,
    identifier: touches[0].identifier,
    locationX: nativeEvent.offsetX,
    locationY: nativeEvent.offsetY,
    pageX: nativeEvent.pageX,
    pageY: nativeEvent.pageY,
    preventDefault: preventDefault,
    stopImmediatePropagation: stopImmediatePropagation,
    stopPropagation: stopPropagation,
    target: nativeEvent.target,
    timestamp: touches[0].timestamp,
    touches: nativeEvent.type === 'mouseup' ? emptyArray : touches
  };
}

function normalizeNativeEvent(nativeEvent) {
  if (nativeEvent._normalized) {
    return nativeEvent;
  }
  const eventType = nativeEvent.type || '';
  const mouse = eventType.indexOf('mouse') >= 0;
  return mouse ? normalizeMouseEvent(nativeEvent) : normalizeTouchEvent(nativeEvent);
}

export default normalizeNativeEvent;
