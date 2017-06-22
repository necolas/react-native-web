/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Platform
 * @flow
 */

const Platform = {
  OS: 'web',
  select: (obj: Object) => ('web' in obj ? obj.web : obj.default)
};

export default Platform;
