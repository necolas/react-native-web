# Modal

The Modal component is a simple way to present content above an enclosing view.

## Props

**animationType**: oneOf('none', 'slide', 'fade') = 'none'

The `animationType` prop controls how the modal animates.

* `slide` slides in from the bottom
* `fade` fades into view
* `none` appears without an animation

**onShow**: function

The `onShow` prop allows passing a function that will be called once the modal has been shown.

**transparent**: bool = true

The `transparent` prop determines whether your modal will fill the entire view. Setting this to `true` will render the modal over a transparent background.

**visible**: bool = true

The `visible` prop determines whether your modal is visible.

## Examples

```javascript
import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import { Modal, Button , Text, View } from 'react-native';

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
```
