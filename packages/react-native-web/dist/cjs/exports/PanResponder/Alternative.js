/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

/**
 * PAN RESPONDER
 *
 * `PanResponder` uses the Responder System to reconcile several touches into
 * a single gesture. It makes single-touch gestures resilient to extra touches,
 * and can be used to recognize simple multi-touch gestures. For each handler,
 * it provides a `gestureState` object alongside the ResponderEvent object.
 *
 * By default, `PanResponder` holds an `InteractionManager` handle to block
 * long-running JS events from interrupting active gestures.
 *
 * A graphical explanation of the touch data flow:
 *
 * +----------------------------+             +--------------------------------+
 * | ResponderTouchHistoryStore |             |TouchHistoryMath                |
 * +----------------------------+             +----------+---------------------+
 * |Global store of touchHistory|             |Allocation-less math util       |
 * |including activeness, start |             |on touch history (centroids     |
 * |position, prev/cur position.|             |and multitouch movement etc)    |
 * |                            |             |                                |
 * +----^-----------------------+             +----^---------------------------+
 *      |                                          |
 *      | (records relevant history                |
 *      |  of touches relevant for                 |
 *      |  implementing higher level               |
 *      |  gestures)                               |
 *      |                                          |
 * +----+-----------------------+             +----|---------------------------+
 * | ResponderEventPlugin       |             |    |   Your App/Component      |
 * +----------------------------+             +----|---------------------------+
 * |Negotiates which view gets  | Low level   |    |             High level    |
 * |onResponderMove events.     | events w/   |  +-+-------+     events w/     |
 * |Also records history into   | touchHistory|  |   Pan   |     multitouch +  |
 * |ResponderTouchHistoryStore. +---------------->Responder+-----> accumulative|
 * +----------------------------+ attached to |  |         |     distance and  |
 *                                 each event |  +---------+     velocity.     |
 *                                            |                                |
 *                                            |                                |
 *                                            +--------------------------------+
 */
'use strict';

exports.__esModule = true;
exports.default = void 0;

var _InteractionManager = _interopRequireDefault(require("../InteractionManager"));

