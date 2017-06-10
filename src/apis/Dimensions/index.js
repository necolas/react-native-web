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
  }
}

Dimensions.set();

if (canUseDOM) {
  window.addEventListener('resize', debounce(Dimensions.set, 16), false);
}
