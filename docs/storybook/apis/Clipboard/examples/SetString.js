/**
 * @flow
 */

import { Button, Clipboard, StyleSheet, TextInput, View } from 'react-native';
import React, { PureComponent } from 'react';

const styles = StyleSheet.create({
  buttonBox: {
    maxWidth: 300
  },
  textInput: {
    borderColor: '#AAB8C2',
    borderWidth: 1,
    height: 100,
    marginTop: 20,
    padding: 10
  }
});

export default class ClipboardExample extends PureComponent {
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
