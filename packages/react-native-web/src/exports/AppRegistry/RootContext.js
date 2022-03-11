/**
 * Copyright (c) Ondrej Zaruba.
 * Copyright (c) Microsoft Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import ResponderSystem from '../../modules/useResponderEvents/ResponderSystem';
import StyleResolver from '../StyleSheet/StyleResolver';

export type RootContextType = {
  styleResoler: StyleResolver,
  responderSystem: typeof ResponderSystem,
  rootTag?: Node
};

const RootContext = React.createContext<RootContextType>(null);

export default RootContext;
