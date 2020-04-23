import * as React from 'react';
import { Text, useColorScheme } from 'react-native';

export function colorSchemeText() {
  const colorScheme = useColorScheme();
  return <Text>Your color scheme is: {colorScheme}</Text>;
}
