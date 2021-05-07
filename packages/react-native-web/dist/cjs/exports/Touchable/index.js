/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

exports.__esModule = true;
exports.default = void 0;

var _AccessibilityUtil = _interopRequireDefault(require("../../modules/AccessibilityUtil"));

var _BoundingDimensions = _interopRequireDefault(require("./BoundingDimensions"));

var _findNodeHandle = _interopRequireDefault(require("../findNodeHandle"));

var _normalizeCssColor = _interopRequireDefault(require("normalize-css-color"));

var _Position = _interopRequireDefault(require("./Position"));

var _react = _interopRequireDefault(require("react"));

var _UIManager = _interopRequireDefault(require("../UIManager"));

var _View = _interopRequireDefault(require("../View"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var extractSingleTouch = function extractSingleTouch(nativeEvent) {
  var touches = nativeEvent.touches;
  var changedTouches = nativeEvent.changedTouches;
  var hasTouches = touches && touches.length > 0;
  var hasChangedTouches = changedTouches && changedTouches.length > 0;
  return !hasTouches && hasChangedTouches ? changedTouches[0] : hasTouches ? touches[0] : nativeEvent;
};
/**
 * `Touchable`: Taps done right.
 *
 * You hook your `ResponderEventPlugin` events into `Touchable`. `Touchable`
 * will measure time/geometry and tells you when to give feedback to the user.
 *
 * ====================== Touchable Tutorial ===============================
 * The `Touchable` mixin helps you handle the "press" interaction. It analyzes
 * the geometry of elements, and observes when another responder (scroll view
 * etc) has stolen the touch lock. It notifies your component when it should
 * give feedback to the user. (bouncing/highlighting/unhighlighting).
 *
 * - When a touch was activated (typically you highlight)
 * - When a touch was deactivated (typically you unhighlight)
 * - When a touch was "pressed" - a touch ended while still within the geometry
 *   of the element, and no other element (like scroller) has "stolen" touch
 *   lock ("responder") (Typically you bounce the element).
 *
 * A good tap interaction isn't as simple as you might think. There should be a
 * slight delay before showing a highlight when starting a touch. If a
 * subsequent touch move exceeds the boundary of the element, it should
 * unhighlight, but if that same touch is brought back within the boundary, it
 * should rehighlight again. A touch can move in and out of that boundary
 * several times, each time toggling highlighting, but a "press" is only
 * triggered if that touch ends while within the element's boundary and no
 * scroller (or anything else) has stolen the lock on touches.
 *
 * To create a new type of component that handles interaction using the
 * `Touchable` mixin, do the following:
 *
 * - Initialize the `Touchable` state.
 *
 *   getInitialState: function() {
 *     return merge(this.touchableGetInitialState(), yourComponentState);
 *   }
 *
 * - Choose the rendered component who's touches should start the interactive
 *   sequence. On that rendered node, forward all `Touchable` responder
 *   handlers. You can choose any rendered node you like. Choose a node whose
 *   hit target you'd like to instigate the interaction sequence:
 *
 *   // In render function:
 *   return (
 *     <View
 *       onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
 *       onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
 *       onResponderGrant={this.touchableHandleResponderGrant}
 *       onResponderMove={this.touchableHandleResponderMove}
 *       onResponderRelease={this.touchableHandleResponderRelease}
 *       onResponderTerminate={this.touchableHandleResponderTerminate}>
 *       <View>
 *         Even though the hit detection/interactions are triggered by the
 *         wrapping (typically larger) node, we usually end up implementing
 *         custom logic that highlights this inner one.
 *       </View>
 *     </View>
 *   );
 *
 * - You may set up your own handlers for each of these events, so long as you
 *   also invoke the `touchable*` handlers inside of your custom handler.
 *
 * - Implement the handlers on your component class in order to provide
 *   feedback to the user. See documentation for each of these class methods
 *   that you should implement.
 *
 *   touchableHandlePress: function() {
 *      this.performBounceAnimation();  // or whatever you want to do.
 *   },
 *   touchableHandleActivePressIn: function() {
 *     this.beginHighlighting(...);  // Whatever you like to convey activation
 *   },
 *   touchableHandleActivePressOut: function() {
 *     this.endHighlighting(...);  // Whatever you like to convey deactivation
 *   },
 *
 * - There are more advanced methods you can implement (see documentation below):
 *   touchableGetHighlightDelayMS: function() {
 *     return 20;
 *   }
 *   // In practice, *always* use a predeclared constant (conserve memory).
 *   touchableGetPressRectOffset: function() {
 *     return {top: 20, left: 20, right: 20, bottom: 100};
 *   }
 */

/**
 * Touchable states.
 */


var States = {
  NOT_RESPONDER: 'NOT_RESPONDER',
  // Not the responder
  RESPONDER_INACTIVE_PRESS_IN: 'RESPONDER_INACTIVE_PRESS_IN',
  // Responder, inactive, in the `PressRect`
  RESPONDER_INACTIVE_PRESS_OUT: 'RESPONDER_INACTIVE_PRESS_OUT',
  // Responder, inactive, out of `PressRect`
  RESPONDER_ACTIVE_PRESS_IN: 'RESPONDER_ACTIVE_PRESS_IN',
  // Responder, active, in the `PressRect`
  RESPONDER_ACTIVE_PRESS_OUT: 'RESPONDER_ACTIVE_PRESS_OUT',
  // Responder, active, out of `PressRect`
  RESPONDER_ACTIVE_LONG_PRESS_IN: 'RESPONDER_ACTIVE_LONG_PRESS_IN',
  // Responder, active, in the `PressRect`, after long press threshold
  RESPONDER_ACTIVE_LONG_PRESS_OUT: 'RESPONDER_ACTIVE_LONG_PRESS_OUT',
  // Responder, active, out of `PressRect`, after long press threshold
  ERROR: 'ERROR'
};

/*
 * Quick lookup map for states that are considered to be "active"
 */
var baseStatesConditions = {
  NOT_RESPONDER: false,
  RESPONDER_INACTIVE_PRESS_IN: false,
  RESPONDER_INACTIVE_PRESS_OUT: false,
  RESPONDER_ACTIVE_PRESS_IN: false,
  RESPONDER_ACTIVE_PRESS_OUT: false,
  RESPONDER_ACTIVE_LONG_PRESS_IN: false,
  RESPONDER_ACTIVE_LONG_PRESS_OUT: false,
  ERROR: false
};

var IsActive = _objectSpread(_objectSpread({}, baseStatesConditions), {}, {
  RESPONDER_ACTIVE_PRESS_OUT: true,
  RESPONDER_ACTIVE_PRESS_IN: true
});
/**
 * Quick lookup for states that are considered to be "pressing" and are
 * therefore eligible to result in a "selection" if the press stops.
 */


var IsPressingIn = _objectSpread(_objectSpread({}, baseStatesConditions), {}, {
  RESPONDER_INACTIVE_PRESS_IN: true,
  RESPONDER_ACTIVE_PRESS_IN: true,
  RESPONDER_ACTIVE_LONG_PRESS_IN: true
});

var IsLongPressingIn = _objectSpread(_objectSpread({}, baseStatesConditions), {}, {
  RESPONDER_ACTIVE_LONG_PRESS_IN: true
});
/**
 * Inputs to the state machine.
 */


var Signals = {
  DELAY: 'DELAY',
  RESPONDER_GRANT: 'RESPONDER_GRANT',
  RESPONDER_RELEASE: 'RESPONDER_RELEASE',
  RESPONDER_TERMINATED: 'RESPONDER_TERMINATED',
  ENTER_PRESS_RECT: 'ENTER_PRESS_RECT',
  LEAVE_PRESS_RECT: 'LEAVE_PRESS_RECT',
  LONG_PRESS_DETECTED: 'LONG_PRESS_DETECTED'
};

/**
 * Mapping from States x Signals => States
 */
var Transitions = {
  NOT_RESPONDER: {
    DELAY: States.ERROR,
    RESPONDER_GRANT: States.RESPONDER_INACTIVE_PRESS_IN,
    RESPONDER_RELEASE: States.ERROR,
    RESPONDER_TERMINATED: States.ERROR,
    ENTER_PRESS_RECT: States.ERROR,
    LEAVE_PRESS_RECT: States.ERROR,
    LONG_PRESS_DETECTED: States.ERROR
  },
  RESPONDER_INACTIVE_PRESS_IN: {
    DELAY: States.RESPONDER_ACTIVE_PRESS_IN,
    RESPONDER_GRANT: States.ERROR,
    RESPONDER_RELEASE: States.NOT_RESPONDER,
    RESPONDER_TERMINATED: States.NOT_RESPONDER,
    ENTER_PRESS_RECT: States.RESPONDER_INACTIVE_PRESS_IN,
    LEAVE_PRESS_RECT: States.RESPONDER_INACTIVE_PRESS_OUT,
    LONG_PRESS_DETECTED: States.ERROR
  },
  RESPONDER_INACTIVE_PRESS_OUT: {
    DELAY: States.RESPONDER_ACTIVE_PRESS_OUT,
    RESPONDER_GRANT: States.ERROR,
    RESPONDER_RELEASE: States.NOT_RESPONDER,
    RESPONDER_TERMINATED: States.NOT_RESPONDER,
    ENTER_PRESS_RECT: States.RESPONDER_INACTIVE_PRESS_IN,
    LEAVE_PRESS_RECT: States.RESPONDER_INACTIVE_PRESS_OUT,
    LONG_PRESS_DETECTED: States.ERROR
  },
  RESPONDER_ACTIVE_PRESS_IN: {
    DELAY: States.ERROR,
    RESPONDER_GRANT: States.ERROR,
    RESPONDER_RELEASE: States.NOT_RESPONDER,
    RESPONDER_TERMINATED: States.NOT_RESPONDER,
    ENTER_PRESS_RECT: States.RESPONDER_ACTIVE_PRESS_IN,
    LEAVE_PRESS_RECT: States.RESPONDER_ACTIVE_PRESS_OUT,
    LONG_PRESS_DETECTED: States.RESPONDER_ACTIVE_LONG_PRESS_IN
  },
  RESPONDER_ACTIVE_PRESS_OUT: {
    DELAY: States.ERROR,
    RESPONDER_GRANT: States.ERROR,
    RESPONDER_RELEASE: States.NOT_RESPONDER,
    RESPONDER_TERMINATED: States.NOT_RESPONDER,
    ENTER_PRESS_RECT: States.RESPONDER_ACTIVE_PRESS_IN,
    LEAVE_PRESS_RECT: States.RESPONDER_ACTIVE_PRESS_OUT,
    LONG_PRESS_DETECTED: States.ERROR
  },
  RESPONDER_ACTIVE_LONG_PRESS_IN: {
    DELAY: States.ERROR,
    RESPONDER_GRANT: States.ERROR,
    RESPONDER_RELEASE: States.NOT_RESPONDER,
    RESPONDER_TERMINATED: States.NOT_RESPONDER,
    ENTER_PRESS_RECT: States.RESPONDER_ACTIVE_LONG_PRESS_IN,
    LEAVE_PRESS_RECT: States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
    LONG_PRESS_DETECTED: States.RESPONDER_ACTIVE_LONG_PRESS_IN
  },
  RESPONDER_ACTIVE_LONG_PRESS_OUT: {
    DELAY: States.ERROR,
    RESPONDER_GRANT: States.ERROR,
    RESPONDER_RELEASE: States.NOT_RESPONDER,
    RESPONDER_TERMINATED: States.NOT_RESPONDER,
    ENTER_PRESS_RECT: States.RESPONDER_ACTIVE_LONG_PRESS_IN,
    LEAVE_PRESS_RECT: States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
    LONG_PRESS_DETECTED: States.ERROR
  },
  error: {
    DELAY: States.NOT_RESPONDER,
    RESPONDER_GRANT: States.RESPONDER_INACTIVE_PRESS_IN,
    RESPONDER_RELEASE: States.NOT_RESPONDER,
    RESPONDER_TERMINATED: States.NOT_RESPONDER,
    ENTER_PRESS_RECT: States.NOT_RESPONDER,
    LEAVE_PRESS_RECT: States.NOT_RESPONDER,
    LONG_PRESS_DETECTED: States.NOT_RESPONDER
  }
}; // ==== Typical Constants for integrating into UI components ====
// var HIT_EXPAND_PX = 20;
// var HIT_VERT_OFFSET_PX = 10;

var HIGHLIGHT_DELAY_MS = 130;
var PRESS_EXPAND_PX = 20;
var LONG_PRESS_THRESHOLD = 500;
var LONG_PRESS_DELAY_MS = LONG_PRESS_THRESHOLD - HIGHLIGHT_DELAY_MS;
var LONG_PRESS_ALLOWED_MOVEMENT = 10; // Default amount "active" region protrudes beyond box

/**
 * By convention, methods prefixed with underscores are meant to be @private,
 * and not @protected. Mixers shouldn't access them - not even to provide them
 * as callback handlers.
 *
 *
 * ========== Geometry =========
 * `Touchable` only assumes that there exists a `HitRect` node. The `PressRect`
 * is an abstract box that is extended beyond the `HitRect`.
 *
 *  +--------------------------+
 *  |                          | - "Start" events in `HitRect` cause `HitRect`
 *  |  +--------------------+  |   to become the responder.
 *  |  |  +--------------+  |  | - `HitRect` is typically expanded around
 *  |  |  |              |  |  |   the `VisualRect`, but shifted downward.
 *  |  |  |  VisualRect  |  |  | - After pressing down, after some delay,
 *  |  |  |              |  |  |   and before letting up, the Visual React
 *  |  |  +--------------+  |  |   will become "active". This makes it eligible
 *  |  |     HitRect        |  |   for being highlighted (so long as the
 *  |  +--------------------+  |   press remains in the `PressRect`).
 *  |        PressRect     o   |
 *  +----------------------|---+
 *           Out Region    |
 *                         +-----+ This gap between the `HitRect` and
 *                                 `PressRect` allows a touch to move far away
 *                                 from the original hit rect, and remain
 *                                 highlighted, and eligible for a "Press".
 *                                 Customize this via
 *                                 `touchableGetPressRectOffset()`.
 *
 *
 *
 * ======= State Machine =======
 *
 * +-------------+ <---+ RESPONDER_RELEASE
 * |NOT_RESPONDER|
 * +-------------+ <---+ RESPONDER_TERMINATED
 *     +
 *     | RESPONDER_GRANT (HitRect)
 *     v
 * +---------------------------+  DELAY   +-------------------------+  T + DELAY     +------------------------------+
 * |RESPONDER_INACTIVE_PRESS_IN|+-------->|RESPONDER_ACTIVE_PRESS_IN| +------------> |RESPONDER_ACTIVE_LONG_PRESS_IN|
 * +---------------------------+          +-------------------------+                +------------------------------+
 *     +            ^                         +           ^                                 +           ^
 *     |LEAVE_      |ENTER_                   |LEAVE_     |ENTER_                           |LEAVE_     |ENTER_
 *     |PRESS_RECT  |PRESS_RECT               |PRESS_RECT |PRESS_RECT                       |PRESS_RECT |PRESS_RECT
 *     |            |                         |           |                                 |           |
 *     v            +                         v           +                                 v           +
 * +----------------------------+  DELAY  +--------------------------+               +-------------------------------+
 * |RESPONDER_INACTIVE_PRESS_OUT|+------->|RESPONDER_ACTIVE_PRESS_OUT|               |RESPONDER_ACTIVE_LONG_PRESS_OUT|
 * +----------------------------+         +--------------------------+               +-------------------------------+
 *
 * T + DELAY => LONG_PRESS_DELAY_MS + DELAY
 *
 * Not drawn are the side effects of each transition. The most important side
 * effect is the `touchableHandlePress` abstract method invocation that occurs
 * when a responder is released while in either of the "Press" states.
 *
 * The other important side effects are the highlight abstract method
 * invocations (internal callbacks) to be implemented by the mixer.
 *
 *
 * @lends Touchable.prototype
 */

var TouchableMixin = {
  // HACK (part 1): basic support for touchable interactions using a keyboard
  componentDidMount: function componentDidMount() {
    var _this = this;

    this._touchableNode = (0, _findNodeHandle.default)(this);

    if (this._touchableNode && this._touchableNode.addEventListener) {
      this._touchableBlurListener = function (e) {
        if (_this._isTouchableKeyboardActive) {
          if (_this.state.touchable.touchState && _this.state.touchable.touchState !== States.NOT_RESPONDER) {
            _this.touchableHandleResponderTerminate({
              nativeEvent: e
            });
          }

          _this._isTouchableKeyboardActive = false;
        }
      };

      this._touchableNode.addEventListener('blur', this._touchableBlurListener);
    }
  },

  /**
   * Clear all timeouts on unmount
   */
  componentWillUnmount: function componentWillUnmount() {
    if (this._touchableNode && this._touchableNode.addEventListener) {
      this._touchableNode.removeEventListener('blur', this._touchableBlurListener);
    }

    this.touchableDelayTimeout && clearTimeout(this.touchableDelayTimeout);
    this.longPressDelayTimeout && clearTimeout(this.longPressDelayTimeout);
    this.pressOutDelayTimeout && clearTimeout(this.pressOutDelayTimeout);
  },

  /**
   * It's prefer that mixins determine state in this way, having the class
   * explicitly mix the state in the one and only `getInitialState` method.
   *
   * @return {object} State object to be placed inside of
   * `this.state.touchable`.
   */
  touchableGetInitialState: function touchableGetInitialState() {
    return {
      touchable: {
        touchState: undefined,
        responderID: null
      }
    };
  },
  // ==== Hooks to Gesture Responder system ====

  /**
   * Must return true if embedded in a native platform scroll view.
   */
  touchableHandleResponderTerminationRequest: function touchableHandleResponderTerminationRequest() {
    return !this.props.rejectResponderTermination;
  },

  /**
   * Must return true to start the process of `Touchable`.
   */
  touchableHandleStartShouldSetResponder: function touchableHandleStartShouldSetResponder() {
    return !this.props.disabled;
  },

  /**
   * Return true to cancel press on long press.
   */
  touchableLongPressCancelsPress: function touchableLongPressCancelsPress() {
    return true;
  },

  /**
   * Place as callback for a DOM element's `onResponderGrant` event.
   * @param {SyntheticEvent} e Synthetic event from event system.
   *
   */
  touchableHandleResponderGrant: function touchableHandleResponderGrant(e) {
    var dispatchID = e.currentTarget; // Since e is used in a callback invoked on another event loop
    // (as in setTimeout etc), we need to call e.persist() on the
    // event to make sure it doesn't get reused in the event object pool.

    e.persist();
    this.pressOutDelayTimeout && clearTimeout(this.pressOutDelayTimeout);
    this.pressOutDelayTimeout = null;
    this.state.touchable.touchState = States.NOT_RESPONDER;
    this.state.touchable.responderID = dispatchID;

    this._receiveSignal(Signals.RESPONDER_GRANT, e);

    var delayMS = this.touchableGetHighlightDelayMS !== undefined ? Math.max(this.touchableGetHighlightDelayMS(), 0) : HIGHLIGHT_DELAY_MS;
    delayMS = isNaN(delayMS) ? HIGHLIGHT_DELAY_MS : delayMS;

    if (delayMS !== 0) {
      this.touchableDelayTimeout = setTimeout(this._handleDelay.bind(this, e), delayMS);
    } else {
      this._handleDelay(e);
    }

    var longDelayMS = this.touchableGetLongPressDelayMS !== undefined ? Math.max(this.touchableGetLongPressDelayMS(), 10) : LONG_PRESS_DELAY_MS;
    longDelayMS = isNaN(longDelayMS) ? LONG_PRESS_DELAY_MS : longDelayMS;
    this.longPressDelayTimeout = setTimeout(this._handleLongDelay.bind(this, e), longDelayMS + delayMS);
  },

  /**
   * Place as callback for a DOM element's `onResponderRelease` event.
   */
  touchableHandleResponderRelease: function touchableHandleResponderRelease(e) {
    this.pressInLocation = null;

    this._receiveSignal(Signals.RESPONDER_RELEASE, e);
  },

  /**
   * Place as callback for a DOM element's `onResponderTerminate` event.
   */
  touchableHandleResponderTerminate: function touchableHandleResponderTerminate(e) {
    this.pressInLocation = null;

    this._receiveSignal(Signals.RESPONDER_TERMINATED, e);
  },

  /**
   * Place as callback for a DOM element's `onResponderMove` event.
   */
  touchableHandleResponderMove: function touchableHandleResponderMove(e) {
    // Measurement may not have returned yet.
    if (!this.state.touchable.positionOnActivate) {
      return;
    }

    var positionOnActivate = this.state.touchable.positionOnActivate;
    var dimensionsOnActivate = this.state.touchable.dimensionsOnActivate;
    var pressRectOffset = this.touchableGetPressRectOffset ? this.touchableGetPressRectOffset() : {
      left: PRESS_EXPAND_PX,
      right: PRESS_EXPAND_PX,
      top: PRESS_EXPAND_PX,
      bottom: PRESS_EXPAND_PX
    };
    var pressExpandLeft = pressRectOffset.left;
    var pressExpandTop = pressRectOffset.top;
    var pressExpandRight = pressRectOffset.right;
    var pressExpandBottom = pressRectOffset.bottom;
    var hitSlop = this.touchableGetHitSlop ? this.touchableGetHitSlop() : null;

    if (hitSlop) {
      pressExpandLeft += hitSlop.left || 0;
      pressExpandTop += hitSlop.top || 0;
      pressExpandRight += hitSlop.right || 0;
      pressExpandBottom += hitSlop.bottom || 0;
    }

    var touch = extractSingleTouch(e.nativeEvent);
    var pageX = touch && touch.pageX;
    var pageY = touch && touch.pageY;

    if (this.pressInLocation) {
      var movedDistance = this._getDistanceBetweenPoints(pageX, pageY, this.pressInLocation.pageX, this.pressInLocation.pageY);

      if (movedDistance > LONG_PRESS_ALLOWED_MOVEMENT) {
        this._cancelLongPressDelayTimeout();
      }
    }

    var isTouchWithinActive = pageX > positionOnActivate.left - pressExpandLeft && pageY > positionOnActivate.top - pressExpandTop && pageX < positionOnActivate.left + dimensionsOnActivate.width + pressExpandRight && pageY < positionOnActivate.top + dimensionsOnActivate.height + pressExpandBottom;

    if (isTouchWithinActive) {
      var prevState = this.state.touchable.touchState;

      this._receiveSignal(Signals.ENTER_PRESS_RECT, e);

      var curState = this.state.touchable.touchState;

      if (curState === States.RESPONDER_INACTIVE_PRESS_IN && prevState !== States.RESPONDER_INACTIVE_PRESS_IN) {
        // fix for t7967420
        this._cancelLongPressDelayTimeout();
      }
    } else {
      this._cancelLongPressDelayTimeout();

      this._receiveSignal(Signals.LEAVE_PRESS_RECT, e);
    }
  },

  /**
   * Invoked when the item receives focus. Mixers might override this to
   * visually distinguish the `VisualRect` so that the user knows that it
   * currently has the focus. Most platforms only support a single element being
   * focused at a time, in which case there may have been a previously focused
   * element that was blurred just prior to this. This can be overridden when
   * using `Touchable.Mixin.withoutDefaultFocusAndBlur`.
   */
  touchableHandleFocus: function touchableHandleFocus(e) {
    this.props.onFocus && this.props.onFocus(e);
  },

  /**
   * Invoked when the item loses focus. Mixers might override this to
   * visually distinguish the `VisualRect` so that the user knows that it
   * no longer has focus. Most platforms only support a single element being
   * focused at a time, in which case the focus may have moved to another.
   * This can be overridden when using
   * `Touchable.Mixin.withoutDefaultFocusAndBlur`.
   */
  touchableHandleBlur: function touchableHandleBlur(e) {
    this.props.onBlur && this.props.onBlur(e);
  },
  // ==== Abstract Application Callbacks ====

  /**
   * Invoked when the item should be highlighted. Mixers should implement this
   * to visually distinguish the `VisualRect` so that the user knows that
   * releasing a touch will result in a "selection" (analog to click).
   *
   * @abstract
   * touchableHandleActivePressIn: function,
   */

  /**
   * Invoked when the item is "active" (in that it is still eligible to become
   * a "select") but the touch has left the `PressRect`. Usually the mixer will
   * want to unhighlight the `VisualRect`. If the user (while pressing) moves
   * back into the `PressRect` `touchableHandleActivePressIn` will be invoked
   * again and the mixer should probably highlight the `VisualRect` again. This
   * event will not fire on an `touchEnd/mouseUp` event, only move events while
   * the user is depressing the mouse/touch.
   *
   * @abstract
   * touchableHandleActivePressOut: function
   */

  /**
   * Invoked when the item is "selected" - meaning the interaction ended by
   * letting up while the item was either in the state
   * `RESPONDER_ACTIVE_PRESS_IN` or `RESPONDER_INACTIVE_PRESS_IN`.
   *
   * @abstract
   * touchableHandlePress: function
   */

  /**
   * Invoked when the item is long pressed - meaning the interaction ended by
   * letting up while the item was in `RESPONDER_ACTIVE_LONG_PRESS_IN`. If
   * `touchableHandleLongPress` is *not* provided, `touchableHandlePress` will
   * be called as it normally is. If `touchableHandleLongPress` is provided, by
   * default any `touchableHandlePress` callback will not be invoked. To
   * override this default behavior, override `touchableLongPressCancelsPress`
   * to return false. As a result, `touchableHandlePress` will be called when
   * lifting up, even if `touchableHandleLongPress` has also been called.
   *
   * @abstract
   * touchableHandleLongPress: function
   */

  /**
   * Returns the number of millis to wait before triggering a highlight.
   *
   * @abstract
   * touchableGetHighlightDelayMS: function
   */

  /**
   * Returns the amount to extend the `HitRect` into the `PressRect`. Positive
   * numbers mean the size expands outwards.
   *
   * @abstract
   * touchableGetPressRectOffset: function
   */
  // ==== Internal Logic ====

  /**
   * Measures the `HitRect` node on activation. The Bounding rectangle is with
   * respect to viewport - not page, so adding the `pageXOffset/pageYOffset`
   * should result in points that are in the same coordinate system as an
   * event's `globalX/globalY` data values.
   *
   * - Consider caching this for the lifetime of the component, or possibly
   *   being able to share this cache between any `ScrollMap` view.
   *
   * @sideeffects
   * @private
   */
  _remeasureMetricsOnActivation: function _remeasureMetricsOnActivation() {
    var tag = this.state.touchable.responderID;

    if (tag == null) {
      return;
    }

    _UIManager.default.measure(tag, this._handleQueryLayout);
  },
  _handleQueryLayout: function _handleQueryLayout(l, t, w, h, globalX, globalY) {
    //don't do anything UIManager failed to measure node
    if (!l && !t && !w && !h && !globalX && !globalY) {
      return;
    }

    this.state.touchable.positionOnActivate && _Position.default.release(this.state.touchable.positionOnActivate);
    this.state.touchable.dimensionsOnActivate && // $FlowFixMe
    _BoundingDimensions.default.release(this.state.touchable.dimensionsOnActivate);
    this.state.touchable.positionOnActivate = _Position.default.getPooled(globalX, globalY); // $FlowFixMe

    this.state.touchable.dimensionsOnActivate = _BoundingDimensions.default.getPooled(w, h);
  },
  _handleDelay: function _handleDelay(e) {
    this.touchableDelayTimeout = null;

    this._receiveSignal(Signals.DELAY, e);
  },
  _handleLongDelay: function _handleLongDelay(e) {
    this.longPressDelayTimeout = null;
    var curState = this.state.touchable.touchState;

    if (curState !== States.RESPONDER_ACTIVE_PRESS_IN && curState !== States.RESPONDER_ACTIVE_LONG_PRESS_IN) {
      console.error('Attempted to transition from state `' + curState + '` to `' + States.RESPONDER_ACTIVE_LONG_PRESS_IN + '`, which is not supported. This is ' + 'most likely due to `Touchable.longPressDelayTimeout` not being cancelled.');
    } else {
      this._receiveSignal(Signals.LONG_PRESS_DETECTED, e);
    }
  },

  /**
   * Receives a state machine signal, performs side effects of the transition
   * and stores the new state. Validates the transition as well.
   *
   * @param {Signals} signal State machine signal.
   * @throws Error if invalid state transition or unrecognized signal.
   * @sideeffects
   */
  _receiveSignal: function _receiveSignal(signal, e) {
    var responderID = this.state.touchable.responderID;
    var curState = this.state.touchable.touchState;
    var nextState = Transitions[curState] && Transitions[curState][signal];

    if (!responderID && signal === Signals.RESPONDER_RELEASE) {
      return;
    }

    if (!nextState) {
      throw new Error('Unrecognized signal `' + signal + '` or state `' + curState + '` for Touchable responder `' + responderID + '`');
    }

    if (nextState === States.ERROR) {
      throw new Error('Touchable cannot transition from `' + curState + '` to `' + signal + '` for responder `' + responderID + '`');
    }

    if (curState !== nextState) {
      this._performSideEffectsForTransition(curState, nextState, signal, e);

      this.state.touchable.touchState = nextState;
    }
  },
  _cancelLongPressDelayTimeout: function _cancelLongPressDelayTimeout() {
    this.longPressDelayTimeout && clearTimeout(this.longPressDelayTimeout);
    this.longPressDelayTimeout = null;
  },
  _isHighlight: function _isHighlight(state) {
    return state === States.RESPONDER_ACTIVE_PRESS_IN || state === States.RESPONDER_ACTIVE_LONG_PRESS_IN;
  },
  _savePressInLocation: function _savePressInLocation(e) {
    var touch = extractSingleTouch(e.nativeEvent);
    var pageX = touch && touch.pageX;
    var pageY = touch && touch.pageY;
    var locationX = touch && touch.locationX;
    var locationY = touch && touch.locationY;
    this.pressInLocation = {
      pageX: pageX,
      pageY: pageY,
      locationX: locationX,
      locationY: locationY
    };
  },
  _getDistanceBetweenPoints: function _getDistanceBetweenPoints(aX, aY, bX, bY) {
    var deltaX = aX - bX;
    var deltaY = aY - bY;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  },

  /**
   * Will perform a transition between touchable states, and identify any
   * highlighting or unhighlighting that must be performed for this particular
   * transition.
   *
   * @param {States} curState Current Touchable state.
   * @param {States} nextState Next Touchable state.
   * @param {Signal} signal Signal that triggered the transition.
   * @param {Event} e Native event.
   * @sideeffects
   */
  _performSideEffectsForTransition: function _performSideEffectsForTransition(curState, nextState, signal, e) {
    var curIsHighlight = this._isHighlight(curState);

    var newIsHighlight = this._isHighlight(nextState);

    var isFinalSignal = signal === Signals.RESPONDER_TERMINATED || signal === Signals.RESPONDER_RELEASE;

    if (isFinalSignal) {
      this._cancelLongPressDelayTimeout();
    }

    var isInitialTransition = curState === States.NOT_RESPONDER && nextState === States.RESPONDER_INACTIVE_PRESS_IN;
    var isActiveTransition = !IsActive[curState] && IsActive[nextState];

    if (isInitialTransition || isActiveTransition) {
      this._remeasureMetricsOnActivation();
    }

    if (IsPressingIn[curState] && signal === Signals.LONG_PRESS_DETECTED) {
      this.touchableHandleLongPress && this.touchableHandleLongPress(e);
    }

    if (newIsHighlight && !curIsHighlight) {
      this._startHighlight(e);
    } else if (!newIsHighlight && curIsHighlight) {
      this._endHighlight(e);
    }

    if (IsPressingIn[curState] && signal === Signals.RESPONDER_RELEASE) {
      var hasLongPressHandler = !!this.props.onLongPress;
      var pressIsLongButStillCallOnPress = IsLongPressingIn[curState] && ( // We *are* long pressing.. // But either has no long handler
      !hasLongPressHandler || !this.touchableLongPressCancelsPress()); // or we're told to ignore it.

      var shouldInvokePress = !IsLongPressingIn[curState] || pressIsLongButStillCallOnPress;

      if (shouldInvokePress && this.touchableHandlePress) {
        if (!newIsHighlight && !curIsHighlight) {
          // we never highlighted because of delay, but we should highlight now
          this._startHighlight(e);

          this._endHighlight(e);
        }

        this.touchableHandlePress(e);
      }
    }

    this.touchableDelayTimeout && clearTimeout(this.touchableDelayTimeout);
    this.touchableDelayTimeout = null;
  },
  _playTouchSound: function _playTouchSound() {
    _UIManager.default.playTouchSound();
  },
  _startHighlight: function _startHighlight(e) {
    this._savePressInLocation(e);

    this.touchableHandleActivePressIn && this.touchableHandleActivePressIn(e);
  },
  _endHighlight: function _endHighlight(e) {
    var _this2 = this;

    if (this.touchableHandleActivePressOut) {
      if (this.touchableGetPressOutDelayMS && this.touchableGetPressOutDelayMS()) {
        this.pressOutDelayTimeout = setTimeout(function () {
          _this2.touchableHandleActivePressOut(e);
        }, this.touchableGetPressOutDelayMS());
      } else {
        this.touchableHandleActivePressOut(e);
      }
    }
  },
  // HACK (part 2): basic support for touchable interactions using a keyboard (including
  // delays and longPress)
  touchableHandleKeyEvent: function touchableHandleKeyEvent(e) {
    var type = e.type,
        key = e.key;

    if (key === 'Enter' || key === ' ') {
      if (type === 'keydown') {
        if (!this._isTouchableKeyboardActive) {
          if (!this.state.touchable.touchState || this.state.touchable.touchState === States.NOT_RESPONDER) {
            this.touchableHandleResponderGrant(e);
            this._isTouchableKeyboardActive = true;
          }
        }
      } else if (type === 'keyup') {
        if (this._isTouchableKeyboardActive) {
          if (this.state.touchable.touchState && this.state.touchable.touchState !== States.NOT_RESPONDER) {
            this.touchableHandleResponderRelease(e);
            this._isTouchableKeyboardActive = false;
          }
        }
      }

      e.stopPropagation(); // prevent the default behaviour unless the Touchable functions as a link
      // and Enter is pressed

      if (!(key === 'Enter' && _AccessibilityUtil.default.propsToAriaRole(this.props) === 'link')) {
        e.preventDefault();
      }
    }
  },
  withoutDefaultFocusAndBlur: {}
};
/**
 * Provide an optional version of the mixin where `touchableHandleFocus` and
 * `touchableHandleBlur` can be overridden. This allows appropriate defaults to
 * be set on TV platforms, without breaking existing implementations of
 * `Touchable`.
 */

var touchableHandleFocus = TouchableMixin.touchableHandleFocus,
    touchableHandleBlur = TouchableMixin.touchableHandleBlur,
    TouchableMixinWithoutDefaultFocusAndBlur = _objectWithoutPropertiesLoose(TouchableMixin, ["touchableHandleFocus", "touchableHandleBlur"]);

TouchableMixin.withoutDefaultFocusAndBlur = TouchableMixinWithoutDefaultFocusAndBlur;
var Touchable = {
  Mixin: TouchableMixin,
  TOUCH_TARGET_DEBUG: false,
  // Highlights all touchable targets. Toggle with Inspector.

  /**
   * Renders a debugging overlay to visualize touch target with hitSlop (might not work on Android).
   */
  renderDebugView: function renderDebugView(_ref) {
    var color = _ref.color,
        hitSlop = _ref.hitSlop;

    if (!Touchable.TOUCH_TARGET_DEBUG) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      throw Error('Touchable.TOUCH_TARGET_DEBUG should not be enabled in prod!');
    }

    var debugHitSlopStyle = {};
    hitSlop = hitSlop || {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };

    for (var key in hitSlop) {
      debugHitSlopStyle[key] = -hitSlop[key];
    }

    var normalizedColor = (0, _normalizeCssColor.default)(color);

    if (typeof normalizedColor !== 'number') {
      return null;
    }

    var hexColor = '#' + ('00000000' + normalizedColor.toString(16)).substr(-8);
    return /*#__PURE__*/_react.default.createElement(_View.default, {
      pointerEvents: "none",
      style: _objectSpread({
        position: 'absolute',
        borderColor: hexColor.slice(0, -2) + '55',
        // More opaque
        borderWidth: 1,
        borderStyle: 'dashed',
        backgroundColor: hexColor.slice(0, -2) + '0F'
      }, debugHitSlopStyle)
    });
  }
};
var _default = Touchable;
exports.default = _default;
module.exports = exports.default;