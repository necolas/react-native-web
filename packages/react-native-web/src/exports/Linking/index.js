/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import invariant from 'fbjs/lib/invariant';

const initialURL = canUseDOM ? window.location.href : '';

const Linking = {
  addEventListener() {},
  removeEventListener() {},
  canOpenURL(): Promise<boolean> {
    return Promise.resolve(true);
  },
  getInitialURL(): Promise<string> {
    return Promise.resolve(initialURL);
  },
  openURL(url: string): Promise<Object | void> {
    try {
      open(url);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  _validateURL(url: string) {
    invariant(typeof url === 'string', 'Invalid URL: should be a string. Was: ' + url);
    invariant(url, 'Invalid URL: cannot be empty');
  }
};

const open = url => {
  if (canUseDOM) {
    window.location = new URL(url, window.location).toString();
  }
};

export default Linking;
