import { Button, View, Alert } from 'react-native';
import React, { Component } from 'react';

import { DividerVertical } from '../../../1-components/Button/helpers';

const showAlert = (title, message, buttons, options) => () => {
  Alert.alert(title, message, buttons, options);
};

const action = msg => () => {
  console.log(msg);
};

export default class AlertExample extends Component {
  render() {
    return (
      <View>
        <Button onPress={showAlert('Alert title', 'My alert message')} title="1-Button alert" />
        <DividerVertical />
        <Button
          onPress={showAlert('Alert title', 'My alert message', [
            { text: 'Cancel' },
            { text: 'Ok' }
          ])}
          title="2-Button alert"
        />
        <DividerVertical />
        <Button
          onPress={showAlert('Alert title', 'My alert message', [
            { text: 'Ask me later', onPress: action('Ask me later pressed') },
            { text: 'Cancel', onPress: action('Cancel Pressed') },
            { text: 'OK', onPress: action('OK Pressed') }
          ])}
          title="3-Button alert"
        />
        <DividerVertical />
        <Button
          onPress={showAlert('Alert title', 'My alert message', [
            { text: 'Cancel', onPress: action('Cancel') },
            { text: 'Ok', onPress: action('Ok') }
          ])}
          title="Custom onPress"
        />
        <DividerVertical />
        <Button
          onPress={showAlert(
            'Alert title',
            'My alert message',
            [{ text: 'Cancel' }, { text: 'Ok' }],
            { onDismiss: action('on dismiss') }
          )}
          title="Custom onDismiss"
        />
        <DividerVertical />
        <Button
          onPress={showAlert(
            'Alert title',
            'My alert message',
            [{ text: 'Cancel' }, { text: 'Ok' }],
            { cancelable: false }
          )}
          title="Disable dismissing"
        />
      </View>
    );
  }
}
