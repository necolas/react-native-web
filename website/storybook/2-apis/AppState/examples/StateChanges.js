/**
 * @flow
 */

import React, { PureComponent } from 'react';
import { AppState, Text, View } from 'react-native';

export default class StateChanges extends PureComponent {
  state = {
    active: 0,
    background: 0,
    currentState: AppState.currentState
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = currentState => {
    this.setState(state => ({
      currentState,
      [currentState]: state[currentState] + 1
    }));
  };

  render() {
    return (
      <View>
        <Text>Active count: {this.state.active}</Text>
        <Text>Background count: {this.state.background}</Text>
        <Text>Current state is: {this.state.currentState}</Text>
      </View>
    );
  }
}
