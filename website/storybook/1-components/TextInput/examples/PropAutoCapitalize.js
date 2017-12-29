/**
 * @flow
 */

import React from 'react';
import { WithLabel, styles } from '../helpers';
import { TextInput, View } from 'react-native';

const TextInputAutoCapitalizeExample = () => (
  <View>
    <WithLabel label="none">
      <TextInput autoCapitalize="none" style={styles.textinput} />
    </WithLabel>
    <WithLabel label="sentences">
      <TextInput autoCapitalize="sentences" style={styles.textinput} />
    </WithLabel>
    <WithLabel label="words">
      <TextInput autoCapitalize="words" style={styles.textinput} />
    </WithLabel>
    <WithLabel label="characters">
      <TextInput autoCapitalize="characters" style={styles.textinput} />
    </WithLabel>
  </View>
);

export default TextInputAutoCapitalizeExample;
