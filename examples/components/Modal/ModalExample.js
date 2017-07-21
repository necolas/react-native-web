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
      animationType: 'none',
      transparent: false,
    }
  }

  render() {
    return (
      <View style={{display:'flex',flex:1}}>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onShow={this.state.onShow}
        >
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <View style={{backgroundColor:'gray',alignItems:'center',justifyContent:'center',width:200,height:100}}>
              <Text>Modal!</Text>
              <Button onPress={()=>{
                  this.setState({
                    modalVisible:false
                  })
                }} title="Close"/>
            </View>
          </View>
        </Modal>
        <Button onPress={() => {
                  this.setState({
                    modalVisible:true,
                    animationType:'slide'
                  })
        }} title="animation slide"/>
        <Button onPress={() => {
                  this.setState({
                    modalVisible:true,
                    animationType:'fade'
                  })
        }} title="animation fade"/>
        <Button onPress={() => {
                  this.setState({
                    modalVisible:true,
                    animationType:'none'
                  })
        }} title="animation none"/>
        <Button onPress={() => {
                  this.setState({
                    transparent:!this.state.transparent
                  })
        }} title="change transparent"/>
        <Button onPress={() => {
                  this.setState({
                    modalVisible:true,
                    animationType:'none',
                    onShow:function(){
                      alert('aaa');
                    }
                  })
        }} title="with onShow"/>
      </View>
    );
  }
}
examples.forEach((example) => {
  storiesOf('component: Modal', module)
    .add(example.title, () => example.render());
});
