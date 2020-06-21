import React, { useState } from 'react';
import { Modal, Text, Button } from 'react-native';

export default function () {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={'Open Modal'} />
      <Modal onRequestClose={() => setIsVisible(false)} visible={isVisible}>
        <Text>Hello, World!</Text>
        <Button onPress={() => setIsVisible(false)} title={'Close Modal'} />
      </Modal>
    </>
  );
}
