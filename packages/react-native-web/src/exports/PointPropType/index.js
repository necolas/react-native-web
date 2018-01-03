/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule PointPropType
 * @flow
 */

import createStrictShapeTypeChecker from '../../modules/createStrictShapeTypeChecker';
import { number } from 'prop-types';

const PointPropType = createStrictShapeTypeChecker({
  x: number,
  y: number
});

export default PointPropType;
