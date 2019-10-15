import React from 'react';
import styles from './styles';
import { CheckBox, View } from 'react-native';

export default function CustomSize() {
  return (
    <View style={styles.row}>
      <View style={styles.marginRight}>
        <CheckBox style={{ height: 20, width: 20 }} value />
      </View>
      <View style={styles.marginRight}>
        <CheckBox style={{ height: 32, width: 32 }} value />
      </View>
    </View>
  );
}
