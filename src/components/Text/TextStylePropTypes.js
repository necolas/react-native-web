import { PropTypes } from 'react'
import ColorPropType from '../../propTypes/ColorPropType'
import ViewStylePropTypes from '../View/ViewStylePropTypes'

const { number, oneOf, oneOfType, shape, string } = PropTypes
const numberOrString = oneOfType([ number, string ])

module.exports = {
  ...ViewStylePropTypes,
  color: ColorPropType,
  fontFamily: string,
  fontSize: numberOrString,
  fontStyle: string,
  fontWeight: string,
  letterSpacing: numberOrString,
  lineHeight: numberOrString,
  textAlign: oneOf([ 'center', 'inherit', 'justify', 'justify-all', 'left', 'right' ]),
  textAlignVertical: oneOf([ 'auto', 'bottom', 'center', 'top' ]),
  textDecorationLine: string,
  /* @platform web */
  textOverflow: string,
  textShadowColor: ColorPropType,
  textShadowOffset: shape({ width: number, height: number }),
  textShadowRadius: number,
  /* @platform web */
  textTransform: oneOf([ 'capitalize', 'lowercase', 'none', 'uppercase' ]),
  /* @platform web */
  whiteSpace: string,
  /* @platform web */
  wordWrap: string,
  writingDirection: oneOf([ 'auto', 'ltr', 'rtl' ])
}
