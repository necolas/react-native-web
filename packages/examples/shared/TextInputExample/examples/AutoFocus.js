import React from 'react';
import { styles } from '../helpers';
import { TextInput } from 'react-native';

export default function AutoFocus() {
  return <TextInput autoFocus={true} style={styles.default} />;
}
