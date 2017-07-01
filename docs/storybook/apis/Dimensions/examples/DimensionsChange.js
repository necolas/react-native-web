import {
  StyleSheet,
  Dimensions,
  Button,
  View,
  ScrollView,
  Text
} from 'react-native'
import React, { Component } from 'react'

const styles = StyleSheet.create({
  logs: {
    maxHeight: 256
  },
  log: {
    fontFamily: 'monospace',
    fontSize: 6,
    marginTop: 8,
    marginBottom: 8
  }
});

export default class ChangeEventExample extends Component {
  state = {
    listened: false,
    logs: []
  }

  render() {
    const { logs, listened } = this.state;
    const buttonTitle = listened ? 'Remove listener' : 'Add listener';
    return (
      <View>
        <Button onPress={this.toggle} title={buttonTitle} />
        <ScrollView style={styles.logs}>
          {logs.map((log, i) =>
            <Text key={i} style={styles.log}>{log}</Text>
          )}
        </ScrollView>
      </View>
    )
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
    this.setState({ listened: !listened });
  }

  _handleChange = ({ window, screen }) => {
    window = JSON.stringify(window);
    screen = JSON.stringify(screen);
    this._log(`Changed. window=${window}. screen=${screen}`);
  }

  _log = msg => {
    this.setState({
      logs: [`${new Date().toTimeString()} - ${msg}`, ...this.state.logs]
    });
  }
}
