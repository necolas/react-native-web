/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule PickerStylePropType
 * @flow
 */

import ColorPropType from '../../propTypes/ColorPropType';
import ViewStylePropTypes from '../View/ViewStylePropTypes';

const PickerStylePropType = {
  ...ViewStylePropTypes,
  color: ColorPropType
};

export default PickerStylePropType;
