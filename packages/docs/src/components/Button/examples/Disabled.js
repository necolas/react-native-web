import React from 'react';
import { Button } from 'react-native';

export default function Disabled() {
  const onPress = () => {
    console.error('Disabled button should not trigger onPress!');
  };

  return <Button disabled onPress={onPress} title="Disabled button" />;
}
