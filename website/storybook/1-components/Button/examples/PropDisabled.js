/**
 * @flow
 */

import React from 'react';
import { Button } from 'react-native';

const onPress = () => {
  console.error('Disabled button should not trigger onPress!');
};
const ButtonDisabledExample = () => <Button disabled onPress={onPress} title="Disabled button" />;

export default ButtonDisabledExample;
