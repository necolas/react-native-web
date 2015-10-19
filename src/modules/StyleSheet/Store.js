import hyphenate from './hyphenate'
import normalizeValue from './normalizeValue'
import prefixer from './prefixer'

export default class Store {
  constructor(
    initialState:Object = {},
    options:Object = { obfuscateClassNames: false }
  ) {
    this._counter = 0
    this._classNames = { ...initialState.classNames }
    this._declarations = { ...initialState.declarations }
    this._options = options
  }

  get(property, value) {
    const normalizedValue = normalizeValue(property, value)
    const key = this._getDeclarationKey(property, normalizedValue)
    return this._classNames[key]
  }

  set(property, value) {
    if (value != null) {
      const normalizedValue = normalizeValue(property, value)
      const values = this._getPropertyValues(property) || []
      if (values.indexOf(normalizedValue) === -1) {
        values.push(normalizedValue)
        this._setClassName(property, normalizedValue)
        this._setPropertyValues(property, values)
      }
    }
  }

  toString() {
    const obfuscate = this._options.obfuscateClassNames

    // sort the properties to ensure shorthands are first in the cascade
    const properties = Object.keys(this._declarations).sort()

    // transform the class name to a valid CSS selector
    const getCssSelector = (property, value) => {
      let className = this.get(property, value)
      if (!obfuscate && className) {
        className = className.replace(/[:?.%\\$#]/g, '\\$&')
      }
      return className
    }

    // transform the declarations into CSS rules with vendor-prefixes
    const buildCSSRules = (property, values) => {
      return values.reduce((cssRules, value) => {
        const declarations = prefixer.prefix({ [property]: value })
        const cssDeclarations = Object.keys(declarations).reduce((str, prop) => {
          str += `${hyphenate(prop)}:${value};`
          return str
        }, '')
        const selector = getCssSelector(property, value)

        cssRules += `\n.${selector}{${cssDeclarations}}`

        return cssRules
      }, '')
    }

    const css = properties.reduce((css, property) => {
      const values = this._declarations[property]
      css += buildCSSRules(property, values)
      return css
    }, '')

    return (`/* ${this._counter} unique declarations */${css}`)
  }

  _getDeclarationKey(property, value) {
    return `${property}:${value}`
  }

  _getPropertyValues(property) {
    return this._declarations[property]
  }

  _setPropertyValues(property, values) {
    this._declarations[property] = values.map(value => normalizeValue(property, value))
  }

  _setClassName(property, value) {
    const key = this._getDeclarationKey(property, value)
    const exists = !!this._classNames[key]
    if (!exists) {
      this._counter += 1
      if (this._options.obfuscateClassNames) {
        this._classNames[key] = `_s_${this._counter}`
      } else {
        const val = `${value}`.replace(/\s/g, '-')
        this._classNames[key] = `${property}:${val}`
      }
    }
  }
}
