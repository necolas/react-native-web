import React, { Component, PropTypes } from 'react';
import { storiesOf } from '@kadira/storybook';
import { StyleSheet, View, Text, Button, Modal } from 'react-native';

class ModalExample extends Component {
  static propTypes = {
    animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
  };

  state = {
    visible: false,
  };

  _handlePress = () => this.setState(state => ({ visible: !state.visible }));

  render() {
    return (
      <View>
        <Text>Animation type: {this.props.animationType}</Text>
        <Button onPress={this._handlePress} title="Toggle modal" />
        <Modal {...this.props} visible={this.state.visible}>
          <View style={styles.modal}>
            <Text>Modal content</Text>
            <Button onPress={this._handlePress} title="Close modal" />
          </View>
        </Modal>
      </View>
    );
  }
}

storiesOf('component: Modal', module)
  .add('animationType: none', () => <ModalExample animationType="none" />)
  .add('animationType: slide', () => <ModalExample animationType="slide" />)
  .add('animationType: fade', () => <ModalExample animationType="fade" />)
  .add('transparent', () => <ModalExample animationType="slide" transparent />);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
