import ColorPropType from './ColorPropType';
import { PropTypes } from 'react';

const { number, oneOfType, shape, string } = PropTypes;
const numberOrString = oneOfType([number, string]);

const ShadowPropTypes = {
  shadowColor: ColorPropType,
  shadowOffset: shape({
    width: numberOrString,
    height: numberOrString
  }),
  shadowOpacity: number,
  shadowRadius: numberOrString,
  shadowSpread: numberOrString
};

module.exports = ShadowPropTypes;
