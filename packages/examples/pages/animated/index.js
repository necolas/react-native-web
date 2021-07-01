import React, { useRef } from 'react';
import { Button, StyleSheet, View, Animated, Easing } from 'react-native';
import Example from '../../shared/example';

function Divider() {
  return <View style={styles.divider} />;
}

export default function ButtonPage() {
  const animated = useRef(new Animated.Value(0));
  const hide = () => {
    Animated.timing(animated.current, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true
    }).start();
  };

  const show = () => {
    Animated.spring(animated.current, {
      toValue: 1,
      duration: 1000,
      bounciness: 1000,
      delay: 100,
      useNativeDriver: true
    }).start();
  };

  const showEaseInOut = () => {
    Animated.timing(animated.current, {
      toValue: 1,
      duration: 1000,
      bounciness: 1000,
      easing: Easing.out(Easing.elastic(2)),
      useNativeDriver: true
    }).start();
  };

  const showDecay = () => {
    Animated.decay(animated.current, {
      useNativeDriver: true,
      velocity: 0.1
    }).start();
  };

  const showBounce = () => {
    Animated.timing(animated.current, {
      toValue: 1,
      duration: 1000,
      bounciness: 1000,
      easing: Easing.out(Easing.bounce),
      delay: 100,
      useNativeDriver: true
    }).start();
  };

  /*useEffect(() => {
    animated.current.setValue(1);
  }, []);*/

  return (
    <Example title="Button">
      <Animated.View
        style={{
          opacity: animated.current,
          width: 100,
          height: 100,
          backgroundColor: 'red',
          transform: [
            {
              scale: Animated.add(animated.current, 1)
            },
            {
              translateX: Animated.multiply(animated.current, 100)
            }
          ]
        }}
      />

      <Animated.View
        style={{
          opacity: animated.current,
          width: 100,
          height: 100,
          backgroundColor: 'green',
          transform: [
            {
              scale: Animated.add(animated.current, 1)
            },
            {
              translateX: Animated.multiply(animated.current, 100)
            }
          ]
        }}
      />

      <Animated.View
        style={{
          opacity: animated.current,
          width: 100,
          height: 100,
          backgroundColor: 'blue',
          transform: [
            {
              scale: Animated.add(animated.current, 1)
            },
            {
              translateX: animated.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100]
              })
            }
          ]
        }}
      />
      <Button onPress={hide} title="Hide" />
      <Divider />
      <Button onPress={showDecay} title="Hide (decay)" />
      <Divider />
      <Button onPress={show} title="Show (spring)" />
      <Divider />
      <Button onPress={showEaseInOut} title="Show (ease-in-out)" />
      <Divider />
      <Button onPress={showBounce} title="Show (bounce)" />
    </Example>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: '1rem'
  }
});
