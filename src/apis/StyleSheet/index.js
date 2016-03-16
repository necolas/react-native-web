import { resetCSS, predefinedCSS, predefinedClassNames } from './predefs'
import flattenStyle from './flattenStyle'
import Store from './Store'
import StyleSheetRegistry from './StyleSheetRegistry'
import StyleSheetValidation from './StyleSheetValidation'

const ELEMENT_ID = 'react-stylesheet'
let isRendered = false
let lastStyleSheet = ''

/**
 * Initialize the store with pointer-event styles mapping to our custom pointer
 * event classes
 */
const initialState = { classNames: predefinedClassNames }
const options = { obfuscateClassNames: !(process.env.NODE_ENV !== 'production') }
const createStore = () => new Store(initialState, options)
let store = createStore()

/**
 * Destroy existing styles
 */
const _destroy = () => {
  store = createStore()
  isRendered = false
}

/**
 * Render the styles as a CSS style sheet
 */
const _renderToString = () => {
  const css = store.toString()
  isRendered = true
  return `${resetCSS}\n${predefinedCSS}\n${css}`
}

const create = (styles: Object): Object => {
  for (const key in styles) {
    StyleSheetValidation.validateStyle(key, styles)
    StyleSheetRegistry.registerStyle(styles[key], store)
  }

  // update the style sheet in place
  if (isRendered) {
    const stylesheet = document.getElementById(ELEMENT_ID)
    if (stylesheet) {
      const newStyleSheet = _renderToString()
      if (lastStyleSheet !== newStyleSheet) {
        stylesheet.textContent = newStyleSheet
        lastStyleSheet = newStyleSheet
      }
    } else if (process.env.NODE_ENV !== 'production') {
      console.error('ReactNative: cannot find "react-stylesheet" element')
    }
  }

  return styles
}

/**
 * Accepts React props and converts inline styles to single purpose classes
 * where possible.
 */
const resolve = ({ style = {} }) => {
  return StyleSheetRegistry.getStyleAsNativeProps(style, store)
}

module.exports = {
  _destroy,
  _renderToString,
  create,
  elementId: ELEMENT_ID,
  hairlineWidth: 1,
  flatten: flattenStyle,
  resolve
}
