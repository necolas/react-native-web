/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 * @format
 */

'use strict';

export type SyntheticEvent<out T> = Readonly<{|
  bubbles: ?boolean,
  cancelable: ?boolean,
  currentTarget: HTMLElement,
  defaultPrevented: ?boolean,
  dispatchConfig: Readonly<{|
    registrationName: string,
  |}>,
  eventPhase: ?number,
  preventDefault: () => void,
  isDefaultPrevented: () => boolean,
  stopPropagation: () => void,
  isPropagationStopped: () => boolean,
  isTrusted: ?boolean,
  nativeEvent: T,
  persist: () => void,
  target: ?HTMLElement,
  timeStamp: number,
  type: ?string,
|}>;

export type ResponderSyntheticEvent<T> = Readonly<{|
  ...SyntheticEvent<T>,
  touchHistory: Readonly<{|
    indexOfSingleActiveTouch: number,
    mostRecentTimeStamp: number,
    numberActiveTouches: number,
    touchBank: ReadonlyArray<
      Readonly<{|
        touchActive: boolean,
        startPageX: number,
        startPageY: number,
        startTimeStamp: number,
        currentPageX: number,
        currentPageY: number,
        currentTimeStamp: number,
        previousPageX: number,
        previousPageY: number,
        previousTimeStamp: number,
      |}>,
    >,
  |}>,
|}>;

export type Layout = Readonly<{|
  x: number,
  y: number,
  width: number,
  height: number,
|}>;

export type TextLayout = Readonly<{|
  ...Layout,
  ascender: number,
  capHeight: number,
  descender: number,
  text: string,
  xHeight: number,
|}>;

export type LayoutEvent = SyntheticEvent<
  Readonly<{|
    layout: Layout,
  |}>,
>;

export type TextLayoutEvent = SyntheticEvent<
  Readonly<{|
    lines: Array<TextLayout>,
  |}>,
>;

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/UIEvent
 */
export interface NativeUIEvent {
  /**
   * Returns a long with details about the event, depending on the event type.
   */
  readonly detail: number;
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
 */
export interface NativeMouseEvent extends NativeUIEvent {
  /**
   * The X coordinate of the mouse pointer in global (screen) coordinates.
   */
  readonly screenX: number;
  /**
   * The Y coordinate of the mouse pointer in global (screen) coordinates.
   */
  readonly screenY: number;
  /**
   * The X coordinate of the mouse pointer relative to the whole document.
   */
  readonly pageX: number;
  /**
   * The Y coordinate of the mouse pointer relative to the whole document.
   */
  readonly pageY: number;
  /**
   * The X coordinate of the mouse pointer in local (DOM content) coordinates.
   */
  readonly clientX: number;
  /**
   * The Y coordinate of the mouse pointer in local (DOM content) coordinates.
   */
  readonly clientY: number;
  /**
   * Alias for NativeMouseEvent.clientX
   */
  readonly x: number;
  /**
   * Alias for NativeMouseEvent.clientY
   */
  readonly y: number;
  /**
   * Returns true if the control key was down when the mouse event was fired.
   */
  readonly ctrlKey: boolean;
  /**
   * Returns true if the shift key was down when the mouse event was fired.
   */
  readonly shiftKey: boolean;
  /**
   * Returns true if the alt key was down when the mouse event was fired.
   */
  readonly altKey: boolean;
  /**
   * Returns true if the meta key was down when the mouse event was fired.
   */
  readonly metaKey: boolean;
  /**
   * The button number that was pressed (if applicable) when the mouse event was fired.
   */
  readonly button: number;
  /**
   * The buttons being depressed (if any) when the mouse event was fired.
   */
  readonly buttons: number;
  /**
   * The secondary target for the event, if there is one.
   */
  readonly relatedTarget: HTMLElement;
  // offset is proposed: https://drafts.csswg.org/cssom-view/#extensions-to-the-mouseevent-interface
  /**
   * The X coordinate of the mouse pointer between that event and the padding edge of the target node
   */
  readonly offsetX: number;
  /**
   * The Y coordinate of the mouse pointer between that event and the padding edge of the target node
   */
  readonly offsetY: number;
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent
 */
export interface NativePointerEvent extends NativeMouseEvent {
  /**
   * A unique identifier for the pointer causing the event.
   */
  readonly pointerId: number;
  /**
   * The width (magnitude on the X axis), in CSS pixels, of the contact geometry of the pointer
   */
  readonly width: number;
  /**
   * The height (magnitude on the Y axis), in CSS pixels, of the contact geometry of the pointer.
   */
  readonly height: number;
  /**
   * The normalized pressure of the pointer input in the range 0 to 1, where 0 and 1 represent
   * the minimum and maximum pressure the hardware is capable of detecting, respectively.
   */
  readonly pressure: number;
  /**
   * The normalized tangential pressure of the pointer input (also known as barrel pressure or
   * cylinder stress) in the range -1 to 1, where 0 is the neutral position of the control.
   */
  readonly tangentialPressure: number;
  /**
   * The plane angle (in degrees, in the range of -90 to 90) between the Y–Z plane and the plane
   * containing both the pointer (e.g. pen stylus) axis and the Y axis.
   */
  readonly tiltX: number;
  /**
   * The plane angle (in degrees, in the range of -90 to 90) between the X–Z plane and the plane
   * containing both the pointer (e.g. pen stylus) axis and the X axis.
   */
  readonly tiltY: number;
  /**
   * The clockwise rotation of the pointer (e.g. pen stylus) around its major axis in degrees,
   * with a value in the range 0 to 359.
   */
  readonly twist: number;
  /**
   * Indicates the device type that caused the event (mouse, pen, touch, etc.)
   */
  readonly pointerType: string;
  /**
   * Indicates if the pointer represents the primary pointer of this pointer type.
   */
  readonly isPrimary: boolean;
}

export type PointerEvent = SyntheticEvent<NativePointerEvent>;

export type PressEvent = ResponderSyntheticEvent<
  Readonly<{|
    changedTouches: ReadonlyArray<PressEvent['nativeEvent']>,
    force: number,
    identifier: number,
    locationX: number,
    locationY: number,
    pageX: number,
    pageY: number,
    target: ?HTMLElement,
    timestamp: number,
    touches: ReadonlyArray<PressEvent['nativeEvent']>,
  |}>,
>;

export type ScrollEvent = SyntheticEvent<
  Readonly<{|
    contentInset: Readonly<{|
      bottom: number,
      left: number,
      right: number,
      top: number,
    |}>,
    contentOffset: Readonly<{|
      y: number,
      x: number,
    |}>,
    contentSize: Readonly<{|
      height: number,
      width: number,
    |}>,
    layoutMeasurement: Readonly<{|
      height: number,
      width: number,
    |}>,
    targetContentOffset?: Readonly<{|
      y: number,
      x: number,
    |}>,
    velocity?: Readonly<{|
      y: number,
      x: number,
    |}>,
    zoomScale?: number,
    responderIgnoreScroll?: boolean,
  |}>,
>;

export type BlurEvent = SyntheticEvent<
  Readonly<{|
    target: number,
  |}>,
>;

export type FocusEvent = SyntheticEvent<
  Readonly<{|
    target: number,
  |}>,
>;

export type MouseEvent = SyntheticEvent<
  Readonly<{|
    clientX: number,
    clientY: number,
    pageX: number,
    pageY: number,
    timestamp: number,
  |}>,
>;
