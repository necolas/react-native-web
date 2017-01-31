/* eslint-env jasmine, jest */

import StyleRegistry from '../jssRegistry';

describe('apis/StyleSheet/registry', () => {
  beforeEach(() => {
    StyleRegistry.reset();
  });

  test('register', () => {
    const styles = { opacity: 0 };
    const ids = StyleRegistry.register(styles);

    expect(typeof ids === 'object').toBe(true);
  });

  describe('resolve', () => {
    const styleA = { borderWidth: 0, borderColor: 'red', width: 100 };
    const styleB = { position: 'absolute', left: 50, pointerEvents: 'box-only' };
    const styleC = { width: 200 };

    const testResolve = (a, b, c) => {
      // no common properties, different resolving order, same result
      const resolve1 = StyleRegistry.resolve({ style: [ a, b ] });
      expect(resolve1).toMatchSnapshot();

      // common properties, different resolving order, different result
      const resolve2 = StyleRegistry.resolve({ style: [ a, b, c ] });
      expect(resolve2).toMatchSnapshot();
      const resolve3 = StyleRegistry.resolve({ style: [ c, a, b ] });
      expect(resolve3).toMatchSnapshot();
      expect(resolve2).not.toEqual(resolve3);
    };

    test('with register, resolves to className', () => {
      const a = StyleRegistry.register(styleA);
      const b = StyleRegistry.register(styleB);
      const c = StyleRegistry.register(styleC);
      testResolve(a, b, c);
    });

    test('with register, resolves to mixed', () => {
      const a = styleA;
      const b = StyleRegistry.register(styleB);
      const c = StyleRegistry.register(styleC);
      testResolve(a, b, c);
    });

    test('without register, resolves to inline styles', () => {
      testResolve(styleA, styleB, styleC);
    });
  });
});
