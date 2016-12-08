import ColorPropType from '../../propTypes/ColorPropType';
import React, { Component, PropTypes } from 'react';
import StyleSheet from '../../apis/StyleSheet';
import TouchableOpacity from '../Touchable/TouchableOpacity';
import Text from '../Text';

class Button extends Component {
  static propTypes = {
    /**
     * Text to display for blindness accessibility features
     */
    accessibilityLabel: PropTypes.string,
    /**
     * Color of the text (iOS), or background color of the button (Android)
     */
    color: ColorPropType,
    /**
     * If true, disable all interactions for this component.
     */
    disabled: PropTypes.bool,
    /**
     * Handler to be called when the user taps the button
     */
    onPress: PropTypes.func.isRequired,
    /**
     * Text to display inside the button
     */
    title: PropTypes.string.isRequired
  };

  render() {
    const {
      accessibilityLabel,
      color,
      disabled,
      onPress,
      title
    } = this.props;
    const buttonStyles = [ styles.button ];
    const textStyles = [ styles.text ];

    if (color) {
      buttonStyles.push({ backgroundColor: color });
    }

    if (disabled) {
      buttonStyles.push(styles.buttonDisabled);
      textStyles.push(styles.textDisabled);
    }

    return (
      <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={'button'}
        disabled={disabled}
        onPress={onPress}
        style={buttonStyles}>
        <Text style={textStyles}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

// Material design blue from https://material.google.com/style/color.html#color-color-palette
const defaultBlue = '#2196F3';
const styles = StyleSheet.create({
  button: {
    backgroundColor: defaultBlue,
    borderRadius: 2
  },
  text: {
    textAlign: 'center',
    color: 'white',
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
