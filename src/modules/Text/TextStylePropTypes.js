import { TypographicPropTypes } from '../StylePropTypes';
import { ViewStylePropTypes } from '../View/ViewStylePropTypes';

export default {
  ...ViewStylePropTypes,
  ...TypographicPropTypes
};

export const TextDefaultStyles = {
  display: 'inline'
}
