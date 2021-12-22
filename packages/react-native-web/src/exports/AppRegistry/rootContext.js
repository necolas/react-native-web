/**
 * Copyright (c) Ondrej Zaruba.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import StyleResolver from '../../exports/StyleSheet/StyleResolver';

const RootContext: { styleResoler: StyleResolver, rootTag: Node } = React.createContext(null);
export default RootContext;
