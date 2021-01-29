import React from 'react';
import { styles } from '../helpers';
import { TextInput, View } from 'react-native';

export default function SelectTextOnFocus() {
  return (
    <View>
      <TextInput
        defaultValue="text is selected on focus"
        placeholder="text is selected on focus"
        selectTextOnFocus={true}
        style={styles.textinput}
      />
      <TextInput
        defaultValue="text is selected on focus"
        multiline={true}
        placeholder="text is selected on focus"
        selectTextOnFocus={true}
        style={styles.multiline}
      />
    </View>
  );
}
