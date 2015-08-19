import { StylePropTypes } from '../react-web-style';
import { ViewStylePropTypes } from '../View/ViewStylePropTypes';

export default {
  ...ViewStylePropTypes,
  ...StylePropTypes.TypographicPropTypes
};

export const TextDefaultStyles = {
  display: 'inline'
}
