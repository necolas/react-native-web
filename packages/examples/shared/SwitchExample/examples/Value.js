import { styles } from '../helpers';
import React from 'react';
import { Switch, View } from 'react-native';

export default function Value() {
  return (
    <View style={styles.row}>
      <View style={styles.marginRight}>
        <Switch value={false} />
      </View>
      <View style={styles.marginRight}>
        <Switch value={true} />
      </View>
    </View>
  );
}
