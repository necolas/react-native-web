/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule AppRegistry
 * @flow
 */

import invariant from 'fbjs/lib/invariant';
import unmountComponentAtNode from '../unmountComponentAtNode';
import renderApplication, { getApplication } from './renderApplication';
import type { ComponentType } from 'react';

const emptyObject = {};
const runnables = {};

export type ComponentProvider = () => ComponentType<any>;

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

  static registerComponent(appKey: string, getComponentFunc: ComponentProvider): string {
    runnables[appKey] = {
      getApplication: ({ initialProps } = emptyObject) =>
        getApplication(getComponentFunc(), initialProps),
      run: ({ initialProps = emptyObject, rootTag, callback }) =>
        renderApplication(getComponentFunc(), initialProps, rootTag, callback)
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

  static runApplication(appKey: string, appParameters?: Object): void {
    const isDevelopment = process.env.NODE_ENV !== 'production';
    const params = { ...appParameters };
    params.rootTag = `#${params.rootTag.id}`;

    console.log(
      `Running application "${appKey}" with appParams: ${JSON.stringify(params)}.\n` +
        `Development-level warnings: ${isDevelopment ? 'ON' : 'OFF'}.\n` +
        `Performance optimizations: ${isDevelopment ? 'OFF' : 'ON'}.`
    );

    invariant(
      runnables[appKey] && runnables[appKey].run,
      `Application "${appKey}" has not been registered. ` +
        'This is either due to an import error during initialization or failure to call AppRegistry.registerComponent.'
    );

    runnables[appKey].run(appParameters);
  }

  static unmountApplicationComponentAtRootTag(rootTag: Object) {
    unmountComponentAtNode(rootTag);
  }
}
