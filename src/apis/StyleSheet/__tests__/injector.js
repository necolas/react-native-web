/* eslint-env jasmine, jest */

import injector from '../injector';

describe('apis/StyleSheet/injector', () => {
  beforeEach(() => {
    document.head.insertAdjacentHTML('afterbegin', `
      <style id="react-native-stylesheet">
        .rn-alignItems\\:stretch{align-items:stretch;}
        .rn-position\\:top{position:top;}
      </style>
    `);
  });

  test('hydrates from SSR', () => {
    const classList = injector.getClassNames();
    expect(classList).toEqual({
      'rn-alignItems\\:stretch': true,
      'rn-position\\:top': true
    });
  });
});
