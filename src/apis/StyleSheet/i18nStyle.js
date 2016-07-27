import I18nManager from '../I18nManager'

const CSS_UNIT_RE = /^[+-]?\d*(?:\.\d+)?(?:[Ee][+-]?\d+)?(\w*)/

/**
 * Map of property names to their BiDi equivalent.
 */
const PROPERTIES_TO_SWAP = {
  'borderTopLeftRadius': 'borderTopRightRadius',
  'borderTopRightRadius': 'borderTopLeftRadius',
  'borderBottomLeftRadius': 'borderBottomRightRadius',
  'borderBottomRightRadius': 'borderBottomLeftRadius',
  'borderLeftColor': 'borderRightColor',
  'borderLeftStyle': 'borderRightStyle',
  'borderLeftWidth': 'borderRightWidth',
  'borderRightColor': 'borderLeftColor',
  'borderRightWidth': 'borderLeftWidth',
  'borderRightStyle': 'borderLeftStyle',
  'left': 'right',
  'marginLeft': 'marginRight',
  'marginRight': 'marginLeft',
  'paddingLeft': 'paddingRight',
  'paddingRight': 'paddingLeft',
  'right': 'left'
}

const PROPERTIES_SWAP_LEFT_RIGHT = {
  'clear': true,
  'float': true,
  'textAlign': true
}

const PROPERTIES_SWAP_LTR_RTL = {
  'writingDirection': true
}

/**
 * Invert the sign of a numeric-like value
 */
const additiveInverse = (value: String | Number) => {
  if (typeof value === 'string') {
    const number = parseFloat(value, 10) * -1
    const unit = getUnit(value)
    return `${number}${unit}`
  } else if (isNumeric(value)) {
    return value * -1
  }
}

/**
 * BiDi flip the given property.
 */
const flipProperty = (prop:String): String => {
  return PROPERTIES_TO_SWAP.hasOwnProperty(prop) ? PROPERTIES_TO_SWAP[prop] : prop
}

/**
 * BiDi flip translateX
 */
const flipTransform = (transform: Object): Object => {
  const translateX = transform.translateX
  if (translateX != null) {
    transform.translateX = additiveInverse(translateX)
  }
  return transform
}

/**
 * Get the CSS unit for string values
 */
const getUnit = (str) => str.match(CSS_UNIT_RE)[1]

const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

const swapLeftRight = (value:String): String => {
  return value === 'left' ? 'right' : value === 'right' ? 'left' : value
}

const swapLtrRtl = (value:String): String => {
  return value === 'ltr' ? 'rtl' : value === 'rtl' ? 'ltr' : value
}

const i18nStyle = (style = {}) => {
  const newStyle = {}
  for (const prop in style) {
    if (style.hasOwnProperty(prop)) {
      const indexOfNoFlip = prop.indexOf('$noI18n')

      if (I18nManager.isRTL) {
        if (PROPERTIES_TO_SWAP[prop]) {
          const newProp = flipProperty(prop)
          newStyle[newProp] = style[prop]
        } else if (PROPERTIES_SWAP_LEFT_RIGHT[prop]) {
          newStyle[prop] = swapLeftRight(style[prop])
        } else if (PROPERTIES_SWAP_LTR_RTL[prop]) {
          newStyle[prop] = swapLtrRtl(style[prop])
        } else if (prop === 'textShadowOffset') {
          newStyle[prop] = style[prop]
          newStyle[prop].width = additiveInverse(style[prop].width)
        } else if (prop === 'transform') {
          newStyle[prop] = style[prop].map(flipTransform)
        } else if (indexOfNoFlip > -1) {
          const newProp = prop.substring(0, indexOfNoFlip)
          newStyle[newProp] = style[prop]
        } else {
          newStyle[prop] = style[prop]
        }
      } else {
        if (indexOfNoFlip > -1) {
          const newProp = prop.substring(0, indexOfNoFlip)
          newStyle[newProp] = style[prop]
        } else {
          newStyle[prop] = style[prop]
        }
      }
    }
  }

  return newStyle
}

module.exports = i18nStyle
