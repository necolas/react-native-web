/**
 * Copyright (c) Ondrej Zaruba.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import ResponderSystem from '../../modules/useResponderEvents/ResponderSystem';
import StyleResolver from './StyleResolver';

const StyleSheetContext = React.createContext<{
  styleResoler: StyleResolver,
  responderSystem: ResponderSystem,
  rootTag?: Node
}>(null);
export default StyleSheetContext;
