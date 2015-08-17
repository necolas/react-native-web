import { PropTypes } from 'react';
import { TypographicPropTypes } from '../StylePropTypes';
import ViewStylePropTypes from '../View/ViewStylePropTypes';

export default {
  ...ViewStylePropTypes,
  ...TypographicPropTypes
};

export const TextInputDefaultStyles = {
  background: 'transparent',
  color: 'inherit',
  font: 'inherit'
};
