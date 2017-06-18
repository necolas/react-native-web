/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule I18nManager
 * @flow
 */

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

type I18nManagerStatus = {
  allowRTL: (allowRTL: boolean) => void,
  forceRTL: (forceRTL: boolean) => void,
  setPreferredLanguageRTL: (setRTL: boolean) => void,
  isRTL: boolean
};

let isPreferredLanguageRTL = false;
let isRTLAllowed = true;
let isRTLForced = false;

const isRTL = () => {
  if (isRTLForced) {
    return true;
  }
  return isRTLAllowed && isPreferredLanguageRTL;
};

const onChange = () => {
  if (ExecutionEnvironment.canUseDOM) {
    if (document.documentElement && document.documentElement.setAttribute) {
      document.documentElement.setAttribute('dir', isRTL() ? 'rtl' : 'ltr');
    }
  }
};

const I18nManager: I18nManagerStatus = {
  allowRTL(bool) {
    isRTLAllowed = bool;
    onChange();
  },
  forceRTL(bool) {
    isRTLForced = bool;
    onChange();
  },
  setPreferredLanguageRTL(bool) {
    isPreferredLanguageRTL = bool;
    onChange();
  },
  get isRTL() {
    return isRTL();
  }
};

export default I18nManager;
