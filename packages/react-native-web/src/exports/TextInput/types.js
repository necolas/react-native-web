/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ColorValue, GenericStyleProp } from '../../types';
import type { TextStyle } from '../Text/types';
import type { ViewProps } from '../View/types';

export type TextInputStyle = {
  ...TextStyle,
  caretColor?: ColorValue,
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
};

export type TextInputProps = {
  ...ViewProps,
  autoCapitalize?: 'characters' | 'none' | 'sentences' | 'words',
  autoComplete?: string,
  autoCompleteType?: string, // Compat with React Native (Bug react-native#26003)
  autoCorrect?: boolean,
  autoFocus?: boolean,
  blurOnSubmit?: boolean,
  clearTextOnFocus?: boolean,
  defaultValue?: string,
  disabled?: boolean,
  editable?: boolean,
  inputAccessoryViewID?: string,
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'number-pad'
    | 'numbers-and-punctuation'
    | 'numeric'
    | 'phone-pad'
    | 'search'
    | 'url'
    | 'web-search',
  maxLength?: number,
  multiline?: boolean,
  numberOfLines?: number,
  onBlur?: (e: any) => void,
  onChange?: (e: any) => void,
  onChangeText?: (e: string) => void,
  onContentSizeChange?: (e: any) => void,
  onEndEditing?: (e: any) => void,
  onFocus?: (e: any) => void,
  onKeyPress?: (e: any) => void,
  onSelectionChange?: (e: any) => void,
  onScroll?: (e: any) => void,
  onSubmitEditing?: (e: any) => void,
  placeholder?: string,
  placeholderTextColor?: ColorValue,
  returnKeyType?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send',
  secureTextEntry?: boolean,
  selectTextOnFocus?: boolean,
  selection?: {|
    start: number,
    end?: number
  |},
  selectionColor?: ColorValue,
  spellCheck?: boolean,
  style?: GenericStyleProp<TextInputStyle>,
  value?: string
};
