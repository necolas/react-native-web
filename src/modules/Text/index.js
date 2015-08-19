import { pickProps } from '../filterObjectProps';
import { WebStyleComponent } from '../react-web-style';
import React, { PropTypes } from 'react';
import TextStylePropTypes, { TextDefaultStyle } from './TextStylePropTypes';

class Text extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    style: PropTypes.shape(TextStylePropTypes)
  }

  static defaultProps = {
    className: '',
    component: 'div'
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
