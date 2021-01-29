import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const DividerVertical = () => <View style={styles.verticalDivider} />;

const emptyFunction = () => {};

export default function ButtonPage() {
  const disabledOnPress = () => {
    console.error('Disabled button should not trigger onPress!');
  };

  return (
    <View>
      <Button color="#17BF63" onPress={emptyFunction} title="Press me" />
      <DividerVertical />
      <Button onPress={emptyFunction} title="Press me" />
      <DividerVertical />
      <Button color="#794BC4" onPress={emptyFunction} title="Press me" />
      <DividerVertical />
      <Button color="#E0245E" onPress={emptyFunction} title="Press me" />
      <DividerVertical />
      <Button disabled onPress={disabledOnPress} title="Disabled button" />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row'
  },
  horizontalDivider: {
    width: '0.6rem'
  },
  verticalDivider: {
    height: '1.3125rem'
  }
});
