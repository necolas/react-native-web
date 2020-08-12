import React, { useState } from 'react';
import { Modal, Text, Button } from 'react-native';

function Animated ({ animationType }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={`Open Modal with '${animationType}'`} />
      <Modal animationType={animationType} onRequestClose={() => setIsVisible(false)} visible={isVisible}>
        <Text>This is in the {animationType} Modal. Hello!</Text>
        <Button onPress={() => setIsVisible(false)} title={'Close Modal'} />
      </Modal>
    </>
  );
}

export default function () {
  return (
    <>
      <Animated animationType={'none'} />
      <Text>&nbsp;</Text>
      <Animated animationType={'slide'} />
      <Text>&nbsp;</Text>
      <Animated animationType={'fade'} />
    </>
  );
}
