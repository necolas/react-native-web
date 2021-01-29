import React from 'react';
import { DividerVertical } from '../helpers';
import { ProgressBar, View } from 'react-native';

export default function Color() {
  return (
    <View>
      <ProgressBar color="#1DA1F2" progress={0.5} />
      <DividerVertical />
      <ProgressBar color="#17BF63" progress={0.5} />
      <DividerVertical />
      <ProgressBar color="#F45D22" progress={0.5} />
      <DividerVertical />
      <ProgressBar color="#794BC4" progress={0.5} />
      <DividerVertical />
      <ProgressBar color="#E0245E" progress={0.5} />
    </View>
  );
}
