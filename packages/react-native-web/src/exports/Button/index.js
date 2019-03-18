/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import ColorPropType from '../ColorPropType';
import StyleSheet from '../StyleSheet';
import TouchableOpacity from '../TouchableOpacity';
import Text from '../Text';
import { bool, func, string } from 'prop-types';
import React, { Component } from 'react';

class Button extends Component<*> {
  static propTypes = {
    accessibilityLabel: string,
    color: ColorPropType,
    disabled: bool,
    onPress: func.isRequired,
    testID: string,
    title: string.isRequired
  };

  render() {
    const { accessibilityLabel, color, disabled, onPress, testID, title } = this.props;

    return (
      <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.button,
          color && { backgroundColor: color },
          disabled && styles.buttonDisabled
        ]}
        testID={testID}
      >
        <Text style={[styles.text, disabled && styles.textDisabled]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

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

export default Button;
