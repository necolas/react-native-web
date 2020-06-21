import React, { useState } from 'react';
import { Modal, Text, Button } from 'react-native';

export default function () {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={'Open Modal'} />
      <Modal transparent visible={isVisible}>
        <Text>This Modal has a Transparent Background.</Text>
        <Button onPress={() => setIsVisible(false)} title={'Close Modal'} />
      </Modal>
    </>
  );
}
