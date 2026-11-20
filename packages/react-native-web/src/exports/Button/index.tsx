/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { PressResponderConfig } from '../../modules/usePressEvents/PressResponder';

import * as React from 'react';
import StyleSheet from '../StyleSheet';
import TouchableOpacity from '../TouchableOpacity';
import Text from '../Text';
import type { Nullable } from '../../types';

type ButtonProps = {
  accessibilityLabel?: Nullable<string>;
  color?: Nullable<string>;
  disabled?: boolean;
  onPress?: PressResponderConfig['onPress'];
  ref?: React.Ref<React.ComponentRef<typeof TouchableOpacity>>;
  testID?: Nullable<string>;
  title: string;
  type?: Nullable<'button' | 'reset' | 'submit'>;
};

const Button = (props: ButtonProps): React.ReactNode => {
  const {
    accessibilityLabel,
    color,
    disabled,
    onPress,
    ref,
    testID,
    title,
    type
  } = props;

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      disabled={disabled}
      focusable={!disabled}
      onPress={onPress}
      ref={ref}
      style={[
        styles.button,
        color && { backgroundColor: color },
        disabled && styles.buttonDisabled
      ]}
      testID={testID}
      type={type}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 2
  },
  text: {
    color: '#fff',
    fontWeight: '500',
    padding: 8,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  buttonDisabled: {
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  }
});

export type { ButtonProps };

export default Button;
