/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use client';

import type {
  AppProps,
  Application,
  ApplicationElement,
  WrapperComponentType
} from './renderApplication';
import type { ComponentType } from 'react';

import invariant from 'invariant';
import type { Root } from '../render';
import unmountComponentAtNode from '../unmountComponentAtNode';
import renderApplication, { getApplication } from './renderApplication';

type PartialAppParameters = {
  readonly callback?: () => void,
  readonly hydrate?: boolean,
  readonly initialProps?: AppProps,
  readonly mode?: 'concurrent' | 'legacy',
  readonly rootTag?: HTMLElement,
  ...
};
type AppParameters = {
  ...PartialAppParameters,
  readonly rootTag: HTMLElement,
  ...
};
type Runnable = (appParameters: AppParameters) => Application;
type RegisteredApp = {
  getApplication?: (appParameters: ?PartialAppParameters) => ApplicationElement,
  run: Runnable
};

export type ComponentProvider = () => ComponentType<empty>;
export type ComponentProviderInstrumentationHook = (
  component: ComponentProvider
) => ComponentType<empty>;
export type WrapperComponentProvider = (
  appParameters: ?PartialAppParameters
) => WrapperComponentType;

export type AppConfig = {
  appKey: string,
  component?: ComponentProvider,
  run?: Runnable,
  section?: boolean
};

const emptyObject = {};
const runnables: Record<string, RegisteredApp> = {};

let componentProviderInstrumentationHook: ComponentProviderInstrumentationHook =
  (component: ComponentProvider) => component();
let wrapperComponentProvider: ?WrapperComponentProvider;

/**
 * `AppRegistry` is the JS entry point to running all React Native apps.
 */
export default class AppRegistry {
  static getAppKeys(): Array<string> {
    return Object.keys(runnables);
  }

  static getApplication(
    appKey: string,
    appParameters?: PartialAppParameters
  ): ApplicationElement {
    invariant(
      runnables[appKey] && runnables[appKey].getApplication,
      `Application ${appKey} has not been registered. ` +
        'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.'
    );

    return runnables[appKey].getApplication(appParameters);
  }

  static registerComponent(
    appKey: string,
    componentProvider: ComponentProvider
  ): string {
    runnables[appKey] = {
      getApplication: (appParameters) =>
        getApplication(
          // $FlowFixMe[incompatible-type] initialProps are not checked against the component props
          componentProviderInstrumentationHook(componentProvider),
          appParameters ? appParameters.initialProps : emptyObject,
          wrapperComponentProvider?.(appParameters)
        ),
      run: (appParameters): Application =>
        renderApplication(
          // $FlowFixMe[incompatible-type] initialProps are not checked against the component props
          componentProviderInstrumentationHook(componentProvider),
          wrapperComponentProvider?.(appParameters),
          appParameters.callback,
          {
            hydrate: appParameters.hydrate || false,
            initialProps: appParameters.initialProps || emptyObject,
            mode: appParameters.mode || 'concurrent',
            rootTag: appParameters.rootTag
          }
        )
    };
    return appKey;
  }

  static registerConfig(config: Array<AppConfig>) {
    config.forEach(({ appKey, component, run }) => {
      if (run) {
        AppRegistry.registerRunnable(appKey, run);
      } else {
        invariant(component, 'No component provider passed in');
        AppRegistry.registerComponent(appKey, component);
      }
    });
  }

  // TODO: fix style sheet creation when using this method
  static registerRunnable(appKey: string, run: Runnable): string {
    runnables[appKey] = { run };
    return appKey;
  }

  static runApplication(
    appKey: string,
    appParameters: AppParameters
  ): Application {
    const isDevelopment =
      process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';
    if (isDevelopment) {
      const params: { ...AppParameters, rootTag: HTMLElement | string, ... } = {
        ...appParameters
      };
      // $FlowFixMe[prop-missing] rootTag is still an HTMLElement when read here
      params.rootTag = `#${params.rootTag.id}`;

      console.log(
        `Running application "${appKey}" with appParams:\n`,
        params,
        `\nDevelopment-level warnings: ON.` +
          `\nPerformance optimizations: OFF.`
      );
    }

    invariant(
      runnables[appKey] && runnables[appKey].run,
      `Application "${appKey}" has not been registered. ` +
        'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.'
    );

    return runnables[appKey].run(appParameters);
  }

  static setComponentProviderInstrumentationHook(
    hook: ComponentProviderInstrumentationHook
  ) {
    componentProviderInstrumentationHook = hook;
  }

  static setWrapperComponentProvider(provider: WrapperComponentProvider) {
    wrapperComponentProvider = provider;
  }

  static unmountApplicationComponentAtRootTag(rootTag: Root) {
    unmountComponentAtNode(rootTag);
  }
}
