/**
 * @flow
 */

import React from 'react';
import { any, bool, string } from 'prop-types';
import { styles } from '../helpers';
import { Text, TextInput, View } from 'react-native';

type SelectionExampleState = {
  selection: {
    start: number,
    end?: number
  },
  value: string
};

class OnSelectionChangeExample extends React.Component {
  state: SelectionExampleState;

  _textInput: any;

  static propTypes = {
    multiline: bool,
    style: any,
    value: string
  };

  constructor(props) {
    super(props);
    this.state = {
      selection: { start: 0, end: 0 },
      value: props.value
    };
  }

  onSelectionChange = ({ nativeEvent: { selection } }) => {
    this.setState({ selection });
  };

  onChangeText = value => {
    this.setState({ value });
  };

  getRandomPosition() {
    const length = this.state.value.length;
    return Math.round(Math.random() * length);
  }

  select = (start, end) => () => {
    this._textInput.focus();
    this.setState({ selection: { start, end } });
  };

  selectRandom = () => {
    const positions = [this.getRandomPosition(), this.getRandomPosition()].sort();
    this.select(...positions)();
  };

  placeAt = position => () => {
    this.select(position, position)();
  };

  placeAtRandom = () => {
    this.placeAt(this.getRandomPosition())();
  };

  setRef = textInput => {
    this._textInput = textInput;
  };

  render() {
    const length = this.state.value.length;

    return (
      <View>
        <TextInput
          multiline={this.props.multiline}
          onChangeText={this.onChangeText}
          onSelectionChange={this.onSelectionChange}
          ref={this.setRef}
          selection={this.state.selection}
          style={this.props.style}
          value={this.state.value}
        />
        <View>
          <Text>selection = {JSON.stringify(this.state.selection)}</Text>
          <Text onPress={this.placeAt(0)}>Place at Start (0, 0)</Text>
          <Text onPress={this.placeAt(length)}>
            Place at End ({length}, {length})
          </Text>
          <Text onPress={this.placeAtRandom}>Place at Random</Text>
          <Text onPress={this.select(0, length)}>Select All</Text>
          <Text onPress={this.selectRandom}>Select Random</Text>
        </View>
      </View>
    );
  }
}

const TextInputOnSelectionChangeExample = () => (
  <View>
    <OnSelectionChangeExample style={styles.textinput} value="text selection can be changed" />
    <OnSelectionChangeExample
      multiline
      style={styles.multiline}
      value={'multiline text selection\ncan also be changed'}
    />
  </View>
);

export default TextInputOnSelectionChangeExample;
