import { PropTypes } from 'react'
import ColorPropType from './ColorPropType'

const numberOrString = PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
const BorderStylePropType = PropTypes.oneOf([ 'solid', 'dotted', 'dashed' ])

const BorderPropTypes = {
  borderColor: ColorPropType,
  borderTopColor: ColorPropType,
  borderRightColor: ColorPropType,
  borderBottomColor: ColorPropType,
  borderLeftColor: ColorPropType,
  borderRadius: numberOrString,
  borderTopLeftRadius: numberOrString,
  borderTopRightRadius: numberOrString,
  borderBottomLeftRadius: numberOrString,
  borderBottomRightRadius: numberOrString,
  borderStyle: BorderStylePropType,
  borderTopStyle: BorderStylePropType,
  borderRightStyle: BorderStylePropType,
  borderBottomStyle: BorderStylePropType,
  borderLeftStyle: BorderStylePropType
}

module.exports = BorderPropTypes
