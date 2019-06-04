import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default class AlertIOS extends Component {
  buttons = [
    { text: 'Delete', onPress: () => console.log('Delete'), style: 'destructive' },
    { text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel' },
    { text: 'OK', onPress: () => console.log('Ok') }
  ];

  render() {
    return (
      <View>
        <View style={styles.exampleButton}>
          <Button onPress={this.open2ButtonsAlert} title="Open 2 buttons alert" />
        </View>
        <Button onPress={this.open3ButtonsAlert} title="Open 3 buttons alert" />
      </View>
    );
  }

  open2ButtonsAlert = () => {
    this.openAlert(this.buttons.slice(0, 2));
  };

  open3ButtonsAlert = () => {
    this.openAlert(this.buttons);
  };

  openAlert(buttons) {
    // Override default styles and components
    Alert.Component = AlertIOSComponent;

    Alert.alert('iOS styled alert', 'Some nice message to display in the alert.', buttons, {
      cancelable: false,
      onDismiss: () => console.log('Dismiss')
    });

    // Reset custom styles to not interfere with other examples
    delete Alert.Component;
  }
}

function AlertIOSComponent(props) {
  const verticalButtons = props.buttons.length > 2;

  const buttons = props.buttons.map((b, i) => {
    const wrapperStyles = [
      styles.buttonWrapper,
      verticalButtons && styles.buttonVertical,
      i === 0 && styles.buttonFirst
    ];

    const textStyles = [
      styles.buttonText,
      b.type === 'destructive' && styles.buttonDestructive,
      b.type === 'cancel' && styles.buttonCancel
    ];

    return (
      <TouchableOpacity key={'b' + i} onPress={b.onPress} style={wrapperStyles}>
        <Text style={textStyles}>{b.text}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.alertWrapper}>
      <View style={styles.textWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View>
          <Text style={styles.message}>{props.message}</Text>
        </View>
      </View>
      <View style={[styles.buttonsWrapper, verticalButtons && styles.buttonsWrapperVertical]}>
        {buttons}
      </View>
    </View>
  );
}

AlertIOSComponent.propTypes = {
  buttons: PropTypes.array,
  message: PropTypes.string,
  title: PropTypes.string
};

const styles = StyleSheet.create({
  exampleButton: {
    marginBottom: 10
  },

  alertWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10
  },

  textWrapper: {
    padding: 20
  },

  titleWrapper: {
    marginBottom: 5
  },

  title: {
    textAlign: 'center',
    fontWeight: '600'
  },

  message: {
    textAlign: 'center'
  },

  buttonsWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderTopStyle: 'solid',
    flex: 1,
    flexDirection: 'row'
  },

  buttonsWrapperVertical: {
    flexDirection: 'column'
  },

  buttonWrapper: {
    height: 40,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
    borderLeftStyle: 'solid'
  },

  buttonFirst: {
    borderTopWidth: 0,
    borderLeftWidth: 0
  },

  buttonVertical: {
    borderLeftWidth: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderTopStyle: 'solid',
    padding: 10
  },

  buttonText: {
    color: '#2196f3',
    fontSize: 14,
    textAlign: 'center'
  },

  buttonCancel: {
    fontWeight: '600'
  },

  buttonDestructive: {
    color: '#f34040'
  }
});
