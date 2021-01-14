import React, { useState, useMemo } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const WIGGLE_ROOM = 128;

function Gap() {
  return <View style={styles.gap} />;
}

export default function Modalception({ depth = 1 }) {
  const [isVisible, setIsVisible] = useState(false);

  const offset = useMemo(() => {
    return {
      top: Math.random() * WIGGLE_ROOM - WIGGLE_ROOM / 2,
      left: Math.random() * WIGGLE_ROOM - WIGGLE_ROOM / 2
    };
  }, []);

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={'Open Modal'} />
      <Modal onRequestClose={() => setIsVisible(false)} transparent visible={isVisible}>
        <View style={[styles.container, offset]}>
          <Text>This is in Modal {depth}</Text>
          <Gap />
          {isVisible ? <Modalception depth={depth + 1} /> : null}
          <Gap />
          <Button color="red" onPress={() => setIsVisible(false)} title={'Close Modal'} />
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
    width: 300
  },
  gap: {
    height: 10
  }
});
