"use strict";

exports.__esModule = true;
exports.getActiveModality = getActiveModality;
exports.getModality = getModality;
exports.addModalityListener = addModalityListener;
exports.testOnly_resetActiveModality = testOnly_resetActiveModality;

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _createEventHandle = _interopRequireDefault(require("../createEventHandle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var supportsPointerEvent = function supportsPointerEvent() {
  return !!(typeof window !== 'undefined' && window.PointerEvent != null);
};

var activeModality = 'keyboard';
var modality = 'keyboard';
var previousModality;
var previousActiveModality;
var isEmulatingMouseEvents = false;
var listeners = new Set();
var KEYBOARD = 'keyboard';
var MOUSE = 'mouse';
var TOUCH = 'touch';
var BLUR = 'blur';
var CONTEXTMENU = 'contextmenu';
var FOCUS = 'focus';
var KEYDOWN = 'keydown';
var MOUSEDOWN = 'mousedown';
var MOUSEMOVE = 'mousemove';
var MOUSEUP = 'mouseup';
var POINTERDOWN = 'pointerdown';
var POINTERMOVE = 'pointermove';
var SCROLL = 'scroll';
var SELECTIONCHANGE = 'selectionchange';
var TOUCHCANCEL = 'touchcancel';
var TOUCHMOVE = 'touchmove';
var TOUCHSTART = 'touchstart';
var VISIBILITYCHANGE = 'visibilitychange';
var bubbleOptions = {
  passive: true
};
var captureOptions = {
  capture: true,
  passive: true
}; // Window events

var addBlurListener = (0, _createEventHandle.default)(BLUR, bubbleOptions);
var addFocusListener = (0, _createEventHandle.default)(FOCUS, bubbleOptions); // Must be capture phase because 'stopPropagation' might prevent these
// events bubbling to the document.

var addVisibilityChangeListener = (0, _createEventHandle.default)(VISIBILITYCHANGE, captureOptions);
var addKeyDownListener = (0, _createEventHandle.default)(KEYDOWN, captureOptions);
var addPointerDownListener = (0, _createEventHandle.default)(POINTERDOWN, captureOptions);
var addPointerMoveListener = (0, _createEventHandle.default)(POINTERMOVE, captureOptions); // Fallback events

var addContextMenuListener = (0, _createEventHandle.default)(CONTEXTMENU, captureOptions);
var addMouseDownListener = (0, _createEventHandle.default)(MOUSEDOWN, captureOptions);
var addMouseMoveListener = (0, _createEventHandle.default)(MOUSEMOVE, captureOptions);
var addMouseUpListener = (0, _createEventHandle.default)(MOUSEUP, captureOptions);
var addScrollListener = (0, _createEventHandle.default)(SCROLL, captureOptions);
var addSelectiomChangeListener = (0, _createEventHandle.default)(SELECTIONCHANGE, captureOptions);
var addTouchCancelListener = (0, _createEventHandle.default)(TOUCHCANCEL, captureOptions);
var addTouchMoveListener = (0, _createEventHandle.default)(TOUCHMOVE, captureOptions);
var addTouchStartListener = (0, _createEventHandle.default)(TOUCHSTART, captureOptions);

function restoreModality() {
  if (previousModality != null || previousActiveModality != null) {
    if (previousModality != null) {
      modality = previousModality;
      previousModality = null;
    }

    if (previousActiveModality != null) {
      activeModality = previousActiveModality;
      previousActiveModality = null;
    }

    callListeners();
  }
}

function onBlurWindow() {
  previousModality = modality;
  previousActiveModality = activeModality;
  activeModality = KEYBOARD;
  modality = KEYBOARD;
  callListeners(); // for fallback events

  isEmulatingMouseEvents = false;
}

function onFocusWindow() {
  restoreModality();
}

function onKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }

  if (modality !== KEYBOARD) {
    modality = KEYBOARD;
    activeModality = KEYBOARD;
    callListeners();
  }
}

function onVisibilityChange() {
  if (document.visibilityState !== 'hidden') {
    restoreModality();
  }
}

function onPointerish(event) {
  var eventType = event.type;

  if (supportsPointerEvent()) {
    if (eventType === POINTERDOWN) {
      if (activeModality !== event.pointerType) {
        modality = event.pointerType;
        activeModality = event.pointerType;
        callListeners();
      }

      return;
    }

    if (eventType === POINTERMOVE) {
      if (modality !== event.pointerType) {
        modality = event.pointerType;
        callListeners();
      }

      return;
    }
  } // Fallback for non-PointerEvent environment
  else {
      if (!isEmulatingMouseEvents) {
        if (eventType === MOUSEDOWN) {
          if (activeModality !== MOUSE) {
            modality = MOUSE;
            activeModality = MOUSE;
            callListeners();
          }
        }

        if (eventType === MOUSEMOVE) {
          if (modality !== MOUSE) {
            modality = MOUSE;
            callListeners();
          }
        }
      } // Flag when browser may produce emulated events


      if (eventType === TOUCHSTART) {
        isEmulatingMouseEvents = true;

        if (event.touches && event.touches.length > 1) {
          isEmulatingMouseEvents = false;
        }

        if (activeModality !== TOUCH) {
          modality = TOUCH;
          activeModality = TOUCH;
          callListeners();
        }

        return;
      } // Remove flag after emulated events are finished or cancelled, and if an
      // event occurs that cuts short a touch event sequence.


      if (eventType === CONTEXTMENU || eventType === MOUSEUP || eventType === SELECTIONCHANGE || eventType === SCROLL || eventType === TOUCHCANCEL || eventType === TOUCHMOVE) {
        isEmulatingMouseEvents = false;
      }
    }
}

if (_ExecutionEnvironment.canUseDOM) {
  addBlurListener(window, onBlurWindow);
  addFocusListener(window, onFocusWindow);
  addKeyDownListener(document, onKeyDown);
  addPointerDownListener(document, onPointerish);
  addPointerMoveListener(document, onPointerish);
  addVisibilityChangeListener(document, onVisibilityChange); // fallbacks

  addContextMenuListener(document, onPointerish);
  addMouseDownListener(document, onPointerish);
  addMouseMoveListener(document, onPointerish);
  addMouseUpListener(document, onPointerish);
  addTouchCancelListener(document, onPointerish);
  addTouchMoveListener(document, onPointerish);
  addTouchStartListener(document, onPointerish);
  addSelectiomChangeListener(document, onPointerish);
  addScrollListener(document, onPointerish);
}

function callListeners() {
  var value = {
    activeModality: activeModality,
    modality: modality
  };
  listeners.forEach(function (listener) {
    listener(value);
  });
}

function getActiveModality() {
  return activeModality;
}

function getModality() {
  return modality;
}

function addModalityListener(listener) {
  listeners.add(listener);
  return function () {
    listeners.delete(listener);
  };
}

function testOnly_resetActiveModality() {
  isEmulatingMouseEvents = false;
  activeModality = KEYBOARD;
  modality = KEYBOARD;
}