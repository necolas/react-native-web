/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
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
  FlatList: AnimatedImplementation.createAnimatedComponent(FlatList, {
    scrollEventThrottle: 0.0001
  }),
  Image: AnimatedImplementation.createAnimatedComponent(Image),
  ScrollView: AnimatedImplementation.createAnimatedComponent(ScrollView, {
    scrollEventThrottle: 0.0001
  }),
  SectionList: AnimatedImplementation.createAnimatedComponent(SectionList, {
    scrollEventThrottle: 0.0001
  }),
  View: AnimatedImplementation.createAnimatedComponent(View),
  Text: AnimatedImplementation.createAnimatedComponent(Text)
};

export default Animated;
