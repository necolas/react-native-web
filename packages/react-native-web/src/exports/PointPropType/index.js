/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import createStrictShapeTypeChecker from '../../modules/createStrictShapeTypeChecker';
import { number } from 'prop-types';

const PointPropType = createStrictShapeTypeChecker({
  x: number,
  y: number
});

export default PointPropType;
