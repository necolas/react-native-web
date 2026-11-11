/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { PlatformMethods } from '../../types';

import UIManager from '../../exports/UIManager';

/**
 * Adds non-standard methods to the hode element. This is temporarily until an
 * API like `ReactNative.measure(hostRef, callback)` is added to React Native.
 */
export default function setPlatformMethods(
  hostNode: ?(HTMLElement & PlatformMethods)
) {
  if (hostNode != null) {
    hostNode.measure = (callback) => UIManager.measure(hostNode, callback);
    hostNode.measureLayout = (relativeToNode, success, failure) =>
      UIManager.measureLayout(hostNode, relativeToNode, failure, success);
    hostNode.measureInWindow = (callback) =>
      UIManager.measureInWindow(hostNode, callback);
    // Not supported on web. Kept so code shared with native doesn't crash.
    hostNode.setNativeProps = () => {};
  }
}
