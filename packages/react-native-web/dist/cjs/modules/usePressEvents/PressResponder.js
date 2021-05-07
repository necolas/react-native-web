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
var DELAY = 'DELAY';
var ERROR = 'ERROR';
var LONG_PRESS_DETECTED = 'LONG_PRESS_DETECTED';
var NOT_RESPONDER = 'NOT_RESPONDER';
var RESPONDER_ACTIVE_LONG_PRESS_START = 'RESPONDER_ACTIVE_LONG_PRESS_START';
var RESPONDER_ACTIVE_PRESS_START = 'RESPONDER_ACTIVE_PRESS_START';
var RESPONDER_INACTIVE_PRESS_START = 'RESPONDER_INACTIVE_PRESS_START';
var RESPONDER_GRANT = 'RESPONDER_GRANT';
var RESPONDER_RELEASE = 'RESPONDER_RELEASE';
var RESPONDER_TERMINATED = 'RESPONDER_TERMINATED';
var Transitions = Object.freeze({
  NOT_RESPONDER: {
    DELAY: ERROR,
    RESPONDER_GRANT: RESPONDER_INACTIVE_PRESS_START,
    RESPONDER_RELEASE: ERROR,
    RESPONDER_TERMINATED: ERROR,
    LONG_PRESS_DETECTED: ERROR
  },
  RESPONDER_INACTIVE_PRESS_START: {
    DELAY: RESPONDER_ACTIVE_PRESS_START,
    RESPONDER_GRANT: ERROR,
    RESPONDER_RELEASE: NOT_RESPONDER,
    RESPONDER_TERMINATED: NOT_RESPONDER,
    LONG_PRESS_DETECTED: ERROR
  },
  RESPONDER_ACTIVE_PRESS_START: {
    DELAY: ERROR,
    RESPONDER_GRANT: ERROR,
    RESPONDER_RELEASE: NOT_RESPONDER,
    RESPONDER_TERMINATED: NOT_RESPONDER,
    LONG_PRESS_DETECTED: RESPONDER_ACTIVE_LONG_PRESS_START
  },
  RESPONDER_ACTIVE_LONG_PRESS_START: {
    DELAY: ERROR,
    RESPONDER_GRANT: ERROR,
    RESPONDER_RELEASE: NOT_RESPONDER,
    RESPONDER_TERMINATED: NOT_RESPONDER,
    LONG_PRESS_DETECTED: RESPONDER_ACTIVE_LONG_PRESS_START
  },
  ERROR: {
    DELAY: NOT_RESPONDER,
    RESPONDER_GRANT: RESPONDER_INACTIVE_PRESS_START,
    RESPONDER_RELEASE: NOT_RESPONDER,
    RESPONDER_TERMINATED: NOT_RESPONDER,
    LONG_PRESS_DETECTED: NOT_RESPONDER
  }
});

var isActiveSignal = function isActiveSignal(signal) {
  return signal === RESPONDER_ACTIVE_PRESS_START || signal === RESPONDER_ACTIVE_LONG_PRESS_START;
};

var isButtonRole = function isButtonRole(element) {
  return element.getAttribute('role') === 'button';
};

var isPressStartSignal = function isPressStartSignal(signal) {
  return signal === RESPONDER_INACTIVE_PRESS_START || signal === RESPONDER_ACTIVE_PRESS_START || signal === RESPONDER_ACTIVE_LONG_PRESS_START;
};

var isTerminalSignal = function isTerminalSignal(signal) {
  return signal === RESPONDER_TERMINATED || signal === RESPONDER_RELEASE;
};

var isValidKeyPress = function isValidKeyPress(event) {
  var key = event.key;
  var target = event.currentTarget;
  var role = target.getAttribute('role');
  var isSpacebar = key === ' ' || key === 'Spacebar';
  return !event.repeat && (key === 'Enter' || isSpacebar && (role === 'button' || role === 'menuitem'));
};

var DEFAULT_LONG_PRESS_DELAY_MS = 450; // 500 - 50

