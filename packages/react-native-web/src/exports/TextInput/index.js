/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { TextInputProps } from './types';

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import createElement from '../createElement';
import css from '../StyleSheet/css';
import filterSupportedProps from '../View/filterSupportedProps';
import findNodeHandle from '../findNodeHandle';
import React from 'react';
import StyleSheet from '../StyleSheet';
import TextInputState from '../../modules/TextInputState';

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
  if (node != null && selection != null) {
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
    if (node != null && selection != null && isSelectionStale(node, selection)) {
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

class TextInput extends React.Component<TextInputProps> {
  _node: HTMLInputElement;
  _nodeHeight: number;
  _nodeWidth: number;

  static displayName = 'TextInput';

  static State = TextInputState;

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
      autoCapitalize = 'sentences',
      autoComplete,
      autoCompleteType,
      autoCorrect = true,
      autoFocus,
      defaultValue,
      disabled,
      editable = true,
      keyboardType = 'default',
      maxLength,
      multiline = false,
      numberOfLines = 1,
      placeholder,
      placeholderTextColor,
      returnKeyType,
      secureTextEntry = false,
      spellCheck,
      style,
      value
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
    const supportedProps = filterSupportedProps(this.props);

    Object.assign(supportedProps, {
      autoCapitalize,
      autoComplete: autoComplete || autoCompleteType || 'on',
      autoCorrect: autoCorrect ? 'on' : 'off',
      autoFocus,
      classList: [classes.textinput],
      defaultValue,
      dir: 'auto',
      disabled,
      enterkeyhint: returnKeyType,
      maxLength,
      onBlur: normalizeEventHandler(this._handleBlur),
      onChange: normalizeEventHandler(this._handleChange),
      onFocus: normalizeEventHandler(this._handleFocus),
      onKeyDown: this._handleKeyDown,
      onKeyPress: this._handleKeyPress,
      onSelect: normalizeEventHandler(this._handleSelectionChange),
      placeholder,
      readOnly: !editable,
      ref: this._setNode,
      spellCheck: spellCheck != null ? spellCheck : autoCorrect,
      style: StyleSheet.compose(
        style,
        placeholderTextColor && { placeholderTextColor }
      ),
      value
    });

    if (multiline) {
      supportedProps.rows = numberOfLines;
    } else {
      supportedProps.type = type;
    }

    return createElement(component, supportedProps);
  }

  _handleBlur = e => {
    const { onBlur } = this.props;
    TextInputState._currentlyFocusedNode = null;
    if (onBlur) {
      onBlur(e);
    }
  };

  _handleContentSizeChange = () => {
    const { onContentSizeChange, multiline } = this.props;
    if (multiline && onContentSizeChange) {
      const newHeight = this._node.scrollHeight;
      const newWidth = this._node.scrollWidth;
      if (newHeight !== this._nodeHeight || newWidth !== this._nodeWidth) {
        this._nodeHeight = newHeight;
        this._nodeWidth = newWidth;
        onContentSizeChange({
          nativeEvent: {
            contentSize: {
              height: this._nodeHeight,
              width: this._nodeWidth
            }
          }
        });
      }
    }
  };

  _handleChange = e => {
    const { onChange, onChangeText } = this.props;
    const { text } = e.nativeEvent;
    this._handleContentSizeChange();
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

    // Backspace, Escape, Tab, Cmd+Enter, and Arrow keys only fire 'keydown'
    // DOM events
    if (
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowDown' ||
      e.key === 'Backspace' ||
      e.key === 'Escape' ||
      (e.key === 'Enter' && e.metaKey) ||
      e.key === 'Tab'
    ) {
      this._handleKeyPress(e);
    }
  };

  _handleKeyPress = e => {
    const { blurOnSubmit, multiline, onKeyPress, onSubmitEditing } = this.props;
    const blurOnSubmitDefault = !multiline;
    const shouldBlurOnSubmit = blurOnSubmit == null ? blurOnSubmitDefault : blurOnSubmit;

    if (onKeyPress) {
      const keyValue = e.key;

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

    if (!e.isDefaultPrevented() && e.key === 'Enter' && !e.shiftKey) {
      if ((blurOnSubmit || !multiline) && onSubmitEditing) {
        // prevent "Enter" from inserting a newline
        e.preventDefault();
        e.nativeEvent = { target: e.target, text: e.target.value };
        onSubmitEditing(e);
      }
      if (shouldBlurOnSubmit) {
        // $FlowFixMe
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
    if (this._node) {
      this._handleContentSizeChange();
    }
  };
}

const classes = css.create({
  textinput: {
    MozAppearance: 'textfield',
    WebkitAppearance: 'none',
    backgroundColor: 'transparent',
    border: '0 solid black',
    borderRadius: 0,
    boxSizing: 'border-box',
    font: '14px System',
    margin: 0,
    padding: 0,
    resize: 'none'
  }
});

export default applyLayout(applyNativeMethods(TextInput));
