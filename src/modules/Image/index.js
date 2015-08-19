import { pickProps } from '../filterObjectProps';
import { WebStyleComponent } from '../react-web-style';
import ImageStylePropTypes, { ImageDefaultStyles } from './ImageStylePropTypes';
import React, { PropTypes } from 'react';

class Image extends React.Component {
  static propTypes = {
    alt: PropTypes.string,
    async: PropTypes.bool,
    className: PropTypes.string,
    src: PropTypes.string,
    style: PropTypes.shape(ImageStylePropTypes)
  }

  static defaultProps = {
    async: true,
    className: '',
    src: 'data:image/gif;base64,' +
        'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }

  render() {
    const { className, src, style, ...other } = this.props;
    const filteredStyle = pickProps(style, Object.keys(ImageStylePropTypes));
    const mergedStyle = { ...ImageDefaultStyles, ...filteredStyle };

    return (
      <WebStyleComponent
        {...other}
        alt={alt}
        className={`sdk-Image ${className}`}
        component='img'
        style={mergedStyle}
      />
    );
  }
}

export default Image;
