import { PropTypes } from 'react'

const { oneOfType, shape } = PropTypes

/**
 * Styles can be arbitrarily nested arrays, where the innermost values can be
 * anything falsey or an object that matches the propType `type`.
 */
export default (type) => {
  const shapeTypeChecker = shape(type)
  const arrayChecker = (props, propName, componentName) => {
    const prop = props[propName]
    if (!prop) {
      return null
    }
    if (Array.isArray(prop)) {
      for (let i = 0; i < prop.length; i++) {
        const result = arrayChecker(prop, i, componentName)
        if (result != null) {
          return result
        }
      }
      return null
    }
    return shapeTypeChecker(props, propName, componentName)
  }
  return oneOfType([arrayChecker])
}
