/**
 * @flow
 */

import React from 'react';
import { styles } from '../helpers';
import { TextInput, View } from 'react-native';

const TextInputPlaceholderExample = () => (
  <View>
    <TextInput placeholder="This is placeholder text" style={styles.textinput} />
    <TextInput multiline={true} placeholder="This is placeholder text" style={styles.multiline} />
  </View>
);

export default TextInputPlaceholderExample;
