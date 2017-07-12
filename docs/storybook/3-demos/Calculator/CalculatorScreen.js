import Calculator from './Calculator';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { StyleSheet, View } from 'react-native';

const CalculatorScreen = () =>
  <View style={styles.container}>
    <Calculator />
  </View>;

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', flex: 1 }
});

storiesOf('Example apps', module).add('Calculator', CalculatorScreen);
