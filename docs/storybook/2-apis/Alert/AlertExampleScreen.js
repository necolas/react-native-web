import { StyleSheet, Button, View, Alert } from 'react-native'
import ReactNativeApp from '../../../../src/apis/AppRegistry/AppContainer'
import React, { Component } from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf
} from '../../ui-explorer';
import { action } from '@storybook/react';

const style = {
  spacer: {
    height: 5,
  },
};

class AlertExample extends Component {
  render() {
    return (
      <UIExplorer title="Alert" url="2-apis/Alert">
        <View style={{ height: 240 }}>
          <ReactNativeApp>
            <Button title="DEFAULT BUTTON"
              onPress={
                () => Alert.alert(
                  'Hey There',
                  'This is an example of how should we work with default button alert!'
                )
              }
            />
            <View style={style.spacer} />
            <Button title="CUSTOM SINGLE BUTTON"
              onPress={
                () => Alert.alert(
                  'Hey There',
                  'This is an example of how should we work with custom single button alert!',
                  [
                    { text: 'Hey!', onPress: action('Hey!') }
                  ]
                )
              }
            />
            <View style={style.spacer} />
            <Button title="DOUBLE BUTTON"
              onPress={
                () => Alert.alert(
                  'Hey There',
                  'This is an example of how should we work with one button alert!',
                  [
                    { text: 'Yes!', onPress: action('Yes!') },
                    { text: 'No!', onPress: action('No!') }
                  ]
                )
              }
            />
            <View style={style.spacer} />
            <Button title="MULTI BUTTON"
              onPress={
                () => Alert.alert(
                  'Hey There',
                  'This is an example of how should we work with one button alert!',
                  [
                    { text: 'One', onPress: action('One') },
                    { text: 'Two', onPress: action('Two') },
                    { text: 'Three', onPress: action('Three') }
                  ]
                )
              }
            />
            <View style={style.spacer} />
            <Button title="CANCELABLE"
              onPress={
                () => Alert.alert(
                  'Hey There',
                  'Tap background to close',
                  [
                    { text: 'One', onPress: action('One') },
                  ],
                  { cancelable: true }
                )
              }
            />
          </ReactNativeApp>
        </View>
      </UIExplorer>
    );
  }
}

storiesOf('APIs', module)
  .add('Alert', () => (
    <AlertExample />
  ));
