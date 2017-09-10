/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule TextInput
 * @flow
 */

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { Component } from 'react';
import ColorPropType from '../../propTypes/ColorPropType';
import createElement from '../../modules/createElement';
import findNodeHandle from '../../modules/findNodeHandle';
import StyleSheet from '../../apis/StyleSheet';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import TextInputStylePropTypes from './TextInputStylePropTypes';
import TextInputState from './TextInputState';
import ViewPropTypes from '../View/ViewPropTypes';
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

class TextInput extends Component {
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
    secureTextEntry: bool,
    selectTextOnFocus: bool,
    selection: shape({
      start: number.isRequired,
      end: number
    }),
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
    placeholderTextColor: ColorPropType,
    returnKeyLabel: string,
    returnKeyType: string,
    selectionColor: ColorPropType,
    selectionState: any,
    spellCheck: bool,
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

  blur() {
    TextInputState.blurTextInput(this._node);
  }

  clear() {
    this._node.value = '';
  }

  focus() {
    TextInputState.focusTextInput(this._node);
  }

  isFocused() {
    return TextInputState.currentlyFocusedField() === this._node;
  }

  componentDidMount() {
    setSelection(this._node, this.props.selection);
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
      onSelectionChange,
      onSubmitEditing,
      selection,
      selectTextOnFocus,
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
      placeholderTextColor,
      returnKeyLabel,
      returnKeyType,
      selectionColor,
      selectionState,
      spellCheck,
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
  };

  _handleFocus = e => {
    const { clearTextOnFocus, onFocus, selectTextOnFocus } = this.props;
    const node = this._node;
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
    // prevent key events bubbling (see #612)
    e.stopPropagation();

    // Backspace, Tab, and Cmd+Enter only fire 'keydown' DOM events
    if (e.which === 8 || e.which === 9 || (e.which === 13 && e.metaKey)) {
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
        // backspace
        case 8:
          keyValue = 'Backspace';
          break;
        // tab
        case 9:
          keyValue = 'Tab';
          break;
        // enter
        case 13:
          keyValue = 'Enter';
          break;
        // spacebar
        case 32:
          keyValue = ' ';
          break;
        default: {
          // we trim to only care about the keys that has a textual representation
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
    appearance: 'none',
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderRadius: 0,
    borderWidth: 0,
    boxSizing: 'border-box',
    color: 'inherit',
    font: 'inherit',
    padding: 0,
    resize: 'none'
  }
});

export default applyLayout(applyNativeMethods(TextInput));
