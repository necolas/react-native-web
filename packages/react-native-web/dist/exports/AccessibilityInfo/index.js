/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

function isScreenReaderEnabled() {
  return new Promise(function (resolve, reject) {
    resolve(true);
  });
}

var prefersReducedMotionMedia = canUseDOM && typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

function isReduceMotionEnabled() {
  return new Promise(function (resolve, reject) {
    resolve(prefersReducedMotionMedia ? prefersReducedMotionMedia.matches : true);
  });
}

function addChangeListener(fn) {
  if (prefersReducedMotionMedia != null) {
    prefersReducedMotionMedia.addEventListener != null ? prefersReducedMotionMedia.addEventListener('change', fn) : prefersReducedMotionMedia.addListener(fn);
  }
}

function removeChangeListener(fn) {
  if (prefersReducedMotionMedia != null) {
    prefersReducedMotionMedia.removeEventListener != null ? prefersReducedMotionMedia.removeEventListener('change', fn) : prefersReducedMotionMedia.removeListener(fn);
  }
}

var handlers = {};
var AccessibilityInfo = {
  /**
   * Query whether a screen reader is currently enabled.
   *
   * Returns a promise which resolves to a boolean.
   * The result is `true` when a screen reader is enabled and `false` otherwise.
   */
  isScreenReaderEnabled: isScreenReaderEnabled,

  /**
   * Query whether the user prefers reduced motion.
   *
   * Returns a promise which resolves to a boolean.
   * The result is `true` when a screen reader is enabled and `false` otherwise.
   */
  isReduceMotionEnabled: isReduceMotionEnabled,

  /**
   * Deprecated
   */
  fetch: isScreenReaderEnabled,

  /**
   * Add an event handler. Supported events: reduceMotionChanged
   */
  addEventListener: function addEventListener(eventName, handler) {
    if (eventName === 'reduceMotionChanged') {
      if (!prefersReducedMotionMedia) {
        return;
      }

      var listener = function listener(event) {
        handler(event.matches);
      };

      addChangeListener(listener);
      handlers[handler] = listener;
    }

    return {
      remove: function remove() {
        return AccessibilityInfo.removeEventListener(eventName, handler);
      }
    };
  },

  /**
   * Set accessibility focus to a react component.
   */
  setAccessibilityFocus: function setAccessibilityFocus(reactTag) {},

  /**
   * Post a string to be announced by the screen reader.
   */
  announceForAccessibility: function announceForAccessibility(announcement) {},

  /**
   * Remove an event handler.
   */
  removeEventListener: function removeEventListener(eventName, handler) {
    if (eventName === 'reduceMotionChanged') {
      var listener = handlers[handler];

      if (!listener || !prefersReducedMotionMedia) {
        return;
      }

      removeChangeListener(listener);
    }

    return;
  }
};
export default AccessibilityInfo;