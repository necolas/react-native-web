import React, { useState, useMemo } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import Example from '../../shared/example';

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

function AnimatedModalStack() {
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

const WIGGLE_ROOM = 128;

function Modalception({ depth = 1 }) {
  const [isVisible, setIsVisible] = useState(false);

  const offset = useMemo(() => {
    return {
      top: Math.random() * WIGGLE_ROOM - WIGGLE_ROOM / 2,
      left: Math.random() * WIGGLE_ROOM - WIGGLE_ROOM / 2
    };
  }, []);

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={'Open modal'} />
      <Modal onRequestClose={() => setIsVisible(false)} transparent visible={isVisible}>
        <View style={[styles.containeralt, offset]}>
          <Text>This is in Modal {depth}</Text>
          <Gap />
          {isVisible ? <Modalception depth={depth + 1} /> : null}
          <Gap />
          <Button color="red" onPress={() => setIsVisible(false)} title={'Close'} />
        </View>
      </Modal>
    </>
  );
}

function SimpleModal() {
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

function TransparentModal() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={'Transparent modal'} />
      <Modal onRequestClose={() => setIsVisible(false)} transparent visible={isVisible}>
        <View style={styles.containeralt}>
          <Text style={{ textAlign: 'center' }}>Modal with "transparent" value</Text>
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
  containeralt: {
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

export default function ModalPage() {
  return (
    <Example title="Modal">
      <Gap />
      <SimpleModal />
      <Gap />
      <TransparentModal />
      <Gap />
      <AnimatedModalStack />
      <Gap />
      <Modalception />
    </Example>
  );
}
