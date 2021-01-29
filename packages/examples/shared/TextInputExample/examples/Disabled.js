import React from 'react';
import { styles } from '../helpers';
import { TextInput, View } from 'react-native';

export default function Disabled() {
  return (
    <View>
      <TextInput defaultValue="disabled text input" disabled={true} style={styles.textinput} />
      <TextInput
        defaultValue="disabled multiline text input"
        disabled={true}
        multiline={true}
        style={styles.multiline}
      />
    </View>
  );
}
