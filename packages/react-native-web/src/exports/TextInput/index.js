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

import createElement from '../createElement';
import css from '../StyleSheet/css';
import filterSupportedProps from '../View/filterSupportedProps';
import setAndForwardRef from '../../modules/setAndForwardRef';
import useElementLayout from '../../hooks/useElementLayout';
import usePlatformMethods from '../../hooks/usePlatformMethods';
import { forwardRef, useEffect, useRef } from 'react';
import StyleSheet from '../StyleSheet';
import TextInputState from '../../modules/TextInputState';

const emptyObject = {};

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
  if (node != null && selection != null && isSelectionStale(node, selection)) {
    const { start, end } = selection;
    try {
      node.setSelectionRange(start, end || start);
    } catch (e) {}
  }
};

const TextInput = forwardRef<TextInputProps, *>((props, ref) => {
  const {
    autoCapitalize = 'sentences',
    autoComplete,
    autoCompleteType,
    autoCorrect = true,
    autoFocus,
    blurOnSubmit,
    clearTextOnFocus,
    defaultValue,
    disabled,
    editable = true,
    keyboardType = 'default',
    maxLength,
    multiline = false,
    numberOfLines = 1,
    onBlur,
    onChange,
    onChangeText,
    onContentSizeChange,
    onFocus,
    onKeyPress,
    onLayout,
    onSelectionChange,
    onSubmitEditing,
    placeholder,
    placeholderTextColor,
    returnKeyType,
    secureTextEntry = false,
    selection = emptyObject,
    selectTextOnFocus,
    spellCheck,
    value
  } = props;

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

  const hostRef = useRef(null);
  const dimensions = useRef({ height: null, width: null });
  const setRef = setAndForwardRef({
    getForwardedRef: () => ref,
    setLocalRef: c => {
      hostRef.current = c;
      if (hostRef.current != null) {
        handleContentSizeChange();
      }
    }
  });

  const component = multiline ? 'textarea' : 'input';
  const supportedProps = filterSupportedProps(props);
  const classList = [classes.textinput];
  const style = StyleSheet.compose(
    props.style,
    placeholderTextColor && { placeholderTextColor }
  );

  function handleBlur(e) {
    TextInputState._currentlyFocusedNode = null;
    if (onBlur) {
      e.nativeEvent.text = e.target.value;
      onBlur(e);
    }
  }

  function handleContentSizeChange() {
    const node = hostRef.current;
    if (multiline && onContentSizeChange && node != null) {
      const newHeight = node.scrollHeight;
      const newWidth = node.scrollWidth;
      if (newHeight !== dimensions.current.height || newWidth !== dimensions.current.width) {
        dimensions.current.height = newHeight;
        dimensions.current.width = newWidth;
        onContentSizeChange({
          nativeEvent: {
            contentSize: {
              height: dimensions.current.height,
              width: dimensions.current.width
            }
          }
        });
      }
    }
  }

  function handleChange(e) {
    const { text } = e.nativeEvent;
    e.nativeEvent.text = text;
    handleContentSizeChange();
    if (onChange) {
      onChange(e);
    }
    if (onChangeText) {
      onChangeText(text);
    }
    handleSelectionChange(e);
  }

  function handleFocus(e) {
    const node = hostRef.current;
    if (node != null) {
      TextInputState._currentlyFocusedNode = node;
      if (onFocus) {
        e.nativeEvent.text = e.target.value;
        onFocus(e);
      }
      if (clearTextOnFocus) {
        node.value = '';
      }
      if (selectTextOnFocus) {
        node.select();
      }
    }
  }

  function handleKeyDown(e) {
    // Prevent key events bubbling (see #612)
    e.stopPropagation();

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
        hostRef.current.blur();
      }
    }
  }

  function handleSelectionChange(e) {
    if (onSelectionChange) {
      try {
        const node = e.target;
        if (isSelectionStale(node, selection)) {
          const { selectionStart, selectionEnd } = node;
          e.nativeEvent.selection = {
            start: selectionStart,
            end: selectionEnd
          };
          e.nativeEvent.text = e.target.value;
          onSelectionChange(e);
        }
      } catch (e) {}
    }
  }

  useEffect(() => {
    setSelection(hostRef.current, selection);
    if (document.activeElement === hostRef.current) {
      TextInputState._currentlyFocusedNode = hostRef.current;
    }
  }, [hostRef, selection]);

  useElementLayout(hostRef, onLayout);
  usePlatformMethods(hostRef, ref, classList, style, {
    clear() {
      if (hostRef.current != null) {
        hostRef.current.value = '';
      }
    },
    isFocused() {
      return hostRef.current != null && TextInputState.currentlyFocusedField() === hostRef.current;
    }
  });

  Object.assign(supportedProps, {
    autoCapitalize,
    autoComplete: autoComplete || autoCompleteType || 'on',
    autoCorrect: autoCorrect ? 'on' : 'off',
    autoFocus,
    classList,
    defaultValue,
    dir: 'auto',
    disabled,
    enterkeyhint: returnKeyType,
    maxLength,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onSelect: handleSelectionChange,
    placeholder,
    readOnly: !editable,
    ref: setRef,
    spellCheck: spellCheck != null ? spellCheck : autoCorrect,
    style,
    value
  });

  if (multiline) {
    supportedProps.rows = numberOfLines;
  } else {
    supportedProps.type = type;
  }

  return createElement(component, supportedProps);
});

TextInput.displayName = 'TextInput';
// $FlowFixMe
TextInput.State = TextInputState;

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

export default TextInput;
