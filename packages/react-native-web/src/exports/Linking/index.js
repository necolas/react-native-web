/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Linking
 * @flow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

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
  }
};

const open = url => {
  const anchor = document.createElement('a');
  anchor.target = '_blank'; // :(
  anchor.rel = 'noopener';
  anchor.href = url;
  const body = document.body;
  if (body) {
    body.appendChild(anchor);
    anchor.click();
    body.removeChild(anchor);
  }
};

export default Linking;
