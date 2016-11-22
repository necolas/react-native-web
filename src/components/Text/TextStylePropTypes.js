import TextPropTypes from '../../propTypes/TextPropTypes';
import ViewStylePropTypes from '../View/ViewStylePropTypes';

module.exports = process.env.NODE_ENV !== 'production' ? {
  ...ViewStylePropTypes,
  ...TextPropTypes
} : {};
