import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default class AlertAndroid extends Component {
  render() {
    return (
      <View>
        <Button onPress={this.openAlert} title="Open android alike alert" />
      </View>
    );
  }
  openAlert() {
    // Override default styles and components
    Alert.getCustomStyles = animatedValue => ({
      overlay: {
        transform: '', // Deactivates scale animation
        backgroundColor: 'rgba(0,0,0,.8)'
      },
      alertWrapper: {
        borderRadius: 3
      },
      buttonsWrapper: customStyles.buttonsWrapper
    });

    Alert.Button = AndroidButton;

    Alert.alert(
      'Android styled alert',
      'Some nice message to display in the alert.',
      [
        { text: 'Delete', onPress: () => console.log('Delete'), style: 'destructive' },
        { text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel' },
        { text: 'Ok', onPress: () => console.log('Ok') }
      ],
      { cancelable: true, onDismiss: () => console.log('Dismiss') }
    );

    // Reset custom styles to not interfere with other examples
    delete Alert.getCustomStyles;
    delete Alert.Button;
  }
}

function AndroidButton(props) {
  const wrapperStyle = [customStyles.buttonWrapper, props.index > 1 && customStyles.thirdButton];
  return (
    <View style={wrapperStyle}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={customStyles.button}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}

AndroidButton.propTypes = {
  index: PropTypes.number,
  onPress: PropTypes.func,
  text: PropTypes.string
};

const customStyles = StyleSheet.create({
  buttonsWrapper: {
    flexDirection: 'row-reverse'
  },
  buttonWrapper: {
    marginLeft: 10
  },
  thirdButton: {
    flexGrow: 1,
    marginLeft: 0
  },
  button: {
    color: '#2196f3',
    textTransform: 'uppercase',
    fontSize: 12
  }
});
