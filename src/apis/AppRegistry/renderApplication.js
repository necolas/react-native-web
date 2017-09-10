/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import invariant from 'fbjs/lib/invariant';
import { render } from 'react-dom';
import AppContainer from './AppContainer';
import StyleSheet from '../../apis/StyleSheet';
import React from 'react';

export default function renderApplication(
  RootComponent: ReactClass<Object>,
  initialProps: Object,
  rootTag: any
) {
  invariant(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);

  render(
    <AppContainer rootTag={rootTag}>
      <RootComponent {...initialProps} />
    </AppContainer>,
    rootTag
  );
}

export function getApplication(RootComponent: ReactClass<Object>, initialProps: Object): Object {
  const element = (
    <AppContainer rootTag={{}}>
      <RootComponent {...initialProps} />
    </AppContainer>
  );
  const stylesheets = StyleSheet.getStyleSheets().map(sheet => (
    // ensure that CSS text is not escaped
    <style dangerouslySetInnerHTML={{ __html: sheet.textContent }} id={sheet.id} />
  ));
  return { element, stylesheets };
}
