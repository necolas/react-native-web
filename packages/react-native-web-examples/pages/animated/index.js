import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View, useAnimatedValue } from 'react-native';
import Example from '../../shared/example';

export default function AnimatedPage() {
  const anim = useAnimatedValue(0);

  const animateBox = () => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false
    }).start();
  };

  const transform = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rotate(0deg)', 'rotate(45deg)']
  });

  return (
    <Example title="Animated">
      <View style={styles.container}>
        <Animated.View style={[styles.animatedBox, { transform: transform }]} />
        <Pressable
          onPress={animateBox}
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.4 : 1 }
          ]}
        >
          <Text style={styles.buttonText}>Animate Box</Text>
        </Pressable>
      </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animatedBox: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    alignSelf: 'center'
  },
  button: {
    padding: 16,
    paddingVertical: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    marginTop: 24
  },
  buttonText: { color: 'white' }
});
