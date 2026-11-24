/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type Touch = {
  force: number;
  identifier: number;
  // The locationX and locationY properties are non-standard additions
  locationX: number | undefined;
  locationY: number | undefined;
  pageX: number;
  pageY: number;
  target: EventTarget | null;
  // Touches in a list have a timestamp property
  timestamp: number;
};

export type NativeTouchEvent = {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  // TouchList is an array in the Responder system
  changedTouches: Array<Touch>;
  force: number;
  // React Native adds properties to the "nativeEvent that are usually only found on W3C Touches ‾\_(ツ)_/‾
  identifier: number;
  locationX: number | undefined;
  locationY: number | undefined;
  pageX: number;
  pageY: number;
  target: EventTarget | null;
  // The timestamp has a lowercase "s" in the Responder system
  timestamp: number;
  // TouchList is an array in the Responder system
  touches: Array<Touch>;
  type?: string;
};

/**
 * The DOM events handled by the Responder System
 */
export const MOUSE_DOWN = 'mousedown';
export const MOUSE_MOVE = 'mousemove';
export const MOUSE_UP = 'mouseup';
export const MOUSE_CANCEL = 'dragstart';
export const TOUCH_START = 'touchstart';
export const TOUCH_MOVE = 'touchmove';
export const TOUCH_END = 'touchend';
export const TOUCH_CANCEL = 'touchcancel';
export const SCROLL = 'scroll';
export const SELECT = 'select';
export const SELECTION_CHANGE = 'selectionchange';

export function isStartish(event: Event): event is TouchEvent | MouseEvent {
  return event.type === TOUCH_START || event.type === MOUSE_DOWN;
}

export function isMoveish(event: Event): event is TouchEvent | MouseEvent {
  return event.type === TOUCH_MOVE || event.type === MOUSE_MOVE;
}

export function isEndish(event: Event): event is TouchEvent | MouseEvent {
  return (
    event.type === TOUCH_END || event.type === MOUSE_UP || isCancelish(event)
  );
}

export function isCancelish(event: Event): event is TouchEvent | DragEvent {
  return event.type === TOUCH_CANCEL || event.type === MOUSE_CANCEL;
}

export function isScroll(event: Event): boolean {
  return event.type === SCROLL;
}

export function isSelectionChange(event: Event): boolean {
  return event.type === SELECT || event.type === SELECTION_CHANGE;
}

export function isBlur(event: Event): event is FocusEvent {
  return event.type === 'blur';
}

export function isMouseEvent(event: Event): event is MouseEvent {
  return 'button' in event;
}

export function isTouchEvent(event: Event): event is TouchEvent {
  return 'changedTouches' in event;
}
