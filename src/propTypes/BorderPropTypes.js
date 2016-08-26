import ColorPropType from './ColorPropType';
import { PropTypes } from 'react';

const numberOrString = PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]);
const BorderStylePropType = PropTypes.oneOf([ 'solid', 'dotted', 'dashed' ]);

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
  borderLeftColor$noI18n: ColorPropType,
  borderRightColor$noI18n: ColorPropType,
  borderTopLeftRadius$noI18n: numberOrString,
  borderTopRightRadius$noI18n: numberOrString,
  borderBottomLeftRadius$noI18n: numberOrString,
  borderBottomRightRadius$noI18n: numberOrString,
  borderLeftStyle$noI18n: BorderStylePropType,
  borderRightStyle$noI18n: BorderStylePropType
};

module.exports = BorderPropTypes;
