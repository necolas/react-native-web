import React, { useRef, useState } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text, TouchableOpacity } from 'react-native';

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [x, setX] = useState(0);

  const panResponder = useRef(null);
  if (panResponder.current == null) {
    panResponder.current = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: e => {
        console.log('pan grant');
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        console.log('pan release');
        pan.flattenOffset();
      },
      onPanResponderTerminate() {
        console.log('pan terminate');
        pan.flattenOffset();
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Pressed: {x}</Text>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.current.panHandlers}
      >
        <View style={styles.box}>
          <TouchableOpacity onPress={() => setX(x + 1)} style={styles.outerTouchable}>
            <TouchableOpacity
              onPress={() => {
                console.log('press inner');
              }}
              style={styles.innerTouchable}
            />
            <TouchableOpacity disabled style={styles.innerTouchable} />
            <TouchableOpacity
              accessibilityRole="button"
              disabled
              style={[styles.innerTouchable, styles.disabledButton]}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none'
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold'
  },
  box: {
    height: 200,
    width: 150,
    backgroundColor: 'lightblue',
    borderRadius: 5
  },
  outerTouchable: {
    height: 150,
    width: 100,
    margin: 25,
    backgroundColor: 'blue',
    borderRadius: 5,
    justifyContent: 'center'
  },
  innerTouchable: {
    height: 20,
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: 'green',
    borderRadius: 5
  },
  disabledButton: {
    backgroundColor: 'red'
  }
});

export default App;
