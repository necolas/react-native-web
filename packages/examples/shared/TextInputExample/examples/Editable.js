import React from 'react';
import { styles } from '../helpers';
import { TextInput, View } from 'react-native';

export default function Editable() {
  return (
    <View>
      <TextInput defaultValue="uneditable text input" editable={false} style={styles.textinput} />
      <TextInput
        defaultValue="uneditable multiline text input"
        editable={false}
        multiline={true}
        style={styles.multiline}
      />
    </View>
  );
}
