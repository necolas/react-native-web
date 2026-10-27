/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function createMediaQueryList(matches) {
  const listeners = new Set();

  return {
    matches,
    addEventListener: jest.fn((type, listener) => listeners.add(listener)),
    removeEventListener: jest.fn((type, listener) =>
      listeners.delete(listener)
    ),
    change(matches) {
      this.matches = matches;
      listeners.forEach((listener) => listener({ matches }));
    }
  };
}

describe('Appearance', () => {
  const originalMatchMedia = window.matchMedia;
  let Appearance;
  let mediaQueryList;

  beforeEach(async () => {
    mediaQueryList = createMediaQueryList(false);
    window.matchMedia = jest.fn(() => mediaQueryList);
    jest.resetModules();
    Appearance = (await import('../index.js')).default;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    document.documentElement.style.colorScheme = '';
  });

  describe('getColorScheme', () => {
    test('returns the system color scheme', () => {
      expect(Appearance.getColorScheme()).toBe('light');
      mediaQueryList.change(true);
      expect(Appearance.getColorScheme()).toBe('dark');
    });
  });

  describe('setColorScheme', () => {
    test('overrides the system color scheme', () => {
      Appearance.setColorScheme('dark');
      expect(Appearance.getColorScheme()).toBe('dark');
      mediaQueryList.change(true);
      Appearance.setColorScheme('light');
      expect(Appearance.getColorScheme()).toBe('light');
    });

    test('"auto" and "unspecified" restore the system color scheme', () => {
      mediaQueryList.change(true);
      Appearance.setColorScheme('light');
      Appearance.setColorScheme('auto');
      expect(Appearance.getColorScheme()).toBe('dark');
      Appearance.setColorScheme('light');
      Appearance.setColorScheme('unspecified');
      expect(Appearance.getColorScheme()).toBe('dark');
    });

    test('sets the color-scheme CSS property of the document element', () => {
      const { style } = document.documentElement;
      Appearance.setColorScheme('dark');
      expect(style.colorScheme).toBe('dark');
      Appearance.setColorScheme('light');
      expect(style.colorScheme).toBe('light');
      Appearance.setColorScheme('auto');
      expect(style.colorScheme).toBe('');
    });
  });

  describe('addChangeListener', () => {
    test('is called when the system color scheme changes', () => {
      const listener = jest.fn();
      Appearance.addChangeListener(listener);
      mediaQueryList.change(true);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenLastCalledWith({ colorScheme: 'dark' });
    });

    test('is not called for system changes while an override is set', () => {
      const listener = jest.fn();
      Appearance.addChangeListener(listener);
      Appearance.setColorScheme('light');
      mediaQueryList.change(true);
      expect(listener).not.toHaveBeenCalled();
    });

    test('is called only when setColorScheme changes the color scheme', () => {
      const listener = jest.fn();
      Appearance.addChangeListener(listener);
      Appearance.setColorScheme('light');
      expect(listener).not.toHaveBeenCalled();
      Appearance.setColorScheme('dark');
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenLastCalledWith({ colorScheme: 'dark' });
      Appearance.setColorScheme('auto');
      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenLastCalledWith({ colorScheme: 'light' });
    });

    test('is not called after remove', () => {
      const listener = jest.fn();
      const { remove } = Appearance.addChangeListener(listener);
      remove();
      Appearance.setColorScheme('dark');
      mediaQueryList.change(true);
      expect(listener).not.toHaveBeenCalled();
    });

    test('listeners added during a change are not called for that change', () => {
      const addedListener = jest.fn();
      let calls = 0;
      function listener() {
        calls++;
        // Limit re-adds so a failing implementation does not loop forever
        if (calls > 10) {
          return;
        }
        subscription.remove();
        subscription = Appearance.addChangeListener(listener);
        Appearance.addChangeListener(addedListener);
      }
      let subscription = Appearance.addChangeListener(listener);
      Appearance.setColorScheme('dark');
      expect(calls).toBe(1);
      expect(addedListener).not.toHaveBeenCalled();
    });

    test('listeners receive the latest color scheme last when setColorScheme is called during a change', () => {
      Appearance.addChangeListener(({ colorScheme }) => {
        if (colorScheme === 'dark') {
          Appearance.setColorScheme('light');
        }
      });
      const listener = jest.fn();
      Appearance.addChangeListener(listener);
      Appearance.setColorScheme('dark');
      expect(Appearance.getColorScheme()).toBe('light');
      expect(listener).toHaveBeenLastCalledWith({ colorScheme: 'light' });
    });
  });
});
