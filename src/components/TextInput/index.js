import { pickProps } from '../../modules/filterObjectProps'
import CoreComponent from '../CoreComponent'
import React, { PropTypes } from 'react'
import TextInputStylePropTypes from './TextInputStylePropTypes'

const textInputStyleKeys = Object.keys(TextInputStylePropTypes)

const styles = {
  initial: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderWidth: '1px',
    color: 'inherit',
    font: 'inherit'
  }
}

class TextInput extends React.Component {
  static propTypes = {
    autoComplete: PropTypes.bool,
    autoFocus: PropTypes.bool,
    defaultValue: PropTypes.string,
    editable: PropTypes.bool,
    keyboardType: PropTypes.oneOf(['default', 'email', 'numeric', 'search', 'tel', 'url']),
    multiline: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    style: PropTypes.shape(TextInputStylePropTypes),
    testID: CoreComponent.propTypes.testID
  }

  static stylePropTypes = TextInputStylePropTypes

  static defaultProps = {
    autoComplete: false,
    autoFocus: false,
    editable: true,
    keyboardType: 'default',
    multiline: false,
    secureTextEntry: false,
    style: styles.initial
  }

  _onBlur(e) {
    if (this.props.onBlur) this.props.onBlur(e)
  }

  _onChange(e) {
    if (this.props.onChangeText) this.props.onChangeText(e.target.value)
    if (this.props.onChange) this.props.onChange(e)
  }

  _onFocus(e) {
    if (this.props.onFocus) this.props.onFocus(e)
  }

  render() {
    const {
      autoComplete,
      autoFocus,
      defaultValue,
      editable,
      keyboardType,
      multiline,
      placeholder,
      secureTextEntry,
      style,
      testID
    } = this.props

    const resolvedStyle = pickProps(style, textInputStyleKeys)
    const type = secureTextEntry && 'password' || (keyboardType === 'default' ? '' : keyboardType)

    return (
      <CoreComponent
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className={'TextInput'}
        component={multiline ? 'textarea' : 'input'}
        defaultValue={defaultValue || placeholder}
        onBlur={this._onBlur.bind(this)}
        onChange={this._onChange.bind(this)}
        onFocus={this._onFocus.bind(this)}
        readOnly={!editable}
        style={{
          ...(styles.initial),
          ...resolvedStyle
        }}
        testID={testID}
        type={multiline ? type : undefined}
      />
    )
  }
}

export default TextInput
