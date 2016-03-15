/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import prefixAll from 'inline-style-prefix-all'
import flattenStyle from './flattenStyle'
import processTransform from './processTransform'

class StyleSheetRegistry {
  static registerStyle(style: Object, store): number {
    if (process.env.NODE_ENV !== 'production') {
      Object.freeze(style)
    }

    const normalizedStyle = processTransform(flattenStyle(style))
    Object.keys(normalizedStyle).forEach((prop) => {
      // add each declaration to the store
      store.set(prop, normalizedStyle[prop])
    })
  }

  static getStyleAsNativeProps(style, store) {
    let _className
    let _style = {}
    const classList = []
    const normalizedStyle = processTransform(flattenStyle(style))

    for (const prop in normalizedStyle) {
      let styleClass = store.get(prop, normalizedStyle[prop])

      if (styleClass) {
        classList.push(styleClass)
      } else {
        _style[prop] = normalizedStyle[prop]
      }
    }

    _className = classList.join(' ')
    _style = prefixAll(_style)

    return { className: _className, style: _style }
  }
}

module.exports = StyleSheetRegistry
