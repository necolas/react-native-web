import React from 'react';
import styles from './styles';
import { CheckBox, View } from 'react-native';

export default function Color() {
  return (
    <View style={styles.row}>
      <View style={styles.marginRight}>
        <CheckBox color="#1DA1F2" value />
      </View>
      <View style={styles.marginRight}>
        <CheckBox color="#F45D22" value />
      </View>
    </View>
  );
}
