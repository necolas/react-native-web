import React from 'react';
import { styles } from '../helpers';
import { TextInput, View } from 'react-native';

export default function PlaceholderTextColor() {
  return (
    <View>
      <TextInput
        placeholder="This is placeholder text"
        placeholderTextColor="orange"
        style={styles.textinput}
      />
      <TextInput
        multiline={true}
        placeholder="This is placeholder text"
        placeholderTextColor="red"
        style={styles.multiline}
      />
    </View>
  );
}
