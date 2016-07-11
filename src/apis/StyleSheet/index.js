import createReactStyleObject from './createReactStyleObject'
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment'
import flattenStyle from '../../modules/flattenStyle'
import React from 'react'
import ReactNativePropRegistry from '../../modules/ReactNativePropRegistry'
import StyleSheetValidation from './StyleSheetValidation'
import { defaultStyles, mapStyleToClassName } from './predefs'

let isRendered = false
let styleElement
const STYLE_SHEET_ID = '__react-native-style'

const _injectStyleSheet = () => {
  // check if the server rendered the style sheet
  styleElement = document.getElementById(STYLE_SHEET_ID)
  // if not, inject the style sheet
  if (!styleElement) { document.head.insertAdjacentHTML('afterbegin', renderToString()) }
  isRendered = true
}

const _reset = () => {
  if (styleElement) { document.head.removeChild(styleElement) }
  styleElement = null
  isRendered = false
}

const absoluteFillObject = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }
const absoluteFill = ReactNativePropRegistry.register(absoluteFillObject)

const create = (styles: Object): Object => {
  if (!isRendered && ExecutionEnvironment.canUseDOM) {
    _injectStyleSheet()
  }

  const result = {}
  for (let key in styles) {
    StyleSheetValidation.validateStyle(key, styles)
    result[key] = ReactNativePropRegistry.register(styles[key])
  }
  return result
}

const render = () => <style dangerouslySetInnerHTML={{ __html: defaultStyles }} id={STYLE_SHEET_ID} />

const renderToString = () => `<style id="${STYLE_SHEET_ID}">${defaultStyles}</style>`

/**
 * Accepts React props and converts style declarations to classNames when necessary
 */
const resolve = (props) => {
  let className = props.className || ''
  let style = createReactStyleObject(props.style)
  for (const prop in style) {
    const value = style[prop]
    const replacementClassName = mapStyleToClassName(prop, value)
    if (replacementClassName) {
      className += ` ${replacementClassName}`
      // delete style[prop]
    }
  }

  return { className, style }
}

module.exports = {
  _reset,
  absoluteFill,
  absoluteFillObject,
  create,
  hairlineWidth: 1,
  flatten: flattenStyle,
  /* @platform web */
  render,
  /* @platform web */
  resolve
}
