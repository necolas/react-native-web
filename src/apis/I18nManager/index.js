/**
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
