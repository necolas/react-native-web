/* eslint-disable react/prefer-es6-class */

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

class Flip extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      theta: new Animated.Value(45)
    };
  }

  componentDidMount() {
    this._animate();
  }

  _animate = () => {
    this.state.theta.setValue(0);
    Animated.timing(this.state.theta, {
      toValue: 360,
      duration: 5000
    }).start(this._animate);
  };

  render() {
    return (
      <View style={styles.flipCardContainer}>
        <Animated.View
          style={[
            styles.flipCard,
            {
              transform: [
                { perspective: 850 },
                {
                  rotateX: this.state.theta.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['0deg', '180deg']
                  })
                }
              ]
            }
          ]}
        >
          <Text style={styles.flipText}>This text is flipping great.</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.flipCard,
            {
              position: 'absolute',
              top: 0,
              backgroundColor: 'red',
              transform: [
                { perspective: 850 },
                {
                  rotateX: this.state.theta.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['180deg', '360deg']
                  })
                }
              ]
            }
          ]}
        >
          <Text style={styles.flipText}>On the flip side...</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box1: {
    left: 0,
    backgroundColor: 'green',
    height: 50,
    top: 0,
    transform: [
      { translateX: 100 },
      { translateY: 50 },
      { rotate: '30deg' },
      { scaleX: 2 },
      { scaleY: 2 }
    ],
    width: 50
  },
  box2: {
    left: 0,
    backgroundColor: 'purple',
    height: 50,
    top: 0,
    transform: [
      { scaleX: 2 },
      { scaleY: 2 },
      { translateX: 100 },
      { translateY: 50 },
      { rotate: '30deg' }
    ],
    width: 50
  },
  box3step1: {
    left: 0,
    backgroundColor: 'lightpink',
    height: 50,
    top: 0,
    transform: [{ rotate: '30deg' }],
    width: 50
  },
  box3step2: {
    left: 0,
    backgroundColor: 'hotpink',
    height: 50,
    opacity: 0.5,
    top: 0,
    transform: [{ rotate: '30deg' }, { scaleX: 2 }, { scaleY: 2 }],
    width: 50
  },
  box3step3: {
    left: 0,
    backgroundColor: 'deeppink',
    height: 50,
    opacity: 0.5,
    top: 0,
    transform: [
      { rotate: '30deg' },
      { scaleX: 2 },
      { scaleY: 2 },
      { translateX: 10 },
      { translateY: 50 }
    ],
    width: 50
  },
  box4: {
    left: 0,
    backgroundColor: 'darkorange',
    height: 50,
    top: 0,
    transform: [{ translateX: 20 }, { translateY: 35 }, { scale: 2.5 }, { rotate: '-0.2rad' }],
    width: 100
  },
  box5: {
    backgroundColor: 'maroon',
    height: 50,
    right: 0,
    top: 0,
    width: 50
  },
  box5Transform: {
    transform: [{ translateX: -50 }, { translateY: 35 }, { rotate: '50deg' }, { scale: 2 }]
  },
  flipCardContainer: {
    marginVertical: 40,
    flex: 1,
    alignSelf: 'center'
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden'
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
});

const examples = [
  {
    title: 'Perspective',
    render() {
      return <Flip />;
    }
  }
  /*
  {
    title: 'Translate, Rotate, Scale',
    render() {
      return <View style={styles.box1} />;
    }
  },
  {
    title: 'Scale, Translate, Rotate, ',
    render() {
      return <View style={styles.box2} />;
    }
  },
  {
    title: 'Rotate',
    render() {
      return <View style={styles.box3step1} />;
    }
  },
  {
    title: 'Rotate, Scale',
    render() {
      return <View style={styles.box3step2} />;
    }
  },
  {
    title: 'Rotate, Scale, Translate ',
    render() {
      return <View style={styles.box3step3} />;
    }
  },
  {
    title: 'Translate, Scale, Rotate',
    render() {
      return <View style={styles.box4} />;
    }
  },
  {
    title: 'Translate, Rotate, Scale',
    render() {
      return <View style={[styles.box5, styles.box5Transform]} />;
    }
  }
  */
];

export default examples;
