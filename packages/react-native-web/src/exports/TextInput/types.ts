/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { KeyboardEvent, UIEvent } from 'react';

import type { ColorValue, GenericStyleProp } from '../../types';
import type { TextStyle } from '../Text/types';
import type { ViewProps } from '../View/types';

export type TextInputStyle = TextStyle & {
  caretColor?: ColorValue;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
};

export type SubmitBehavior = 'submit' | 'blurAndSubmit' | 'newline';

type TextInputEvent = { nativeEvent: { text: string } };

export type AutoComplete =
  | 'additional-name'
  | 'address-line1'
  | 'address-line2'
  | 'birthdate-day'
  | 'birthdate-full'
  | 'birthdate-month'
  | 'birthdate-year'
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'country'
  | 'current-password'
  | 'email'
  | 'family-name'
  | 'given-name'
  | 'honorific-prefix'
  | 'honorific-suffix'
  | 'name'
  | 'new-password'
  | 'off'
  | 'one-time-code'
  | 'postal-code'
  | 'street-address'
  | 'tel'
  | 'username'
  /** @platform android, ios */
  | 'cc-exp-day';

export type TextInputProps = Omit<
  ViewProps,
  'dir' | 'onBlur' | 'onFocus' | 'style'
> & {
  autoCapitalize?: 'characters' | 'none' | 'sentences' | 'words';
  autoComplete?: AutoComplete;
  autoCorrect?: boolean;
  autoFocus?: boolean;
  caretHidden?: boolean;
  clearTextOnFocus?: boolean;
  defaultValue?: string;
  dir?: 'auto' | 'ltr' | 'rtl';
  disabled?: boolean;
  enterKeyHint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send';
  inputAccessoryViewID?: string;
  inputMode?:
    | 'decimal'
    | 'email'
    | 'none'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url';
  maxLength?: number;
  multiline?: boolean;
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
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  readOnly?: boolean;
  rows?: number;
  secureTextEntry?: boolean;
  selectTextOnFocus?: boolean;
  selection?: {
    start: number;
    end?: number;
  };
  selectionColor?: ColorValue;
  showSoftInputOnFocus?: boolean;
  spellCheck?: boolean;
  style?: GenericStyleProp<TextInputStyle>;
  submitBehavior?: SubmitBehavior;
  textAlign?: 'left' | 'center' | 'right' | 'start' | 'end';
  value?: string;
  editable?: boolean;
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
  numberOfLines?: number;
  returnKeyType?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send';
};
