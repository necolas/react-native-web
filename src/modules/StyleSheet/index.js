import { resetCSS, predefinedCSS, predefinedClassNames } from './predefs'
import expandStyle from './expandStyle'
import flattenStyles from './flattenStyles'
import getStyleObjects from './getStyleObjects'
import prefixer from './prefixer'
import Store from './Store'
import StylePropTypes from '../StylePropTypes'

/**
 * Initialize the store with pointer-event styles mapping to our custom pointer
 * event classes
 */
const initialState = { classNames: predefinedClassNames }
const options = { obfuscateClassNames: !(process.env.NODE_ENV !== 'production') }
const createStore = () => new Store(initialState, options)
let store = createStore()
let isRendered = false

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

  // update the style sheet in place
  if (isRendered) {
    const stylesheet = document.getElementById('react-stylesheet')
    if (stylesheet) {
      stylesheet.textContent = _renderToString()
    } else if (process.env.NODE_ENV !== 'production') {
      console.error('ReactNativeWeb: cannot find "react-stylesheet" element')
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    const deepFreeze = (obj) => {
      const propNames = Object.getOwnPropertyNames(obj)
      propNames.forEach((name) => {
        const prop = obj[name]
        if (typeof prop === 'object' && prop !== null && !Object.isFrozen(prop)) {
          deepFreeze(prop)
        }
      })
      return Object.freeze(obj)
    }

    deepFreeze(styles)
  }

  return styles
}

/**
 * Accepts React props and converts inline styles to single purpose classes
 * where possible.
 */
const resolve = ({ className = '', style = {} }) => {
  let _className
  let _style = {}
  const expandedStyle = expandStyle(flattenStyles(style))

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
  _destroy,
  _renderToString,
  create,
  resolve
}
