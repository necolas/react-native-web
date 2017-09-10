/**
 * @flow
 */

import React from 'react';
import { styles, WithLabel } from '../helpers';
import { TextInput, View } from 'react-native';

const TextInputClearButtonModeExample = () => (
  <View>
    <WithLabel label="never">
      <TextInput clearButtonMode="never" style={styles.textinput} />
    </WithLabel>
    <WithLabel label="while editing">
      <TextInput clearButtonMode="while-editing" style={styles.textinput} />
    </WithLabel>
    <WithLabel label="unless editing">
      <TextInput clearButtonMode="unless-editing" style={styles.textinput} />
    </WithLabel>
    <WithLabel label="always">
      <TextInput clearButtonMode="always" style={styles.textinput} />
    </WithLabel>
  </View>
);

export default TextInputClearButtonModeExample;
