/* eslint-env jasmine, jest */

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import I18nManager from '../../I18nManager';
import ReactNativePropRegistry from '../ReactNativePropRegistry';
import StyleResolver from '../StyleResolver';

const canUseDOM = ExecutionEnvironment.canUseDOM;
let styleResolver;

describe('StyleSheet/createStyleResolver', () => {
  beforeEach(() => {
    styleResolver = new StyleResolver();
  });

  describe('resolve', () => {
    const styleA = { borderWidth: 0, borderColor: 'red', width: 100 };
    const styleB = {
      position: 'absolute',
      left: 50,
      opacity: 0.5
    };
    const styleC = { width: 200 };

    const testResolve = (a, b, c) => {
      // no common properties, different resolving order, same result
      const resolve1 = styleResolver.resolve([a, b]);
      expect(resolve1).toMatchSnapshot();
      const resolve2 = styleResolver.resolve([b, a]);
      expect(resolve1).toEqual(resolve2);

      // common properties, different resolving order, different result
      const resolve3 = styleResolver.resolve([a, b, c]);
      expect(resolve3).toMatchSnapshot();
      const resolve4 = styleResolver.resolve([c, a, b]);
      expect(resolve4).toMatchSnapshot();
      expect(resolve3).not.toEqual(resolve4);
    };

    test('with register, resolves to className', () => {
      const a = ReactNativePropRegistry.register(styleA);
      const b = ReactNativePropRegistry.register(styleB);
      const c = ReactNativePropRegistry.register(styleC);
      testResolve(a, b, c);
    });

    test('with register before RTL, resolves to correct className', () => {
      const a = ReactNativePropRegistry.register({ left: '12.34%' });
      const b = ReactNativePropRegistry.register({ textAlign: 'left' });
      const c = ReactNativePropRegistry.register({ marginLeft: 10 });
      I18nManager.forceRTL(true);

      const resolved1 = styleResolver.resolve([a, b, c]);
      expect(resolved1).toMatchSnapshot();

      I18nManager.swapLeftAndRightInRTL(false);

      const resolved2 = styleResolver.resolve([a, b, c]);
      expect(resolved2).toMatchSnapshot();

      I18nManager.swapLeftAndRightInRTL(true);
      I18nManager.forceRTL(false);
    });

    test('with register, resolves to mixed', () => {
      const a = styleA;
      const b = ReactNativePropRegistry.register(styleB);
      const c = ReactNativePropRegistry.register(styleC);
      testResolve(a, b, c);
    });

    test('without register, resolves to inline styles', () => {
      testResolve(styleA, styleB, styleC);
    });

    test('resolves inline-style pointerEvents to classname', () => {
      expect(styleResolver.resolve({ pointerEvents: 'box-none' })).toMatchSnapshot();
    });

    test.skip('long form style properties take precedence over shorthand properties', () => {
      const registeredStyle1 = ReactNativePropRegistry.register({ paddingHorizontal: '40px' });
      const inlineStyle1 = { padding: '8px', paddingHorizontal: '40px' };
      expect(styleResolver.resolve([registeredStyle1, inlineStyle1])).toMatchSnapshot();

      const registeredStyle2 = ReactNativePropRegistry.register({ marginVertical: '40px' });
      const inlineStyle2 = { margin: '8px', marginVertical: '40px' };
      expect(styleResolver.resolve([registeredStyle2, inlineStyle2])).toMatchSnapshot();
    });

    describe('sheet', () => {
      beforeEach(() => {
        ExecutionEnvironment.canUseDOM = false;
      });

      afterEach(() => {
        ExecutionEnvironment.canUseDOM = canUseDOM;
      });

      test('returns the new sheet once re-initialized', () => {
        const sheet = styleResolver.sheet;

        // re-initialize the sheet
        styleResolver.getStyleSheet();

        expect(styleResolver.sheet).not.toBe(sheet);
      });
    });
  });
});
