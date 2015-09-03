import { StylePropTypes } from '../react-native-web-style'
import { PropTypes } from 'react'

export default {
  ...StylePropTypes.BorderThemePropTypes,
  ...StylePropTypes.LayoutPropTypes,
  backgroundColor: PropTypes.string,
  boxShadow: PropTypes.string,
  opacity: PropTypes.number,
  transform: PropTypes.string
}

export const ImageDefaultStyles = {
  backgroundColor: 'lightGray',
  borderWidth: 0,
  maxWidth: '100%'
}
