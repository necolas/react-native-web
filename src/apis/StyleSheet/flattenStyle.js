/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */
import invariant from 'fbjs/lib/invariant'

module.exports = function flattenStyle(style): ?Object {
  if (!style) {
    return undefined
  }

  invariant(style !== true, 'style may be false but not true')

  if (!Array.isArray(style)) {
    return style
  }

  const result = {}
  for (let i = 0; i < style.length; ++i) {
    const computedStyle = flattenStyle(style[i])
    if (computedStyle) {
      for (const key in computedStyle) {
        result[key] = computedStyle[key]
      }
    }
  }
  return result
}
