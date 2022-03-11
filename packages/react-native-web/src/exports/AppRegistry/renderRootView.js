/**
 * Copyright (c) Ondrej Zaruba.
 * Copyright (c) Microsoft Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import { render } from '@testing-library/react';
import ReactRootView from '../../exports/AppRegistry/ReactRootView';

function ReactRootViewProvider({ children }) {
  return <ReactRootView>{children}</ReactRootView>;
}

export default function renderRootView(element: React.ReactElement, options) {
  return render(element, { wrapper: ReactRootViewProvider, ...options });
}
