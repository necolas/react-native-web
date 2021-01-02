import React, { useState } from 'react';
import { Modal, Text, View, Button, StyleSheet } from 'react-native';

function Gap() {
  return <View style={styles.gap} />;
}

export default function TransparentModal() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={'Open Modal'} />
      <Modal onRequestClose={() => setIsVisible(false)} transparent visible={isVisible}>
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>Modal with "transparent" value</Text>
          <Gap />
          <Button onPress={() => setIsVisible(false)} title={'Close Modal'} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    height: 300,
    margin: 'auto',
    padding: 30,
    width: 300,
  },
  gap: {
    height: 10,
  },
});
