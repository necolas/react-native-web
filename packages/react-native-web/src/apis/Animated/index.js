/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Animated
 * @flow
 */

import AnimatedImplementation from '../../vendor/Animated/AnimatedImplementation';
import Image from '../../components/Image';
import ScrollView from '../../components/ScrollView';
import Text from '../../components/Text';
import View from '../../components/View';

const Animated = {
  ...AnimatedImplementation,
  Image: AnimatedImplementation.createAnimatedComponent(Image),
  ScrollView: AnimatedImplementation.createAnimatedComponent(ScrollView),
  View: AnimatedImplementation.createAnimatedComponent(View),
  Text: AnimatedImplementation.createAnimatedComponent(Text)
};

export default Animated;
