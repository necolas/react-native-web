/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import StyleSheet from '../StyleSheet';
import TouchableOpacity from '../TouchableOpacity';
import { bool, func, string, object } from 'prop-types';
import React, { Component } from 'react';

class Button extends Component<*> {
  static propTypes = {
    accessibilityLabel: string,
    disabled: bool,
    onPress: func.isRequired,
    style: object,
    children: object,
    testID: string
  };

  render() {
    const { accessibilityLabel, disabled, onPress, testID, style, children, ...other } = this.props;

    return (
      <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        style={StyleSheet.compose(styles.base, style)}
        testID={testID} 
        {...other}
      >
      { children }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: 'rgb(26, 113, 177)',
    borderRadius: 2,
    width: '100%',
    height: '100%'
  }
});

export default Button;
