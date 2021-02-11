import { Button, Clipboard, StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import Example from '../../shared/example';

export default function ClipboardPage() {
  const setString = () => {
    const success = Clipboard.setString('This text was copied to the clipboard by React Native');
    console.log(`Clipboard.setString success? ${success}`);
  };

  return (
    <Example title="Clipboard">
      <View style={styles.buttonBox}>
        <Button onPress={setString} title="Copy to clipboard" />
      </View>
      <TextInput
        multiline={true}
        placeholder={'Try pasting here afterwards'}
        style={styles.textInput}
      />
    </Example>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    maxWidth: 300,
    marginTop: '1rem'
  },
  textInput: {
    borderColor: '#AAB8C2',
    borderWidth: 1,
    height: 50,
    marginTop: 20,
    padding: 5
  }
});
