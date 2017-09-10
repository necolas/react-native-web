/**
 * @flow
 */

import { DividerVertical } from '../helpers';
import React from 'react';
import { ProgressBar, View } from 'react-native';

const ProgressBarTrackColorExample = () => (
  <View>
    <ProgressBar color="#1DA1F2" progress={0.1} trackColor="#17BF63" />
    <DividerVertical />
    <ProgressBar color="#1DA1F2" progress={0.2} trackColor="#F45D22" />
    <DividerVertical />
    <ProgressBar color="#1DA1F2" progress={0.3} trackColor="#794BC4" />
  </View>
);

export default ProgressBarTrackColorExample;
