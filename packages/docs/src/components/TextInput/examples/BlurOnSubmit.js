/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { styles } from '../helpers';
import { TextInput, View } from 'react-native';

export default function BlurOnSubmit() {
  const refs = React.useRef({});

  const focusNextField = (id) => {
    if (refs.current[id] != null) {
      refs.current[id].focus();
    }
  };

  return (
    <View>
      <TextInput
        blurOnSubmit={false}
        placeholder="blurOnSubmit = false"
        ref={(c) => {
          refs.current['1'] = c;
        }}
        style={styles.textinput}
      />
      <TextInput
        blurOnSubmit={true}
        onSubmitEditing={() => focusNextField('3')}
        placeholder="blurOnSubmit = true"
        ref={(c) => {
          refs.current['2'] = c;
        }}
        style={styles.textinput}
      />
      <TextInput
        blurOnSubmit={true}
        multiline={true}
        onSubmitEditing={(e) => {
          console.log(e.nativeEvent);
        }}
        placeholder="blurOnSubmit = true"
        ref={(c) => {
          refs.current['3'] = c;
        }}
        style={styles.multiline}
      />
    </View>
  );
}
