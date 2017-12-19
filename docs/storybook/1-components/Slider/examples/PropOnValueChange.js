/**
 * @flow
 */
import { styles } from '../helpers';
import React, { Component } from 'react';
import { Slider, View, Text } from 'react-native';

class PropOnValueChange extends Component {
  state = { value: 0 }

  handleValueChange = (value: number) => {
    this.setState({ value });
  }

  render() {
    return (
      <View style={styles.row}>
        <View>
          <Slider onValueChange={this.handleValueChange}/>
        </View>
        <Text>{parseFloat(this.state.value).toFixed(2)}</Text>
      </View>
    )
  }
}

export default PropOnValueChange;
