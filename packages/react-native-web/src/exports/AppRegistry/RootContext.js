/**
 * Copyright (c) Ondrej Zaruba.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import StyleResolver from '../StyleSheet/StyleResolver';

const RootContext = React.createContext<{ styleResoler: StyleResolver, rootTag?: Node }>(null);
export default RootContext;
