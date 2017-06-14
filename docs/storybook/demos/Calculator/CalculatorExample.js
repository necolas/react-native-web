import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Calculator from './Calculator';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', flex: 1 }
});

storiesOf('Example apps', module).add('Calculator', () =>
  <View style={styles.container}>
    <Calculator />
  </View>
);
