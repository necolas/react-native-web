/**
 * @flow
 */

import { logger } from '../helpers';
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

const ViewStyleExample = () => (
  <View pointerEvents="box-none">
    <View pointerEvents="box-none">
      <View pointerEvents="none">
        <Text onPress={logger}>none</Text>
      </View>
      <TouchableHighlight onPress={logger} pointerEvents="auto">
        <Text>auto</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={logger} pointerEvents="box-only">
        <Text>box-only</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={logger} pointerEvents="box-none">
        <Text>box-none</Text>
      </TouchableHighlight>
    </View>
  </View>
);

export default ViewStyleExample;
