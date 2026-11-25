/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import invariant from 'invariant';
import type {
  ComponentProps,
  ComponentType,
  ReactElement,
  ReactNode
} from 'react';

import type { Nullable } from '../../types';
import render, { hydrate } from '../render';
import StyleSheet from '../StyleSheet';
import AppContainer from './AppContainer';

export type Application = {
  unmount: () => void;
};

export type ApplicationElement = {
  element: ReactNode;
  getStyleElement: (props?: object) => ReactElement<ComponentProps<'style'>>;
};

export type AppProps = object;

export type WrapperComponentType = ComponentType<{ children: ReactNode }>;

export default function renderApplication<Props extends AppProps>(
  RootComponent: ComponentType<Props>,
  WrapperComponent: Nullable<WrapperComponentType>,
  callback: (() => void) | undefined,
  options: {
    hydrate: boolean;
    initialProps: Props;
    mode: 'concurrent' | 'legacy';
    rootTag: HTMLElement;
  }
): Application {
  const { hydrate: shouldHydrate, initialProps, rootTag } = options;
  const renderFn = shouldHydrate ? hydrate : render;

  invariant(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);

  return renderFn(
    <AppContainer
      WrapperComponent={WrapperComponent}
      ref={callback}
      rootTag={rootTag}
    >
      <RootComponent {...initialProps} />
    </AppContainer>,
    rootTag
  );
}

export function getApplication(
  RootComponent: ComponentType<AppProps>,
  initialProps: Nullable<AppProps>,
  WrapperComponent?: Nullable<WrapperComponentType>
): ApplicationElement {
  const element = (
    <AppContainer WrapperComponent={WrapperComponent} rootTag={{}}>
      <RootComponent {...initialProps} />
    </AppContainer>
  );
  // Don't escape CSS text
  const getStyleElement = (props?: object) => {
    const sheet = StyleSheet.getSheet();
    return (
      <style
        {...props}
        dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        id={sheet.id}
      />
    );
  };
  return { element, getStyleElement };
}
