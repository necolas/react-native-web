/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import { getModality } from '../modality';
import useEvent from '../useEvent';
import useLayoutEffect from '../useLayoutEffect';
/**
 * Types
 */

/**
 * Implementation
 */
var emptyObject = {};
var opts = {
  passive: true
};
var lockEventType = 'react-gui:hover:lock';
var unlockEventType = 'react-gui:hover:unlock';

var supportsPointerEvent = function supportsPointerEvent() {
  return !!(typeof window !== 'undefined' && window.PointerEvent != null);
};

function dispatchCustomEvent(target, type, payload) {
  var event = document.createEvent('CustomEvent');

  var _ref = payload || emptyObject,
      _ref$bubbles = _ref.bubbles,
      bubbles = _ref$bubbles === void 0 ? true : _ref$bubbles,
      _ref$cancelable = _ref.cancelable,
      cancelable = _ref$cancelable === void 0 ? true : _ref$cancelable,
      detail = _ref.detail;

  event.initCustomEvent(type, bubbles, cancelable, detail);
  target.dispatchEvent(event);
} // This accounts for the non-PointerEvent fallback events.


function getPointerType(event) {
  var pointerType = event.pointerType;
  return pointerType != null ? pointerType : getModality();
}

export default function useHover(targetRef, config) {
  var contain = config.contain,
      disabled = config.disabled,
      onHoverStart = config.onHoverStart,
      onHoverChange = config.onHoverChange,
      onHoverUpdate = config.onHoverUpdate,
      onHoverEnd = config.onHoverEnd;
  var canUsePE = supportsPointerEvent();
  var addMoveListener = useEvent(canUsePE ? 'pointermove' : 'mousemove', opts);
  var addEnterListener = useEvent(canUsePE ? 'pointerenter' : 'mouseenter', opts);
  var addLeaveListener = useEvent(canUsePE ? 'pointerleave' : 'mouseleave', opts); // These custom events are used to implement the "contain" prop.

  var addLockListener = useEvent(lockEventType, opts);
  var addUnlockListener = useEvent(unlockEventType, opts);
  useLayoutEffect(function () {
    var target = targetRef.current;

    if (target !== null) {
      /**
       * End the hover gesture
       */
      var hoverEnd = function hoverEnd(e) {
        if (onHoverEnd != null) {
          onHoverEnd(e);
        }

        if (onHoverChange != null) {
          onHoverChange(false);
        } // Remove the listeners once finished.


        addMoveListener(target, null);
        addLeaveListener(target, null);
      };
      /**
       * Leave element
       */


      var leaveListener = function leaveListener(e) {
        var target = targetRef.current;

        if (target != null && getPointerType(e) !== 'touch') {
          if (contain) {
            dispatchCustomEvent(target, unlockEventType);
          }

          hoverEnd(e);
        }
      };
      /**
       * Move within element
       */


      var moveListener = function moveListener(e) {
        if (getPointerType(e) !== 'touch') {
          if (onHoverUpdate != null) {
            // Not all browsers have these properties
            if (e.x == null) {
              e.x = e.clientX;
            }

            if (e.y == null) {
              e.y = e.clientY;
            }

            onHoverUpdate(e);
          }
        }
      };
      /**
       * Start the hover gesture
       */


      var hoverStart = function hoverStart(e) {
        if (onHoverStart != null) {
          onHoverStart(e);
        }

        if (onHoverChange != null) {
          onHoverChange(true);
        } // Set the listeners needed for the rest of the hover gesture.


        if (onHoverUpdate != null) {
          addMoveListener(target, !disabled ? moveListener : null);
        }

        addLeaveListener(target, !disabled ? leaveListener : null);
      };
      /**
       * Enter element
       */


      var enterListener = function enterListener(e) {
        var target = targetRef.current;

        if (target != null && getPointerType(e) !== 'touch') {
          if (contain) {
            dispatchCustomEvent(target, lockEventType);
          }

          hoverStart(e);

          var lockListener = function lockListener(lockEvent) {
            if (lockEvent.target !== target) {
              hoverEnd(e);
            }
          };

          var unlockListener = function unlockListener(lockEvent) {
            if (lockEvent.target !== target) {
              hoverStart(e);
            }
          };

          addLockListener(target, !disabled ? lockListener : null);
          addUnlockListener(target, !disabled ? unlockListener : null);
        }
      };

      addEnterListener(target, !disabled ? enterListener : null);
    }
  }, [addEnterListener, addMoveListener, addLeaveListener, addLockListener, addUnlockListener, contain, disabled, onHoverStart, onHoverChange, onHoverUpdate, onHoverEnd, targetRef]);
}