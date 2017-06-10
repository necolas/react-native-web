/**
 * @flow
 */

import TextStylePropTypes from '../Text/TextStylePropTypes';
import { oneOf } from 'prop-types';

const TextInputStylePropTypes = {
  ...TextStylePropTypes,
  /* @platform web */
  resize: oneOf(['none', 'vertical', 'horizontal', 'both'])
};

export default TextInputStylePropTypes;
