import React from 'react';
import { styles } from '../helpers';
import { TextInput, View } from 'react-native';

export default function ClearTextOnFocusExample() {
  return (
    <View>
      <TextInput
        clearTextOnFocus={true}
        defaultValue="text is cleared on focus"
        placeholder="text is cleared on focus"
        style={styles.textinput}
      />
      <TextInput
        clearTextOnFocus={true}
        defaultValue="text is cleared on focus"
        multiline={true}
        placeholder="text is cleared on focus"
        style={styles.multiline}
      />
    </View>
  );
}
