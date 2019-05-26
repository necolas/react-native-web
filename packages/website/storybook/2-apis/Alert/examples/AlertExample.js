import React, { Component } from 'react';
import { Alert, View, Button } from 'react-native';

export default class AlertExample extends Component {
  render() {
    return (
      <View>
        <Button onPress={this.openAlert} title="Open alert" />
      </View>
    );
  }
  openAlert() {
    Alert.alert(
      'Alert title',
      'Some nice message to display in the alert.',
      [
        { text: 'Delete', onPress: () => console.log('Delete'), style: 'destructive' },
        { text: 'Cancel', onPress: () => console.log('Canceled') },
        { text: 'Ok', onPress: () => console.log('Ok') }
      ],
      { cancelable: true, onDismiss: () => console.log('Dismiss') }
    );
  }
}
