import { pickProps } from '../../modules/filterObjectProps'
import CoreComponent from '../CoreComponent'
import React, { PropTypes } from 'react'
import StyleSheet from '../../modules/StyleSheet'
import TextareaAutosize from 'react-textarea-autosize'
import TextInputStylePropTypes from './TextInputStylePropTypes'

const textInputStyleKeys = Object.keys(TextInputStylePropTypes)

const styles = StyleSheet.create({
  initial: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: '1px',
    boxSizing: 'border-box',
    color: 'inherit',
    font: 'inherit',
    padding: 0
  }
})

class TextInput extends React.Component {
  static propTypes = {
    accessibilityLabel: PropTypes.string,
    autoComplete: PropTypes.bool,
    autoFocus: PropTypes.bool,
    clearTextOnFocus: PropTypes.bool,
    defaultValue: PropTypes.string,
    editable: PropTypes.bool,
    keyboardType: PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad', 'url']),
    maxLength: PropTypes.number,
    maxNumberOfLines: PropTypes.number,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
    onSelectionChange: PropTypes.func,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    selectTextOnFocus: PropTypes.bool,
    style: PropTypes.shape(TextInputStylePropTypes),
    testID: CoreComponent.propTypes.testID,
    value: PropTypes.string
  }

  static stylePropTypes = TextInputStylePropTypes

  static defaultProps = {
    editable: true,
    keyboardType: 'default',
    multiline: false,
    numberOfLines: 2,
    secureTextEntry: false,
    style: styles.initial
  }

  _onBlur(e) {
    const { onBlur } = this.props
    if (onBlur) onBlur(e)
  }

  _onChange(e) {
    const { onChange, onChangeText } = this.props
    if (onChangeText) onChangeText(e.target.value)
    if (onChange) onChange(e)
  }

  _onFocus(e) {
    const { clearTextOnFocus, onFocus, selectTextOnFocus } = this.props
    const node = React.findDOMNode(this)
    if (clearTextOnFocus) node.value = ''
    if (selectTextOnFocus) node.select()
    if (onFocus) onFocus(e)
  }

  _onSelectionChange(e) {
    const { onSelectionChange } = this.props
    const { selectionDirection, selectionEnd, selectionStart } = e.target
    const event = {
      selectionDirection,
      selectionEnd,
      selectionStart,
      nativeEvent: e.nativeEvent
    }
    if (onSelectionChange) onSelectionChange(event)
  }

  render() {
    const {
      accessibilityLabel,
      autoComplete,
      autoFocus,
      defaultValue,
      editable,
      keyboardType,
      maxLength,
      maxNumberOfLines,
      multiline,
      numberOfLines,
      onBlur,
      onChange,
      onChangeText,
      onSelectionChange,
      placeholder,
      secureTextEntry,
      style,
      testID,
      value
    } = this.props

    const resolvedStyle = pickProps(style, textInputStyleKeys)
    let type

    switch (keyboardType) {
      case 'email-address':
        type = 'email'
        break
      case 'numeric':
        type = 'number'
        break
      case 'phone-pad':
        type = 'tel'
        break
      case 'url':
        type = 'url'
        break
    }

    if (secureTextEntry) {
      type = 'password'
    }

    const propsCommon = {
      'aria-label': accessibilityLabel,
      autoComplete: autoComplete && 'on',
      autoFocus,
      className: 'TextInput',
      defaultValue,
      maxLength,
      onBlur: onBlur && this._onBlur.bind(this),
      onChange: (onChange || onChangeText) && this._onChange.bind(this),
      onFocus: this._onFocus.bind(this),
      onSelect: onSelectionChange && this._onSelectionChange.bind(this),
      placeholder,
      readOnly: !editable,
      style: {
        ...styles.initial,
        ...resolvedStyle
      },
      testID,
      value
    }

    const propsMultiline = {
      ...propsCommon,
      component: TextareaAutosize,
      maxRows: maxNumberOfLines || numberOfLines,
      minRows: numberOfLines
    }

    const propsSingleline = {
      ...propsCommon,
      component: 'input',
      type
    }

    return (multiline
      ? <CoreComponent {...propsMultiline} />
      : <CoreComponent {...propsSingleline} />
    )
  }
}

export default TextInput
