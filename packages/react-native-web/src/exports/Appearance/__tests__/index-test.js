/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

function createMediaQueryList(initialMatches = false) {
  let matches = initialMatches;
  const listeners = new Set();

  return {
    addListener(listener) {
      listeners.add(listener);
    },
    emit(nextMatches) {
      matches = nextMatches;
      listeners.forEach((listener) => listener({ matches }));
    },
    get matches() {
      return matches;
    },
    removeListener(listener) {
      listeners.delete(listener);
    }
  };
}

function loadAppearance(mediaQueryList) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: jest.fn(() => mediaQueryList)
  });

  let Appearance;
  jest.isolateModules(() => {
    const module = require('..');
    Appearance = module.default ?? module;
  });
  return Appearance;
}

const mediaQueryList = createMediaQueryList(false);
const Appearance = loadAppearance(mediaQueryList);

describe('Appearance', () => {
  afterEach(() => {
    if (Appearance.setColorScheme) {
      Appearance.setColorScheme('auto');
    }
    mediaQueryList.emit(false);
  });

  test('overrides the system scheme and restores automatic behavior', () => {
    expect(Appearance.getColorScheme()).toBe('light');

    Appearance.setColorScheme('dark');
    expect(Appearance.getColorScheme()).toBe('dark');

    mediaQueryList.emit(true);
    Appearance.setColorScheme('light');
    expect(Appearance.getColorScheme()).toBe('light');

    Appearance.setColorScheme('auto');
    expect(Appearance.getColorScheme()).toBe('dark');

    Appearance.setColorScheme('light');
    Appearance.setColorScheme('unspecified');
    expect(Appearance.getColorScheme()).toBe('dark');

    Appearance.setColorScheme('light');
    Appearance.setColorScheme(null);
    expect(Appearance.getColorScheme()).toBe('dark');
  });

  test('notifies listeners when the effective scheme changes', () => {
    const listener = jest.fn();
    const subscription = Appearance.addChangeListener(listener);

    expect(Appearance.getColorScheme()).toBe('light');
    Appearance.setColorScheme('dark');
    expect(listener).toHaveBeenLastCalledWith({ colorScheme: 'dark' });

    mediaQueryList.emit(true);
    mediaQueryList.emit(false);
    expect(listener).toHaveBeenCalledTimes(1);

    Appearance.setColorScheme('auto');
    expect(listener).toHaveBeenLastCalledWith({ colorScheme: 'light' });

    mediaQueryList.emit(true);
    expect(listener).toHaveBeenLastCalledWith({ colorScheme: 'dark' });

    Appearance.setColorScheme('dark');
    expect(listener).toHaveBeenCalledTimes(3);

    subscription.remove();
    Appearance.setColorScheme('light');
    expect(listener).toHaveBeenCalledTimes(3);
  });

  test('uses a stable listener snapshot during override changes', () => {
    const secondListener = jest.fn();
    let removeSecondListener = () => {};
    const firstListener = jest.fn(() => {
      removeSecondListener();
    });
    const firstSubscription = Appearance.addChangeListener(firstListener);
    const secondSubscription = Appearance.addChangeListener(secondListener);
    removeSecondListener = secondSubscription.remove;

    Appearance.setColorScheme('dark');

    expect(firstListener).toHaveBeenCalledTimes(1);
    expect(secondListener).toHaveBeenCalledTimes(1);
    firstSubscription.remove();
  });
});