var DEFAULT_PRESS_DELAY_MS = 50;
/**
 * =========================== PressResponder Tutorial ===========================
 *
 * The `PressResponder` class helps you create press interactions by analyzing the
 * geometry of elements and observing when another responder (e.g. ScrollView)
 * has stolen the touch lock. It offers hooks for your component to provide
 * interaction feedback to the user:
 *
 * - When a press has activated (e.g. highlight an element)
 * - When a press has deactivated (e.g. un-highlight an element)
 * - When a press sould trigger an action, meaning it activated and deactivated
 *   while within the geometry of the element without the lock being stolen.
 *
 * A high quality interaction isn't as simple as you might think. There should
 * be a slight delay before activation. Moving your finger beyond an element's
 * bounds should trigger deactivation, but moving the same finger back within an
 * element's bounds should trigger reactivation.
 *
 * In order to use `PressResponder`, do the following:
 *
 *     const pressResponder = new PressResponder(config);
 *
 * 2. Choose the rendered component who should collect the press events. On that
 *    element, spread `pressability.getEventHandlers()` into its props.
 *
 *    return (
 *      <View {...this.state.pressResponder.getEventHandlers()} />
 *    );
 *
 * 3. Reset `PressResponder` when your component unmounts.
 *
 *    componentWillUnmount() {
 *      this.state.pressResponder.reset();
 *    }
 *
 * ==================== Implementation Details ====================
 *
 * `PressResponder` only assumes that there exists a `HitRect` node. The `PressRect`
 * is an abstract box that is extended beyond the `HitRect`.
 *
 * # Geometry
 *
 *  ┌────────────────────────┐
 *  │  ┌──────────────────┐  │ - Presses start anywhere within `HitRect`.
 *  │  │  ┌────────────┐  │  │
 *  │  │  │ VisualRect │  │  │
 *  │  │  └────────────┘  │  │ - When pressed down for sufficient amount of time
 *  │  │    HitRect       │  │   before letting up, `VisualRect` activates.
 *  │  └──────────────────┘  │
 *  │       Out Region   o   │
 *  └────────────────────│───┘
 *                       └────── When the press is released outside the `HitRect`,
 *                               the responder is NOT eligible for a "press".
 *
 * # State Machine
 *
 * ┌───────────────┐ ◀──── RESPONDER_RELEASE
 * │ NOT_RESPONDER │
 * └───┬───────────┘ ◀──── RESPONDER_TERMINATED
 *     │
 *     │ RESPONDER_GRANT (HitRect)
 *     │
 *     ▼
 * ┌─────────────────────┐          ┌───────────────────┐              ┌───────────────────┐
 * │ RESPONDER_INACTIVE_ │  DELAY   │ RESPONDER_ACTIVE_ │  T + DELAY   │ RESPONDER_ACTIVE_ │
 * │ PRESS_START         ├────────▶ │ PRESS_START       ├────────────▶ │ LONG_PRESS_START  │
 * └─────────────────────┘          └───────────────────┘              └───────────────────┘
 *
 * T + DELAY => LONG_PRESS_DELAY + DELAY
 *
 * Not drawn are the side effects of each transition. The most important side
 * effect is the invocation of `onLongPress`. Only when the browser produces a
 * `click` event is `onPress` invoked.
 */

