type I18nManagerStatus = {
  allowRTL: (allowRTL: boolean) => {},
  forceRTL: (forceRTL: boolean) => {},
  setRTL: (setRTL: boolean) => {},
  isRTL: boolean
}

let isApplicationLanguageRTL = false
let isRTLAllowed = true
let isRTLForced = false

const I18nManager: I18nManagerStatus = {
  allowRTL(bool) {
    isRTLAllowed = bool
  },
  forceRTL(bool) {
    isRTLForced = bool
  },
  setRTL(bool) {
    isApplicationLanguageRTL = bool
  },
  get isRTL() {
    if (isRTLForced) {
      return true
    }
    if (isRTLAllowed && isApplicationLanguageRTL) {
      return true
    }
    return false
  }
}

module.exports = I18nManager
