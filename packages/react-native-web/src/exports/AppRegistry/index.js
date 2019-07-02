/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import invariant from 'fbjs/lib/invariant';
import unmountComponentAtNode from '../unmountComponentAtNode';
import renderApplication, { getApplication } from './renderApplication';
import type { ComponentType } from 'react';

const emptyObject = {};
const runnables = {};

export type ComponentProvider = () => ComponentType<any>;
export type ComponentProviderInstrumentationHook = (
  component: ComponentProvider
) => ComponentType<any>;
export type WrapperComponentProvider = any => ComponentType<*>;

let componentProviderInstrumentationHook: ComponentProviderInstrumentationHook = (
  component: ComponentProvider
) => component();
let wrapperComponentProvider: ?WrapperComponentProvider;

export type AppConfig = {
  appKey: string,
  component?: ComponentProvider,
  run?: Function,
  section?: boolean
};

/**
 * `AppRegistry` is the JS entry point to running all React Native apps.
 */
export default class AppRegistry {
  static getAppKeys(): Array<string> {
    return Object.keys(runnables);
  }

  static getApplication(appKey: string, appParameters?: Object): string {
    invariant(
      runnables[appKey] && runnables[appKey].getApplication,
      `Application ${appKey} has not been registered. ` +
        'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.'
    );

    return runnables[appKey].getApplication(appParameters);
  }

  static registerComponent(appKey: string, componentProvider: ComponentProvider): string {
    runnables[appKey] = {
      getApplication: appParameters =>
        getApplication(
          componentProviderInstrumentationHook(componentProvider),
          appParameters ? appParameters.initialProps : emptyObject,
          wrapperComponentProvider && wrapperComponentProvider(appParameters)
        ),
      run: appParameters =>
        renderApplication(
          componentProviderInstrumentationHook(componentProvider),
          appParameters.initialProps || emptyObject,
          appParameters.rootTag,
          wrapperComponentProvider && wrapperComponentProvider(appParameters),
          appParameters.callback
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
  static registerRunnable(appKey: string, run: Function): string {
    runnables[appKey] = { run };
    return appKey;
  }

  static runApplication(appKey: string, appParameters: Object): void {
    const isDevelopment = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';
    if (isDevelopment) {
      const params = { ...appParameters };
      params.rootTag = `#${params.rootTag.id}`;

      console.log(
        `Running application "${appKey}" with appParams:\n`,
        params,
        `\nDevelopment-level warnings: ${isDevelopment ? 'ON' : 'OFF'}.` +
          `\nPerformance optimizations: ${isDevelopment ? 'OFF' : 'ON'}.`
      );
    }

    invariant(
      runnables[appKey] && runnables[appKey].run,
      `Application "${appKey}" has not been registered. ` +
        'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.'
    );

    runnables[appKey].run(appParameters);
  }

  static setComponentProviderInstrumentationHook(hook: ComponentProviderInstrumentationHook) {
    componentProviderInstrumentationHook = hook;
  }

  static setWrapperComponentProvider(provider: WrapperComponentProvider) {
    wrapperComponentProvider = provider;
  }

  static unmountApplicationComponentAtRootTag(rootTag: Object) {
    unmountComponentAtNode(rootTag);
  }
}
