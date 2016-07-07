/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import createReactStyleObject from './createReactStyleObject'
import hyphenate from './hyphenate'
import { predefinedClassNames } from './predefs'
import prefixAll from 'inline-style-prefixer/static'

let stylesCache = {}
let uniqueID = 0

const getCacheKey = (prop, value) => `${prop}:${value}`

const createCssDeclarations = (style) => {
  return Object.keys(style).map((prop) => {
    const property = hyphenate(prop)
    const value = style[prop]
    if (Array.isArray(value)) {
      return value.reduce((acc, curr) => {
        acc += `${property}:${curr};`
        return acc
      }, '')
    } else {
      return `${property}:${value};`
    }
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

    const reactStyleObject = createReactStyleObject(style)

    Object.keys(reactStyleObject).forEach((prop) => {
      const value = reactStyleObject[prop]
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
    const reactStyleObject = createReactStyleObject(styleSheetObject)
    let style = {}

    for (const prop in reactStyleObject) {
      const value = reactStyleObject[prop]
      const cacheKey = getCacheKey(prop, value)
      let selector = stylesCache[cacheKey] && stylesCache[cacheKey].id || predefinedClassNames[cacheKey]

      if (selector && canUseCSS) {
        classList.push(selector)
      } else {
        style[prop] = reactStyleObject[prop]
      }
    }

    /**
     * React 15 removed undocumented support for fallback values in
     * inline-styles. For now, pick the last value and regress browser support
     * for CSS features like flexbox.
     */
    const vendorPrefixedStyle = Object.keys(prefixAll(style)).reduce((acc, prop) => {
      const value = style[prop]
      acc[prop] = Array.isArray(value) ? value[value.length - 1] : value
      return acc
    }, {})

    return {
      className: classList.join(' '),
      style: vendorPrefixedStyle
    }
  }
}

module.exports = StyleSheetRegistry
