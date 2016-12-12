import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Button, StyleSheet, View } from 'react-native';

const ButtonExample = React.createClass({
  _handlePress(event) {
    event.preventDefault();
    console.log('Clicked!');
  },
  render() {
    return (
      <View style={styles.container}>
        <Button accessibilityLabel='Demo Button' onPress={this._handlePress} title='Click me!' />
        <Button accessibilityLabel='Demo Button 2' color='#FF9500' onPress={this._handlePress} title='Click me!' />
        <Button accessibilityLabel='Disabled Button' disabled onPress={this._handlePress} title='Disabed Button' />
      </View>
    );
  }
});

const examples = [ {
  title: 'button',
  render() {
    return (
      <ButtonExample />
    );
  }
} ];

const styles = StyleSheet.create({
  container: {
    minWidth: 200,
    marginTop: -20,
    backgroundColor: 'transparent'
  }
});

examples.forEach((example) => {
  storiesOf('component: Button', module)
    .add(example.title, () => example.render());
});
