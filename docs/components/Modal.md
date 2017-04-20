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

**transparent**: bool

The `transparent` prop determines whether your modal will fill the entire view. Setting this to `true` will render the modal over a transparent background.

**visible**: bool = true

The `visible` prop determines whether your modal is visible.

## Examples

```js
import React, { Component } from 'react'
import { View, Text, Button, Modal } from 'react-native'

class ModalExample extends Component {
  state = { visible: false };

  _handlePress = () => this.setState(state => ({ visible: !state.visible }));

  render() {
    return (
      <View>
        <Button onPress={this._handlePress} title="Toggle modal" />
        <Modal animationType="slide" visible={this.state.visible}>
          <View style={styles.modal}>
            <Text>Modal content</Text>
            <Button onPress={this._handlePress} title="Close modal" />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```
