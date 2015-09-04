import { pickProps } from '../filterObjectProps'
import { WebStyleComponent } from '../react-native-web-style'
import ImageStylePropTypes, { ImageDefaultStyle } from './ImageStylePropTypes'
import React, { PropTypes } from 'react'

class Image extends React.Component {
  static propTypes = {
    accessibilityLabel: PropTypes.string,
    className: PropTypes.string,
    source: PropTypes.object,
    style: PropTypes.shape(ImageStylePropTypes)
  }

  static defaultProps = {
    className: '',
    source: 'data:image/gif;base64,' +
        'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }

  render() {
    const { accessibilityLabel, className, source, style, ...other } = this.props
    const filteredStyle = pickProps(style, Object.keys(ImageStylePropTypes))
    const mergedStyle = { ...ImageDefaultStyle, ...filteredStyle }

    return (
      <WebStyleComponent
        {...other}
        alt={accessibilityLabel}
        className={`Image ${className}`}
        component='img'
        src={source.uri}
        style={mergedStyle}
      />
    )
  }
}

export default Image
