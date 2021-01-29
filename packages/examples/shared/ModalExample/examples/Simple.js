import React, { useState } from 'react';
import { Modal, Text, View, Button, StyleSheet } from 'react-native';

function Gap() {
  return <View style={styles.gap} />;
}

export default function SimpleModal() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={'Simple modal'} />
      <Modal onRequestClose={() => setIsVisible(false)} visible={isVisible}>
        <View style={styles.container}>
          <Text>Hello, World!</Text>
          <Gap />
          <Button onPress={() => setIsVisible(false)} title={'Close'} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  gap: {
    height: 10
  }
});
