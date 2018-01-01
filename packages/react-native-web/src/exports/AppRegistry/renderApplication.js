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

import AppContainer from './AppContainer';
import invariant from 'fbjs/lib/invariant';
import hydrate from '../../modules/hydrate';
import render from '../render';
import StyleSheet from '../StyleSheet';
import React, { type ComponentType } from 'react';

const renderFn = process.env.NODE_ENV !== 'production' ? render : hydrate;

export default function renderApplication<Props: Object>(
  RootComponent: ComponentType<Props>,
  initialProps: Props,
  rootTag: any
) {
  invariant(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);

  renderFn(
    <AppContainer rootTag={rootTag}>
      <RootComponent {...initialProps} />
    </AppContainer>,
    rootTag
  );
}

export function getApplication(RootComponent: ComponentType<Object>, initialProps: Object): Object {
  const element = (
    <AppContainer rootTag={{}}>
      <RootComponent {...initialProps} />
    </AppContainer>
  );
  const stylesheets = StyleSheet.getStyleSheets().map(sheet => (
    // ensure that CSS text is not escaped
    <style dangerouslySetInnerHTML={{ __html: sheet.textContent }} id={sheet.id} key={sheet.id} />
  ));
  return { element, stylesheets };
}
