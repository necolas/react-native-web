import { pickProps } from '../filterObjectProps'
import StylePropTypes from '../StylePropTypes'

const isStyleObject = (obj) => {
  const declarations = pickProps(obj, Object.keys(StylePropTypes))
  return Object.keys(declarations).length > 0
}

export default isStyleObject
