/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
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

    if (canUseDOM) {
      const change: window.Event = new window.Event(EVENT_CHANGE);
      // this respects the official API
      (change: any).window = dimensions.window;
      (change: any).screen = dimensions.screen;
      window.dispatchEvent(change);
    }
  }

  static addEventListener(type, handler): void {
    if (type === 'change') {
      canUseDOM && window.addEventListener(EVENT_CHANGE, handler);
    }
  }

  static removeEventListener(type, handler): void {
    if (type === 'change') {
      canUseDOM && window.removeEventListener(EVENT_CHANGE, handler);
    }
  }
}

Dimensions.set();

if (canUseDOM) {
  window.addEventListener('resize', debounce(Dimensions.set, 16), false);
}
