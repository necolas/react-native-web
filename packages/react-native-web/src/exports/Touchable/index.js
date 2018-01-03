/* eslint-disable react/prop-types */

/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Touchable
 * @flow
 */

import AccessibilityUtil from '../../modules/AccessibilityUtil';
import BoundingDimensions from './BoundingDimensions';
import findNodeHandle from '../findNodeHandle';
import normalizeColor from 'normalize-css-color';
import Position from './Position';
import React from 'react';
import TouchEventUtils from 'fbjs/lib/TouchEventUtils';
import UIManager from '../UIManager';
import View from '../View';

type Event = Object;

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
const States = {
  NOT_RESPONDER: 'NOT_RESPONDER', // Not the responder
  RESPONDER_INACTIVE_PRESS_IN: 'RESPONDER_INACTIVE_PRESS_IN', // Responder, inactive, in the `PressRect`
  RESPONDER_INACTIVE_PRESS_OUT: 'RESPONDER_INACTIVE_PRESS_OUT', // Responder, inactive, out of `PressRect`
  RESPONDER_ACTIVE_PRESS_IN: 'RESPONDER_ACTIVE_PRESS_IN', // Responder, active, in the `PressRect`
  RESPONDER_ACTIVE_PRESS_OUT: 'RESPONDER_ACTIVE_PRESS_OUT', // Responder, active, out of `PressRect`
  RESPONDER_ACTIVE_LONG_PRESS_IN: 'RESPONDER_ACTIVE_LONG_PRESS_IN', // Responder, active, in the `PressRect`, after long press threshold
  RESPONDER_ACTIVE_LONG_PRESS_OUT: 'RESPONDER_ACTIVE_LONG_PRESS_OUT', // Responder, active, out of `PressRect`, after long press threshold
  ERROR: 'ERROR'
};

/**
 * Quick lookup map for states that are considered to be "active"
 */
const IsActive = {
  RESPONDER_ACTIVE_PRESS_OUT: true,
  RESPONDER_ACTIVE_PRESS_IN: true
};

/**
 * Quick lookup for states that are considered to be "pressing" and are
 * therefore eligible to result in a "selection" if the press stops.
 */
const IsPressingIn = {
  RESPONDER_INACTIVE_PRESS_IN: true,
  RESPONDER_ACTIVE_PRESS_IN: true,
  RESPONDER_ACTIVE_LONG_PRESS_IN: true
};

const IsLongPressingIn = {
  RESPONDER_ACTIVE_LONG_PRESS_IN: true
};

/**
 * Inputs to the state machine.
 */
