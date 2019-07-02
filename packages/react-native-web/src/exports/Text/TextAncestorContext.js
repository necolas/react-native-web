/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import * as React from 'react';
const TextAncestorContext = React.createContext(false);
export default (TextAncestorContext: React.Context<boolean>);
