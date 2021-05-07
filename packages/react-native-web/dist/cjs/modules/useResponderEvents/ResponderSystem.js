"use strict";

exports.__esModule = true;
exports.attachListeners = attachListeners;
exports.addNode = addNode;
exports.removeNode = removeNode;
exports.terminateResponder = terminateResponder;
exports.getResponderNode = getResponderNode;

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _createResponderEvent = _interopRequireDefault(require("./createResponderEvent"));

var _ResponderEventTypes = require("./ResponderEventTypes");

var _utils = require("./utils");

var _ResponderTouchHistoryStore = _interopRequireDefault(require("./ResponderTouchHistoryStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * RESPONDER EVENT SYSTEM
 *
 * A single, global "interaction lock" on views. For a view to be the "responder" means
 * that pointer interactions are exclusive to that view and none other. The "interaction
 * lock" can be transferred (only) to ancestors of the current "responder" as long as
 * pointers continue to be active.
 *
 * Responder being granted:
 *
 * A view can become the "responder" after the following events:
 *  * "pointerdown" (implemented using "touchstart", "mousedown")
 *  * "pointermove" (implemented using "touchmove", "mousemove")
 *  * "scroll" (while a pointer is down)
 *  * "selectionchange" (while a pointer is down)
 *
 * If nothing is already the "responder", the event propagates to (capture) and from
 * (bubble) the event target until a view returns `true` for
 * `on*ShouldSetResponder(Capture)`.
 *
 * If something is already the responder, the event propagates to (capture) and from
 * (bubble) the lowest common ancestor of the event target and the current "responder".
 * Then negotiation happens between the current "responder" and a view that wants to
 * become the "responder": see the timing diagram below.
 *
 * (NOTE: Scrolled views either automatically become the "responder" or release the
 * "interaction lock". A native scroll view that isn't built on top of the responder
 * system must result in the current "responder" being notified that it no longer has
 * the "interaction lock" - the native system has taken over.
 *
 * Responder being released:
 *
 * As soon as there are no more active pointers that *started* inside descendants
 * of the *current* "responder", an `onResponderRelease` event is dispatched to the
 * current "responder", and the responder lock is released.
 *
 * Typical sequence of events:
 *  * startShouldSetResponder
 *  * responderGrant/Reject
 *  * responderStart
 *  * responderMove
 *  * responderEnd
 *  * responderRelease
 */

/*                                             Negotiation Performed
                                             +-----------------------+
                                            /                         \
Process low level events to    +     Current Responder      +   wantsResponderID
determine who to perform negot-|   (if any exists at all)   |
iation/transition              | Otherwise just pass through|
-------------------------------+----------------------------+------------------+
Bubble to find first ID        |                            |
to return true:wantsResponderID|                            |
                               |                            |
     +--------------+          |                            |
     | onTouchStart |          |                            |
     +------+-------+    none  |                            |
            |            return|                            |
+-----------v-------------+true| +------------------------+ |
|onStartShouldSetResponder|----->| onResponderStart (cur) |<-----------+
+-----------+-------------+    | +------------------------+ |          |
            |                  |                            | +--------+-------+
            | returned true for|       false:REJECT +-------->|onResponderReject
            | wantsResponderID |                    |       | +----------------+
            | (now attempt     | +------------------+-----+ |
            |  handoff)        | | onResponder            | |
            +------------------->|    TerminationRequest  | |
                               | +------------------+-----+ |
                               |                    |       | +----------------+
                               |         true:GRANT +-------->|onResponderGrant|
                               |                            | +--------+-------+
                               | +------------------------+ |          |
                               | | onResponderTerminate   |<-----------+
                               | +------------------+-----+ |
                               |                    |       | +----------------+
                               |                    +-------->|onResponderStart|
                               |                            | +----------------+
Bubble to find first ID        |                            |
to return true:wantsResponderID|                            |
                               |                            |
     +-------------+           |                            |
     | onTouchMove |           |                            |
     +------+------+     none  |                            |
            |            return|                            |
+-----------v-------------+true| +------------------------+ |
|onMoveShouldSetResponder |----->| onResponderMove (cur)  |<-----------+
+-----------+-------------+    | +------------------------+ |          |
            |                  |                            | +--------+-------+
            | returned true for|       false:REJECT +-------->|onResponderReject
            | wantsResponderID |                    |       | +----------------+
            | (now attempt     | +------------------+-----+ |
            |  handoff)        | |   onResponder          | |
            +------------------->|      TerminationRequest| |
                               | +------------------+-----+ |
                               |                    |       | +----------------+
                               |         true:GRANT +-------->|onResponderGrant|
                               |                            | +--------+-------+
                               | +------------------------+ |          |
                               | |   onResponderTerminate |<-----------+
                               | +------------------+-----+ |
                               |                    |       | +----------------+
                               |                    +-------->|onResponderMove |
                               |                            | +----------------+
                               |                            |
                               |                            |
      Some active touch started|                            |
      inside current responder | +------------------------+ |
      +------------------------->|      onResponderEnd    | |
      |                        | +------------------------+ |
  +---+---------+              |                            |
  | onTouchEnd  |              |                            |
  +---+---------+              |                            |
      |                        | +------------------------+ |
      +------------------------->|     onResponderEnd     | |
      No active touches started| +-----------+------------+ |
      inside current responder |             |              |
                               |             v              |
                               | +------------------------+ |
                               | |    onResponderRelease  | |
                               | +------------------------+ |
                               |                            |
                               +                            + */
var emptyObject = {};
/* ------------ IMPLEMENTATION ------------ */

var startRegistration = ['onStartShouldSetResponderCapture', 'onStartShouldSetResponder', {
  bubbles: true
}];
var moveRegistration = ['onMoveShouldSetResponderCapture', 'onMoveShouldSetResponder', {
  bubbles: true
}];
var scrollRegistration = ['onScrollShouldSetResponderCapture', 'onScrollShouldSetResponder', {
  bubbles: false
}];
var shouldSetResponderEvents = {
  touchstart: startRegistration,
  mousedown: startRegistration,
  touchmove: moveRegistration,
  mousemove: moveRegistration,
  scroll: scrollRegistration
};
var emptyResponder = {
  id: null,
  idPath: null,
  node: null
};
var responderListenersMap = new Map();
var isEmulatingMouseEvents = false;
var trackedTouchCount = 0;
var currentResponder = {
  id: null,
  node: null,
  idPath: null
};

function changeCurrentResponder(responder) {
  currentResponder = responder;
}

function getResponderConfig(id) {
  var config = responderListenersMap.get(id);
  return config != null ? config : emptyObject;
}
/**
 * Process native events
 *
 * A single event listener is used to manage the responder system.
 * All pointers are tracked in the ResponderTouchHistoryStore. Native events
 * are interpreted in terms of the Responder System and checked to see if
 * the responder should be transferred. Each host node that is attached to
 * the Responder System has an ID, which is used to look up its associated
 * callbacks.
 */


function eventListener(domEvent) {
  var eventType = domEvent.type;
  var eventTarget = domEvent.target;
  /**
   * Manage emulated events and early bailout.
   * Since PointerEvent is not used yet (lack of support in older Safari), it's
   * necessary to manually manage the mess of browser touch/mouse events.
   * And bailout early for termination events when there is no active responder.
   */
  // Flag when browser may produce emulated events

  if (eventType === 'touchstart') {
    isEmulatingMouseEvents = true;
  } // Remove flag when browser will not produce emulated events


  if (eventType === 'touchmove' || trackedTouchCount > 1) {
    isEmulatingMouseEvents = false;
  } // Ignore various events in particular circumstances


  if ( // Ignore browser emulated mouse events
  eventType === 'mousedown' && isEmulatingMouseEvents || eventType === 'mousemove' && isEmulatingMouseEvents || // Ignore mousemove if a mousedown didn't occur first
  eventType === 'mousemove' && trackedTouchCount < 1) {
    return;
  } // Remove flag after emulated events are finished


  if (isEmulatingMouseEvents && eventType === 'mouseup') {
    if (trackedTouchCount === 0) {
      isEmulatingMouseEvents = false;
    }

    return;
  }

  var isStartEvent = (0, _ResponderEventTypes.isStartish)(eventType) && (0, _utils.isPrimaryPointerDown)(domEvent);
  var isMoveEvent = (0, _ResponderEventTypes.isMoveish)(eventType);
  var isEndEvent = (0, _ResponderEventTypes.isEndish)(eventType);
  var isScrollEvent = (0, _ResponderEventTypes.isScroll)(eventType);
  var isSelectionChangeEvent = (0, _ResponderEventTypes.isSelectionChange)(eventType);
  var responderEvent = (0, _createResponderEvent.default)(domEvent);
  /**
   * Record the state of active pointers
   */

  if (isStartEvent || isMoveEvent || isEndEvent) {
    if (domEvent.touches) {
      trackedTouchCount = domEvent.touches.length;
    } else {
      if (isStartEvent) {
        trackedTouchCount = 1;
      } else if (isEndEvent) {
        trackedTouchCount = 0;
      }
    }

    _ResponderTouchHistoryStore.default.recordTouchTrack(eventType, responderEvent.nativeEvent);
  }
  /**
   * Responder System logic
   */


  var eventPaths = (0, _utils.getResponderPaths)(domEvent);
  var wasNegotiated = false;
  var wantsResponder; // If an event occured that might change the current responder...

  if (isStartEvent || isMoveEvent || isScrollEvent && trackedTouchCount > 0) {
    // If there is already a responder, prune the event paths to the lowest common ancestor
    // of the existing responder and deepest target of the event.
    var currentResponderIdPath = currentResponder.idPath;
    var eventIdPath = eventPaths.idPath;

    if (currentResponderIdPath != null && eventIdPath != null) {
      var lowestCommonAncestor = (0, _utils.getLowestCommonAncestor)(currentResponderIdPath, eventIdPath);

      if (lowestCommonAncestor != null) {
        var indexOfLowestCommonAncestor = eventIdPath.indexOf(lowestCommonAncestor); // Skip the current responder so it doesn't receive unexpected "shouldSet" events.

        var index = indexOfLowestCommonAncestor + (lowestCommonAncestor === currentResponder.id ? 1 : 0);
        eventPaths = {
          idPath: eventIdPath.slice(index),
          nodePath: eventPaths.nodePath.slice(index)
        };
      } else {
        eventPaths = null;
      }
    }

    if (eventPaths != null) {
      // If a node wants to become the responder, attempt to transfer.
      wantsResponder = findWantsResponder(eventPaths, domEvent, responderEvent);

      if (wantsResponder != null) {
        // Sets responder if none exists, or negotates with existing responder.
        attemptTransfer(responderEvent, wantsResponder);
        wasNegotiated = true;
      }
    }
  } // If there is now a responder, invoke its callbacks for the lifecycle of the gesture.


  if (currentResponder.id != null && currentResponder.node != null) {
    var _currentResponder = currentResponder,
        id = _currentResponder.id,
        node = _currentResponder.node;

    var _getResponderConfig = getResponderConfig(id),
        onResponderStart = _getResponderConfig.onResponderStart,
        onResponderMove = _getResponderConfig.onResponderMove,
        onResponderEnd = _getResponderConfig.onResponderEnd,
        onResponderRelease = _getResponderConfig.onResponderRelease,
        onResponderTerminate = _getResponderConfig.onResponderTerminate,
        onResponderTerminationRequest = _getResponderConfig.onResponderTerminationRequest;

    responderEvent.bubbles = false;
    responderEvent.cancelable = false;
    responderEvent.currentTarget = node; // Start

    if (isStartEvent) {
      if (onResponderStart != null) {
        responderEvent.dispatchConfig.registrationName = 'onResponderStart';
        onResponderStart(responderEvent);
      }
    } // Move
    else if (isMoveEvent) {
        if (onResponderMove != null) {
          responderEvent.dispatchConfig.registrationName = 'onResponderMove';
          onResponderMove(responderEvent);
        }
      } else {
        var isTerminateEvent = (0, _ResponderEventTypes.isCancelish)(eventType) || // native context menu
        eventType === 'contextmenu' || // window blur
        eventType === 'blur' && eventTarget === window || // responder (or ancestors) blur
        eventType === 'blur' && eventTarget.contains(node) && domEvent.relatedTarget !== node || // native scroll without using a pointer
        isScrollEvent && trackedTouchCount === 0 || // native scroll on node that is parent of the responder (allow siblings to scroll)
        isScrollEvent && eventTarget.contains(node) && eventTarget !== node || // native select/selectionchange on node
        isSelectionChangeEvent && (0, _utils.hasValidSelection)(domEvent);
        var isReleaseEvent = isEndEvent && !isTerminateEvent && !(0, _utils.hasTargetTouches)(node, domEvent.touches); // End

        if (isEndEvent) {
          if (onResponderEnd != null) {
            responderEvent.dispatchConfig.registrationName = 'onResponderEnd';
            onResponderEnd(responderEvent);
          }
        } // Release


        if (isReleaseEvent) {
          if (onResponderRelease != null) {
            responderEvent.dispatchConfig.registrationName = 'onResponderRelease';
            onResponderRelease(responderEvent);
          }

          changeCurrentResponder(emptyResponder);
        } // Terminate


        if (isTerminateEvent) {
          var shouldTerminate = true; // Responders can still avoid termination but only for these events.

          if (eventType === 'contextmenu' || eventType === 'scroll' || eventType === 'selectionchange') {
            // Only call this function is it wasn't already called during negotiation.
            if (wasNegotiated) {
              shouldTerminate = false;
            } else if (onResponderTerminationRequest != null) {
              responderEvent.dispatchConfig.registrationName = 'onResponderTerminationRequest';

              if (onResponderTerminationRequest(responderEvent) === false) {
                shouldTerminate = false;
              }
            }
          }

          if (shouldTerminate) {
            if (onResponderTerminate != null) {
              responderEvent.dispatchConfig.registrationName = 'onResponderTerminate';
              onResponderTerminate(responderEvent);
            }

            changeCurrentResponder(emptyResponder);
            isEmulatingMouseEvents = false;
            trackedTouchCount = 0;
          }
        }
      }
  }
}
/**
 * Walk the event path to/from the target node. At each node, stop and call the
 * relevant "shouldSet" functions for the given event type. If any of those functions
 * call "stopPropagation" on the event, stop searching for a responder.
 */


function findWantsResponder(eventPaths, domEvent, responderEvent) {
  var shouldSetCallbacks = shouldSetResponderEvents[domEvent.type]; // for Flow

  if (shouldSetCallbacks != null) {
    var idPath = eventPaths.idPath,
        nodePath = eventPaths.nodePath;
    var shouldSetCallbackCaptureName = shouldSetCallbacks[0];
    var shouldSetCallbackBubbleName = shouldSetCallbacks[1];
    var bubbles = shouldSetCallbacks[2].bubbles;

    var check = function check(id, node, callbackName) {
      var config = getResponderConfig(id);
      var shouldSetCallback = config[callbackName];

      if (shouldSetCallback != null) {
        responderEvent.currentTarget = node;

        if (shouldSetCallback(responderEvent) === true) {
          // Start the path from the potential responder
          var prunedIdPath = idPath.slice(idPath.indexOf(id));
          return {
            id: id,
            node: node,
            idPath: prunedIdPath
          };
        }
      }
    }; // capture


    for (var i = idPath.length - 1; i >= 0; i--) {
      var id = idPath[i];
      var node = nodePath[i];
      var result = check(id, node, shouldSetCallbackCaptureName);

      if (result != null) {
        return result;
      }

      if (responderEvent.isPropagationStopped() === true) {
        return;
      }
    } // bubble


    if (bubbles) {
      for (var _i = 0; _i < idPath.length; _i++) {
        var _id = idPath[_i];
        var _node = nodePath[_i];

        var _result = check(_id, _node, shouldSetCallbackBubbleName);

        if (_result != null) {
          return _result;
        }

        if (responderEvent.isPropagationStopped() === true) {
          return;
        }
      }
    } else {
      var _id2 = idPath[0];
      var _node2 = nodePath[0];
      var target = domEvent.target;

      if (target === _node2) {
        return check(_id2, _node2, shouldSetCallbackBubbleName);
      }
    }
  }
}
/**
 * Attempt to transfer the responder.
 */


function attemptTransfer(responderEvent, wantsResponder) {
  var _currentResponder2 = currentResponder,
      currentId = _currentResponder2.id,
      currentNode = _currentResponder2.node;
  var id = wantsResponder.id,
      node = wantsResponder.node;

  var _getResponderConfig2 = getResponderConfig(id),
      onResponderGrant = _getResponderConfig2.onResponderGrant,
      onResponderReject = _getResponderConfig2.onResponderReject;

  responderEvent.bubbles = false;
  responderEvent.cancelable = false;
  responderEvent.currentTarget = node; // Set responder

  if (currentId == null) {
    if (onResponderGrant != null) {
      responderEvent.currentTarget = node;
      responderEvent.dispatchConfig.registrationName = 'onResponderGrant';
      onResponderGrant(responderEvent);
    }

    changeCurrentResponder(wantsResponder);
  } // Negotiate with current responder
  else {
      var _getResponderConfig3 = getResponderConfig(currentId),
          onResponderTerminate = _getResponderConfig3.onResponderTerminate,
          onResponderTerminationRequest = _getResponderConfig3.onResponderTerminationRequest;

      var allowTransfer = true;

      if (onResponderTerminationRequest != null) {
        responderEvent.currentTarget = currentNode;
        responderEvent.dispatchConfig.registrationName = 'onResponderTerminationRequest';

        if (onResponderTerminationRequest(responderEvent) === false) {
          allowTransfer = false;
        }
      }

      if (allowTransfer) {
        // Terminate existing responder
        if (onResponderTerminate != null) {
          responderEvent.currentTarget = currentNode;
          responderEvent.dispatchConfig.registrationName = 'onResponderTerminate';
          onResponderTerminate(responderEvent);
        } // Grant next responder


        if (onResponderGrant != null) {
          responderEvent.currentTarget = node;
          responderEvent.dispatchConfig.registrationName = 'onResponderGrant';
          onResponderGrant(responderEvent);
        }

        changeCurrentResponder(wantsResponder);
      } else {
        // Reject responder request
        if (onResponderReject != null) {
          responderEvent.currentTarget = node;
          responderEvent.dispatchConfig.registrationName = 'onResponderReject';
          onResponderReject(responderEvent);
        }
      }
    }
}
/* ------------ PUBLIC API ------------ */

/**
 * Attach Listeners
 *
 * Use native events as ReactDOM doesn't have a non-plugin API to implement
 * this system.
 */


var documentEventsCapturePhase = ['blur', 'scroll'];
var documentEventsBubblePhase = [// mouse
'mousedown', 'mousemove', 'mouseup', 'dragstart', // touch
'touchstart', 'touchmove', 'touchend', 'touchcancel', // other
'contextmenu', 'select', 'selectionchange'];

function attachListeners() {
  if (_ExecutionEnvironment.canUseDOM && window.__reactResponderSystemActive == null) {
    window.addEventListener('blur', eventListener);
    documentEventsBubblePhase.forEach(function (eventType) {
      document.addEventListener(eventType, eventListener);
    });
    documentEventsCapturePhase.forEach(function (eventType) {
      document.addEventListener(eventType, eventListener, true);
    });
    window.__reactResponderSystemActive = true;
  }
}
/**
 * Register a node with the ResponderSystem.
 */


function addNode(id, node, config) {
  (0, _utils.setResponderId)(node, id);
  responderListenersMap.set(id, config);
}
/**
 * Unregister a node with the ResponderSystem.
 */


function removeNode(id) {
  if (currentResponder.id === id) {
    terminateResponder();
  }

  if (responderListenersMap.has(id)) {
    responderListenersMap.delete(id);
  }
}
/**
 * Allow the current responder to be terminated from within components to support
 * more complex requirements, such as use with other React libraries for working
 * with scroll views, input views, etc.
 */


function terminateResponder() {
  var _currentResponder3 = currentResponder,
      id = _currentResponder3.id,
      node = _currentResponder3.node;

  if (id != null && node != null) {
    var _getResponderConfig4 = getResponderConfig(id),
        onResponderTerminate = _getResponderConfig4.onResponderTerminate;

    if (onResponderTerminate != null) {
      var event = (0, _createResponderEvent.default)({});
      event.currentTarget = node;
      onResponderTerminate(event);
    }

    changeCurrentResponder(emptyResponder);
  }

  isEmulatingMouseEvents = false;
  trackedTouchCount = 0;
}
/**
 * Allow unit tests to inspect the current responder in the system.
 * FOR TESTING ONLY.
 */


function getResponderNode() {
  return currentResponder.node;
}