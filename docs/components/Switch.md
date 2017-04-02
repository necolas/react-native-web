# Switch

This is a controlled component that requires an `onValueChange` callback that
updates the value prop in order for the component to reflect user actions. If
the `value` prop is not updated, the component will continue to render the
supplied `value` prop instead of the expected result of any user actions.

## Props

[...View props](./View.md)

**disabled**: ?boolean = false

If `true` the user won't be able to interact with the switch.

**onValueChange**: ?function

Invoked with the new value when the value changes.

**value**: ?boolean = false

The value of the switch. If `true` the switch will be turned on.

(web) **activeThumbColor**: ?color = #009688

The color of the thumb grip when the switch is turned on.

(web) **activeTrackColor**: ?color = #A3D3CF

The color of the track when the switch is turned on.

(web) **thumbColor**: ?color = #FAFAFA

The color of the thumb grip when the switch is turned off.

(web) **trackColor**: ?color = #939393

The color of the track when the switch is turned off.

## Examples

```js
import React, { Component } from 'react'
import { Switch, View } from 'react-native'

class ColorSwitchExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colorTrueSwitchIsOn: true,
      colorFalseSwitchIsOn: false
    }
  }

  render() {
    return (
      <View>
        <Switch
          activeThumbColor='#428BCA'
          activeTrackColor='#A0C4E3'
          onValueChange={(value) => this.setState({ colorFalseSwitchIsOn: value })}
          value={this.state.colorFalseSwitchIsOn}
        />
        <Switch
          activeThumbColor='#5CB85C'
          activeTrackColor='#ADDAAD'
          onValueChange={(value) => this.setState({ colorTrueSwitchIsOn: value })}
          thumbColor='#EBA9A7'
          trackColor='#D9534F'
          value={this.state.colorTrueSwitchIsOn}
        />
      </View>
    )
  }
}
```
