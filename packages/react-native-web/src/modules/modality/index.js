/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import createEventHandle from '../createEventHandle';

export type Modality = 'keyboard' | 'mouse' | 'touch' | 'pen';

const supportsPointerEvent = () => !!(typeof window !== 'undefined' && window.PointerEvent != null);

let activeModality = 'keyboard';
let modality = 'keyboard';
let previousModality;
let previousActiveModality;
let isEmulatingMouseEvents = false;
const listeners = new Set();

const KEYBOARD = 'keyboard';
const MOUSE = 'mouse';
const TOUCH = 'touch';

const BLUR = 'blur';
const CONTEXTMENU = 'contextmenu';
const FOCUS = 'focus';
const KEYDOWN = 'keydown';
const MOUSEDOWN = 'mousedown';
const MOUSEMOVE = 'mousemove';
const MOUSEUP = 'mouseup';
const POINTERDOWN = 'pointerdown';
const POINTERMOVE = 'pointermove';
const SCROLL = 'scroll';
const SELECTIONCHANGE = 'selectionchange';
const TOUCHCANCEL = 'touchcancel';
const TOUCHMOVE = 'touchmove';
const TOUCHSTART = 'touchstart';
const VISIBILITYCHANGE = 'visibilitychange';

const bubbleOptions = { passive: true };
const captureOptions = { capture: true, passive: true };

// Window events
const addBlurListener = createEventHandle(BLUR, bubbleOptions);
const addFocusListener = createEventHandle(FOCUS, bubbleOptions);
// Must be capture phase because 'stopPropagation' might prevent these
// events bubbling to the document.
const addVisibilityChangeListener = createEventHandle(VISIBILITYCHANGE, captureOptions);
const addKeyDownListener = createEventHandle(KEYDOWN, captureOptions);
const addPointerDownListener = createEventHandle(POINTERDOWN, captureOptions);
const addPointerMoveListener = createEventHandle(POINTERMOVE, captureOptions);
// Fallback events
const addContextMenuListener = createEventHandle(CONTEXTMENU, captureOptions);
const addMouseDownListener = createEventHandle(MOUSEDOWN, captureOptions);
const addMouseMoveListener = createEventHandle(MOUSEMOVE, captureOptions);
const addMouseUpListener = createEventHandle(MOUSEUP, captureOptions);
const addScrollListener = createEventHandle(SCROLL, captureOptions);
const addSelectiomChangeListener = createEventHandle(SELECTIONCHANGE, captureOptions);
const addTouchCancelListener = createEventHandle(TOUCHCANCEL, captureOptions);
const addTouchMoveListener = createEventHandle(TOUCHMOVE, captureOptions);
const addTouchStartListener = createEventHandle(TOUCHSTART, captureOptions);

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
  callListeners();
  // for fallback events
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

function onPointerish(event: any) {
  const eventType = event.type;

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
  }
  // Fallback for non-PointerEvent environment
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
    }

    // Flag when browser may produce emulated events
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
    }

    // Remove flag after emulated events are finished or cancelled, and if an
    // event occurs that cuts short a touch event sequence.
    if (
      eventType === CONTEXTMENU ||
      eventType === MOUSEUP ||
      eventType === SELECTIONCHANGE ||
      eventType === SCROLL ||
      eventType === TOUCHCANCEL ||
      eventType === TOUCHMOVE
    ) {
      isEmulatingMouseEvents = false;
    }
  }
}

if (canUseDOM) {
  addBlurListener(window, onBlurWindow);
  addFocusListener(window, onFocusWindow);
  addKeyDownListener(document, onKeyDown);
  addPointerDownListener(document, onPointerish);
  addPointerMoveListener(document, onPointerish);
  addVisibilityChangeListener(document, onVisibilityChange);
  // fallbacks
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
  const value = { activeModality, modality };
  listeners.forEach((listener) => {
    listener(value);
  });
}

export function getActiveModality(): Modality {
  return activeModality;
}

export function getModality(): Modality {
  return modality;
}

export function addModalityListener(
  listener: ({ activeModality: Modality, modality: Modality }) => void
): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function testOnly_resetActiveModality() {
  isEmulatingMouseEvents = false;
  activeModality = KEYBOARD;
  modality = KEYBOARD;
}
