/* eslint-disable */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ensurePositiveDelayProps
 * @flow
 */

import invariant from 'fbjs/lib/invariant';

const ensurePositiveDelayProps = (props: any) => {
  invariant(
    !(props.delayPressIn < 0 || props.delayPressOut < 0 || props.delayLongPress < 0),
    'Touchable components cannot have negative delay properties'
  );
};

export default ensurePositiveDelayProps;
