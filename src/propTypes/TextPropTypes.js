import ColorPropType from './ColorPropType';
import { PropTypes } from 'react';

const { number, oneOf, oneOfType, shape, string } = PropTypes;
const numberOrString = oneOfType([ number, string ]);

const ShadowOffsetPropType = shape({ width: number, height: number });
const TextAlignPropType = oneOf([ 'center', 'inherit', 'justify', 'justify-all', 'left', 'right' ]);
const WritingDirectionPropType = oneOf([ 'auto', 'ltr', 'rtl' ]);

const TextPropTypes = process.env.NODE_ENV !== 'production' ? {
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
  textShadowColor: ColorPropType,
  textShadowOffset: ShadowOffsetPropType,
  textShadowRadius: number,
  writingDirection: WritingDirectionPropType,
  /* @platform web */
  textOverflow: string,
  textRendering: oneOf([ 'auto', 'geometricPrecision', 'optimizeLegibility', 'optimizeSpeed' ]),
  textTransform: oneOf([ 'capitalize', 'lowercase', 'none', 'uppercase' ]),
  unicodeBidi: oneOf([ 'normal', 'bidi-override', 'embed', 'isolate', 'isolate-override', 'plaintext' ]),
  whiteSpace: string,
  wordWrap: string,
  MozOsxFontSmoothing: string,
  WebkitFontSmoothing: string,
  // opt-out of RTL flipping
  textAlign$noI18n: TextAlignPropType,
  textShadowOffset$noI18n: ShadowOffsetPropType,
  writingDirection$noI18n: WritingDirectionPropType
} : {};

module.exports = TextPropTypes;
