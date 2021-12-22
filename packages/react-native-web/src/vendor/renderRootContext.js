/**
 * Copyright (c) Ondrej Zaruba.
 * Copyright (c) Microsoft and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import { render } from '@testing-library/react';
import RootContext from '../exports/AppRegistry/rootContext';
import StyleResolver from '../exports/StyleSheet/StyleResolver';

function RootContextProvider({ children }) {
    const resolver = new StyleResolver();
    const rootContext = { rootTag: undefined, styleResolver: resolver };

    React.useEffect(() => {
        return function cleanup() {
            resolver.clear();
        }
    })

    return (
        <RootContext.Provider value={rootContext}>
            {children}
        </RootContext.Provider>
    );
}

export default function renderRootContext(element: React.ReactElement, options) {
    return render(element, { wrapper: RootContextProvider, ...options });
}