/**
 * @flow
 */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const hitSlop = { top: 30, bottom: 30, left: 60, right: 60 };

export default class TouchableHitSlopExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timesPressed: 0 };
  }

  _handlePress = () => {
    this.setState({
      timesPressed: this.state.timesPressed + 1
    });
  };

  render() {
    let log = '';
    if (this.state.timesPressed > 1) {
      log = this.state.timesPressed + 'x onPress';
    } else if (this.state.timesPressed > 0) {
      log = 'onPress';
    }

    return (
      <View>
        <View style={styles.row}>
          <TouchableOpacity
            hitSlop={hitSlop}
            onPress={this._handlePress}
            style={styles.hitSlopWrapper}
          >
            <Text style={styles.hitSlopButton}>Press Outside This View</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logBox}>
          <Text>{log}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  hitSlopWrapper: {
    backgroundColor: 'red',
    marginVertical: 30
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  }
});
