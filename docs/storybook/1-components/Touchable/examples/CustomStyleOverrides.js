/**
 * @flow
 */

import React from 'react';
import { processColor, StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export default class TouchableCustomStyleOverridesExample extends React.Component {
  buttons = ['One', 'Two', 'Three'];
  state = {};

  select = selectedButton => event => {
    const newState = {};
    this.buttons.forEach(button => {
      newState[button] = selectedButton === button;
    });
    this.setState(newState);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.buttons.map(button => {
          return (
            <TouchableHighlight
              key={button}
              onPress={this.select(button)}
              style={[styles.touchable, this.state[button] && styles.blue]}
              underlayColor={processColor('#1B95E0', 0.125)}
            >
              <Text style={[!this.state[button] && styles.text]}>{button}</Text>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blue: {
    backgroundColor: processColor('#1B95E0', 0.25),
    borderColor: '#1B95E0'
  },
  text: {
    color: '#555'
  },
  container: {
    flexDirection: 'row'
  },
  touchable: {
    borderWidth: 3,
    borderColor: '#ccc',
    padding: 20,
    marginVertical: 10,
    marginRight: 10
  }
});
