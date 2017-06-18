/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ensureComponentIsNative
 * @flow
 */

import invariant from 'fbjs/lib/invariant';

const ensureComponentIsNative = (component: any) => {
  invariant(
    component && typeof component.setNativeProps === 'function',
    'Touchable child must either be native or forward setNativeProps to a native component'
  );
};

export default ensureComponentIsNative;
