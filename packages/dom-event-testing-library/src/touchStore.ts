/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Touch events state machine.
 *
 * Keeps track of the active pointers and allows them to be reflected in touch events.
 */

export type TouchData = {
  clientX: number;
  clientY: number;
  force: number;
  identifier: number | undefined;
  pageX: number;
  pageY: number;
  radiusX: number;
  radiusY: number;
  rotationAngle: number;
  target: Node | Window;
  screenX: number;
  screenY: number;
};

let isGesture = false;
const activeTouches = new Map<
  Node | Window,
  Map<number | undefined, TouchData>
>();

export function addTouch(touch: TouchData) {
  const identifier = touch.identifier;
  const target = touch.target;
  let targetTouches = activeTouches.get(target);
  if (targetTouches == null) {
    targetTouches = new Map();
    activeTouches.set(target, targetTouches);
  }
  if (targetTouches.get(identifier)) {
    // Do not allow existing touches to be overwritten
    console.error(
      'Touch with identifier %s already exists. Did not record touch start.',
      identifier
    );
  } else {
    targetTouches.set(identifier, touch);
  }
  isGesture = activeTouches.size > 1;
}

export function updateTouch(touch: TouchData) {
  const identifier = touch.identifier;
  const target = touch.target;
  const targetTouches = activeTouches.get(target);
  if (targetTouches != null) {
    targetTouches.set(identifier, touch);
    isGesture = true;
  } else {
    console.error(
      'Touch with identifier %s does not exist. Cannot record touch move without a touch start.',
      identifier
    );
  }
}

export function removeTouch(touch: TouchData) {
  const identifier = touch.identifier;
  const target = touch.target;
  const targetTouches = activeTouches.get(target);
  if (targetTouches != null) {
    if (targetTouches.has(identifier)) {
      targetTouches.delete(identifier);
    } else {
      console.error(
        'Touch with identifier %s does not exist. Cannot record touch end without a touch start.',
        identifier
      );
    }
  }
  return isGesture;
}

export function getTouches() {
  const touches: TouchData[] = [];
  activeTouches.forEach((_, target) => {
    touches.push(...getTargetTouches(target));
  });
  return touches;
}

export function getTargetTouches(target: Node | Window) {
  const targetTouches = activeTouches.get(target);
  if (targetTouches != null) {
    return Array.from(targetTouches.values());
  }
  return [];
}

export function clear() {
  activeTouches.clear();
}
