import * as React from 'react';
import { Text, useColorScheme } from 'react-native';

export default function ColorSchemeText() {
  const colorScheme = useColorScheme();
  return <Text>Your color scheme is: {colorScheme}</Text>;
}
