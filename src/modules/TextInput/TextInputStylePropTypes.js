import { StylePropTypes } from '../react-native-web-style'
import ViewStylePropTypes from '../View/ViewStylePropTypes'

export default {
  ...ViewStylePropTypes,
  ...StylePropTypes.TypographicPropTypes
}

export const TextInputDefaultStyles = {
  background: 'transparent',
  color: 'inherit',
  font: 'inherit'
}
