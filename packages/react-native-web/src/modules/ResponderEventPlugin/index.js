// based on https://github.com/facebook/react/pull/4303/files

import normalizeNativeEvent from '../normalizeNativeEvent';
import ReactDOMUnstableNativeDependencies from 'react-dom/unstable-native-dependencies';

const { ResponderEventPlugin, ResponderTouchHistoryStore } = ReactDOMUnstableNativeDependencies;

// On older versions of React (< 16.4) we have to inject the dependencies in
// order for the plugin to work properly in the browser. This version still
// uses `top*` strings to identify the internal event names.
// https://github.com/facebook/react/pull/12629
if (!ResponderEventPlugin.eventTypes.responderMove.dependencies) {
  const topMouseDown = 'topMouseDown';
  const topMouseMove = 'topMouseMove';
  const topMouseUp = 'topMouseUp';
  const topScroll = 'topScroll';
  const topSelectionChange = 'topSelectionChange';
  const topTouchCancel = 'topTouchCancel';
  const topTouchEnd = 'topTouchEnd';
  const topTouchMove = 'topTouchMove';
  const topTouchStart = 'topTouchStart';

  const endDependencies = [topTouchCancel, topTouchEnd, topMouseUp];
  const moveDependencies = [topTouchMove, topMouseMove];
  const startDependencies = [topTouchStart, topMouseDown];

  /**
   * Setup ResponderEventPlugin dependencies
   */
  ResponderEventPlugin.eventTypes.responderMove.dependencies = moveDependencies;
  ResponderEventPlugin.eventTypes.responderEnd.dependencies = endDependencies;
  ResponderEventPlugin.eventTypes.responderStart.dependencies = startDependencies;
  ResponderEventPlugin.eventTypes.responderRelease.dependencies = endDependencies;
  ResponderEventPlugin.eventTypes.responderTerminationRequest.dependencies = [];
  ResponderEventPlugin.eventTypes.responderGrant.dependencies = [];
  ResponderEventPlugin.eventTypes.responderReject.dependencies = [];
  ResponderEventPlugin.eventTypes.responderTerminate.dependencies = [];
  ResponderEventPlugin.eventTypes.moveShouldSetResponder.dependencies = moveDependencies;
  ResponderEventPlugin.eventTypes.selectionChangeShouldSetResponder.dependencies = [
    topSelectionChange
  ];
  ResponderEventPlugin.eventTypes.scrollShouldSetResponder.dependencies = [topScroll];
  ResponderEventPlugin.eventTypes.startShouldSetResponder.dependencies = startDependencies;
}

let lastActiveTouchTimestamp = null;
// The length of time after a touch that we ignore the browser's emulated mouse events
// https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events
const EMULATED_MOUSE_THERSHOLD_MS = 1000;

const originalExtractEvents = ResponderEventPlugin.extractEvents;
ResponderEventPlugin.extractEvents = (topLevelType, targetInst, nativeEvent, nativeEventTarget) => {
  const hasActiveTouches = ResponderTouchHistoryStore.touchHistory.numberActiveTouches > 0;
  const eventType = nativeEvent.type;

  let shouldSkipMouseAfterTouch = false;
  if (eventType.indexOf('touch') > -1) {
    lastActiveTouchTimestamp = Date.now();
  } else if (lastActiveTouchTimestamp && eventType.indexOf('mouse') > -1) {
    const now = Date.now();
    shouldSkipMouseAfterTouch = now - lastActiveTouchTimestamp < EMULATED_MOUSE_THERSHOLD_MS;
  }

  if (
    // Filter out mousemove and mouseup events when a touch hasn't started yet
    ((eventType === 'mousemove' || eventType === 'mouseup') && !hasActiveTouches) ||
    // Filter out events from wheel/middle and right click.
    (nativeEvent.button === 1 || nativeEvent.button === 2) ||
    // Filter out mouse events that browsers dispatch immediately after touch events end
    // Prevents the REP from calling handlers twice for touch interactions.
    // See #802 and #932.
    shouldSkipMouseAfterTouch
  ) {
    return;
  }

  const normalizedEvent = normalizeNativeEvent(nativeEvent);

  return originalExtractEvents.call(
    ResponderEventPlugin,
    topLevelType,
    targetInst,
    normalizedEvent,
    nativeEventTarget
  );
};

export default ResponderEventPlugin;
