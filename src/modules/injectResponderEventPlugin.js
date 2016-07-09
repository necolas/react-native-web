// based on https://github.com/facebook/react/pull/4303/files

import EventConstants from 'react/lib/EventConstants'
import EventPluginRegistry from 'react/lib/EventPluginRegistry'
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment'
import ResponderEventPlugin from 'react/lib/ResponderEventPlugin'
import ResponderTouchHistoryStore from 'react/lib/ResponderTouchHistoryStore'
import normalizeNativeEvent from './normalizeNativeEvent'

const {
  topMouseDown,
  topMouseMove,
  topMouseUp,
  topScroll,
  topSelectionChange,
  topTouchCancel,
  topTouchEnd,
  topTouchMove,
  topTouchStart
} = EventConstants.topLevelTypes

const supportsTouch = ExecutionEnvironment.canUseDOM && (
  'ontouchstart' in window ||
  window.DocumentTouch && document instanceof window.DocumentTouch
)

const endDependencies = supportsTouch ? [ topTouchCancel, topTouchEnd ] : [ topMouseUp ]
const moveDependencies = supportsTouch ? [ topTouchMove ] : [ topMouseMove ]
const startDependencies = supportsTouch ? [ topTouchStart ] : [ topMouseDown ]

/**
 * Setup ResponderEventPlugin dependencies
 */
ResponderEventPlugin.eventTypes.responderMove.dependencies = moveDependencies
ResponderEventPlugin.eventTypes.responderEnd.dependencies = endDependencies
ResponderEventPlugin.eventTypes.responderStart.dependencies = startDependencies
ResponderEventPlugin.eventTypes.responderRelease.dependencies = endDependencies
ResponderEventPlugin.eventTypes.responderTerminationRequest.dependencies = []
ResponderEventPlugin.eventTypes.responderGrant.dependencies = []
ResponderEventPlugin.eventTypes.responderReject.dependencies = []
ResponderEventPlugin.eventTypes.responderTerminate.dependencies = []
ResponderEventPlugin.eventTypes.moveShouldSetResponder.dependencies = moveDependencies
ResponderEventPlugin.eventTypes.selectionChangeShouldSetResponder.dependencies = [ topSelectionChange ]
ResponderEventPlugin.eventTypes.scrollShouldSetResponder.dependencies = [ topScroll ]
ResponderEventPlugin.eventTypes.startShouldSetResponder.dependencies = startDependencies

const originalRecordTouchTrack = ResponderTouchHistoryStore.recordTouchTrack

ResponderTouchHistoryStore.recordTouchTrack = (topLevelType, nativeEvent) => {
  // Filter out mouse-move events when the mouse button is not down
  if ((topLevelType === topMouseMove) && !ResponderTouchHistoryStore.touchHistory.touchBank.length) {
    return
  }
  originalRecordTouchTrack.call(ResponderTouchHistoryStore, topLevelType, normalizeNativeEvent(nativeEvent))
}

EventPluginRegistry.injectEventPluginsByName({
  ResponderEventPlugin
})
