import { DividerVertical } from '../helpers';
import React from 'react';
import { ProgressBar, StyleSheet, View } from 'react-native';

export default function Progress() {
  return (
    <View>
      <ProgressBar color="#794BC4" progress={0.25} style={styles.progress} />
      <DividerVertical />
      <ProgressBar color="#794BC4" progress={0.5} style={styles.progress} />
      <DividerVertical />
      <ProgressBar color="#794BC4" progress={0.75} style={styles.progress} />
      <DividerVertical />
      <ProgressBar color="#794BC4" progress={1.0} style={styles.progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    minWidth: 200,
  },
});
