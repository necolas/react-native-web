import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Example from '../../shared/example';

const emptyFunction = () => {};

function Divider() {
  return <View style={styles.divider} />
}

export default function ButtonPage() {
  const disabledOnPress = () => {
    console.error('Disabled button should not trigger onPress!');
  };

  return (
    <Example title="Button">
      <Divider />
      <Button onPress={emptyFunction} title="Button" />
      <Divider />
      <Button color="#17BF63" onPress={emptyFunction} title="Button" />
      <Divider />
      <Button color="#794BC4" onPress={emptyFunction} title="Button" />
      <Divider />
      <Button color="#E0245E" onPress={emptyFunction} title="Button" />
      <Divider />
      <Button disabled onPress={disabledOnPress} title="Disabled button" />
    </Example>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: '1rem'
  }
});
