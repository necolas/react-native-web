/**
 * @flow
 */

import React from 'react';
import { styles } from '../helpers';
import { TextInput, View } from 'react-native';

const TextInputMultilineExample = () => (
  <View>
    <TextInput multiline={true} style={styles.multiline} />
    <TextInput multiline={true} style={styles.multiline} />
  </View>
);

export default TextInputMultilineExample;
