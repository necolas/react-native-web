/* eslint-disable react/jsx-no-bind */

/**
 * @flow
 */

import React from 'react';
import { styles as helperStyles } from '../helpers';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class TextEventsExample extends React.Component {
  state = {
    curText: '<No Event>',
    prevText: '<No Event>',
    prev2Text: '<No Event>',
    prev3Text: '<No Event>'
  };

  updateText = text => {
    this.setState(state => {
      return {
        curText: text,
        prevText: state.curText,
        prev2Text: state.prevText,
        prev3Text: state.prev2Text
      };
    });
  };

  render() {
    return (
      <View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onBlur={() => this.updateText('onBlur')}
          onChange={event => this.updateText('onChange text: ' + event.nativeEvent.text)}
          onEndEditing={event => this.updateText('onEndEditing text: ' + event.nativeEvent.text)}
          onFocus={() => this.updateText('onFocus')}
          onKeyPress={event => {
            this.updateText('onKeyPress key: ' + event.nativeEvent.key);
          }}
          onSelectionChange={event =>
            this.updateText(
              'onSelectionChange range: ' +
                event.nativeEvent.selection.start +
                ',' +
                event.nativeEvent.selection.end
            )}
          onSubmitEditing={event =>
            this.updateText('onSubmitEditing text: ' + event.nativeEvent.text)}
          placeholder="Enter text to see events"
          style={[helperStyles.textinput, { maxWidth: 200 }]}
        />
        <Text style={styles.eventLabel}>
          {this.state.curText}
          {'\n'}
          (prev: {this.state.prevText}){'\n'}
          (prev2: {this.state.prev2Text}){'\n'}
          (prev3: {this.state.prev3Text})
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventLabel: {
    margin: 3,
    fontSize: 12
  }
});
