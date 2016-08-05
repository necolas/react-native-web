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
  borderLeftStyle: BorderStylePropType,
  /* Props to opt-out of RTL flipping */
  borderLeftColor$noflip: ColorPropType,
  borderRightColor$noflip: ColorPropType,
  borderTopLeftRadius$noflip: numberOrString,
  borderTopRightRadius$noflip: numberOrString,
  borderBottomLeftRadius$noflip: numberOrString,
  borderBottomRightRadius$noflip: numberOrString,
  borderLeftStyle$noflip: BorderStylePropType,
  borderRightStyle$noflip: BorderStylePropType
}

module.exports = BorderPropTypes
