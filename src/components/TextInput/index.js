import applyNativeMethods from '../../modules/applyNativeMethods'
import createReactDOMComponent from '../../modules/createReactDOMComponent'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import StyleSheet from '../../apis/StyleSheet'
import Text from '../Text'
import TextareaAutosize from 'react-textarea-autosize'
import TextInputState from './TextInputState'
import UIManager from '../../apis/UIManager'
import View from '../View'
import ViewStylePropTypes from '../View/ViewStylePropTypes'

const viewStyleProps = Object.keys(ViewStylePropTypes)

class TextInput extends Component {
  static propTypes = {
    ...View.propTypes,
    autoComplete: PropTypes.bool,
    autoFocus: PropTypes.bool,
    clearTextOnFocus: PropTypes.bool,
    defaultValue: PropTypes.string,
    editable: PropTypes.bool,
    keyboardType: PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad', 'search', 'url', 'web-search']),
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
    style: Text.propTypes.style,
    testID: Text.propTypes.testID,
    value: PropTypes.string
  };

  static defaultProps = {
    editable: true,
    keyboardType: 'default',
    multiline: false,
    numberOfLines: 2,
    secureTextEntry: false,
    style: {}
  };

  constructor(props, context) {
    super(props, context)
    this.state = { showPlaceholder: !props.value && !props.defaultValue }
  }

  blur() {
    TextInputState.blurTextInput(ReactDOM.findDOMNode(this.refs.input))
  }

  clear() {
    this.setNativeProps({ text: '' })
  }

  focus() {
    TextInputState.focusTextInput(ReactDOM.findDOMNode(this.refs.input))
  }

  setNativeProps(props) {
    UIManager.updateView(this.refs.input, props, this)
  }

  render() {
    const {
      accessibilityLabel, // eslint-disable-line
      autoComplete,
      autoFocus,
      defaultValue,
      editable,
      keyboardType,
      maxLength,
      maxNumberOfLines,
      multiline,
      numberOfLines,
      onLayout,
      onSelectionChange,
      placeholder,
      placeholderTextColor,
      secureTextEntry,
      style,
      testID,
      value
    } = this.props

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
      case 'search':
      case 'web-search':
        type = 'search'
        break
      case 'url':
        type = 'url'
        break
    }

    if (secureTextEntry) {
      type = 'password'
    }

    // In order to support 'Text' styles on 'TextInput', we split the 'Text'
    // and 'View' styles and apply them to the 'Text' and 'View' components
    // used in the implementation
    const flattenedStyle = StyleSheet.flatten(style)
    const rootStyles = pick(flattenedStyle, viewStyleProps)
    const textStyles = omit(flattenedStyle, viewStyleProps)

    const propsCommon = {
      autoComplete: autoComplete && 'on',
      autoFocus,
      defaultValue,
      maxLength,
      onBlur: this._handleBlur,
      onChange: this._handleChange,
      onFocus: this._handleFocus,
      onSelect: onSelectionChange && this._handleSelectionChange,
      readOnly: !editable,
      style: [ styles.input, textStyles, { outline: style.outline } ],
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

    const props = multiline ? propsMultiline : propsSingleline

    const optionalPlaceholder = placeholder && this.state.showPlaceholder && (
      <View pointerEvents='none' style={styles.placeholder}>
        <Text
          children={placeholder}
          style={[
            styles.placeholderText,
            textStyles,
            placeholderTextColor && { color: placeholderTextColor }
          ]}
        />
      </View>
    )

    return (
      <View
        accessibilityLabel={accessibilityLabel}
        onClick={this._handleClick}
        onLayout={onLayout}
        style={[ styles.initial, rootStyles ]}
        testID={testID}
      >
        <View style={styles.wrapper}>
          {createReactDOMComponent({ ...props, ref: 'input' })}
          {optionalPlaceholder}
        </View>
      </View>
    )
  }

  _handleBlur = (e) => {
    const { onBlur } = this.props
    const text = e.target.value
    this.setState({ showPlaceholder: text === '' })
    this.blur()
    if (onBlur) onBlur(e)
  }

  _handleChange = (e) => {
    const { onChange, onChangeText } = this.props
    const text = e.target.value
    this.setState({ showPlaceholder: text === '' })
    if (onChange) onChange(e)
    if (onChangeText) onChangeText(text)
    if (!this.refs.input) {
      // calling `this.props.onChange` or `this.props.onChangeText`
      // may clean up the input itself. Exits here.
      return
    }
  }

  _handleClick = (e) => {
    this.focus()
  }

  _handleFocus = (e) => {
    const { clearTextOnFocus, onFocus, selectTextOnFocus } = this.props
    const node = ReactDOM.findDOMNode(this.refs.input)
    const text = e.target.value
    if (onFocus) onFocus(e)
    if (clearTextOnFocus) this.clear()
    if (selectTextOnFocus) node.select()
    this.setState({ showPlaceholder: text === '' })
  }

  _handleSelectionChange = (e) => {
    const { onSelectionChange } = this.props
    try {
      const { selectionDirection, selectionEnd, selectionStart } = e.target
      const event = {
        selectionDirection,
        selectionEnd,
        selectionStart,
        nativeEvent: e.nativeEvent
      }
      if (onSelectionChange) onSelectionChange(event)
    } catch (e) {}
  }
}

applyNativeMethods(TextInput)

const styles = StyleSheet.create({
  initial: {
    borderColor: 'black'
  },
  wrapper: {
    flex: 1
  },
  input: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderWidth: 0,
    boxSizing: 'border-box',
    color: 'inherit',
    flex: 1,
    font: 'inherit',
    minHeight: '100%', // center small inputs (fix #139)
    padding: 0,
    zIndex: 1
  },
  placeholder: {
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  placeholderText: {
    color: 'darkgray',
    overflow: 'hidden',
    whiteSpace: 'pre'
  }
})

module.exports = TextInput
