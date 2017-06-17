/**
 * @flow
 */

/*
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

class AutoExpandingTextInput extends React.Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = {
      text:
        'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. The focus of React Native is on developer efficiency across all the platforms you care about — learn once, write anywhere. Facebook uses React Native in multiple production apps and will continue investing in React Native.',
      height: 0
    };
  }

  render() {
    return (
      <TextInput
        {...this.props}
        multiline={true}
        onChangeText={text => {
          this.setState({ text });
        }}
        onContentSizeChange={event => {
          this.setState({ height: event.nativeEvent.contentSize.height });
        }}
        style={[styles.default, { height: Math.max(35, this.state.height) }]}
        value={this.state.text}
      />
    );
  }
}

const styles = StyleSheet.create({
  default: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4
  },
  eventLabel: {
    margin: 3,
    fontSize: 12
  }
});

const AutoExpandingTextInputExample = () =>
  <AutoExpandingTextInput
    enablesReturnKeyAutomatically={true}
    placeholder="height increases with content"
    returnKeyType="default"
  />;

export default AutoExpandingTextInputExample;
*/
