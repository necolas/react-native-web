/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Dimensions
 * @flow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import debounce from 'debounce';
import invariant from 'fbjs/lib/invariant';

const win = canUseDOM
  ? window
  : {
      devicePixelRatio: undefined,
      innerHeight: undefined,
      innerWidth: undefined,
      screen: {
        height: undefined,
        width: undefined
      }
    };

const dimensions = {};
const listeners = {};

export default class Dimensions {
  static get(dimension: string): Object {
    invariant(dimensions[dimension], `No dimension set for key ${dimension}`);
    return dimensions[dimension];
  }

  static set(initialDimensions: ?{ [key: string]: any }): void {
    if (initialDimensions) {
      if (canUseDOM) {
        invariant(false, 'Dimensions cannot be set in the browser');
      } else {
        dimensions.screen = initialDimensions.screen;
        dimensions.window = initialDimensions.window;
      }
    }
  }

  static _update() {
    dimensions.window = {
      fontScale: 1,
      height: win.innerHeight,
      scale: win.devicePixelRatio || 1,
      width: win.innerWidth
    };

    dimensions.screen = {
      fontScale: 1,
      height: win.screen.height,
      scale: win.devicePixelRatio || 1,
      width: win.screen.width
    };

    if (Array.isArray(listeners['change'])) {
      listeners['change'].forEach(handler => handler(dimensions));
    }
  }

  static addEventListener(type, handler): void {
    listeners[type] = listeners[type] || [];
    listeners[type].push(handler);
  }

  static removeEventListener(type, handler): void {
    if (Array.isArray(listeners[type])) {
      listeners[type] = listeners[type].filter(_handler => _handler !== handler);
    }
  }
}

Dimensions._update();

if (canUseDOM) {
  window.addEventListener('resize', debounce(Dimensions._update, 16), false);
}
