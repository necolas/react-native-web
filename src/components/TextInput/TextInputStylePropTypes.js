import TextStylePropTypes from '../Text/TextStylePropTypes';
import { PropTypes } from 'react';

const { oneOf } = PropTypes;

const TextInputOnlyStylePropTypes = {
  /* @platform web */
  resize: oneOf([ 'none', 'vertical', 'horizontal', 'both' ])
};

module.exports = {
  ...TextStylePropTypes,
  ...TextInputOnlyStylePropTypes
};
