/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { number, oneOf, oneOfType, string } from 'prop-types';

const AnimationPropTypes = {
  animationDelay: string,
  animationDirection: oneOf(['alternate', 'alternate-reverse', 'normal', 'reverse']),
  animationDuration: string,
  animationFillMode: oneOf(['none', 'forwards', 'backwards', 'both']),
  animationIterationCount: oneOfType([number, oneOf(['infinite'])]),
  animationName: string,
  animationPlayState: oneOf(['paused', 'running']),
  animationTimingFunction: string
};

export default AnimationPropTypes;
