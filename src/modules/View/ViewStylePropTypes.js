import { PropTypes } from 'react'
import { StylePropTypes } from '../react-native-web-style'

export default {
  ...StylePropTypes.BackgroundPropTypes,
  ...StylePropTypes.BorderThemePropTypes,
  ...StylePropTypes.LayoutPropTypes,
  boxShadow: PropTypes.string,
  opacity: PropTypes.number,
  transform: PropTypes.string
}

// https://github.com/facebook/css-layout#default-values
export const ViewDefaultStyle = {
  alignItems: 'stretch',
  borderWidth: 0,
  borderStyle: 'solid',
  boxSizing: 'border-box',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: 0,
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'relative'
}
