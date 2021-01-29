import React from 'react';
import { styles } from '../helpers';
import { TextInput } from 'react-native';

export default function SecureTextEntry() {
  return (
    <TextInput
      defaultValue="abc"
      numberOfLines={2}
      secureTextEntry={true}
      style={styles.textinput}
    />
  );
}