const Signals = {
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
const Transitions = {
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
};

// ==== Typical Constants for integrating into UI components ====
// var HIT_EXPAND_PX = 20;
// var HIT_VERT_OFFSET_PX = 10;
const HIGHLIGHT_DELAY_MS = 130;

const PRESS_EXPAND_PX = 20;

const LONG_PRESS_THRESHOLD = 500;

const LONG_PRESS_DELAY_MS = LONG_PRESS_THRESHOLD - HIGHLIGHT_DELAY_MS;

const LONG_PRESS_ALLOWED_MOVEMENT = 10;

// Default amount "active" region protrudes beyond box

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
const TouchableMixin = {
  // HACK (part 1): basic support for touchable interactions using a keyboard
  componentDidMount: function() {
    this._touchableNode = findNodeHandle(this);
    if (this._touchableNode && this._touchableNode.addEventListener) {
      this._touchableBlurListener = e => {
        if (this._isTouchableKeyboardActive) {
          if (
            this.state.touchable.touchState &&
            this.state.touchable.touchState !== States.NOT_RESPONDER
          ) {
            this.touchableHandleResponderTerminate({ nativeEvent: e });
          }
          this._isTouchableKeyboardActive = false;
        }
      };
      this._touchableNode.addEventListener('blur', this._touchableBlurListener);
    }
  },

  /**
   * Clear all timeouts on unmount
   */
  componentWillUnmount: function() {
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
  touchableGetInitialState: function() {
    return {
      touchable: { touchState: undefined, responderID: null }
    };
  },

  // ==== Hooks to Gesture Responder system ====
  /**
   * Must return true if embedded in a native platform scroll view.
   */
  touchableHandleResponderTerminationRequest: function() {
    return !this.props.rejectResponderTermination;
  },

  /**
   * Must return true to start the process of `Touchable`.
   */
  touchableHandleStartShouldSetResponder: function() {
    return !this.props.disabled;
  },

  /**
   * Return true to cancel press on long press.
   */
  touchableLongPressCancelsPress: function() {
    return true;
  },

  /**
   * Place as callback for a DOM element's `onResponderGrant` event.
   */
  touchableHandleResponderGrant: function(e: Event) {
    const dispatchID = e.currentTarget;
    // Since e is used in a callback invoked on another event loop
    // (as in setTimeout etc), we need to call e.persist() on the
    // event to make sure it doesn't get reused in the event object pool.
    e.persist();
    this.pressOutDelayTimeout && clearTimeout(this.pressOutDelayTimeout);
    this.pressOutDelayTimeout = null;

    this.state.touchable.touchState = States.NOT_RESPONDER;
    this.state.touchable.responderID = dispatchID;
    this._receiveSignal(Signals.RESPONDER_GRANT, e);
    let delayMS =
      this.touchableGetHighlightDelayMS !== undefined
        ? Math.max(this.touchableGetHighlightDelayMS(), 0)
        : HIGHLIGHT_DELAY_MS;
    delayMS = isNaN(delayMS) ? HIGHLIGHT_DELAY_MS : delayMS;
    if (delayMS !== 0) {
      this.touchableDelayTimeout = setTimeout(this._handleDelay.bind(this, e), delayMS);
    } else {
      this.state.touchable.positionOnActivate = null;
      this._handleDelay(e);
    }

    let longDelayMS =
      this.touchableGetLongPressDelayMS !== undefined
        ? Math.max(this.touchableGetLongPressDelayMS(), 10)
        : LONG_PRESS_DELAY_MS;
    longDelayMS = isNaN(longDelayMS) ? LONG_PRESS_DELAY_MS : longDelayMS;
    this.longPressDelayTimeout = setTimeout(
      this._handleLongDelay.bind(this, e),
      longDelayMS + delayMS
    );
  },

  /**
   * Place as callback for a DOM element's `onResponderRelease` event.
   */
  touchableHandleResponderRelease: function(e: Event) {
    this._receiveSignal(Signals.RESPONDER_RELEASE, e);
    // Browsers fire mouse events after touch events. This causes the
    // 'onResponderRelease' handler to be called twice for Touchables.
    // Auto-fix this issue by calling 'preventDefault' to cancel the mouse
    // events.
    if (e.cancelable && !e.isDefaultPrevented()) {
      e.preventDefault();
    }
  },

  /**
   * Place as callback for a DOM element's `onResponderTerminate` event.
   */
  touchableHandleResponderTerminate: function(e: Event) {
    this._receiveSignal(Signals.RESPONDER_TERMINATED, e);
  },

  /**
   * Place as callback for a DOM element's `onResponderMove` event.
   */
  touchableHandleResponderMove: function(e: Event) {
    // Not enough time elapsed yet, wait for highlight -
    // this is just a perf optimization.
    if (this.state.touchable.touchState === States.RESPONDER_INACTIVE_PRESS_IN) {
      return;
    }

    // Measurement may not have returned yet.
    if (!this.state.touchable.positionOnActivate) {
      return;
    }

    const positionOnActivate = this.state.touchable.positionOnActivate;
    const dimensionsOnActivate = this.state.touchable.dimensionsOnActivate;
    const pressRectOffset = this.touchableGetPressRectOffset
      ? this.touchableGetPressRectOffset()
      : {
          left: PRESS_EXPAND_PX,
          right: PRESS_EXPAND_PX,
          top: PRESS_EXPAND_PX,
          bottom: PRESS_EXPAND_PX
        };

    let pressExpandLeft = pressRectOffset.left;
    let pressExpandTop = pressRectOffset.top;
    let pressExpandRight = pressRectOffset.right;
    let pressExpandBottom = pressRectOffset.bottom;

    const hitSlop = this.touchableGetHitSlop ? this.touchableGetHitSlop() : null;

    if (hitSlop) {
      pressExpandLeft += hitSlop.left;
      pressExpandTop += hitSlop.top;
      pressExpandRight += hitSlop.right;
      pressExpandBottom += hitSlop.bottom;
    }

    const touch = TouchEventUtils.extractSingleTouch(e.nativeEvent);
    const pageX = touch && touch.pageX;
    const pageY = touch && touch.pageY;

    if (this.pressInLocation) {
      const movedDistance = this._getDistanceBetweenPoints(
        pageX,
        pageY,
        this.pressInLocation.pageX,
        this.pressInLocation.pageY
      );
      if (movedDistance > LONG_PRESS_ALLOWED_MOVEMENT) {
        this._cancelLongPressDelayTimeout();
      }
    }

    const isTouchWithinActive =
      pageX > positionOnActivate.left - pressExpandLeft &&
      pageY > positionOnActivate.top - pressExpandTop &&
      pageX < positionOnActivate.left + dimensionsOnActivate.width + pressExpandRight &&
      pageY < positionOnActivate.top + dimensionsOnActivate.height + pressExpandBottom;
    if (isTouchWithinActive) {
      this._receiveSignal(Signals.ENTER_PRESS_RECT, e);
      const curState = this.state.touchable.touchState;
      if (curState === States.RESPONDER_INACTIVE_PRESS_IN) {
        // fix for t7967420
        this._cancelLongPressDelayTimeout();
      }
    } else {
      this._cancelLongPressDelayTimeout();
      this._receiveSignal(Signals.LEAVE_PRESS_RECT, e);
    }
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
  _remeasureMetricsOnActivation: function() {
    const tag = this.state.touchable.responderID;
    if (tag == null) {
      return;
    }

    UIManager.measure(tag, this._handleQueryLayout);
  },

  _handleQueryLayout: function(
    x: number,
    y: number,
    width: number,
    height: number,
    globalX: number,
    globalY: number
  ) {
    // don't do anything if UIManager failed to measure node
    if (!x && !y && !width && !height && !globalX && !globalY) {
      return;
    }
    this.state.touchable.positionOnActivate &&
      Position.release(this.state.touchable.positionOnActivate);
    this.state.touchable.dimensionsOnActivate &&
      // $FlowFixMe
      BoundingDimensions.release(this.state.touchable.dimensionsOnActivate);
    this.state.touchable.positionOnActivate = Position.getPooled(globalX, globalY);
    // $FlowFixMe
    this.state.touchable.dimensionsOnActivate = BoundingDimensions.getPooled(width, height);
  },

  _handleDelay: function(e: Event) {
    this.touchableDelayTimeout = null;
    this._receiveSignal(Signals.DELAY, e);
  },

  _handleLongDelay: function(e: Event) {
    this.longPressDelayTimeout = null;
    const curState = this.state.touchable.touchState;
    if (
      curState !== States.RESPONDER_ACTIVE_PRESS_IN &&
      curState !== States.RESPONDER_ACTIVE_LONG_PRESS_IN
    ) {
      console.error(
        'Attempted to transition from state `' +
          curState +
          '` to `' +
          States.RESPONDER_ACTIVE_LONG_PRESS_IN +
          '`, which is not supported. This is ' +
          'most likely due to `Touchable.longPressDelayTimeout` not being cancelled.'
      );
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
  _receiveSignal: function(signal: string, e: Event) {
    const responderID = this.state.touchable.responderID;
    const curState = this.state.touchable.touchState;
    const nextState = Transitions[curState] && Transitions[curState][signal];
    if (!responderID && signal === Signals.RESPONDER_RELEASE) {
      return;
    }
    if (!nextState) {
      throw new Error(
        'Unrecognized signal `' +
          signal +
          '` or state `' +
          curState +
          '` for Touchable responder `' +
          responderID +
          '`'
      );
    }
    if (nextState === States.ERROR) {
      throw new Error(
        'Touchable cannot transition from `' +
          curState +
          '` to `' +
          signal +
          '` for responder `' +
          responderID +
          '`'
      );
    }
    if (curState !== nextState) {
      this._performSideEffectsForTransition(curState, nextState, signal, e);
      this.state.touchable.touchState = nextState;
    }
  },

  _cancelLongPressDelayTimeout: function() {
    this.longPressDelayTimeout && clearTimeout(this.longPressDelayTimeout);
    this.longPressDelayTimeout = null;
  },

  _isHighlight: function(state: string) {
    return (
      state === States.RESPONDER_ACTIVE_PRESS_IN || state === States.RESPONDER_ACTIVE_LONG_PRESS_IN
    );
  },

  _savePressInLocation: function(e: Event) {
    const touch = TouchEventUtils.extractSingleTouch(e.nativeEvent);
    const pageX = touch && touch.pageX;
    const pageY = touch && touch.pageY;
    const locationX = touch && touch.locationX;
    const locationY = touch && touch.locationY;
    this.pressInLocation = { pageX, pageY, locationX, locationY };
  },

  _getDistanceBetweenPoints: function(aX: number, aY: number, bX: number, bY: number) {
    const deltaX = aX - bX;
    const deltaY = aY - bY;
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
  _performSideEffectsForTransition: function(
    curState: string,
    nextState: string,
    signal: string,
    e: Event
  ) {
    const curIsHighlight = this._isHighlight(curState);
    const newIsHighlight = this._isHighlight(nextState);

    const isFinalSignal =
      signal === Signals.RESPONDER_TERMINATED || signal === Signals.RESPONDER_RELEASE;

    if (isFinalSignal) {
      this._cancelLongPressDelayTimeout();
    }

    if (!IsActive[curState] && IsActive[nextState]) {
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
      const hasLongPressHandler = !!this.props.onLongPress;
      const pressIsLongButStillCallOnPress =
        IsLongPressingIn[curState] && // We *are* long pressing..
        (!hasLongPressHandler || // But either has no long handler
          !this.touchableLongPressCancelsPress()); // or we're told to ignore it.

      const shouldInvokePress = !IsLongPressingIn[curState] || pressIsLongButStillCallOnPress;
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

  _startHighlight: function(e: Event) {
    this._savePressInLocation(e);
    this.touchableHandleActivePressIn && this.touchableHandleActivePressIn(e);
  },

  _endHighlight: function(e: Event) {
    if (this.touchableHandleActivePressOut) {
      if (this.touchableGetPressOutDelayMS && this.touchableGetPressOutDelayMS()) {
        this.pressOutDelayTimeout = setTimeout(() => {
          this.touchableHandleActivePressOut(e);
        }, this.touchableGetPressOutDelayMS());
      } else {
        this.touchableHandleActivePressOut(e);
      }
    }
  },

  // HACK (part 2): basic support for touchable interactions using a keyboard (including
  // delays and longPress)
  touchableHandleKeyEvent: function(e: Event) {
    const ENTER = 13;
    const SPACE = 32;
    const { type, which } = e;
    if (which === ENTER || which === SPACE) {
      if (type === 'keydown') {
        if (!this._isTouchableKeyboardActive) {
          if (
            !this.state.touchable.touchState ||
            this.state.touchable.touchState === States.NOT_RESPONDER
          ) {
            this.touchableHandleResponderGrant(e);
            this._isTouchableKeyboardActive = true;
          }
        }
      } else if (type === 'keyup') {
        if (this._isTouchableKeyboardActive) {
          if (
            this.state.touchable.touchState &&
            this.state.touchable.touchState !== States.NOT_RESPONDER
          ) {
            this.touchableHandleResponderRelease(e);
            this._isTouchableKeyboardActive = false;
          }
        }
      }
      e.stopPropagation();
      // prevent the default behaviour unless the Touchable functions as a link
      // and Enter is pressed
      if (!(which === ENTER && AccessibilityUtil.propsToAriaRole(this.props) === 'link')) {
        e.preventDefault();
      }
    }
  }
};

const Touchable = {
  Mixin: TouchableMixin,
  TOUCH_TARGET_DEBUG: false, // Highlights all touchable targets. Toggle with Inspector.
  /**
   * Renders a debugging overlay to visualize touch target with hitSlop (might not work on Android).
   */
  renderDebugView: ({ color, hitSlop }: Object) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!Touchable.TOUCH_TARGET_DEBUG) {
        return null;
      }
      const debugHitSlopStyle = {};
      hitSlop = hitSlop || { top: 0, bottom: 0, left: 0, right: 0 };
      for (const key in hitSlop) {
        debugHitSlopStyle[key] = -hitSlop[key];
      }
      const hexColor = '#' + ('00000000' + normalizeColor(color).toString(16)).substr(-8);
      return (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            borderColor: hexColor.slice(0, -2) + '55', // More opaque
            borderWidth: 1,
            borderStyle: 'dashed',
            backgroundColor: hexColor.slice(0, -2) + '0F', // Less opaque
            ...debugHitSlopStyle
          }}
        />
      );
    }
  }
};

export default Touchable;
