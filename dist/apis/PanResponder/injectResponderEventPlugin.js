'use strict';

var _EventConstants = require('react/lib/EventConstants');

var _EventConstants2 = _interopRequireDefault(_EventConstants);

var _EventPluginRegistry = require('react/lib/EventPluginRegistry');

var _EventPluginRegistry2 = _interopRequireDefault(_EventPluginRegistry);

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var _ExecutionEnvironment2 = _interopRequireDefault(_ExecutionEnvironment);

var _ResponderEventPlugin = require('react/lib/ResponderEventPlugin');

var _ResponderEventPlugin2 = _interopRequireDefault(_ResponderEventPlugin);

var _ResponderTouchHistoryStore = require('react/lib/ResponderTouchHistoryStore');

var _ResponderTouchHistoryStore2 = _interopRequireDefault(_ResponderTouchHistoryStore);

var _normalizeNativeEvent = require('./normalizeNativeEvent');

var _normalizeNativeEvent2 = _interopRequireDefault(_normalizeNativeEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// based on https://github.com/facebook/react/pull/4303/files

var _EventConstants$topLe = _EventConstants2.default.topLevelTypes;
var topMouseDown = _EventConstants$topLe.topMouseDown;
var topMouseMove = _EventConstants$topLe.topMouseMove;
var topMouseUp = _EventConstants$topLe.topMouseUp;
var topScroll = _EventConstants$topLe.topScroll;
var topSelectionChange = _EventConstants$topLe.topSelectionChange;
var topTouchCancel = _EventConstants$topLe.topTouchCancel;
var topTouchEnd = _EventConstants$topLe.topTouchEnd;
var topTouchMove = _EventConstants$topLe.topTouchMove;
var topTouchStart = _EventConstants$topLe.topTouchStart;


var supportsTouch = _ExecutionEnvironment2.default.canUseDOM && ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);

var endDependencies = supportsTouch ? [topTouchCancel, topTouchEnd] : [topMouseUp];
var moveDependencies = supportsTouch ? [topTouchMove] : [topMouseMove];
var startDependencies = supportsTouch ? [topTouchStart] : [topMouseDown];

/**
 * Setup ResponderEventPlugin dependencies
 */
_ResponderEventPlugin2.default.eventTypes.responderMove.dependencies = moveDependencies;
_ResponderEventPlugin2.default.eventTypes.responderEnd.dependencies = endDependencies;
_ResponderEventPlugin2.default.eventTypes.responderStart.dependencies = startDependencies;
_ResponderEventPlugin2.default.eventTypes.responderRelease.dependencies = endDependencies;
_ResponderEventPlugin2.default.eventTypes.responderTerminationRequest.dependencies = [];
_ResponderEventPlugin2.default.eventTypes.responderGrant.dependencies = [];
_ResponderEventPlugin2.default.eventTypes.responderReject.dependencies = [];
_ResponderEventPlugin2.default.eventTypes.responderTerminate.dependencies = [];
_ResponderEventPlugin2.default.eventTypes.moveShouldSetResponder.dependencies = moveDependencies;
_ResponderEventPlugin2.default.eventTypes.selectionChangeShouldSetResponder.dependencies = [topSelectionChange];
_ResponderEventPlugin2.default.eventTypes.scrollShouldSetResponder.dependencies = [topScroll];
_ResponderEventPlugin2.default.eventTypes.startShouldSetResponder.dependencies = startDependencies;

var originalRecordTouchTrack = _ResponderTouchHistoryStore2.default.recordTouchTrack;

_ResponderTouchHistoryStore2.default.recordTouchTrack = function (topLevelType, nativeEvent) {
  // Filter out mouse-move events when the mouse button is not down
  if (topLevelType === topMouseMove && !_ResponderTouchHistoryStore2.default.touchHistory.touchBank.length) {
    return;
  }
  originalRecordTouchTrack.call(_ResponderTouchHistoryStore2.default, topLevelType, (0, _normalizeNativeEvent2.default)(nativeEvent));
};

_EventPluginRegistry2.default.injectEventPluginsByName({
  ResponderEventPlugin: _ResponderEventPlugin2.default
});