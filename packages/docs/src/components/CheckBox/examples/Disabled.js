import React from 'react';
import styles from './styles';
import { CheckBox, View } from 'react-native';

export default function Disabled() {
  return (
    <View style={styles.row}>
      <View style={styles.marginRight}>
        <CheckBox disabled value={false} />
      </View>
      <View style={styles.marginRight}>
        <CheckBox disabled value />
      </View>
    </View>
  );
}
