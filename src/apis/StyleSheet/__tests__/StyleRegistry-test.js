/* eslint-env jasmine, jest */

import StyleRegistry from '../StyleRegistry';

let styleRegistry;

describe('apis/StyleSheet/StyleRegistry', () => {
  beforeEach(() => {
    styleRegistry = new StyleRegistry();
  });

  test('register', () => {
    const style = { opacity: 0 };
    const id = styleRegistry.register(style);
    expect(typeof id === 'number').toBe(true);
  });

  describe('resolve', () => {
    const styleA = { borderWidth: 0, borderColor: 'red', width: 100 };
    const styleB = {
      position: 'absolute',
      left: 50,
      pointerEvents: 'box-only'
    };
    const styleC = { width: 200 };

    const testResolve = (a, b, c) => {
      // no common properties, different resolving order, same result
      const resolve1 = styleRegistry.resolve([a, b]);
      expect(resolve1).toMatchSnapshot();
      const resolve2 = styleRegistry.resolve([b, a]);
      expect(resolve1).toEqual(resolve2);

      // common properties, different resolving order, different result
      const resolve3 = styleRegistry.resolve([a, b, c]);
      expect(resolve3).toMatchSnapshot();
      const resolve4 = styleRegistry.resolve([c, a, b]);
      expect(resolve4).toMatchSnapshot();
      expect(resolve3).not.toEqual(resolve4);
    };

    test('with register, resolves to className', () => {
      const a = styleRegistry.register(styleA);
      const b = styleRegistry.register(styleB);
      const c = styleRegistry.register(styleC);
      testResolve(a, b, c);
    });

    test('with register, resolves to mixed', () => {
      const a = styleA;
      const b = styleRegistry.register(styleB);
      const c = styleRegistry.register(styleC);
      testResolve(a, b, c);
    });

    test('without register, resolves to inline styles', () => {
      testResolve(styleA, styleB, styleC);
    });
  });

  test('resolveStateful', () => {
    // generate a classList to act as pre-existing DOM state
    const mockStyle = styleRegistry.register({
      borderWidth: 0,
      borderColor: 'red',
      width: 100
    });
    const { classList: domClassList } = styleRegistry.resolve(mockStyle);
    domClassList.unshift('external-className');
    expect(domClassList).toMatchSnapshot();

    // test result
    const result = styleRegistry.resolveStateful({ borderWidth: 1, opacity: 1 }, domClassList);
    expect(result).toMatchSnapshot();
  });
});
