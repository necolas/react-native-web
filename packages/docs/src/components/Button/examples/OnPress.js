import React from 'react';
import { DividerHorizontal } from '../helpers';
import { Button, StyleSheet, View } from 'react-native';

const emptyFunction = () => {};

export default function OnPress() {
  return (
    <View style={styles.horizontal}>
      <Button
        accessibilityLabel="This sounds great!"
        onPress={emptyFunction}
        title="This looks great!"
      />
      <DividerHorizontal />
      <Button color="#841584" onPress={emptyFunction} title="Ok!" />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
  },
});
