import React from 'react';
import styles from './styles';
import { CheckBox, View } from 'react-native';

export default function Value() {
  return (
    <View style={styles.row}>
      <View style={styles.marginRight}>
        <CheckBox value={false} />
      </View>
      <View style={styles.marginRight}>
        <CheckBox value />
      </View>
    </View>
  );
}
