import React from 'react';
import { Text, View } from 'react-native';

export default function Selectable() {
  return (
    <View>
      <Text selectable={true}>
        This text is <Text style={{ fontWeight: 'bold' }}>selectable</Text> if you click-and-hold.
      </Text>
      <Text selectable={false}>
        This text is <Text style={{ fontWeight: 'bold' }}>not selectable</Text> if you
        click-and-hold.
      </Text>
    </View>
  );
}
