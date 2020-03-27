/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const defaultConfig = {
  constructorType: 'Event',
  defaultInit: { bubbles: true, cancelable: true, composed: true }
};

const eventConfigs = {
  // Focus Events
  blur: {
    constructorType: 'FocusEvent',
    defaultInit: { bubbles: false, cancelable: false, composed: true }
  },
  focus: {
    constructorType: 'FocusEvent',
    defaultInit: { bubbles: false, cancelable: false, composed: true }
  },
  focusin: {
    constructorType: 'FocusEvent',
    defaultInit: { bubbles: true, cancelable: false, composed: true }
  },
  focusout: {
    constructorType: 'FocusEvent',
    defaultInit: { bubbles: true, cancelable: false, composed: true }
  },
  // Keyboard Events
  keydown: {
    constructorType: 'KeyboardEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  keyup: {
    constructorType: 'KeyboardEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  // Mouse Events
  click: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  contextmenu: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  dblclick: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  drag: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  dragend: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: false, composed: true }
  },
  dragenter: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  dragexit: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: false, composed: true }
  },
  dragleave: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: false, composed: true }
  },
  dragover: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  dragstart: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  drop: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  mousedown: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  mouseenter: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: false, cancelable: false, composed: true }
  },
  mouseleave: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: false, cancelable: false, composed: true }
  },
  mousemove: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  mouseout: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  mouseover: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  mouseup: {
    constructorType: 'MouseEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  // Selection events
  select: {
    constructorType: 'Event',
    defaultInit: { bubbles: true, cancelable: false }
  },
  // Touch events
  touchcancel: {
    constructorType: 'TouchEvent',
    defaultInit: { bubbles: true, cancelable: false, composed: true }
  },
  touchend: {
    constructorType: 'TouchEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  touchmove: {
    constructorType: 'TouchEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  touchstart: {
    constructorType: 'TouchEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  // Pointer events
  gotpointercapture: {
    constructorType: 'PointerEvent',
    defaultInit: { bubbles: false, cancelable: false, composed: true }
  },
  lostpointercapture: {
    constructorType: 'PointerEvent',
    defaultInit: { bubbles: false, cancelable: false, composed: true }
  },
  pointercancel: {
    constructorType: 'PointerEvent',
    defaultInit: { bubbles: true, cancelable: false, composed: true }
  },
  pointerdown: {
    constructorType: 'PointerEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  pointerenter: {
    constructorType: 'PointerEvent',
    defaultInit: { bubbles: false, cancelable: false }
  },
  pointerleave: {
    constructorType: 'PointerEvent',
    defaultInit: { bubbles: false, cancelable: false }
  },
  pointermove: {
    constructorType: 'PointerEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  pointerout: {
    constructorType: 'PointerEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  pointerover: {
    constructorType: 'PointerEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  pointerup: {
    constructorType: 'PointerEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  // Image events
  error: {
    constructorType: 'Event',
    defaultInit: { bubbles: false, cancelable: false }
  },
  load: {
    constructorType: 'UIEvent',
    defaultInit: { bubbles: false, cancelable: false }
  },
  // Form Events
  change: {
    constructorType: 'Event',
    defaultInit: { bubbles: true, cancelable: false }
  },
  input: {
    constructorType: 'InputEvent',
    defaultInit: { bubbles: true, cancelable: false, composed: true }
  },
  invalid: {
    constructorType: 'Event',
    defaultInit: { bubbles: false, cancelable: true }
  },
  submit: {
    constructorType: 'Event',
    defaultInit: { bubbles: true, cancelable: true }
  },
  reset: {
    constructorType: 'Event',
    defaultInit: { bubbles: true, cancelable: true }
  },
  // Clipboard Events
  copy: {
    constructorType: 'ClipboardEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  cut: {
    constructorType: 'ClipboardEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  paste: {
    constructorType: 'ClipboardEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  // Composition Events
  compositionend: {
    constructorType: 'CompositionEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  compositionstart: {
    constructorType: 'CompositionEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  compositionupdate: {
    constructorType: 'CompositionEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  },
  // Other events
  scroll: {
    constructorType: 'UIEvent',
    defaultInit: { bubbles: false, cancelable: false }
  },
  wheel: {
    constructorType: 'WheelEvent',
    defaultInit: { bubbles: true, cancelable: true, composed: true }
  }
};

function getEventConfig(type) {
  return eventConfigs[type] || defaultConfig;
}

export default function createEvent(type, init) {
  const config = getEventConfig(type);
  const { constructorType, defaultInit } = config;
  const eventInit = { ...init, ...defaultInit };

  const event = document.createEvent(constructorType);
  const { bubbles, cancelable, ...data } = eventInit;
  event.initEvent(type, bubbles, cancelable);

  if (data != null) {
    Object.keys(data).forEach(key => {
      const value = data[key];
      if (key === 'timeStamp' && !value) {
        return;
      }
      Object.defineProperty(event, key, { value });
    });
  }
  return event;
}
