/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
const listeners: Array<() => boolean | null | undefined> = []
const addEventListener = (event: 'hardwareBackPress', listener: () => boolean | null | undefined) => {
  listeners.unshift(listener);
};

const removeEventListener = (event: 'hardwareBackPress', listener: () => boolean | null | undefined) => {
  listeners.splice(listeners.indexOf(listener), 1);
};

// Hack for Chrome. See this issue: https://stackoverflow.com/questions/64001278/history-pushstate-on-chrome-is-being-ignored?noredirect=1#comment113174647_64001278
const onFirstPress = () => {
  history.pushState(null, '', window.location.href)
  window.removeEventListener('focusin', onFirstPress)
};
window.addEventListener('focusin', onFirstPress);

// Detect pressing back key on web browsers
window.addEventListener('popstate', (e) => {
  const handled = listeners.find(l => l());
  if (handled) e.preventDefault();
});

const exitApp: () => {
  listeners = [];
  history.previous();
};

export default {
  addEventListener,
  exitApp,
  removeEventListener
};
