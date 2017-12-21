/* eslint-disable react/jsx-no-bind */

/**
 * @flow
 */

import React from 'react';
import { styles } from '../helpers';
import { TextInput, View } from 'react-native';

class TextInputBlurOnSubmitExample extends React.Component {
  _nodes = {};

  focusNextField = nextField => {
    this._nodes[nextField].focus();
  };

  render() {
    return (
      <View>
        <TextInput
          blurOnSubmit={false}
          placeholder="blurOnSubmit = false"
          ref={c => {
            this._nodes['1'] = c;
          }}
          style={styles.textinput}
        />
        <TextInput
          blurOnSubmit={true}
          onSubmitEditing={() => this.focusNextField('3')}
          placeholder="blurOnSubmit = true"
          ref={c => {
            this._nodes['2'] = c;
          }}
          style={styles.textinput}
        />
        <TextInput
          blurOnSubmit={true}
          multiline={true}
          onSubmitEditing={e => {
            console.log(e.nativeEvent);
          }}
          placeholder="blurOnSubmit = true"
          ref={c => {
            this._nodes['3'] = c;
          }}
          style={styles.multiline}
        />
      </View>
    );
  }
}

export default TextInputBlurOnSubmitExample;
