/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

function emptyFunction() {}

const AccessibilityInfo = {
  /**
   * Query whether a screen reader is currently enabled.
   *
   * Returns a promise which resolves to a boolean.
   * The result is `true` when a screen reader is enabled and `false` otherwise.
   */
  fetch: function(): Promise<*> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  },

  /**
   * Add an event handler. Supported events:
   */
  addEventListener: function(eventName: string, handler: Function): Object {
    return {
      remove: emptyFunction
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
    return;
  }
};

export default AccessibilityInfo;
