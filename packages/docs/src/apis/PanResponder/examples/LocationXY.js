import React, { Component } from 'react';
import { StyleSheet, View, PanResponder } from 'react-native';

export default class LocationXY extends Component {
  constructor() {
    super();
    this.state = { translateX: 0 };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderTerminationRequest: () => true
    });
  }

  _handlePanResponderMove = (e, gestureState) => {
    console.log(e.nativeEvent.locationX, e.nativeEvent.locationY);
    this.setState(state => ({
      ...state,
      translateX: gestureState.dx
    }));
  };

  render() {
    const transform = { transform: [{ translateX: this.state.translateX }] };
    return (
      <View style={styles.app}>
        <View style={styles.outer} {...this.panResponder.panHandlers}>
          <View style={[styles.inner, transform]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  outer: {
    width: 250,
    height: 50,
    backgroundColor: 'skyblue'
  },
  inner: {
    width: 30,
    height: 30,
    backgroundColor: 'lightblue'
  }
});
