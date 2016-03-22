/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment'
import invariant from 'fbjs/lib/invariant'

const win = ExecutionEnvironment.canUseDOM ? window : { screen: {} }

const dimensions = {
  screen: {
    fontScale: 1,
    get height() { return win.screen.height },
    scale: win.devicePixelRatio || 1,
    get width() { return win.screen.width }
  },
  window: {
    fontScale: 1,
    get height() { return win.innerHeight },
    scale: win.devicePixelRatio || 1,
    get width() { return win.innerWidth }
  }
}

class Dimensions {
  static get(dimension: string): Object {
    invariant(dimensions[dimension], 'No dimension set for key ' + dimension)
    return dimensions[dimension]
  }
}

module.exports = Dimensions
