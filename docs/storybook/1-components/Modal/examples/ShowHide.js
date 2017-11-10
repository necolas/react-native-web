/**
 * @flow
 */

import React from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';

class ShowHide extends React.Component {
  state = {
    visible: false,
    width: 0,
    height: 0
  };

  show = () => {
    this.setState({
      visible: true
    });
  };

  hide = () => {
    this.setState({
      visible: false
    });
  };

  onLayout = ({ nativeEvent: { layout: { width, height } } }) => {
    this.setState({
      width,
      height
    });
  };

  render() {
    const { width, height, visible } = this.state;

    return (
      // Need Modal.Root in storybook, we can also write in .storybook/decorator-centered.js.
      // Doesn't need it when we using AppRegistry.
      <Modal.Root>
        <View onLayout={this.onLayout} style={styles.container}>
          <Button onPress={this.show} title="Show modal" />
          <Modal visible={visible}>
            <View style={[styles.modal, { width, height }]}>
              <Button onPress={this.hide} title="Hide modal" />
            </View>
          </Modal>
        </View>
      </Modal.Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee'
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  }
});

export default ShowHide;
