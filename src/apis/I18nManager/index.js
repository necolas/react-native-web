import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

type I18nManagerStatus = {
  allowRTL: (allowRTL: boolean) => {},
  forceRTL: (forceRTL: boolean) => {},
  setRTL: (setRTL: boolean) => {},
  isRTL: boolean
}

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
    document.documentElement.setAttribute('dir', isRTL() ? 'rtl' : 'ltr');
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

module.exports = I18nManager;
