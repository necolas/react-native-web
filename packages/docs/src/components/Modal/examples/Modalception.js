import React, { useState, useMemo } from 'react';
import { Modal, View, Text, Button } from 'react-native';

const WIGGLE_ROOM = 128;

export default function Modalception ({ depth = 1 }) {
  const [isVisible, setIsVisible] = useState(false);

  const offset = useMemo(() => {
    return {
      top: (Math.random() * WIGGLE_ROOM)-(WIGGLE_ROOM/2),
      left: (Math.random() * WIGGLE_ROOM)-(WIGGLE_ROOM/2),
    }
  }, []);

  if (!isVisible) {
    return (
      <>
        <Button onPress={() => setIsVisible(true)} title={'Open Modal'} />
      </>
    );
  }

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={'Open Modal'} />
      <Modal onRequestClose={() => setIsVisible(false)} transparent visible={isVisible}>
        <View style={[style.backdrop]} />
        <View style={[style.modal, offset]}>
          <View style={[style.container]}>
            <Text>This is in Modal {depth}. Hello!</Text>
            <Modalception depth={depth + 1} />
            <Button onPress={() => setIsVisible(false)} title={'Close Modal'} />
          </View>
        </View>
      </Modal>
    </>
  );
}

const style = {
  backdrop: {
    zIndex: -1,
    position: 'fixed',
    background: 'rgba(255, 255, 255, 0.6)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  container: {
    width: 600,
    background: 'white',
    border: '1px solid black',
    margin: '40px',
    padding: '20px'
  }
};
