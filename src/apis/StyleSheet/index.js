import { resetCSS, predefinedCSS } from './predefs'
import flattenStyle from './flattenStyle'
import StyleSheetRegistry from './StyleSheetRegistry'
import StyleSheetValidation from './StyleSheetValidation'

const ELEMENT_ID = 'react-stylesheet'
let isRendered = false
let lastStyleSheet = ''

/**
 * Initialize the store with pointer-event styles mapping to our custom pointer
 * event classes
 */

/**
 * Destroy existing styles
 */
const _destroy = () => {
  isRendered = false
  StyleSheetRegistry._reset()
}

const create = (styles: Object): Object => {
  for (const key in styles) {
    StyleSheetValidation.validateStyle(key, styles)
    StyleSheetRegistry.registerStyle(styles[key])
  }

  // update the style sheet in place
  if (isRendered) {
    const stylesheet = document.getElementById(ELEMENT_ID)
    if (stylesheet) {
      const newStyleSheet = renderToString()
      if (lastStyleSheet !== newStyleSheet) {
        stylesheet.textContent = newStyleSheet
        lastStyleSheet = newStyleSheet
      }
    } else if (process.env.NODE_ENV !== 'production') {
      console.error(`ReactNative: cannot find "${ELEMENT_ID}" element`)
    }
  }

  return styles
}

/**
 * Render the styles as a CSS style sheet
 */
const renderToString = () => {
  const css = StyleSheetRegistry.renderToString()
  isRendered = true
  return `${resetCSS}\n${predefinedCSS}\n${css}`
}

/**
 * Accepts React props and converts inline styles to single purpose classes
 * where possible.
 */
const resolve = ({ className, style = {} }) => {
  const props = StyleSheetRegistry.getStyleAsNativeProps(style, isRendered);
  return {
    ...props,
    className: className ? `${props.className} ${className}`.trim() : props.className
  }
}

module.exports = {
  _destroy,
  create,
  elementId: ELEMENT_ID,
  hairlineWidth: 1,
  flatten: flattenStyle,
  renderToString,
  resolve
}
