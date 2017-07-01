/**
 * @flow
 */

/*
import React, { PureComponent } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default class MultipleSourcesExample extends PureComponent {
  state = {
    width: 30,
    height: 30
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.touchableText} onPress={this.decreaseImageSize}>
            Decrease image size
          </Text>
          <Text style={styles.touchableText} onPress={this.increaseImageSize}>
            Increase image size
          </Text>
        </View>
        <Text>Container image size: {this.state.width}x{this.state.height} </Text>
        <View style={{ height: this.state.height, width: this.state.width }}>
          <Image
            style={{ flex: 1 }}
            source={[
              { uri: 'http://facebook.github.io/react/img/logo_small.png', width: 38, height: 38 },
              {
                uri: 'http://facebook.github.io/react/img/logo_small_2x.png',
                width: 76,
                height: 76
              },
              { uri: 'http://facebook.github.io/react/img/logo_og.png', width: 400, height: 400 }
            ]}
          />
        </View>
      </View>
    );
  }

  increaseImageSize = () => {
    if (this.state.width >= 100) {
      return;
    }
    this.setState(state => ({
      width: state.width + 10,
      height: state.height + 10
    }));
  };

  decreaseImageSize = () => {
    if (this.state.width <= 10) {
      return;
    }
    this.setState(state => ({
      width: state.width - 10,
      height: state.height - 10
    }));
  };
}

const styles = StyleSheet.create({
  touchableText: {
    color: 'blue',
    fontWeight: '500'
  }
});
*/
