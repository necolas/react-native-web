import React from 'react';
import { styles } from '../helpers';
import { TextInput, View } from 'react-native';

export default function Multiline() {
  return (
    <View>
      <TextInput multiline={true} style={styles.multiline} />
      <TextInput multiline={true} style={styles.multiline} />
    </View>
  );
}
