import { pickProps } from '../filterObjectProps'
import { WebStyleComponent } from '../react-native-web-style'
import React, { PropTypes } from 'react'
import ViewStylePropTypes, { ViewDefaultStyle } from './ViewStylePropTypes'

class View extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    pointerEvents: PropTypes.oneOf([
      'auto',
      'box-none',
      'box-only',
      'none'
    ]),
    style: PropTypes.shape(ViewStylePropTypes)
  }

  static defaultProps = {
    className: '',
    component: 'div'
  }

  render() {
    const { className, pointerEvents, style, ...other } = this.props
    const filteredStyle = pickProps(style, Object.keys(ViewStylePropTypes))
    const pointerEventsStyle = pointerEvents && { pointerEvents }
    const mergedStyle = {
      ...ViewDefaultStyle,
      ...filteredStyle,
      ...pointerEventsStyle
    }

    return (
      <WebStyleComponent
        {...other}
        className={`View ${className}`}
        style={mergedStyle}
      />
    )
  }
}

export default View
