import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment'
import findIndex from 'lodash/findIndex'
import invariant from 'fbjs/lib/invariant'

const EVENT_TYPES = [ 'change' ]
const VISIBILITY_CHANGE_EVENT = 'visibilitychange'

const AppStates = {
  BACKGROUND: 'background',
  ACTIVE: 'active'
}

const listeners = []

class AppState {
  static isSupported = ExecutionEnvironment.canUseDOM && document.visibilityState

  static get currentState() {
    if (!AppState.isSupported) {
      return AppState.ACTIVE
    }

    switch (document.visibilityState) {
      case 'hidden':
      case 'prerender':
      case 'unloaded':
        return AppStates.BACKGROUND
      default:
        return AppStates.ACTIVE
    }
  }

  static addEventListener(type: string, handler: Function) {
    if (AppState.isSupported) {
      invariant(EVENT_TYPES.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type)
      const callback = () => handler(AppState.currentState)
      listeners.push([ handler, callback ])
      document.addEventListener(VISIBILITY_CHANGE_EVENT, callback, false)
    }
  }

  static removeEventListener(type: string, handler: Function) {
    if (AppState.isSupported) {
      invariant(EVENT_TYPES.indexOf(type) !== -1, 'Trying to remove listener for unknown event: "%s"', type)
      const listenerIndex = findIndex(listeners, (pair) => pair[0] === handler)
      invariant(listenerIndex !== -1, 'Trying to remove AppState listener for unregistered handler')
      const callback = listeners[listenerIndex][1]
      document.removeEventListener(VISIBILITY_CHANGE_EVENT, callback, false)
      listeners.splice(listenerIndex, 1)
    }
  }
}

module.exports = AppState
