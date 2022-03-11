/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';

import AppContainer from './AppContainer';
import invariant from 'fbjs/lib/invariant';
import render, { hydrate } from '../render';
import StyleResolver from '../StyleSheet/StyleResolver';
import ReactRootView from '../AppRegistry/ReactRootView';

export default function renderApplication<Props: Object>(
  RootComponent: React.ComponentType<Props>,
  WrapperComponent?: ?React.ComponentType<*>,
  callback?: () => void,
  options: {
    hydrate: boolean,
    initialProps: Props,
    rootTag: any
  }
) {
  const { hydrate: shouldHydrate, initialProps, rootTag } = options;
  const renderFn = shouldHydrate ? hydrate : render;

  invariant(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);

  renderFn(
    <ReactRootView rootTag={rootTag}>
      <AppContainer WrapperComponent={WrapperComponent}>
        <RootComponent {...initialProps} />
      </AppContainer>
    </ReactRootView>,
    rootTag,
    callback
  );
}

export function getApplication(
  RootComponent: React.ComponentType<Object>,
  initialProps: Object,
  WrapperComponent?: ?React.ComponentType<*>
): {| element: React.Node, getStyleElement: (Object) => React.Node |} {
  const styleResolver = new StyleResolver();
  const element = (
    <ReactRootView _styleResolver={styleResolver} rootTag={document.body}>
      <AppContainer WrapperComponent={WrapperComponent}>
        <RootComponent {...initialProps} />
      </AppContainer>
    </ReactRootView>
  );
  // Don't escape CSS text
  const getStyleElement = (props) => {
    const sheet = styleResolver.getStyleSheet();
    return (
      <style {...props} dangerouslySetInnerHTML={{ __html: sheet.textContent }} id={sheet.id} />
    );
  };
  return { element, getStyleElement };
}
