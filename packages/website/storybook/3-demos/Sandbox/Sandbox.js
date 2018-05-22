import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class Sandbox extends React.PureComponent {
  render() {
    return <View styles={styles.root} />;
  }
}

const styles = StyleSheet.create({
  root: {}
});
