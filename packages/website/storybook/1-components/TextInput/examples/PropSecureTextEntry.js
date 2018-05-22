/**
 * @flow
 */

import React from 'react';
import { styles } from '../helpers';
import { TextInput } from 'react-native';

const TextInputSecureTextEntryExample = () => (
  <TextInput defaultValue="abc" numberOfLines={2} secureTextEntry={true} style={styles.textinput} />
);

export default TextInputSecureTextEntryExample;
