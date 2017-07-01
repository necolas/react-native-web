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
      },
      addEventListener(type, handler, useCapture) {},
      removeEventListener(type, handler) {},
      dispatchEvent(event) {}
    };

const EVENT_CHANGE = 'rn-dimensions-change';

const dimensions = {};

export default class Dimensions {
  static get(dimension: string): Object {
    invariant(dimensions[dimension], `No dimension set for key ${dimension}`);
    return dimensions[dimension];
  }

  static set(): void {
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

    const change: window.Event = new window.Event(EVENT_CHANGE);
    (change: any).window = dimensions.window;
    (change: any).screen = dimensions.screen;
    win.dispatchEvent(change);
  }

  static addEventListener(type, handler): void {
    if (type === 'change') {
      win.addEventListener(EVENT_CHANGE, handler);
    }
  }

  static removeEventListener(type, handler): void {
    if (type === 'change') {
      win.removeEventListener(EVENT_CHANGE, handler);
    }
  }
}

Dimensions.set();

if (canUseDOM) {
  window.addEventListener('resize', debounce(Dimensions.set, 16), false);
}
