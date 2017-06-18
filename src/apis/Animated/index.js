/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Animated
 * @noflow
 */

import Animated from 'animated';
import Image from '../../components/Image';
import ScrollView from '../../components/ScrollView';
import StyleSheet from '../StyleSheet';
import Text from '../../components/Text';
import View from '../../components/View';

Animated.inject.FlattenStyle(StyleSheet.flatten);

const AnimatedImplementation = {
  ...Animated,
  Image: Animated.createAnimatedComponent(Image),
  ScrollView: Animated.createAnimatedComponent(ScrollView),
  Text: Animated.createAnimatedComponent(Text),
  View: Animated.createAnimatedComponent(View)
};

export default AnimatedImplementation;
