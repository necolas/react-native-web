import React from 'react';
import { styles } from '../helpers';
import { TextInput, View } from 'react-native';

export default function Placeholder() {
  return (
    <View>
      <TextInput placeholder="This is placeholder text" style={styles.textinput} />
      <TextInput multiline={true} placeholder="This is placeholder text" style={styles.multiline} />
    </View>
  );
}
