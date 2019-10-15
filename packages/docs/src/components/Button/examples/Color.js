import React from 'react';
import { DividerVertical } from '../helpers';
import { Button, View } from 'react-native';

const emptyFunction = () => {};

export default function Color() {
  return (
    <View>
      <Button color="#17BF63" onPress={emptyFunction} title="Press me" />
      <DividerVertical />
      <Button color="#F45D22" onPress={emptyFunction} title="Press me" />
      <DividerVertical />
      <Button color="#794BC4" onPress={emptyFunction} title="Press me" />
      <DividerVertical />
      <Button color="#E0245E" onPress={emptyFunction} title="Press me" />
    </View>
  );
}
