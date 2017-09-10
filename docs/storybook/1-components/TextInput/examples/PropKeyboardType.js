/**
 * @flow
 */

import React from 'react';
import { styles, WithLabel } from '../helpers';
import { TextInput, View } from 'react-native';

const keyboardTypes = [
  'default',
  //'ascii-capable',
  //'numbers-and-punctuation',
  'url',
  'number-pad',
  'phone-pad',
  //'name-phone-pad',
  'email-address',
  //'decimal-pad',
  //'twitter',
  'web-search',
  'numeric'
];

const TextInputKeyboardTypeExample = () => (
  <View>
    {keyboardTypes.map(type => (
      <WithLabel key={type} label={type}>
        <TextInput keyboardType={type} style={styles.textinput} />
      </WithLabel>
    ))}
  </View>
);

export default TextInputKeyboardTypeExample;
