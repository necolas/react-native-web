import applyNativeMethods from '../../modules/applyNativeMethods';
import createDOMElement from '../../modules/createDOMElement';
import findNodeHandle from '../../modules/findNodeHandle';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import StyleSheet from '../../apis/StyleSheet';
import Text from '../Text';
import TextareaAutosize from 'react-textarea-autosize';
import TextInputState from './TextInputState';
import UIManager from '../../apis/UIManager';
import View from '../View';
import ViewStylePropTypes from '../View/ViewStylePropTypes';
import React, { Component, PropTypes } from 'react';

const viewStyleProps = Object.keys(ViewStylePropTypes);

/**
 * React Native events differ from W3C events.
 */
const normalizeEventHandler = (handler) => (e) => {
  if (handler) {
    e.nativeEvent.text = e.target.value;
    return handler(e);
  }
};

/**
 * Determins whether a 'selection' prop differs from a node's existing
 * selection state.
 */
const isSelectionStale = (node, selection) => {
  if (node && selection) {
    const { selectionEnd, selectionStart } = node;
    const { start, end } = selection;
    return start !== selectionStart || end !== selectionEnd;
  }
  return false;
};

/**
 * Certain input types do no support 'selectSelectionRange' and will throw an
 * error.
 */
const setSelection = (node, selection) => {
  try {
    if (isSelectionStale(node, selection)) {
      const { start, end } = selection;
      node.setSelectionRange(start, end || start);
    }
  } catch (e) {}
};

class TextInput extends Component {
  static displayName = 'TextInput';

