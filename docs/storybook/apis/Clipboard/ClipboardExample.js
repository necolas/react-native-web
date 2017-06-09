import { storiesOf } from '@kadira/storybook';
import UIExplorer from '../../UIExplorer';
import { Button, Clipboard, StyleSheet, TextInput, View } from 'react-native';
import React, { Component } from 'react';

const styles = StyleSheet.create({
  buttonBox: {
    maxWidth: 300
  },
  textInput: {
    borderColor: '#AAB8C2',
    borderWidth: 1,
    height: 200,
    marginTop: 20,
    padding: 10
  }
});

class ClipboardExample extends Component {
  render() {
    return (
      <View>
        <View style={styles.buttonBox}>
          <Button onPress={this._handleSet} title="Copy to clipboard" />
        </View>
        <TextInput
          multiline={true}
          placeholder={'Try pasting here afterwards'}
          style={styles.textInput}
        />
      </View>
    );
  }

  _handleSet() {
    const success = Clipboard.setString('This text was copied to the clipboard by React Native');
    console.log(`Clipboard.setString success? ${success}`);
  }
}

const examples = [
  {
    title: 'Clipboard.setString',
    description:
      '(Note that `Clipboard.getString` returns a Promise that always resolves to an empty string on web.)',
    render: () => <ClipboardExample />
  },
  {
    title: 'Clipboard.getString',
    description:
      'Not properly supported on Web. Returns a Promise that always resolves to an empty string on web.'
  }
];

storiesOf('APIs', module).add('Clipboard', () =>
  <UIExplorer
    description="Clipboard gives you an interface for setting to the clipboard."
    examples={examples}
    title="Clipboard"
  />
);
