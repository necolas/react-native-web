/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';
import canUseDOM from '../canUseDom';

type Listener = (e: any) => void;

type EventHandle = (target: EventTarget, callback: ?Listener) => () => void;

export type EventOptions = {
  capture?: boolean,
  passive?: boolean
};

const emptyFunction = () => {};

function supportsPassiveEvents(): boolean {
  let supported = false;
  // Check if browser supports event with passive listeners
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
  if (canUseDOM) {
    try {
      const options = {};
      Object.defineProperty(options, 'passive', {
        get() {
          supported = true;
          return false;
        }
      });
      window.addEventListener('test', null, options);
      window.removeEventListener('test', null, options);
    } catch (e) {}
  }
  return supported;
}

const canUsePassiveEvents = supportsPassiveEvents();

function getOptions(options: ?EventOptions): EventOptions | boolean {
  if (options == null) {
    return false;
  }
  return canUsePassiveEvents ? options : Boolean(options.capture);
}

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
export default function createEventHandle(
  type: string,
  options: ?EventOptions
): EventHandle {
  const opts = getOptions(options);

  return function (target: EventTarget, listener: ?Listener) {
    if (target == null || typeof target.addEventListener !== 'function') {
      throw new Error('createEventHandle: called on an invalid target.');
    }

    const element = (target: any);
    if (listener != null) {
      const compatListener = (e) => listener(normalizeEvent(e));
      element.addEventListener(type, compatListener, opts);
      return function removeListener() {
        if (element != null) {
          element.removeEventListener(type, compatListener, opts);
        }
      };
    } else {
      return emptyFunction;
    }
  };
}
