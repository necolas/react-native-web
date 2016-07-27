import ColorPropType from './ColorPropType'
import { PropTypes } from 'react'

const { number, oneOf, oneOfType, shape, string } = PropTypes
const numberOrString = oneOfType([ number, string ])

const ShadowOffsetPropType = shape({ width: number, height: number })
const TextAlignPropType = oneOf([ 'center', 'inherit', 'justify', 'justify-all', 'left', 'right' ])
const WritingDirectionPropType = oneOf([ 'auto', 'ltr', 'rtl' ])

const TextPropTypes = {
  // box model
  color: ColorPropType,
  fontFamily: string,
  fontSize: numberOrString,
  fontStyle: string,
  fontWeight: string,
  letterSpacing: numberOrString,
  lineHeight: numberOrString,
  textAlign: TextAlignPropType,
  textAlignVertical: oneOf([ 'auto', 'bottom', 'center', 'top' ]),
  textDecorationLine: string,
  /* @platform web */
  textOverflow: string,
  /* @platform web */
  textRendering: oneOf([ 'auto', 'geometricPrecision', 'optimizeLegibility', 'optimizeSpeed' ]),
  textShadowColor: ColorPropType,
  textShadowOffset: ShadowOffsetPropType,
  textShadowRadius: number,
  /* @platform web */
  textTransform: oneOf([ 'capitalize', 'lowercase', 'none', 'uppercase' ]),
  /* @platform web */
  unicodeBidi: oneOf([ 'normal', 'bidi-override', 'embed', 'isolate', 'isolate-override', 'plaintext' ]),
  /* @platform web */
  whiteSpace: string,
  /* @platform web */
  wordWrap: string,
  writingDirection: WritingDirectionPropType,
  // opt-out of RTL flipping
  textAlign$noI18n: TextAlignPropType,
  textShadowOffset$noI18n: ShadowOffsetPropType,
  writingDirection$noI18n: WritingDirectionPropType
}

module.exports = TextPropTypes
