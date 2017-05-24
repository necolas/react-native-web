import { Clipboard, Text, TextInput, View } from 'react-native';
import React, { Component } from 'react';
import { action, storiesOf } from '@kadira/storybook';

class ClipboardExample extends Component {
  render() {
    return (
      <View style={{ minWidth: 300 }}>
        <Text onPress={this._handleSet}>Copy to clipboard</Text>
        <TextInput
          multiline={true}
          placeholder={'Try pasting here afterwards'}
          style={{ borderWidth: 1, height: 200, marginVertical: 20 }}
        />
        <Text onPress={this._handleGet}>
          (Clipboard.getString returns a Promise that always resolves to an empty string on web)
        </Text>
      </View>
    );
  }

  _handleGet() {
    Clipboard.getString().then(value => {
      console.log(`Clipboard value: ${value}`);
    });
  }

  _handleSet() {
    const success = Clipboard.setString('This text was copied to the clipboard by React Native');
    console.log(`Clipboard.setString success? ${success}`);
  }
}

storiesOf('api: Clipboard', module).add('setString', () => <ClipboardExample />);