  static propTypes = {
    ...View.propTypes,
    autoCapitalize: PropTypes.oneOf([ 'characters', 'none', 'sentences', 'words' ]),
    autoComplete: PropTypes.string,
    autoCorrect: PropTypes.bool,
    autoFocus: PropTypes.bool,
    blurOnSubmit: PropTypes.bool,
    clearTextOnFocus: PropTypes.bool,
    defaultValue: PropTypes.string,
    editable: PropTypes.bool,
    keyboardType: PropTypes.oneOf([
      'default', 'email-address', 'numeric', 'phone-pad', 'search', 'url', 'web-search'
    ]),
    maxLength: PropTypes.number,
    maxNumberOfLines: PropTypes.number,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func,
    onSelectionChange: PropTypes.func,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    selection: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number
    }),
    selectTextOnFocus: PropTypes.bool,
    style: Text.propTypes.style,
    testID: Text.propTypes.testID,
    value: PropTypes.string
  };

  static defaultProps = {
    autoCapitalize: 'sentences',
    autoComplete: 'on',
    autoCorrect: true,
    editable: true,
    keyboardType: 'default',
    multiline: false,
    numberOfLines: 2,
    secureTextEntry: false,
    style: {}
  };

  constructor(props, context) {
    super(props, context);
    this.state = { showPlaceholder: !props.value && !props.defaultValue };
  }

  blur() {
    TextInputState.blurTextInput(findNodeHandle(this._inputRef));
  }

  clear() {
    this.setNativeProps({ text: '' });
  }

  focus() {
    TextInputState.focusTextInput(findNodeHandle(this._inputRef));
  }

  isFocused() {
    return TextInputState.currentlyFocusedField() === findNodeHandle(this._inputRef);
  }

  setNativeProps(props) {
    UIManager.updateView(this._inputRef, props, this);
  }

  componentDidMount() {
    setSelection(findNodeHandle(this._inputRef), this.props.selection);
  }

  componentDidUpdate() {
    setSelection(findNodeHandle(this._inputRef), this.props.selection);
  }

  render() {
    const {
      accessibilityLabel, // eslint-disable-line
      autoCapitalize,
      autoComplete,
      autoCorrect,
      autoFocus,
      defaultValue,
      editable,
      keyboardType,
      maxLength,
      maxNumberOfLines,
      multiline,
      numberOfLines,
      onLayout,
      placeholder,
      placeholderTextColor,
      secureTextEntry,
      style,
      testID,
      value
    } = this.props;

    let type;

    switch (keyboardType) {
      case 'email-address':
        type = 'email';
        break;
      case 'numeric':
        type = 'number';
        break;
      case 'phone-pad':
        type = 'tel';
        break;
      case 'search':
      case 'web-search':
        type = 'search';
        break;
      case 'url':
        type = 'url';
        break;
      default:
        type = 'text';
    }

    if (secureTextEntry) {
      type = 'password';
    }

    // In order to support 'Text' styles on 'TextInput', we split the 'Text'
    // and 'View' styles and apply them to the 'Text' and 'View' components
    // used in the implementation
    const flattenedStyle = StyleSheet.flatten(style);
    const rootStyles = pick(flattenedStyle, viewStyleProps);
    const textStyles = omit(flattenedStyle, viewStyleProps);

    const props = {
      autoCapitalize,
      autoComplete,
      autoCorrect: autoCorrect ? 'on' : 'off',
      autoFocus,
      defaultValue,
      maxLength,
      onBlur: normalizeEventHandler(this._handleBlur),
      onChange: normalizeEventHandler(this._handleChange),
      onFocus: normalizeEventHandler(this._handleFocus),
      onKeyPress: normalizeEventHandler(this._handleKeyPress),
      onSelect: normalizeEventHandler(this._handleSelectionChange),
      readOnly: !editable,
      ref: this._setInputRef,
      style: [ styles.input, textStyles, { outline: style.outline } ],
      value
    };

    if (multiline) {
      props.maxRows = maxNumberOfLines || numberOfLines;
      props.minRows = numberOfLines;
    } else {
      props.type = type;
    }

    const component = multiline ? TextareaAutosize : 'input';

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
    );

    return (
      <View
        accessibilityLabel={accessibilityLabel}
        onClick={this._handleClick}
        onLayout={onLayout}
        style={[ styles.initial, rootStyles ]}
        testID={testID}
      >
        <View style={styles.wrapper}>
          {createDOMElement(component, props)}
          {optionalPlaceholder}
        </View>
      </View>
    );
  }

  _handleBlur = (e) => {
    const { onBlur } = this.props;
    const { text } = e.nativeEvent;
    this.setState({ showPlaceholder: text === '' });
    if (onBlur) { onBlur(e); }
  }

  _handleChange = (e) => {
    const { onChange, onChangeText } = this.props;
    const { text } = e.nativeEvent;
    this.setState({ showPlaceholder: text === '' });
    if (onChange) { onChange(e); }
    if (onChangeText) { onChangeText(text); }
  }

  _handleClick = (e) => {
    if (this.props.editable) {
      this.focus();
    }
  }

  _handleFocus = (e) => {
    const { clearTextOnFocus, onFocus, selectTextOnFocus } = this.props;
    const { text } = e.nativeEvent;
    const node = findNodeHandle(this._inputRef);
    if (onFocus) { onFocus(e); }
    if (clearTextOnFocus) { this.clear(); }
    if (selectTextOnFocus) { node && node.select(); }
    this.setState({ showPlaceholder: text === '' });
  }

  _handleKeyPress = (e) => {
    const { blurOnSubmit, multiline, onKeyPress, onSubmitEditing } = this.props;
    const blurOnSubmitDefault = !multiline;
    const shouldBlurOnSubmit = blurOnSubmit == null ? blurOnSubmitDefault : blurOnSubmit;
    if (onKeyPress) { onKeyPress(e); }
    if (!e.isDefaultPrevented() && e.which === 13) {
      if (onSubmitEditing) { onSubmitEditing(e); }
      if (shouldBlurOnSubmit) { this.blur(); }
    }
  }

  _handleSelectionChange = (e) => {
    const { onSelectionChange, selection = {} } = this.props;
    if (onSelectionChange) {
      try {
        const node = e.target;
        if (isSelectionStale(node, selection)) {
          const { selectionStart, selectionEnd } = node;
          e.nativeEvent.selection = { start: selectionStart, end: selectionEnd };
          onSelectionChange(e);
        }
      } catch (e) {}
    }
  }

  _setInputRef = (component) => {
    this._inputRef = component;
  }
}

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
    borderRadius: 0,
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
});

module.exports = applyNativeMethods(TextInput);
