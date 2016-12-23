const emptyArray = [];

// Mobile Safari re-uses touch objects, so we copy the properties we want and normalize the identifier
const normalizeTouches = (touches = emptyArray) => Array.prototype.slice.call(touches).map((touch) => {
  const identifier = touch.identifier > 20 ? (touch.identifier % 20) : touch.identifier;

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

  const event = {
    _normalized: true,
    changedTouches,
    pageX: nativeEvent.pageX,
    pageY: nativeEvent.pageY,
    preventDefault: nativeEvent.preventDefault.bind(nativeEvent),
    stopImmediatePropagation: nativeEvent.stopImmediatePropagation.bind(nativeEvent),
    stopPropagation: nativeEvent.stopPropagation.bind(nativeEvent),
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
  return {
    _normalized: true,
    changedTouches: touches,
    identifier: touches[0].identifier,
    locationX: nativeEvent.offsetX,
    locationY: nativeEvent.offsetY,
    pageX: nativeEvent.pageX,
    pageY: nativeEvent.pageY,
    preventDefault: nativeEvent.preventDefault.bind(nativeEvent),
    stopImmediatePropagation: nativeEvent.stopImmediatePropagation.bind(nativeEvent),
    stopPropagation: nativeEvent.stopPropagation.bind(nativeEvent),
    target: nativeEvent.target,
    timestamp: touches[0].timestamp,
    touches: (nativeEvent.type === 'mouseup') ? emptyArray : touches
  };
}

function normalizeNativeEvent(nativeEvent) {
  if (nativeEvent._normalized) { return nativeEvent; }
  const eventType = nativeEvent.type || '';
  const mouse = eventType.indexOf('mouse') >= 0;
  return mouse ? normalizeMouseEvent(nativeEvent) : normalizeTouchEvent(nativeEvent);
}

module.exports = normalizeNativeEvent;
