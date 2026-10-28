import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import React, { Component } from 'react';

export default class Button extends Component {
  static displayName = '@app/Button';

  render() {
    const {
      accessibilityLabel,
      color,
      disabled,
      onPress,
      style,
      textStyle,
      testID,
      title
    } = this.props;

    return (
      <TouchableHighlight
        aria-label={accessibilityLabel}
        disabled={disabled}
        onPress={onPress}
        role="button"
        style={[
          styles.button,
          style,
          color && { backgroundColor: color },
          disabled && styles.buttonDisabled
        ]}
        testID={testID}
      >
        <Text style={[styles.text, textStyle, disabled && styles.textDisabled]}>
          {title}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 0,
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 20,
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
