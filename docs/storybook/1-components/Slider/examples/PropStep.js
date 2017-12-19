/**
 * @flow
 */
import { styles } from '../helpers';
import React, { Component } from 'react';
import { Slider, View, Text } from 'react-native';

class PropStep extends Component {
  state = { value: 0 }

  handleValueChange = (value) => {
    this.setState({ value });
  }

  render() {
    return (
      <View style={styles.row}>
        <View>
          <Slider maximumValue={10} step={2} onValueChange={this.handleValueChange}/>
        </View>
        <Text>{this.state.value}</Text>
      </View>
    )
  }
}

export default PropStep;
