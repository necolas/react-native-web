/**
 * @flow
 */

import React from 'react';
import { styles as helperStyles } from '../helpers';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class TextInputRewrite extends React.Component {
  state = { text: '' };

  handleChangeText = text => {
    text = text.replace(/ /g, '_');
    this.setState({ text });
  };

  render() {
    const limit = 20;
    const remainder = limit - this.state.text.length;
    const remainderColor = remainder > 5 ? 'blue' : 'red';
    return (
      <View style={styles.rewriteContainer}>
        <TextInput
          maxLength={limit}
          multiline={false}
          onChangeText={this.handleChangeText}
          style={helperStyles.textinput}
          value={this.state.text}
        />
        <Text style={[styles.remainder, { color: remainderColor }]}>{remainder}</Text>
      </View>
    );
  }
}

export class TextInputRewriteInvalidCharacters extends React.Component {
  state = { text: '' };

  handleChangeText = text => {
    text = text.replace(/\s/g, '_');
    this.setState({ text });
  };

  render() {
    return (
      <View style={styles.rewriteContainer}>
        <TextInput
          multiline={false}
          onChangeText={this.handleChangeText}
          style={helperStyles.textinput}
          value={this.state.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rewriteContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  remainder: {
    textAlign: 'right',
    width: 24
  }
});
