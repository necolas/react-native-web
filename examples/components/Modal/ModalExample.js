import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import { Modal, Button , Text, View } from 'react-native';
const examples = [
  {
    title: 'Simple Modal',
    description: 'The title and onPress handler are required. It is ' +
    'recommended to set accessibilityLabel to help make your app usable by ' +
    'everyone.',
    render: function() {
      return (
        <ModalExample/>
      );
    },
  },
];
class ModalExample extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
    }
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    console.log(visible);
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{display:'flex',flex:1}}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <View>
              <Text>Modal!</Text>
            </View>
          </View>
        </Modal>
        <Button onPress={() => {
          console.log('Press');
          this.setModalVisible(true)
        }} title="dialog"/>
      </View>
    );
  }
}
examples.forEach((example) => {
  storiesOf('component: Modal', module)
    .add(example.title, () => example.render());
});
