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
import Image from '../Image';
import ScrollView from '../ScrollView';
import Text from '../Text';
import View from '../View';

const Animated = {
  ...AnimatedImplementation,
  Image: AnimatedImplementation.createAnimatedComponent(Image),
  ScrollView: AnimatedImplementation.createAnimatedComponent(ScrollView),
  View: AnimatedImplementation.createAnimatedComponent(View),
  Text: AnimatedImplementation.createAnimatedComponent(Text)
};

export default Animated;
