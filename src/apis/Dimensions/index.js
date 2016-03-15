/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import invariant from 'fbjs/lib/invariant'

const dimensions = {
  screen: {
    fontScale: 1,
    get height() { return window.screen.height },
    scale: window.devicePixelRatio || 1,
    get width() { return window.screen.width }
  },
  window: {
    fontScale: 1,
    get height() { return window.innerHeight },
    scale: window.devicePixelRatio || 1,
    get width() { return window.innerWidth }
  }
}

class Dimensions {
  static get(dimension: string): Object {
    invariant(dimensions[dimension], 'No dimension set for key ' + dimension)
    return dimensions[dimension]
  }
}

module.exports = Dimensions
