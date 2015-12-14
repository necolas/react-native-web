import { pickProps } from '../filterObjectProps'
import isObject from './isObject'
import StylePropTypes from '../StylePropTypes'

const isStyleObject = (obj) => {
  const values = Object.keys(obj).map((key) => obj[key])
  for (let i = 0; i < values.length; i += 1) {
    if (isObject(values[i])) { return false }
  }
  return true
}

export default isStyleObject
