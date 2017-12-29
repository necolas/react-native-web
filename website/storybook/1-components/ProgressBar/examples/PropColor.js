/**
 * @flow
 */

import React from 'react';
import { DividerVertical } from '../helpers';
import { ProgressBar, View } from 'react-native';

const ProgressBarColorExample = () => (
  <View>
    <ProgressBar color="#1DA1F2" progress={0.2} />
    <DividerVertical />
    <ProgressBar color="#17BF63" progress={0.4} />
    <DividerVertical />
    <ProgressBar color="#F45D22" progress={0.6} />
    <DividerVertical />
    <ProgressBar color="#794BC4" progress={0.8} />
    <DividerVertical />
    <ProgressBar color="#E0245E" progress={1.0} />
  </View>
);

export default ProgressBarColorExample;
