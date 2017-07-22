import { Button, View, Alert } from 'react-native'
import AppContainer from '../../../../src/apis/AppRegistry/AppContainer'
import React, { Component } from 'react';
import UIExplorer, {
  storiesOf
} from '../../ui-explorer';
import { action } from '@storybook/react';

const style = {
  spacer: {
    height: 5,
  },
  container: { height: 240 },
};

const showAlert = (...props) => () => Alert.alert(...props);

class AlertExample extends Component {
  render() {
    return (
      <UIExplorer title="Alert" url="2-apis/Alert">
        <View style={style.container}>
          <AppContainer>
            <Button
              onPress={
                showAlert(
                  'Hey There',
                  'This is an example of how should we work with default button alert!'
                )
              }
              title="DEFAULT BUTTON"
            />
            <View style={style.spacer} />
            <Button onPress={
                showAlert(
                  'Hey There',
                  'This is an example of how should we work with custom single button alert!',
                  [
                    { text: 'Hey!', onPress: action('Hey!') }
                  ]
                )
              }
              title="CUSTOM SINGLE BUTTON"
            />
            <View style={style.spacer} />
            <Button onPress={
                showAlert(
                  'Hey There',
                  'This is an example of how should we work with one button alert!',
                  [
                    { text: 'Yes!', onPress: action('Yes!') },
                    { text: 'No!', onPress: action('No!') }
                  ]
                )
              }
              title="DOUBLE BUTTON"
            />
            <View style={style.spacer} />
            <Button onPress={
                showAlert(
                  'Hey There',
                  'This is an example of how should we work with one button alert!',
                  [
                    { text: 'One', onPress: action('One') },
                    { text: 'Two', onPress: action('Two') },
                    { text: 'Three', onPress: action('Three') }
                  ]
                )
              }
              title="MULTI BUTTON"
            />
            <View style={style.spacer} />
            <Button onPress={
                showAlert(
                  'Hey There',
                  'Tap background to close',
                  [
                    { text: 'One', onPress: action('One') },
                  ],
                  { cancelable: true }
                )
              }
              title="CANCELABLE"
            />
          </AppContainer>
        </View>
      </UIExplorer>
    );
  }
}

storiesOf('APIs', module)
  .add('Alert', () => (
    <AlertExample />
  ));
