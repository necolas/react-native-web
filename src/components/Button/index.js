import ColorPropType from '../../propTypes/ColorPropType';
import React, { Component, PropTypes } from 'react';
import StyleSheet from '../../apis/StyleSheet';
import TouchableOpacity from '../Touchable/TouchableOpacity';
import Text from '../Text';

class Button extends Component {
  static propTypes = {
    testID: PropTypes.string,
    accessibilityLabel: PropTypes.string,
    color: ColorPropType,
    disabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    testID: PropTypes.string,
    title: PropTypes.string.isRequired
  };

  render() {
    const {
      testID,
      accessibilityLabel,
      color,
      disabled,
      onPress,
      testID,
      title
    } = this.props;

    return (
      <TouchableOpacity
        testID={testID}
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
        <Text style={[styles.text, disabled && styles.textDisabled]}>
          {title}
        </Text>
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
    textAlign: 'center',
    color: '#fff',
    padding: 8,
    fontWeight: '500'
  },
  buttonDisabled: {
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  }
});

module.exports = Button;
