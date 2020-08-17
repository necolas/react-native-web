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

import { forwardRef, useRef } from 'react';
import createElement from '../createElement';
import css from '../StyleSheet/css';
import pick from '../../modules/pick';
import setAndForwardRef from '../../modules/setAndForwardRef';
import useElementLayout from '../../hooks/useElementLayout';
import useLayoutEffect from '../../hooks/useLayoutEffect';
import usePlatformMethods from '../../hooks/usePlatformMethods';
import useResponderEvents from '../../hooks/useResponderEvents';
import StyleSheet from '../StyleSheet';
import TextInputState from '../../modules/TextInputState';

/**
 * Determines whether a 'selection' prop differs from a node's existing
 * selection state.
 */
const isSelectionStale = (node, selection) => {
  const { selectionEnd, selectionStart } = node;
  const { start, end } = selection;
  return start !== selectionStart || end !== selectionEnd;
};

/**
 * Certain input types do no support 'selectSelectionRange' and will throw an
 * error.
 */
const setSelection = (node, selection) => {
  if (isSelectionStale(node, selection)) {
    const { start, end } = selection;
    try {
      node.setSelectionRange(start, end || start);
    } catch (e) {}
  }
};

const forwardPropsList = {
  accessibilityLabel: true,
  accessibilityLiveRegion: true,
  accessibilityRole: true,
  accessibilityState: true,
  accessibilityValue: true,
  accessible: true,
  autoCapitalize: true,
  autoComplete: true,
  autoCorrect: true,
  autoFocus: true,
  children: true,
  classList: true,
  defaultValue: true,
  dir: true,
  disabled: true,
  importantForAccessibility: true,
  maxLength: true,
  nativeID: true,
  onBlur: true,
  onChange: true,
  onClick: true,
  onClickCapture: true,
  onContextMenu: true,
  onFocus: true,
  onScroll: true,
  onTouchCancel: true,
  onTouchCancelCapture: true,
  onTouchEnd: true,
  onTouchEndCapture: true,
  onTouchMove: true,
  onTouchMoveCapture: true,
  onTouchStart: true,
  onTouchStartCapture: true,
  placeholder: true,
  pointerEvents: true,
  readOnly: true,
  ref: true,
  rows: true,
  spellCheck: true,
  style: true,
  value: true,
  testID: true,
  type: true,
  // unstable
  dataSet: true,
  onMouseDown: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseMove: true,
  onMouseOver: true,
  onMouseOut: true,
  onMouseUp: true
};

const pickProps = props => pick(props, forwardPropsList);

// If an Input Method Editor is processing key input, the 'keyCode' is 229.
// https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
function isEventComposing(nativeEvent) {
  return nativeEvent.isComposing || nativeEvent.keyCode === 229;
}

const TextInput = forwardRef<TextInputProps, *>((props, forwardedRef) => {
  const {
    autoCapitalize = 'sentences',
    autoComplete,
    autoCompleteType,
    autoCorrect = true,
    blurOnSubmit,
    clearTextOnFocus,
    dir,
    editable = true,
    keyboardType = 'default',
    multiline = false,
    numberOfLines = 1,
    onBlur,
    onChange,
    onChangeText,
    onContentSizeChange,
    onFocus,
    onKeyPress,
    onLayout,
    onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture,
    onResponderEnd,
    onResponderGrant,
    onResponderMove,
    onResponderReject,
    onResponderRelease,
    onResponderStart,
    onResponderTerminate,
    onResponderTerminationRequest,
    onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture,
    onSelectionChange,
    onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder,
    onStartShouldSetResponderCapture,
    onSubmitEditing,
    placeholderTextColor,
    returnKeyType,
    secureTextEntry = false,
    selection,
    selectTextOnFocus,
    spellCheck
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
    getForwardedRef: () => forwardedRef,
    setLocalRef: hostNode => {
      // TextInput needs to add more methods to the hostNode in addition to those
      // added by `usePlatformMethods`. This is temporarily until an API like
      // `TextInput.clear(hostRef)` is added to React Native.
      if (hostNode != null) {
        hostNode.clear = function() {
          if (hostNode != null) {
            hostNode.value = '';
          }
        };
        hostNode.isFocused = function() {
          return hostNode != null && TextInputState.currentlyFocusedField() === hostNode;
        };
      }
      hostRef.current = hostNode;
      if (hostRef.current != null) {
        handleContentSizeChange();
      }
    }
  });

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
    const text = e.target.value;
    e.nativeEvent.text = text;
    handleContentSizeChange();
    if (onChange) {
      onChange(e);
    }
    if (onChangeText) {
      onChangeText(text);
    }
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

    const nativeEvent = e.nativeEvent;
    const isComposing = isEventComposing(nativeEvent);

    if (onKeyPress) {
      onKeyPress(e);
    }

    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      // Do not call submit if composition is occuring.
      !isComposing &&
      !e.isDefaultPrevented()
    ) {
      if ((blurOnSubmit || !multiline) && onSubmitEditing) {
        // prevent "Enter" from inserting a newline or submitting a form
        e.preventDefault();
        nativeEvent.text = e.target.value;
        onSubmitEditing(e);
      }
      if (shouldBlurOnSubmit && hostRef.current != null) {
        hostRef.current.blur();
      }
    }
  }

  function handleSelectionChange(e) {
    if (onSelectionChange) {
      try {
        const node = e.target;
        const { selectionStart, selectionEnd } = node;
        e.nativeEvent.selection = {
          start: selectionStart,
          end: selectionEnd
        };
        e.nativeEvent.text = e.target.value;
        onSelectionChange(e);
      } catch (e) {}
    }
  }

  useLayoutEffect(() => {
    const node = hostRef.current;
    if (node != null && selection != null) {
      setSelection(node, selection);
    }
    if (document.activeElement === node) {
      TextInputState._currentlyFocusedNode = node;
    }
  }, [hostRef, selection]);

  const component = multiline ? 'textarea' : 'input';
  const classList = [classes.textinput];
  const style = StyleSheet.compose(
    props.style,
    placeholderTextColor && { placeholderTextColor }
  );

  useElementLayout(hostRef, onLayout);
  useResponderEvents(hostRef, {
    onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture,
    onResponderEnd,
    onResponderGrant,
    onResponderMove,
    onResponderReject,
    onResponderRelease,
    onResponderStart,
    onResponderTerminate,
    onResponderTerminationRequest,
    onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder,
    onStartShouldSetResponderCapture
  });

  const supportedProps = pickProps(props);
  supportedProps.autoCapitalize = autoCapitalize;
  supportedProps.autoComplete = autoComplete || autoCompleteType || 'on';
  supportedProps.autoCorrect = autoCorrect ? 'on' : 'off';
  supportedProps.classList = classList;
  // 'auto' by default allows browsers to infer writing direction
  supportedProps.dir = dir !== undefined ? dir : 'auto';
  supportedProps.enterKeyHint = returnKeyType;
  supportedProps.onBlur = handleBlur;
  supportedProps.onChange = handleChange;
  supportedProps.onFocus = handleFocus;
  supportedProps.onKeyDown = handleKeyDown;
  supportedProps.onSelect = handleSelectionChange;
  supportedProps.readOnly = !editable;
  supportedProps.ref = setRef;
  supportedProps.rows = multiline ? numberOfLines : undefined;
  supportedProps.spellCheck = spellCheck != null ? spellCheck : autoCorrect;
  supportedProps.style = style;
  supportedProps.type = multiline ? undefined : type;

  usePlatformMethods(hostRef, supportedProps);

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
