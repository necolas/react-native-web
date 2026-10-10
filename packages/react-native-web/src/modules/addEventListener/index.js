/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

type Listener = (e: any) => void;

export type EventOptions = {
  capture?: boolean,
  passive?: boolean,
  once?: boolean
};

const emptyFunction = () => {};

/**
 * Shim generic API compatibility with ReactDOM's synthetic events, without needing the
 * large amount of code ReactDOM uses to do this. Ideally we wouldn't use a synthetic
 * event wrapper at all.
 */
function isPropagationStopped() {
  return this.cancelBubble;
}
function isDefaultPrevented() {
  return this.defaultPrevented;
}
function normalizeEvent(event: any) {
  event.nativeEvent = event;
  event.persist = emptyFunction;
  event.isDefaultPrevented = isDefaultPrevented;
  event.isPropagationStopped = isPropagationStopped;
  return event;
}

/**
 *
 */
export function addEventListener(
  target: EventTarget,
  type: any,
  listener: Listener,
  options: ?EventOptions
): () => void {
  const opts = options ?? false;
  const compatListener = (e: any) => listener(normalizeEvent(e));
  target.addEventListener(type, compatListener, opts);

  return function removeEventListener() {
    if (target != null) {
      target.removeEventListener(type, compatListener, opts);
    }
  };
}
