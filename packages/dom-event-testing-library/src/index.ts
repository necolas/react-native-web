/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { buttonType, buttonsType } from './constants';
import type { EventPayload } from './createEvent';
import { platform } from './domEnvironment';
import * as domEvents from './domEvents';
import type {
  FocusEventPayload,
  KeyboardEventPayload,
  MouseEventPayload,
  PointerEventPayload
} from './domEvents';
import * as domEventSequences from './domEventSequences';
import { testWithPointerType } from './testHelpers';

const createEventTarget = <T extends Node | Window>(node: T) => ({
  node,
  /**
   * Simple events abstraction.
   */
  blur(payload?: FocusEventPayload) {
    node.dispatchEvent(domEvents.blur(payload));
  },
  click(payload?: MouseEventPayload) {
    node.dispatchEvent(domEvents.click(payload));
  },
  contextmenu(payload?: PointerEventPayload) {
    domEventSequences.contextmenu(node, payload);
  },
  error() {
    node.dispatchEvent(domEvents.error());
  },
  focus(payload?: FocusEventPayload) {
    domEventSequences.focus(node, payload);
  },
  keydown(payload?: KeyboardEventPayload) {
    node.dispatchEvent(domEvents.keydown(payload));
  },
  keyup(payload?: KeyboardEventPayload) {
    node.dispatchEvent(domEvents.keyup(payload));
  },
  load(payload?: EventPayload) {
    node.dispatchEvent(domEvents.load(payload));
  },
  /**
   * PointerEvent abstraction.
   * Dispatches the expected sequence of PointerEvents, MouseEvents, and
   * TouchEvents for a given environment.
   */
  // node no longer receives events for the pointer
  pointercancel(payload?: PointerEventPayload) {
    domEventSequences.pointercancel(node, payload);
  },
  // node dispatches down events
  pointerdown(payload?: PointerEventPayload) {
    domEventSequences.pointerdown(node, payload);
  },
  // node dispatches move events (pointer is not down)
  pointerhover(payload?: PointerEventPayload) {
    domEventSequences.pointerhover(node, payload);
  },
  // node dispatches move events (pointer is down)
  pointermove(payload?: PointerEventPayload) {
    domEventSequences.pointermove(node, payload);
  },
  // node dispatches enter & over events
  pointerover(payload?: PointerEventPayload) {
    domEventSequences.pointerover(node, payload);
  },
  // node dispatches exit & leave events
  pointerout(payload?: PointerEventPayload) {
    domEventSequences.pointerout(node, payload);
  },
  // node dispatches up events
  pointerup(payload?: PointerEventPayload) {
    domEventSequences.pointerup(node, payload);
  },
  scroll(payload?: EventPayload) {
    node.dispatchEvent(domEvents.scroll());
  },
  select(payload?: EventPayload) {
    node.dispatchEvent(domEvents.select());
  },
  // selectionchange is only dispatched on 'document'
  selectionchange(payload?: EventPayload) {
    document.dispatchEvent(domEvents.selectionchange());
  },
  /**
   * Gesture abstractions.
   * Helpers for event sequences expected in a gesture.
   * target.tap({ pointerType: 'touch' })
   */
  tap(payload?: PointerEventPayload) {
    domEventSequences.pointerdown(node, payload);
    domEventSequences.pointerup(node, payload);
  },
  virtualclick(payload?: MouseEventPayload) {
    node.dispatchEvent(domEvents.virtualclick(payload));
  },
  /**
   * Utilities
   */
  setBoundingClientRect({
    x,
    y,
    width,
    height
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    (node as T & Element).getBoundingClientRect = function () {
      return {
        width,
        height,
        left: x,
        right: x + width,
        top: y,
        bottom: y + height,
        x,
        y
      } as DOMRect;
    };
  }
});

const clearPointers = domEventSequences.clearPointers;

export {
  buttonType,
  buttonsType,
  clearPointers,
  createEventTarget,
  platform,
  testWithPointerType
};
