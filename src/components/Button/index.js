const ColorPropType = require('../../propTypes/ColorPropType');
const Platform = require('../../apis/Platform');
const StyleSheet = require('../../apis/StyleSheet');
const TouchableOpacity = require('../Touchable/TouchableOpacity');
const Text = require('../Text');
const View = require('../View');
import React, { Component, PropTypes } from 'react';

const invariant = require('fbjs/lib/invariant');

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
      onPress,
      title,
      disabled
    } = this.props;
    const buttonStyles = [ styles.button ];
    const textStyles = [ styles.text ];

    if (color && Platform.OS === 'ios') {
      textStyles.push({ color: color });
    } else if (color) {
      buttonStyles.push({ backgroundColor: color });
    }

    if (disabled) {
      buttonStyles.push(styles.buttonDisabled);
      textStyles.push(styles.textDisabled);
    }

    invariant(
      typeof title === 'string',
      'The title prop of a Button must be a string',
    );

    const formattedTitle = Platform.OS === 'android' ? title.toUpperCase() : title;

    return (
      <TouchableOpacity
        accessibilityComponentType='button'
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={[ 'button' ]}
        disabled={disabled}
        onPress={onPress}>
        <View style={buttonStyles}>
          <Text style={textStyles}>{formattedTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

// Material design blue from https://material.google.com/style/color.html#color-color-palette
let defaultBlue = '#2196F3';
if (Platform.OS === 'ios') {
  // Measured default tintColor from iOS 10
  defaultBlue = '#0C42FD';
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {},
    android: {
      elevation: 4,
      backgroundColor: defaultBlue,
      borderRadius: 2
    },
    web: {
      backgroundColor: defaultBlue,
      borderRadius: 2
    }
  }),
  text: Platform.select({
    ios: {
      color: defaultBlue,
      textAlign: 'center',
      padding: 8,
      fontSize: 18
    },
    android: {
      textAlign: 'center',
      color: 'white',
      padding: 8,
      fontWeight: '500'
    },
    web: {
      textAlign: 'center',
      color: 'white',
      padding: 8,
      fontWeight: '500'
    }
  }),
  buttonDisabled: Platform.select({
    ios: {},
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf'
    },
    web: {
      backgroundColor: '#dfdfdf'
    }
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#cdcdcd'
    },
    android: {
      color: '#a1a1a1'
    },
    web: {
      color: '#a1a1a1'
    }
  })
});

module.exports = Button;
