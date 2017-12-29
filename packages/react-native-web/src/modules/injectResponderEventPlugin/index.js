// based on https://github.com/facebook/react/pull/4303/files

import normalizeNativeEvent from '../normalizeNativeEvent';
import ReactDOM from 'react-dom';
import ReactDOMUnstableNativeDependencies from 'react-dom/unstable-native-dependencies';

const { EventPluginHub } = ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
const { ResponderEventPlugin, ResponderTouchHistoryStore } = ReactDOMUnstableNativeDependencies;

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

const originalRecordTouchTrack = ResponderTouchHistoryStore.recordTouchTrack;

ResponderTouchHistoryStore.recordTouchTrack = (topLevelType, nativeEvent) => {
  // Filter out mouse-move events when the mouse button is not down
  if (topLevelType === topMouseMove && !ResponderTouchHistoryStore.touchHistory.touchBank.length) {
    return;
  }

  const normalizedEvent = normalizeNativeEvent(nativeEvent);
  originalRecordTouchTrack.call(ResponderTouchHistoryStore, topLevelType, normalizedEvent);
};

EventPluginHub.injection.injectEventPluginsByName({
  ResponderEventPlugin
});
