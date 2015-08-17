import {
  BorderThemePropTypes,
  LayoutPropTypes
} from '../StylePropTypes';
import { PropTypes } from 'react';

export default {
  ...BorderThemePropTypes,
  ...LayoutPropTypes,
  backgroundColor: PropTypes.string,
  boxShadow: PropTypes.string,
  opacity: PropTypes.number,
  transform: PropTypes.string
};

export const ImageDefaultStyles = {
  backgroundColor: 'lightGray',
  borderWidth: 0,
  maxWidth: '100%'
};