var PressResponder = /*#__PURE__*/function () {
  function PressResponder(config) {
    this._eventHandlers = null;
    this._isPointerTouch = false;
    this._longPressDelayTimeout = null;
    this._longPressDispatched = false;
    this._pressDelayTimeout = null;
    this._pressOutDelayTimeout = null;
    this._touchState = NOT_RESPONDER;
    this.configure(config);
  }

  var _proto = PressResponder.prototype;

  _proto.configure = function configure(config) {
    this._config = config;
  }
  /**
   * Resets any pending timers. This should be called on unmount.
   */
  ;

  _proto.reset = function reset() {
    this._cancelLongPressDelayTimeout();

    this._cancelPressDelayTimeout();

    this._cancelPressOutDelayTimeout();
  }
  /**
   * Returns a set of props to spread into the interactive element.
   */
  ;

  _proto.getEventHandlers = function getEventHandlers() {
    if (this._eventHandlers == null) {
      this._eventHandlers = this._createEventHandlers();
    }

    return this._eventHandlers;
  };

  _proto._createEventHandlers = function _createEventHandlers() {
    var _this = this;

    var start = function start(event, shouldDelay) {
      event.persist();

      _this._cancelPressOutDelayTimeout();

      _this._longPressDispatched = false;
      _this._responder = event.currentTarget;
      _this._selectionTerminated = false;
      _this._touchState = NOT_RESPONDER;
      _this._isPointerTouch = event.nativeEvent.type === 'touchstart';

      _this._receiveSignal(RESPONDER_GRANT, event);

      var delayPressStart = normalizeDelay(_this._config.delayPressStart, 0, DEFAULT_PRESS_DELAY_MS);

      if (shouldDelay !== false && delayPressStart > 0) {
        _this._pressDelayTimeout = setTimeout(function () {
          _this._receiveSignal(DELAY, event);
        }, delayPressStart);
      } else {
        _this._receiveSignal(DELAY, event);
      }

      var delayLongPress = normalizeDelay(_this._config.delayLongPress, 10, DEFAULT_LONG_PRESS_DELAY_MS);
      _this._longPressDelayTimeout = setTimeout(function () {
        _this._handleLongPress(event);
      }, delayLongPress + delayPressStart);
    };

    var end = function end(event) {
      _this._receiveSignal(RESPONDER_RELEASE, event);
    };

    var keyupHandler = function keyupHandler(event) {
      if (_this._touchState !== NOT_RESPONDER) {
        end(event);
        document.removeEventListener('keyup', keyupHandler);
      }
    };

    return {
      onStartShouldSetResponder: function onStartShouldSetResponder(event) {
        var disabled = _this._config.disabled;

        if (disabled && isButtonRole(event.currentTarget)) {
          event.stopPropagation();
        }

        if (disabled == null) {
          return true;
        }

        return !disabled;
      },
      onKeyDown: function onKeyDown(event) {
        if (isValidKeyPress(event)) {
          if (_this._touchState === NOT_RESPONDER) {
            start(event, false); // Listen to 'keyup' on document to account for situations where
            // focus is moved to another element during 'keydown'.

            document.addEventListener('keyup', keyupHandler);
          }

          event.stopPropagation();
        }
      },
      onResponderGrant: function onResponderGrant(event) {
        return start(event);
      },
      onResponderMove: function onResponderMove(event) {
        if (_this._config.onPressMove != null) {
          _this._config.onPressMove(event);
        }

        var touch = getTouchFromResponderEvent(event);

        if (_this._touchActivatePosition != null) {
          var deltaX = _this._touchActivatePosition.pageX - touch.pageX;
          var deltaY = _this._touchActivatePosition.pageY - touch.pageY;

          if (Math.hypot(deltaX, deltaY) > 10) {
            _this._cancelLongPressDelayTimeout();
          }
        }
      },
      onResponderRelease: function onResponderRelease(event) {
        return end(event);
      },
      onResponderTerminate: function onResponderTerminate(event) {
        if (event.nativeEvent.type === 'selectionchange') {
          _this._selectionTerminated = true;
        }

        _this._receiveSignal(RESPONDER_TERMINATED, event);
      },
      onResponderTerminationRequest: function onResponderTerminationRequest(event) {
        var _this$_config = _this._config,
            cancelable = _this$_config.cancelable,
            disabled = _this$_config.disabled,
            onLongPress = _this$_config.onLongPress; // If `onLongPress` is provided, don't terminate on `contextmenu` as default
        // behavior will be prevented for non-mouse pointers.

        if (!disabled && onLongPress != null && _this._isPointerTouch && event.nativeEvent.type === 'contextmenu') {
          return false;
        }

        if (cancelable == null) {
          return true;
        }

        return cancelable;
      },
      // NOTE: this diverges from react-native in 3 significant ways:
      // * The `onPress` callback is not connected to the responder system (the native
      //  `click` event must be used but is dispatched in many scenarios where no pointers
      //   are on the screen.) Therefore, it's possible for `onPress` to be called without
      //   `onPress{Start,End}` being called first.
      // * The `onPress` callback is only be called on the first ancestor of the native
      //   `click` target that is using the PressResponder.
      // * The event's `nativeEvent` is a `MouseEvent` not a `TouchEvent`.
      onClick: function onClick(event) {
        var _this$_config2 = _this._config,
            disabled = _this$_config2.disabled,
            onPress = _this$_config2.onPress;

        if (!disabled) {
          // If long press dispatched, cancel default click behavior.
          // If the responder terminated because text was selected during the gesture,
          // cancel the default click behavior.
          event.stopPropagation();

          if (_this._longPressDispatched || _this._selectionTerminated) {
            event.preventDefault();
          } else if (onPress != null && event.altKey === false) {
            onPress(event);
          }
        } else {
          if (isButtonRole(event.currentTarget)) {
            event.stopPropagation();
          }
        }
      },
      // If `onLongPress` is provided and a touch pointer is being used, prevent the
      // default context menu from opening.
      onContextMenu: function onContextMenu(event) {
        var _this$_config3 = _this._config,
            disabled = _this$_config3.disabled,
            onLongPress = _this$_config3.onLongPress;

        if (!disabled) {
          if (onLongPress != null && _this._isPointerTouch && !event.defaultPrevented) {
            event.preventDefault();
            event.stopPropagation();
          }
        } else {
          if (isButtonRole(event.currentTarget)) {
            event.stopPropagation();
          }
        }
      }
    };
  }
  /**
   * Receives a state machine signal, performs side effects of the transition
   * and stores the new state. Validates the transition as well.
   */
  ;

  _proto._receiveSignal = function _receiveSignal(signal, event) {
    var prevState = this._touchState;
    var nextState = null;

    if (Transitions[prevState] != null) {
      nextState = Transitions[prevState][signal];
    }

    if (this._responder == null && signal === RESPONDER_RELEASE) {
      return;
    }

    if (nextState == null || nextState === ERROR) {
      console.error("PressResponder: Invalid signal " + signal + " for state " + prevState + " on responder");
    } else if (prevState !== nextState) {
      this._performTransitionSideEffects(prevState, nextState, signal, event);

      this._touchState = nextState;
    }
  }
  /**
   * Performs a transition between touchable states and identify any activations
   * or deactivations (and callback invocations).
   */
  ;

  _proto._performTransitionSideEffects = function _performTransitionSideEffects(prevState, nextState, signal, event) {
    if (isTerminalSignal(signal)) {
      this._isPointerTouch = false;
      this._touchActivatePosition = null;

      this._cancelLongPressDelayTimeout();
    }

    if (isPressStartSignal(prevState) && signal === LONG_PRESS_DETECTED) {
      var onLongPress = this._config.onLongPress; // Long press is not supported for keyboards because 'click' can be dispatched
      // immediately (and multiple times) after 'keydown'.

      if (onLongPress != null && event.nativeEvent.key == null) {
        onLongPress(event);
        this._longPressDispatched = true;
      }
    }

    var isPrevActive = isActiveSignal(prevState);
    var isNextActive = isActiveSignal(nextState);

    if (!isPrevActive && isNextActive) {
      this._activate(event);
    } else if (isPrevActive && !isNextActive) {
      this._deactivate(event);
    }

    if (isPressStartSignal(prevState) && signal === RESPONDER_RELEASE) {
      var _this$_config4 = this._config,
          _onLongPress = _this$_config4.onLongPress,
          onPress = _this$_config4.onPress;

      if (onPress != null) {
        var isPressCanceledByLongPress = _onLongPress != null && prevState === RESPONDER_ACTIVE_LONG_PRESS_START;

        if (!isPressCanceledByLongPress) {
          // If we never activated (due to delays), activate and deactivate now.
          if (!isNextActive && !isPrevActive) {
            this._activate(event);

            this._deactivate(event);
          }
        }
      }
    }

    this._cancelPressDelayTimeout();
  };

  _proto._activate = function _activate(event) {
    var _this$_config5 = this._config,
        onPressChange = _this$_config5.onPressChange,
        onPressStart = _this$_config5.onPressStart;
    var touch = getTouchFromResponderEvent(event);
    this._touchActivatePosition = {
      pageX: touch.pageX,
      pageY: touch.pageY
    };

    if (onPressStart != null) {
      onPressStart(event);
    }

    if (onPressChange != null) {
      onPressChange(true);
    }
  };

  _proto._deactivate = function _deactivate(event) {
    var _this$_config6 = this._config,
        onPressChange = _this$_config6.onPressChange,
        onPressEnd = _this$_config6.onPressEnd;

    function end() {
      if (onPressEnd != null) {
        onPressEnd(event);
      }

      if (onPressChange != null) {
        onPressChange(false);
      }
    }

    var delayPressEnd = normalizeDelay(this._config.delayPressEnd);

    if (delayPressEnd > 0) {
      this._pressOutDelayTimeout = setTimeout(function () {
        end();
      }, delayPressEnd);
    } else {
      end();
    }
  };

  _proto._handleLongPress = function _handleLongPress(event) {
    if (this._touchState === RESPONDER_ACTIVE_PRESS_START || this._touchState === RESPONDER_ACTIVE_LONG_PRESS_START) {
      this._receiveSignal(LONG_PRESS_DETECTED, event);
    }
  };

  _proto._cancelLongPressDelayTimeout = function _cancelLongPressDelayTimeout() {
    if (this._longPressDelayTimeout != null) {
      clearTimeout(this._longPressDelayTimeout);
      this._longPressDelayTimeout = null;
    }
  };

  _proto._cancelPressDelayTimeout = function _cancelPressDelayTimeout() {
    if (this._pressDelayTimeout != null) {
      clearTimeout(this._pressDelayTimeout);
      this._pressDelayTimeout = null;
    }
  };

  _proto._cancelPressOutDelayTimeout = function _cancelPressOutDelayTimeout() {
    if (this._pressOutDelayTimeout != null) {
      clearTimeout(this._pressOutDelayTimeout);
      this._pressOutDelayTimeout = null;
    }
  };

  return PressResponder;
}();

exports.default = PressResponder;

function normalizeDelay(delay, min, fallback) {
  if (min === void 0) {
    min = 0;
  }

  if (fallback === void 0) {
    fallback = 0;
  }

  return Math.max(min, delay !== null && delay !== void 0 ? delay : fallback);
}

function getTouchFromResponderEvent(event) {
  var _event$nativeEvent = event.nativeEvent,
      changedTouches = _event$nativeEvent.changedTouches,
      touches = _event$nativeEvent.touches;

  if (touches != null && touches.length > 0) {
    return touches[0];
  }

  if (changedTouches != null && changedTouches.length > 0) {
    return changedTouches[0];
  }

  return event.nativeEvent;
}

module.exports = exports.default;