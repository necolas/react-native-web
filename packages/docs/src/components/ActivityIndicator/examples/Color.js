import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Color() {
  return (
    <View style={styles.horizontal}>
      <ActivityIndicator color="#1DA1F2" style={styles.item} />
      <ActivityIndicator color="#17BF63" style={styles.item} />
      <ActivityIndicator color="#F45D22" style={styles.item} />
      <ActivityIndicator color="#794BC4" style={styles.item} />
      <ActivityIndicator color="#E0245E" style={styles.item} />
      <ActivityIndicator color="#FFAD1F" style={styles.item} />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  item: {
    paddingRight: 10
  }
});
