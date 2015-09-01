import { StylePropTypes } from '../react-native-web-style';
import { ViewStylePropTypes } from '../View/ViewStylePropTypes';

export default {
  ...ViewStylePropTypes,
  ...StylePropTypes.TypographicPropTypes
};

export const TextDefaultStyle = {
  display: 'inline'
}
