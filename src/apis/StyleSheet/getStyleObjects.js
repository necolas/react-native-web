import isObject from './isObject'
import isStyleObject from './isStyleObject'

/**
 * Recursively check for objects that are style rules.
 */
const getStyleObjects = (styles: Object): Array => {
  const keys = Object.keys(styles)
  return keys.reduce((rules, key) => {
    const possibleRule = styles[key]
    if (isObject(possibleRule)) {
      if (isStyleObject(possibleRule)) {
        rules.push(possibleRule)
      } else {
        rules = rules.concat(getStyleObjects(possibleRule))
      }
    }
    return rules
  }, [])
}

export default getStyleObjects
