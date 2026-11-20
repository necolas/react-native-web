/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Appearance from '..';

describe('Appearance', () => {
  test('setColorScheme does nothing on the server', () => {
    const listener = jest.fn();

    Appearance.addChangeListener(listener);
    Appearance.setColorScheme('dark');

    expect(Appearance.getColorScheme()).toBe('light');
    expect(listener).not.toHaveBeenCalled();
  });
});
