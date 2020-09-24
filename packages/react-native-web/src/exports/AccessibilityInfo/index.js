/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

function isScreenReaderEnabled(): Promise<*> {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}

const prefersReducedMotionMedia = canUseDOM
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null;
function isReduceMotionEnabled(): Promise<*> {
  return new Promise((resolve, reject) => {
    resolve(prefersReducedMotionMedia ? prefersReducedMotionMedia.matches : true);
  });
}

const handlers = {};

const AccessibilityInfo = {
  /**
   * Query whether a screen reader is currently enabled.
   *
   * Returns a promise which resolves to a boolean.
   * The result is `true` when a screen reader is enabled and `false` otherwise.
   */
  isScreenReaderEnabled,

  /**
   * Query whether the user prefers reduced motion.
   *
   * Returns a promise which resolves to a boolean.
   * The result is `true` when a screen reader is enabled and `false` otherwise.
   */
  isReduceMotionEnabled,

  /**
   * Deprecated
   */
  fetch: isScreenReaderEnabled,

  /**
   * Add an event handler. Supported events: reduceMotionChanged
   */
  addEventListener: function(eventName: string, handler: Function): Object {
    if (eventName === 'reduceMotionChanged') {
      if (!prefersReducedMotionMedia) {
        return;
      }

      const listener = event => {
        handler(event.matches);
      };
      prefersReducedMotionMedia.addEventListener('change', listener);
      handlers[handler] = listener;
    }

    return {
      remove: () => AccessibilityInfo.removeEventListener(eventName, handler)
    };
  },

  /**
   * Set accessibility focus to a react component.
   */
  setAccessibilityFocus: function(reactTag: number): void {},

  /**
   * Post a string to be announced by the screen reader.
   */
  announceForAccessibility: function(announcement: string): void {},

  /**
   * Remove an event handler.
   */
  removeEventListener: function(eventName: string, handler: Function): void {
    if (eventName === 'reduceMotionChanged') {
      const listener = handlers[handler];
      if (!listener || !prefersReducedMotionMedia) {
        return;
      }

      prefersReducedMotionMedia.removeEventListener('change', listener);
    }

    return;
  }
};

export default AccessibilityInfo;
