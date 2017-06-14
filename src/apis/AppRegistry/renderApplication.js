/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
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
  const stylesheets = StyleSheet.getStyleSheets().map(sheet =>
    <style id={sheet.id}>{sheet.textContent}</style>
  );
  return { element, stylesheets };
}
