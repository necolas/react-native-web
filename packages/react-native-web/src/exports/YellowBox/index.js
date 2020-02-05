/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import UnimplementedView from '../../modules/UnimplementedView';

function YellowBox(props: Object) {
  return <UnimplementedView {...props} />;
}

YellowBox.ignoreWarnings = () => {};

export default YellowBox;
