/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import prefixAll from 'inline-style-prefix-all'
import hyphenate from './hyphenate'
import expandStyle from './expandStyle'
import flattenStyle from './flattenStyle'
import processTransform from './processTransform'
import { predefinedClassNames } from './predefs'

let stylesCache = {}
let uniqueID = 0

const getCacheKey = (prop, value) => `${prop}:${value}`

const normalizeStyle = (style) => {
  return processTransform(expandStyle(flattenStyle(style)))
}

const createCssDeclarations = (style) => {
  return Object.keys(style).map((prop) => {
    const property = hyphenate(prop)
    const value = style[prop]
    return `${property}:${value};`
  }).sort().join('')
}

class StyleSheetRegistry {
  /* for testing */
  static _reset() {
    stylesCache = {}
    uniqueID = 0
  }

  static renderToString() {
    let str = `/* ${uniqueID} unique declarations */`

    return Object.keys(stylesCache).reduce((str, key) => {
      const id = stylesCache[key].id
      const style = stylesCache[key].style
      const declarations = createCssDeclarations(style)
      const rule = `\n.${id}{${declarations}}`
      str += rule
      return str
    }, str)
  }

  static registerStyle(style: Object): number {
    if (process.env.NODE_ENV !== 'production') {
      Object.freeze(style)
    }

    const normalizedStyle = normalizeStyle(style)

    Object.keys(normalizedStyle).forEach((prop) => {
      const value = normalizedStyle[prop]
      const cacheKey = getCacheKey(prop, value)
      const exists = stylesCache[cacheKey] && stylesCache[cacheKey].id
      if (!exists) {
        const id = ++uniqueID
        // add new declaration to the store
        stylesCache[cacheKey] = {
          id: `__style${id}`,
          style: prefixAll({ [prop]: value })
        }
      }
    })

    return style
  }

  static getStyleAsNativeProps(styleSheetObject, canUseCSS = false) {
    const classList = []
    const normalizedStyle = normalizeStyle(styleSheetObject)
    let style = {}

    for (const prop in normalizedStyle) {
      const value = normalizedStyle[prop]
      const cacheKey = getCacheKey(prop, value)
      let selector = stylesCache[cacheKey] && stylesCache[cacheKey].id || predefinedClassNames[cacheKey]

      if (selector && canUseCSS) {
        classList.push(selector)
      } else {
        style[prop] = normalizedStyle[prop]
      }
    }

    return {
      className: classList.join(' '),
      style: prefixAll(style)
    }
  }
}

module.exports = StyleSheetRegistry
