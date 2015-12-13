import { resetCSS, predefinedCSS, predefinedClassNames } from './predefs'
import expandStyle from './expandStyle'
import getStyleObjects from './getStyleObjects'
import prefixer from './prefixer'
import Store from './Store'
import StylePropTypes from '../StylePropTypes'

/**
 * Initialize the store with pointer-event styles mapping to our custom pointer
 * event classes
 */
const initialState = { classNames: predefinedClassNames }
const options = { obfuscateClassNames: process.env.NODE_ENV === 'production' }
const createStore = () => new Store(initialState, options)
let store = createStore()

/**
 * Process all unique declarations
 */
const create = (styles: Object): Object => {
  const rules = getStyleObjects(styles)

  rules.forEach((rule) => {
    const style = expandStyle(rule)

    Object.keys(style).forEach((property) => {
      if (!StylePropTypes[property]) {
        console.error(`ReactNativeWeb: the style property "${property}" is not supported`)
      } else {
        const value = style[property]
        // add each declaration to the store
        store.set(property, value)
      }
    })
  })
  return styles
}

/**
 * Destroy existing styles
 */
const destroy = () => {
  store = createStore()
}

/**
 * Render the styles as a CSS style sheet
 */
const renderToString = () => {
  const css = store.toString()
  return `${resetCSS}\n${predefinedCSS}\n${css}`
}

/**
 * Accepts React props and converts inline styles to single purpose classes
 * where possible.
 */
const resolve = ({ className = '', style = {} }) => {
  let _className
  let _style = {}
  const expandedStyle = expandStyle(style)

  const classList = [ className ]
  for (const prop in expandedStyle) {
    if (!StylePropTypes[prop]) {
      continue
    }
    let styleClass = store.get(prop, expandedStyle[prop])

    if (styleClass) {
      classList.push(styleClass)
    } else {
      _style[prop] = expandedStyle[prop]
    }
  }

  _className = classList.join(' ')
  _style = prefixer.prefix(_style)

  return { className: _className, style: _style }
}

export default {
  create,
  destroy,
  renderToString,
  resolve
}
