/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */
import invariant from 'invariant'
import expandStyle from './expandStyle'

export default function flattenStyle(style): ?Object {
  if (!style) {
    return undefined
  }

  invariant(style !== true, 'style may be false but not true')

  if (!Array.isArray(style)) {
    // we must expand styles during the flattening because expanded styles
    // override shorthands
    return expandStyle(style)
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
