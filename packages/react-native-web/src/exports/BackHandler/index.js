/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const BackHandler = {
  listeners: [],
  exitApp: history.previous,
  addEventListener: (listener) => {
    listeners.push(listener)
    return {
      remove: this.removeEventListener(listener)
    };
  },
  removeEventListener: (listener) => this.listeners.splice(this.listeners.indexOf(listener), 1)
};

history.pushState(null, '', window.location.href)
window.addEventListener('popstate', (event) => {
  if(!BackHandler.listeners.find(callback => callback()) history.previous()
  else history.pushState(null, '', window.location.href)
})

export default BackHandler;
