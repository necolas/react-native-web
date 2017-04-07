import { PropTypes } from 'react';

const { number, oneOfType, string, shape } = PropTypes;
const numberOrString = oneOfType([ number, string ]);

const ShadowPropTypes = process.env.NODE_ENV !== 'production' ? {
  shadowColor: string,
  shadowOffset: shape({
    width: numberOrString,
    height: numberOrString
  }),
  shadowOpacity: numberOrString,
  shadowRadius: numberOrString
} : {};

module.exports = ShadowPropTypes;
