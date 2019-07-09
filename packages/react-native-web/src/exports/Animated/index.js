/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import AnimatedImplementation from '../../vendor/react-native/Animated/AnimatedImplementation';
import Image from '../Image';
import ScrollView from '../ScrollView';
import Text from '../Text';
import View from '../View';
import FlatList from '../FlatList';

const Animated = {
  ...AnimatedImplementation,
  Image: AnimatedImplementation.createAnimatedComponent(Image),
  ScrollView: AnimatedImplementation.createAnimatedComponent(ScrollView),
  View: AnimatedImplementation.createAnimatedComponent(View),
  Text: AnimatedImplementation.createAnimatedComponent(Text),
  FlatList: AnimatedImplementation.createAnimatedComponent(FlatList)
};

export default Animated;
