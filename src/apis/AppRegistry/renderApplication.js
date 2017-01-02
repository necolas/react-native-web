/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import invariant from 'fbjs/lib/invariant';
import { render } from 'react-dom/lib/ReactMount';
import ReactNativeApp from './ReactNativeApp';
import StyleSheet from 'apis/StyleSheet';
import React, { Component } from 'react';

export default function renderApplication(RootComponent: Component, initialProps: Object, rootTag: any) {
  invariant(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);

  const component = (
    <ReactNativeApp
      initialProps={initialProps}
      rootComponent={RootComponent}
      rootTag={rootTag}
    />
  );
  render(component, rootTag);
}

export function getApplication(RootComponent: Component, initialProps: Object): Object {
  const element = (
    <ReactNativeApp
      initialProps={initialProps}
      rootComponent={RootComponent}
    />
  );
  const stylesheet = StyleSheet.renderToString();
  return { element, stylesheet };
}
