/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import { createContext } from 'react';

const TextAncestorContext = createContext<boolean>(false);
export default TextAncestorContext;
