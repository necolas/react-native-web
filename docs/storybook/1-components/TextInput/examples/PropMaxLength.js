/**
 * @flow
 */

import React from 'react';
import { styles, WithLabel } from '../helpers';
import { TextInput, View } from 'react-native';

const TextInputMaxLengthExample = () => (
  <View>
    <WithLabel label="maxLength: 5">
      <TextInput maxLength={5} style={styles.textinput} />
    </WithLabel>
    <WithLabel label="maxLength: 5 with placeholder">
      <TextInput maxLength={5} placeholder="ZIP code entry" style={styles.textinput} />
    </WithLabel>
    <WithLabel label="maxLength: 5 with default value already set">
      <TextInput defaultValue="94025" maxLength={5} style={styles.textinput} />
    </WithLabel>
    <WithLabel label="maxLength: 5 with very long default value already set">
      <TextInput defaultValue="9402512345" maxLength={5} style={styles.textinput} />
    </WithLabel>
  </View>
);

export default TextInputMaxLengthExample;
