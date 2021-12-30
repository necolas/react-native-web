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
import StyleSheetManager from '../exports/StyleSheet/StyleSheetManager';

function StyleSheetContextProvider({ children }) {
    return (
        <StyleSheetManager>
            {children}
        </StyleSheetManager>
    );
}

export default function renderRootContext(element: React.ReactElement, options) {
    return render(element, { wrapper: StyleSheetContextProvider, ...options });
}
