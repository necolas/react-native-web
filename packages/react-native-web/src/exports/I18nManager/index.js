/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

type I18nManagerStatus = {
  allowRTL: (allowRTL: boolean) => void,
  doLeftAndRightSwapInRTL: boolean,
  forceRTL: (forceRTL: boolean) => void,
  isRTL: boolean,
  setPreferredLanguageRTL: (setRTL: boolean) => void,
  swapLeftAndRightInRTL: (flipStyles: boolean) => void
};

let doLeftAndRightSwapInRTL = true;
let isPreferredLanguageRTL =
  ExecutionEnvironment.canUseDOM &&
  document.documentElement != null &&
  document.documentElement.getAttribute('dir') === 'rtl';
let isRTLAllowed = true;
let isRTLForced = false;

const isRTL = () => {
  if (isRTLForced) {
    return true;
  }
  return isRTLAllowed && isPreferredLanguageRTL;
};

const onDirectionChange = () => {
  if (ExecutionEnvironment.canUseDOM) {
    if (document.documentElement && document.documentElement.setAttribute) {
      document.documentElement.setAttribute('dir', isRTL() ? 'rtl' : 'ltr');
    }
  }
};

const I18nManager: I18nManagerStatus = {
  allowRTL(bool) {
    isRTLAllowed = bool;
    onDirectionChange();
  },
  forceRTL(bool) {
    isRTLForced = bool;
    onDirectionChange();
  },
  setPreferredLanguageRTL(bool) {
    isPreferredLanguageRTL = bool;
    onDirectionChange();
  },
  swapLeftAndRightInRTL(bool) {
    doLeftAndRightSwapInRTL = bool;
  },
  get doLeftAndRightSwapInRTL() {
    return doLeftAndRightSwapInRTL;
  },
  get isRTL() {
    return isRTL();
  }
};

export default I18nManager;
