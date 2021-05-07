"use strict";

exports.__esModule = true;
exports.isStartish = isStartish;
exports.isMoveish = isMoveish;
exports.isEndish = isEndish;
exports.isCancelish = isCancelish;
exports.isScroll = isScroll;
exports.isSelectionChange = isSelectionChange;
exports.SELECTION_CHANGE = exports.SELECT = exports.SCROLL = exports.TOUCH_CANCEL = exports.TOUCH_END = exports.TOUCH_MOVE = exports.TOUCH_START = exports.MOUSE_CANCEL = exports.MOUSE_UP = exports.MOUSE_MOVE = exports.MOUSE_DOWN = exports.FOCUS_OUT = exports.CONTEXT_MENU = exports.BLUR = void 0;

/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var BLUR = 'blur';
exports.BLUR = BLUR;
var CONTEXT_MENU = 'contextmenu';
exports.CONTEXT_MENU = CONTEXT_MENU;
var FOCUS_OUT = 'focusout';
exports.FOCUS_OUT = FOCUS_OUT;
var MOUSE_DOWN = 'mousedown';
exports.MOUSE_DOWN = MOUSE_DOWN;
var MOUSE_MOVE = 'mousemove';
exports.MOUSE_MOVE = MOUSE_MOVE;
var MOUSE_UP = 'mouseup';
exports.MOUSE_UP = MOUSE_UP;
var MOUSE_CANCEL = 'dragstart';
exports.MOUSE_CANCEL = MOUSE_CANCEL;
var TOUCH_START = 'touchstart';
exports.TOUCH_START = TOUCH_START;
var TOUCH_MOVE = 'touchmove';
exports.TOUCH_MOVE = TOUCH_MOVE;
var TOUCH_END = 'touchend';
exports.TOUCH_END = TOUCH_END;
var TOUCH_CANCEL = 'touchcancel';
exports.TOUCH_CANCEL = TOUCH_CANCEL;
var SCROLL = 'scroll';
exports.SCROLL = SCROLL;
var SELECT = 'select';
exports.SELECT = SELECT;
var SELECTION_CHANGE = 'selectionchange';
exports.SELECTION_CHANGE = SELECTION_CHANGE;

function isStartish(eventType) {
  return eventType === TOUCH_START || eventType === MOUSE_DOWN;
}

function isMoveish(eventType) {
  return eventType === TOUCH_MOVE || eventType === MOUSE_MOVE;
}

function isEndish(eventType) {
  return eventType === TOUCH_END || eventType === MOUSE_UP || isCancelish(eventType);
}

function isCancelish(eventType) {
  return eventType === TOUCH_CANCEL || eventType === MOUSE_CANCEL;
}

function isScroll(eventType) {
  return eventType === SCROLL;
}

function isSelectionChange(eventType) {
  return eventType === SELECT || eventType === SELECTION_CHANGE;
}