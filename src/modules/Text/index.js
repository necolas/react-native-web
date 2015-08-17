import { pickProps } from '../filterObjectProps';
import React, { PropTypes } from 'react';
import TextStylePropTypes, { TextDefaultStyle } from './TextStylePropTypes';
import WebStyleComponent from '../WebStyleComponent';

class Text extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    element: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    style: PropTypes.shape(TextStylePropTypes)
  }

  static defaultProps = {
    className: '',
    element: 'div'
  }

  render() {
    const { className, style, ...other } = this.props;
    const filteredStyle = pickProps(style, Object.keys(TextStylePropTypes));
    const mergedStyle = { ...TextDefaultStyle, ...filteredStyle };

    return (
      <WebStyleComponent
        {...other}
        className={`sdk-Text ${className}`}
        style={mergedStyle}
      />
    );
  }
}

export default Text;
