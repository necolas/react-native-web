import { pickProps } from '../filterObjectProps';
import { WebStyleComponent } from '../react-web-style';
import React, { PropTypes } from 'react';
import TextInputStylePropTypes, { TextInputDefaultStyles } from './TextInputStylePropTypes';

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
        component={multiline ? 'textarea' : 'input'}
        disabled={!editable}
        placeholder={placeholder}
        style={mergedStyle}
      />
    );
  }
}

export default TextInput;
