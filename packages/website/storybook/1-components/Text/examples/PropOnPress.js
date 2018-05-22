/**
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class TextOnPressExample extends React.Component {
  state = { timesPressed: 0 };

  render() {
    let textLog = '';
    if (this.state.timesPressed > 1) {
      textLog = this.state.timesPressed + 'x text onPress';
    } else if (this.state.timesPressed > 0) {
      textLog = 'text onPress';
    }

    return (
      <View>
        <Text onPress={this._handlePress} style={styles.textBlock}>
          Text has built-in onPress handling
        </Text>
        <View style={styles.logBox}>
          <Text>{textLog}</Text>
        </View>
      </View>
    );
  }

  _handlePress = () => {
    this.setState({
      timesPressed: this.state.timesPressed + 1
    });
  };
}

const styles = StyleSheet.create({
  logBox: {
    padding: 20,
    marginTop: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  },
  textBlock: {
    fontWeight: '500',
    color: 'blue'
  }
});

export default TextOnPressExample;
