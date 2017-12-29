import { Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';

export default class ChangeEventExample extends Component {
  state = {
    listened: false,
    logs: []
  };

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this._handleChange);
  }

  render() {
    const { logs, listened } = this.state;
    const buttonTitle = listened ? 'Remove listener' : 'Add listener';
    return (
      <View>
        <Button onPress={this.toggle} title={buttonTitle} />
        <ScrollView style={styles.logs}>
          {logs.map((log, i) => (
            <Text key={i} style={styles.log}>
              {log}
            </Text>
          ))}
        </ScrollView>
      </View>
    );
  }

  toggle = () => {
    const { listened } = this.state;
    if (listened) {
      Dimensions.removeEventListener('change', this._handleChange);
      this._log('Removed listener');
    } else {
      Dimensions.addEventListener('change', this._handleChange);
      this._log('Added listener');
    }
    this.setState(() => ({ listened: !listened }));
  };

  _handleChange = ({ window, screen }) => {
    window = JSON.stringify(window, null, 2);
    screen = JSON.stringify(screen, null, 2);
    this._log(`Changed\nwindow = ${window}\nscreen = ${screen}`);
  };

  _log = msg => {
    this.setState(state => ({
      logs: [`${new Date().toTimeString()} - ${msg}`, ...state.logs]
    }));
  };
}

const styles = StyleSheet.create({
  logs: {
    maxHeight: 256
  },
  log: {
    fontFamily: 'monospace, monospace',
    marginTop: 8,
    marginBottom: 8
  }
});
