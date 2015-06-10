import Component from './Component';
import {pickProps} from '../filterObjectProps';
import React, {PropTypes} from 'react';
import StylePropTypes from '../StylePropTypes';

const ImageStyleDefaultProps = {
  backgroundColor: 'lightGray',
  borderWidth: 0,
  maxWidth: '100%'
};

const ImageStylePropTypes = {
  ...StylePropTypes.BorderThemePropTypes,
  ...StylePropTypes.LayoutPropTypes,
  backgroundColor: PropTypes.string,
  opacity: PropTypes.string
};

class Image extends React.Component {
  static _getPropTypes() {
    return {
      alt: PropTypes.string,
      async: PropTypes.bool,
      className: PropTypes.string,
      src: PropTypes.string,
      style: PropTypes.shape(ImageStylePropTypes)
    };
  }

  static _getDefaultProps() {
    return {
      async: true,
      className: '',
      src: 'data:image/gif;base64,' +
          'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      style: {}
    };
  }

  render() {
    const { alt, className, src, style, ...other } = this.props;
    const filteredStyle = pickProps(style, Object.keys(ImageStylePropTypes));
    const mergedStyle = { ...ImageStyleDefaultProps, ...filteredStyle };

    return (
      <Component
        {...other}
        alt={alt}
        className={`Image ${className}`}
        element="img"
        src={src}
        style={mergedStyle}
      />
    );
  }
}

Image.propTypes = Image._getPropTypes();
Image.defaultProps = Image._getDefaultProps();

export default Image;
