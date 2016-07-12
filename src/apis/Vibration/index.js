const vibrate = (pattern) => {
  if ('vibrate' in window.navigator) {
    if (typeof pattern === 'number' || Array.isArray(pattern)) {
      window.navigator.vibrate(pattern)
    } else {
      throw new Error('Vibration pattern should be a number or array')
    }
  }
}

const Vibration = {
  cancel() {
    vibrate(0)
  },
  vibrate(pattern) {
    vibrate(pattern)
  }
}

module.exports = Vibration
