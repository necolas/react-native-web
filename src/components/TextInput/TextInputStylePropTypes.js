import TextStylePropTypes from '../Text/TextStylePropTypes';
import { oneOf } from 'prop-types';

const TextInputOnlyStylePropTypes = {
  /* @platform web */
  resize: oneOf(['none', 'vertical', 'horizontal', 'both'])
};

module.exports = {
  ...TextStylePropTypes,
  ...TextInputOnlyStylePropTypes
};
