/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { KeyboardEvent, UIEvent } from 'react';

import type { ColorValue, GenericStyleProp, Nullable } from '../../types';
import type { TextStyle } from '../Text/types';
import type { ViewProps } from '../View/types';

export type TextInputStyle = TextStyle & {
  caretColor?: ColorValue;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
};

export type SubmitBehavior = 'submit' | 'blurAndSubmit' | 'newline';

type TextInputEvent = { nativeEvent: { text: string } };

export type TextInputProps = Omit<ViewProps, 'onBlur' | 'onFocus' | 'style'> & {
  autoCapitalize?: 'characters' | 'none' | 'sentences' | 'words';
  autoComplete?: Nullable<string>;
  autoCompleteType?: Nullable<string>; // Compat with React Native (Bug react-native#26003)
  autoCorrect?: Nullable<boolean>;
  autoFocus?: Nullable<boolean>;
  caretHidden?: Nullable<boolean>;
  clearTextOnFocus?: Nullable<boolean>;
  defaultValue?: Nullable<string>;
  disabled?: Nullable<boolean>;
  enterKeyHint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send';
  inputAccessoryViewID?: Nullable<string>;
  inputMode?:
    | 'decimal'
    | 'email'
    | 'none'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url';
  maxLength?: Nullable<number>;
  multiline?: Nullable<boolean>;
  onBlur?: (e: TextInputEvent) => void;
  onChange?: (e: TextInputEvent) => void;
  onChangeText?: (e: string) => void;
  onContentSizeChange?: (e: {
    nativeEvent: { contentSize: { height: number; width: number } };
  }) => void;
  onEndEditing?: (e: TextInputEvent) => void;
  onFocus?: (e: TextInputEvent) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
  onSelectionChange?: (e: {
    nativeEvent: {
      selection: { start: number | null; end: number | null };
      text: string;
    };
  }) => void;
  onScroll?: (e: UIEvent<HTMLElement>) => void;
  onSubmitEditing?: (e: TextInputEvent) => void;
  placeholder?: Nullable<string>;
  placeholderTextColor?: Nullable<ColorValue>;
  readOnly?: Nullable<boolean>;
  rows?: Nullable<number>;
  secureTextEntry?: Nullable<boolean>;
  selectTextOnFocus?: Nullable<boolean>;
  selection?: {
    start: number;
    end?: number;
  };
  selectionColor?: Nullable<ColorValue>;
  showSoftInputOnFocus?: Nullable<boolean>;
  spellCheck?: Nullable<boolean>;
  style?: Nullable<GenericStyleProp<TextInputStyle>>;
  submitBehavior?: Nullable<SubmitBehavior>;
  textAlign?: Nullable<'left' | 'center' | 'right' | 'start' | 'end'>;
  value?: Nullable<string>;
  // deprecated
  blurOnSubmit?: Nullable<boolean>;
  editable?: Nullable<boolean>;
  keyboardType?:
    | 'default'
    | 'decimal-pad'
    | 'email-address'
    | 'number-pad'
    | 'numbers-and-punctuation'
    | 'numeric'
    | 'phone-pad'
    | 'search'
    | 'url'
    | 'web-search';
  numberOfLines?: Nullable<number>;
  returnKeyType?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send';
};
