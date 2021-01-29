import React, { useState } from 'react';
import { Modal, Text, Button, View, StyleSheet } from 'react-native';

function Gap() {
  return <View style={styles.gap} />;
}

function AnimatedModal({ animationType }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={`Animation '${animationType}'`} />
      <Modal
        animationType={animationType}
        onRequestClose={() => setIsVisible(false)}
        visible={isVisible}
      >
        <View style={styles.container}>
          <Text>Modal with "animationType" of "{animationType}"</Text>
          <Gap />
          <Button onPress={() => setIsVisible(false)} title={'Close Modal'} />
        </View>
      </Modal>
    </>
  );
}

export default function AnimatedModalStack() {
  return (
    <>
      <AnimatedModal animationType={'none'} />
      <Gap />
      <AnimatedModal animationType={'slide'} />
      <Gap />
      <AnimatedModal animationType={'fade'} />
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
