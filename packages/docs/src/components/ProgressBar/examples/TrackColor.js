import { DividerVertical } from '../helpers';
import React from 'react';
import { ProgressBar, View } from 'react-native';

export default function TrackColor() {
  return (
    <View>
      <ProgressBar color="rgb(23, 191, 99)" progress={0.1} trackColor="rgba(23, 191, 99, 0.3)" />
      <DividerVertical />
      <ProgressBar color="rgb(244, 93, 34)" progress={0.2} trackColor="rgba(244, 93, 34, 0.3)" />
      <DividerVertical />
      <ProgressBar color="rgb(121, 75, 196)" progress={0.3} trackColor="rgba(121, 75, 196, 0.3)" />
    </View>
  );
}
