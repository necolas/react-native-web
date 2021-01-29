/**
 * @noflow
 */

import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from '../helpers';

function OnSelectionChange() {
  const [text, setText] = useState('');
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  return (
    <View>
      <TextInput
        onChangeText={setText}
        onSelectionChange={event => {
          setSelection(event.nativeEvent.selection);
        }}
        style={styles.textinput}
        value={text}
      />
      <Text>{JSON.stringify(selection)}</Text>
    </View>
  );
}

export default OnSelectionChange;