var _TouchHistoryMath = _interopRequireDefault(require("../../vendor/react-native/TouchHistoryMath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentCentroidX = _TouchHistoryMath.default.currentCentroidX,
    currentCentroidY = _TouchHistoryMath.default.currentCentroidY,
    currentCentroidXOfTouchesChangedAfter = _TouchHistoryMath.default.currentCentroidXOfTouchesChangedAfter,
    currentCentroidYOfTouchesChangedAfter = _TouchHistoryMath.default.currentCentroidYOfTouchesChangedAfter,
    previousCentroidXOfTouchesChangedAfter = _TouchHistoryMath.default.previousCentroidXOfTouchesChangedAfter,
    previousCentroidYOfTouchesChangedAfter = _TouchHistoryMath.default.previousCentroidYOfTouchesChangedAfter;
var PanResponder = {
  _initializeGestureState: function _initializeGestureState(gestureState) {
    gestureState.x = 0;
    gestureState.y = 0;
    gestureState.initialX = 0;
    gestureState.initialY = 0;
    gestureState.deltaX = 0;
    gestureState.deltaY = 0;
    gestureState.velocityX = 0;
    gestureState.velocityY = 0;
    gestureState.numberActiveTouches = 0; // All `gestureState` accounts for timeStamps up until:

    gestureState._accountsForMovesUpTo = 0;
  },

  /**
   * Take all recently moved touches, calculate how the centroid has changed just for those
   * recently moved touches, and append that change to an accumulator. This is
   * to (at least) handle the case where the user is moving three fingers, and
   * then one of the fingers stops but the other two continue.
   *
   * This is very different than taking all of the recently moved touches and
   * storing their centroid as `dx/dy`. For correctness, we must *accumulate
   * changes* in the centroid of recently moved touches.
   *
   * There is also some nuance with how we handle multiple moved touches in a
   * single event. Multiple touches generate two 'move' events, each of
   * them triggering `onResponderMove`. But with the way `PanResponder` works,
   * all of the gesture inference is performed on the first dispatch, since it
   * looks at all of the touches. Therefore, `PanResponder` does not call
   * `onResponderMove` passed the first dispatch. This diverges from the
   * typical responder callback pattern (without using `PanResponder`), but
   * avoids more dispatches than necessary.
   *
   * When moving two touches in opposite directions, the cumulative
   * distance is zero in each dimension. When two touches move in parallel five
   * pixels in the same direction, the cumulative distance is five, not ten. If
   * two touches start, one moves five in a direction, then stops and the other
   * touch moves fives in the same direction, the cumulative distance is ten.
   *
   * This logic requires a kind of processing of time "clusters" of touch events
   * so that two touch moves that essentially occur in parallel but move every
   * other frame respectively, are considered part of the same movement.
   *
   * x/y: If a move event has been observed, `(x, y)` is the centroid of the most
   * recently moved "cluster" of active touches.
   * deltaX/deltaY: Cumulative touch distance. Accounts for touch moves that are
   * clustered together in time, moving the same direction. Only valid when
   * currently responder (otherwise, it only represents the drag distance below
   * the threshold).
   */
  _updateGestureStateOnMove: function _updateGestureStateOnMove(gestureState, touchHistory) {
    var movedAfter = gestureState._accountsForMovesUpTo;
    var prevX = previousCentroidXOfTouchesChangedAfter(touchHistory, movedAfter);
    var prevY = previousCentroidYOfTouchesChangedAfter(touchHistory, movedAfter);
    var prevDeltaX = gestureState.deltaX;
    var prevDeltaY = gestureState.deltaY;
    var x = currentCentroidXOfTouchesChangedAfter(touchHistory, movedAfter);
    var y = currentCentroidYOfTouchesChangedAfter(touchHistory, movedAfter);
    var deltaX = prevDeltaX + (x - prevX);
    var deltaY = prevDeltaY + (y - prevY); // TODO: This must be filtered intelligently.

    var dt = touchHistory.mostRecentTimeStamp - gestureState._accountsForMovesUpTo;
    gestureState.deltaX = deltaX;
    gestureState.deltaY = deltaY;
    gestureState.numberActiveTouches = touchHistory.numberActiveTouches;
    gestureState.velocityX = (deltaX - prevDeltaX) / dt;
    gestureState.velocityY = (deltaY - prevDeltaY) / dt;
    gestureState.x = x;
    gestureState.y = y;
    gestureState._accountsForMovesUpTo = touchHistory.mostRecentTimeStamp;
  },

  /**
   * Enhanced versions of all of the responder callbacks that provide not only
   * the `ResponderEvent`, but also the `PanResponder` gesture state.
   *
   * In general, for events that have capture equivalents, we update the
   * gestureState once in the capture phase and can use it in the bubble phase
   * as well.
   */
  create: function create(config) {
    var interactionState = {
      handle: null
    };
    var gestureState = {
      // Useful for debugging
      stateID: Math.random(),
      x: 0,
      y: 0,
      initialX: 0,
      initialY: 0,
      deltaX: 0,
      deltaY: 0,
      velocityX: 0,
      velocityY: 0,
      numberActiveTouches: 0,
      _accountsForMovesUpTo: 0
    };
    var _onStartShouldSetResponder = config.onStartShouldSetResponder,
        _onStartShouldSetResponderCapture = config.onStartShouldSetResponderCapture,
        _onMoveShouldSetResponder = config.onMoveShouldSetResponder,
        _onMoveShouldSetResponderCapture = config.onMoveShouldSetResponderCapture,
        onPanGrant = config.onPanGrant,
        onPanStart = config.onPanStart,
        onPanMove = config.onPanMove,
        onPanEnd = config.onPanEnd,
        onPanRelease = config.onPanRelease,
        onPanReject = config.onPanReject,
        onPanTerminate = config.onPanTerminate,
        onPanTerminationRequest = config.onPanTerminationRequest;
    var panHandlers = {
      onStartShouldSetResponder: function onStartShouldSetResponder(event) {
        return _onStartShouldSetResponder != null ? _onStartShouldSetResponder(event, gestureState) : false;
      },
      onMoveShouldSetResponder: function onMoveShouldSetResponder(event) {
        return _onMoveShouldSetResponder != null ? _onMoveShouldSetResponder(event, gestureState) : false;
      },
      onStartShouldSetResponderCapture: function onStartShouldSetResponderCapture(event) {
        // TODO: Actually, we should reinitialize the state any time
        // touches.length increases from 0 active to > 0 active.
        if (event.nativeEvent.touches.length === 1) {
          PanResponder._initializeGestureState(gestureState);
        }

        gestureState.numberActiveTouches = event.touchHistory.numberActiveTouches;
        return _onStartShouldSetResponderCapture != null ? _onStartShouldSetResponderCapture(event, gestureState) : false;
      },
      onMoveShouldSetResponderCapture: function onMoveShouldSetResponderCapture(event) {
        var touchHistory = event.touchHistory; // Responder system incorrectly dispatches should* to current responder
        // Filter out any touch moves past the first one - we would have
        // already processed multi-touch geometry during the first event.
        // NOTE: commented out because new responder system should get it right.
        //if (gestureState._accountsForMovesUpTo === touchHistory.mostRecentTimeStamp) {
        //  return false;
        //}

        PanResponder._updateGestureStateOnMove(gestureState, touchHistory);

        return _onMoveShouldSetResponderCapture != null ? _onMoveShouldSetResponderCapture(event, gestureState) : false;
      },
      onResponderGrant: function onResponderGrant(event) {
        if (!interactionState.handle) {
          interactionState.handle = _InteractionManager.default.createInteractionHandle();
        }

        gestureState.initialX = currentCentroidX(event.touchHistory);
        gestureState.initialY = currentCentroidY(event.touchHistory);
        gestureState.deltaX = 0;
        gestureState.deltaY = 0;

        if (onPanGrant != null) {
          onPanGrant(event, gestureState);
        }
      },
      onResponderReject: function onResponderReject(event) {
        clearInteractionHandle(interactionState, onPanReject, event, gestureState);
      },
      onResponderStart: function onResponderStart(event) {
        var numberActiveTouches = event.touchHistory.numberActiveTouches;
        gestureState.numberActiveTouches = numberActiveTouches;

        if (onPanStart != null) {
          onPanStart(event, gestureState);
        }
      },
      onResponderMove: function onResponderMove(event) {
        var touchHistory = event.touchHistory; // Guard against the dispatch of two touch moves when there are two
        // simultaneously changed touches.

        if (gestureState._accountsForMovesUpTo === touchHistory.mostRecentTimeStamp) {
          return;
        } // Filter out any touch moves past the first one - we would have
        // already processed multi-touch geometry during the first event.


        PanResponder._updateGestureStateOnMove(gestureState, touchHistory);

        if (onPanMove != null) {
          onPanMove(event, gestureState);
        }
      },
      onResponderEnd: function onResponderEnd(event) {
        var numberActiveTouches = event.touchHistory.numberActiveTouches;
        gestureState.numberActiveTouches = numberActiveTouches;
        clearInteractionHandle(interactionState, onPanEnd, event, gestureState);
      },
      onResponderRelease: function onResponderRelease(event) {
        clearInteractionHandle(interactionState, onPanRelease, event, gestureState);

        PanResponder._initializeGestureState(gestureState);
      },
      onResponderTerminate: function onResponderTerminate(event) {
        clearInteractionHandle(interactionState, onPanTerminate, event, gestureState);

        PanResponder._initializeGestureState(gestureState);
      },
      onResponderTerminationRequest: function onResponderTerminationRequest(event) {
        return onPanTerminationRequest != null ? onPanTerminationRequest(event, gestureState) : true;
      }
    };
    return {
      panHandlers: panHandlers,
      getInteractionHandle: function getInteractionHandle() {
        return interactionState.handle;
      }
    };
  }
};

function clearInteractionHandle(interactionState, callback, event, gestureState) {
  if (interactionState.handle) {
    _InteractionManager.default.clearInteractionHandle(interactionState.handle);

    interactionState.handle = null;
  }

  if (callback) {
    callback(event, gestureState);
  }
}

var _default = PanResponder;
exports.default = _default;
module.exports = exports.default;