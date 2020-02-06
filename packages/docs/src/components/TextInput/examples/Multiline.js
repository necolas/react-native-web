import React, { useState } from 'react';
import { styles } from '../helpers';
import { TextInput, View } from 'react-native';

const MIN_HEIGHT = 24;

function Autogrow() {
  const [height, setHeight] = useState(MIN_HEIGHT);
  const [value, setValue] = useState('');

  function onContentSizeChange(e) {
    const { height } = e.nativeEvent.contentSize;
    setHeight(Math.max(MIN_HEIGHT, height));
  }

  function onChangeText(text) {
    setValue(text);
  }

  return (
    <View>
      <TextInput
        multiline={true}
        onChangeText={onChangeText}
        onContentSizeChange={onContentSizeChange}
        style={[styles.multiline, { height }]}
        value={value}
      />
    </View>
  );
}

export default function Multiline() {
  return (
    <View>
      <TextInput multiline={true} style={styles.multiline} />
      <Autogrow />
    </View>
  );
}
