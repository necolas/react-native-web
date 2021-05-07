/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
export var BLUR = 'blur';
export var CONTEXT_MENU = 'contextmenu';
export var FOCUS_OUT = 'focusout';
export var MOUSE_DOWN = 'mousedown';
export var MOUSE_MOVE = 'mousemove';
export var MOUSE_UP = 'mouseup';
export var MOUSE_CANCEL = 'dragstart';
export var TOUCH_START = 'touchstart';
export var TOUCH_MOVE = 'touchmove';
export var TOUCH_END = 'touchend';
export var TOUCH_CANCEL = 'touchcancel';
export var SCROLL = 'scroll';
export var SELECT = 'select';
export var SELECTION_CHANGE = 'selectionchange';
export function isStartish(eventType) {
  return eventType === TOUCH_START || eventType === MOUSE_DOWN;
}
export function isMoveish(eventType) {
  return eventType === TOUCH_MOVE || eventType === MOUSE_MOVE;
}
export function isEndish(eventType) {
  return eventType === TOUCH_END || eventType === MOUSE_UP || isCancelish(eventType);
}
export function isCancelish(eventType) {
  return eventType === TOUCH_CANCEL || eventType === MOUSE_CANCEL;
}
export function isScroll(eventType) {
  return eventType === SCROLL;
}
export function isSelectionChange(eventType) {
  return eventType === SELECT || eventType === SELECTION_CHANGE;
}