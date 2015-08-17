import { pickProps } from '../filterObjectProps';
import React, { PropTypes } from 'react';
import TextInputStylePropTypes, { TextInputDefaultStyles } from './TextInputStylePropTypes';
import WebStyleComponent from '../WebStyleComponent';

class TextInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    editable: PropTypes.bool,
    multiline: PropTypes.bool,
    placeholder: PropTypes.string,
    style: PropTypes.shape(TextInputStylePropTypes)
  };

  static defaultProps = {
    editable: true,
    multiline: false
  }

  render() {
    const { className, editable, multiline, placeholder, style, ...other } = this.props;
    const filteredStyle = pickProps(style, Object.keys(TextInputStylePropTypes));
    const mergedStyle = { ...TextInputDefaultStyles, ...filteredStyle };

    return (
      <WebStyleComponent
        {...other}
        className={`sdk-TextInput ${className}`}
        disabled={!editable}
        element={multiline ? 'textarea' : 'input'}
        placeholder={placeholder}
        style={mergedStyle}
      />
    );
  }
}

export default TextInput;
