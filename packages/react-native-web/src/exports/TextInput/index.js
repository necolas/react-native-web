/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { Component } from 'react';
import ColorPropType from '../ColorPropType';
import createElement from '../createElement';
import findNodeHandle from '../findNodeHandle';
import StyleSheet from '../StyleSheet';
import StyleSheetPropType from '../../modules/StyleSheetPropType';
import TextInputStylePropTypes from './TextInputStylePropTypes';
import TextInputState from '../../modules/TextInputState';
import ViewPropTypes from '../ViewPropTypes';
import { any, bool, func, number, oneOf, shape, string } from 'prop-types';

const isAndroid = canUseDOM && /Android/i.test(navigator && navigator.userAgent);
const emptyObject = {};

/**
 * React Native events differ from W3C events.
 */
const normalizeEventHandler = handler => e => {
  if (handler) {
    e.nativeEvent.text = e.target.value;
    return handler(e);
  }
};

/**
 * Determines whether a 'selection' prop differs from a node's existing
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
      // workaround for Blink on Android: see https://github.com/text-mask/text-mask/issues/300
      if (isAndroid) {
        setTimeout(() => node.setSelectionRange(start, end || start), 10);
      } else {
        node.setSelectionRange(start, end || start);
      }
    }
  } catch (e) {}
};

class TextInput extends Component<*> {
  _node: HTMLInputElement;

  static displayName = 'TextInput';

  static propTypes = {
    ...ViewPropTypes,
    autoCapitalize: oneOf(['characters', 'none', 'sentences', 'words']),
    autoComplete: string,
    autoCorrect: bool,
    autoFocus: bool,
    blurOnSubmit: bool,
    clearTextOnFocus: bool,
    defaultValue: string,
    editable: bool,
    keyboardType: oneOf([
      'default',
      'email-address',
      'number-pad',
      'numbers-and-punctuation',
      'numeric',
      'phone-pad',
      'search',
      'url',
      'web-search'
    ]),
    maxLength: number,
    multiline: bool,
    numberOfLines: number,
    onBlur: func,
    onChange: func,
    onChangeText: func,
    onFocus: func,
    onKeyPress: func,
    onSelectionChange: func,
    onSubmitEditing: func,
    placeholder: string,
    placeholderTextColor: ColorPropType,
    secureTextEntry: bool,
    selectTextOnFocus: bool,
    selection: shape({
      start: number.isRequired,
      end: number
    }),
    spellCheck: bool,
    style: StyleSheetPropType(TextInputStylePropTypes),
    value: string,
    /* react-native compat */
    /* eslint-disable */
    caretHidden: bool,
    clearButtonMode: string,
    dataDetectorTypes: string,
    disableFullscreenUI: bool,
    enablesReturnKeyAutomatically: bool,
    keyboardAppearance: string,
    inlineImageLeft: string,
    inlineImagePadding: number,
    onContentSizeChange: func,
    onEndEditing: func,
    onScroll: func,
    returnKeyLabel: string,
    returnKeyType: string,
    selectionColor: ColorPropType,
    selectionState: any,
    textBreakStrategy: string,
    underlineColorAndroid: ColorPropType
    /* eslint-enable */
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
    style: emptyObject
  };

  static State = TextInputState;

  blur: Function;

  clear() {
    this._node.value = '';
  }

  isFocused() {
    return TextInputState.currentlyFocusedField() === this._node;
  }

  componentDidMount() {
    setSelection(this._node, this.props.selection);
    if (document.activeElement === this._node) {
      TextInputState._currentlyFocusedNode = this._node;
    }
  }

  componentDidUpdate() {
    setSelection(this._node, this.props.selection);
  }

  render() {
    const {
      autoCorrect,
      editable,
      keyboardType,
      multiline,
      numberOfLines,
      secureTextEntry,
      style,
      /* eslint-disable */
      blurOnSubmit,
      clearTextOnFocus,
      onChangeText,
      onLayout,
      onSelectionChange,
      onSubmitEditing,
      selection,
      selectTextOnFocus,
      spellCheck,
      /* react-native compat */
      caretHidden,
      clearButtonMode,
      dataDetectorTypes,
      disableFullscreenUI,
      enablesReturnKeyAutomatically,
      inlineImageLeft,
      inlineImagePadding,
      keyboardAppearance,
      onContentSizeChange,
      onEndEditing,
      onScroll,
      returnKeyLabel,
      returnKeyType,
      selectionColor,
      selectionState,
      textBreakStrategy,
      underlineColorAndroid,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    let type;

    switch (keyboardType) {
      case 'email-address':
        type = 'email';
        break;
      case 'number-pad':
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

    const component = multiline ? 'textarea' : 'input';

    Object.assign(otherProps, {
      autoCorrect: autoCorrect ? 'on' : 'off',
      dir: 'auto',
      onBlur: normalizeEventHandler(this._handleBlur),
      onChange: normalizeEventHandler(this._handleChange),
      onFocus: normalizeEventHandler(this._handleFocus),
      onKeyDown: this._handleKeyDown,
      onKeyPress: this._handleKeyPress,
      onSelect: normalizeEventHandler(this._handleSelectionChange),
      readOnly: !editable,
      ref: this._setNode,
      spellCheck: spellCheck != null ? spellCheck : autoCorrect,
      style: [styles.initial, style]
    });

    if (multiline) {
      otherProps.rows = numberOfLines;
    } else {
      otherProps.type = type;
    }

    return createElement(component, otherProps);
  }

  _handleBlur = e => {
    const { onBlur } = this.props;
    TextInputState._currentlyFocusedNode = null;
    if (onBlur) {
      onBlur(e);
    }
  };

  _handleChange = e => {
    const { onChange, onChangeText } = this.props;
    const { text } = e.nativeEvent;
    if (onChange) {
      onChange(e);
    }
    if (onChangeText) {
      onChangeText(text);
    }
    this._handleSelectionChange(e);
  };

  _handleFocus = e => {
    const { clearTextOnFocus, onFocus, selectTextOnFocus } = this.props;
    const node = this._node;
    TextInputState._currentlyFocusedNode = this._node;
    if (onFocus) {
      onFocus(e);
    }
    if (clearTextOnFocus) {
      this.clear();
    }
    if (selectTextOnFocus) {
      node && node.select();
    }
  };

  _handleKeyDown = e => {
    // Prevent key events bubbling (see #612)
    e.stopPropagation();

    // Backspace, Tab, Cmd+Enter, and Arrow keys only fire 'keydown' DOM events
    if (
      e.which === 8 ||
      e.which === 9 ||
      (e.which === 13 && e.metaKey) ||
      e.which === 37 ||
      e.which === 38 ||
      e.which === 39 ||
      e.which === 40
    ) {
      this._handleKeyPress(e);
    }
  };

  _handleKeyPress = e => {
    const { blurOnSubmit, multiline, onKeyPress, onSubmitEditing } = this.props;
    const blurOnSubmitDefault = !multiline;
    const shouldBlurOnSubmit = blurOnSubmit == null ? blurOnSubmitDefault : blurOnSubmit;

    if (onKeyPress) {
      let keyValue;
      switch (e.which) {
        case 8:
          keyValue = 'Backspace';
          break;
        case 9:
          keyValue = 'Tab';
          break;
        case 13:
          keyValue = 'Enter';
          break;
        case 32:
          keyValue = ' ';
          break;
        case 37:
          keyValue = 'ArrowLeft';
          break;
        case 38:
          keyValue = 'ArrowUp';
          break;
        case 39:
          keyValue = 'ArrowRight';
          break;
        case 40:
          keyValue = 'ArrowDown';
          break;
        default: {
          // Trim to only care about the keys that have a textual representation
          if (e.shiftKey) {
            keyValue = String.fromCharCode(e.which).trim();
          } else {
            keyValue = String.fromCharCode(e.which)
              .toLowerCase()
              .trim();
          }
        }
      }

      if (keyValue) {
        e.nativeEvent = {
          altKey: e.altKey,
          ctrlKey: e.ctrlKey,
          key: keyValue,
          metaKey: e.metaKey,
          shiftKey: e.shiftKey,
          target: e.target
        };
        onKeyPress(e);
      }
    }

    if (!e.isDefaultPrevented() && e.which === 13 && !e.shiftKey) {
      if ((blurOnSubmit || !multiline) && onSubmitEditing) {
        // prevent "Enter" from inserting a newline
        e.preventDefault();
        e.nativeEvent = { target: e.target, text: e.target.value };
        onSubmitEditing(e);
      }
      if (shouldBlurOnSubmit) {
        this.blur();
      }
    }
  };

  _handleSelectionChange = e => {
    const { onSelectionChange, selection = emptyObject } = this.props;
    if (onSelectionChange) {
      try {
        const node = e.target;
        if (isSelectionStale(node, selection)) {
          const { selectionStart, selectionEnd } = node;
          e.nativeEvent.selection = {
            start: selectionStart,
            end: selectionEnd
          };
          onSelectionChange(e);
        }
      } catch (e) {}
    }
  };

  _setNode = component => {
    this._node = findNodeHandle(component);
  };
}

const styles = StyleSheet.create({
  initial: {
    MozAppearance: 'textfield',
    WebkitAppearance: 'none',
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderRadius: 0,
    borderStyle: 'solid',
    borderWidth: 0,
    boxSizing: 'border-box',
    fontFamily: 'System',
    fontSize: 14,
    padding: 0,
    resize: 'none'
  }
});

export default applyLayout(applyNativeMethods(TextInput));
