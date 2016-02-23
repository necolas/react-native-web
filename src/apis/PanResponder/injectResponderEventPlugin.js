// based on https://github.com/facebook/react/pull/4303/files

import EventConstants from 'react/lib/EventConstants'
import EventPluginRegistry from 'react/lib/EventPluginRegistry'
import ResponderEventPlugin from 'react/lib/ResponderEventPlugin'
import ResponderTouchHistoryStore from 'react/lib/ResponderTouchHistoryStore'

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

const endDependencies = [ topMouseUp, topTouchCancel, topTouchEnd ]
const moveDependencies = [ topMouseMove, topTouchMove ]
const startDependencies = [ topMouseDown, topTouchStart ]

/**
 * Setup ResponderEventPlugin dependencies
 */
ResponderEventPlugin.eventTypes.responderMove.dependencies = moveDependencies
ResponderEventPlugin.eventTypes.responderEnd.dependencies = endDependencies
ResponderEventPlugin.eventTypes.responderStart.dependencies = startDependencies
ResponderEventPlugin.eventTypes.responderRelease.dependencies = []
ResponderEventPlugin.eventTypes.responderTerminationRequest.dependencies = []
ResponderEventPlugin.eventTypes.responderGrant.dependencies = []
ResponderEventPlugin.eventTypes.responderReject.dependencies = []
ResponderEventPlugin.eventTypes.responderTerminate.dependencies = []
ResponderEventPlugin.eventTypes.moveShouldSetResponder.dependencies = moveDependencies
ResponderEventPlugin.eventTypes.selectionChangeShouldSetResponder.dependencies = [ topSelectionChange ]
ResponderEventPlugin.eventTypes.scrollShouldSetResponder.dependencies = [ topScroll ]
ResponderEventPlugin.eventTypes.startShouldSetResponder.dependencies = startDependencies

// Mobile Safari re-uses touch objects, so we copy the properties we want and normalize the identifier
const normalizeTouches = (touches = []) => Array.prototype.slice.call(touches).map((touch) => {
  const identifier = touch.identifier > 20 ? (touch.identifier % 20) : touch.identifier

  return {
    clientX: touch.clientX,
    clientY: touch.clientY,
    force: touch.force,
    identifier: identifier,
    pageX: touch.pageX,
    pageY: touch.pageY,
    radiusX: touch.radiusX,
    radiusY: touch.radiusY,
    rotationAngle: touch.rotationAngle,
    screenX: touch.screenX,
    screenY: touch.screenY,
    target: touch.target
  }
})

const normalizeNativeEvent = (nativeEvent) => {
  const changedTouches = normalizeTouches(nativeEvent.changedTouches)
  const touches = normalizeTouches(nativeEvent.touches)

  const event = {
    changedTouches,
    pageX: nativeEvent.pageX,
    pageY: nativeEvent.pageY,
    target: nativeEvent.target,
    // normalize the timestamp
    // https://stackoverflow.com/questions/26177087/ios-8-mobile-safari-wrong-timestamp-on-touch-events
    timestamp: Date.now(),
    touches
  }

  if (changedTouches[0]) {
    event.identifier = changedTouches[0].identifier
    event.pageX = changedTouches[0].pageX
    event.pageY = changedTouches[0].pageY
  }

  return event
}

const originalRecordTouchTrack = ResponderTouchHistoryStore.recordTouchTrack

ResponderTouchHistoryStore.recordTouchTrack = (topLevelType, nativeEvent) => {
  originalRecordTouchTrack.call(ResponderTouchHistoryStore, topLevelType, normalizeNativeEvent(nativeEvent))
}

EventPluginRegistry.injectEventPluginsByName({
  ResponderEventPlugin
})
