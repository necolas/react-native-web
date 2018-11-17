/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import AnimatedImplementation from '../../vendor/react-native/Animated/AnimatedImplementation';
import FlatList from '../FlatList';
import Image from '../Image';
import SectionList from '../SectionList';
import ScrollView from '../ScrollView';
import Text from '../Text';
import View from '../View';

const Animated = {
  ...AnimatedImplementation,
  FlatList: AnimatedImplementation.createAnimatedComponent(FlatList),
  Image: AnimatedImplementation.createAnimatedComponent(Image),
  ScrollView: AnimatedImplementation.createAnimatedComponent(ScrollView),
  SectionList: AnimatedImplementation.createAnimatedComponent(SectionList),
  Text: AnimatedImplementation.createAnimatedComponent(Text),
  View: AnimatedImplementation.createAnimatedComponent(View)
};

export default Animated;
