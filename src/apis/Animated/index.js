/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import AnimatedImplementation from './AnimatedImplementation'
import Image from '../../components/Image'
import Text from '../../components/Text'
import View from '../../components/View'

module.exports = {
  ...AnimatedImplementation,
  View: AnimatedImplementation.createAnimatedComponent(View),
  Text: AnimatedImplementation.createAnimatedComponent(Text),
  Image: AnimatedImplementation.createAnimatedComponent(Image)
}
