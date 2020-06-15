import React, { useState } from 'react';
import { Modal, Text, Button } from 'react-native';

export default function ExampleModal() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={'Open Modal'} />
      <Modal animationType={'slide'} visible={isVisible} onRequestClose={() => setIsVisible(false)}>
        <Text>This is in the Modal. Hello!</Text>
        <Button onPress={() => setIsVisible(false)} title={'Close Modal'} />
      </Modal>
    </>
  );
}
