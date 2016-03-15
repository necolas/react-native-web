import { PropTypes } from 'react'
import ColorPropType from '../../apis/StyleSheet/ColorPropType'
import ViewStylePropTypes from '../View/ViewStylePropTypes'

const { number, oneOf, oneOfType, string } = PropTypes
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
  /**
   * @platform web
   */
  textDecoration: string,
  textOverflow: string,
  textShadow: string,
  textTransform: oneOf([ 'capitalize', 'lowercase', 'none', 'uppercase' ]),
  whiteSpace: string,
  wordWrap: string,
  writingDirection: string
}
