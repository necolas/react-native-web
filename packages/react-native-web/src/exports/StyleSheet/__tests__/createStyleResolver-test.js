/* eslint-env jasmine, jest */

import I18nManager from '../../I18nManager';
import ReactNativePropRegistry from '../../../modules/ReactNativePropRegistry';
import createStyleResolver from '../createStyleResolver';

let styleResolver;

describe('StyleSheet/createStyleResolver', () => {
  beforeEach(() => {
    styleResolver = createStyleResolver({ insert() {} });
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
  });

  describe('resolveWithNode', () => {
    let node;

    beforeEach(() => {
      node = document.createElement('div');
    });

    test('preserves unrelated class names', () => {
      node.classList.add('unknown-class-1', 'unknown-class-2');
      const resolved = styleResolver.resolveWithNode({}, node);
      expect(resolved).toMatchSnapshot();
    });

    test('preserves unrelated inline styles', () => {
      node.style.cssText = 'font-size: 20px;';
      const resolved = styleResolver.resolveWithNode({ opacity: 1 }, node);
      expect(resolved).toMatchSnapshot();
    });

    test('next class names have priority over current inline styles', () => {
      node.style.cssText = 'opacity: 0.5;';
      const nextStyle = ReactNativePropRegistry.register({ opacity: 1 });
      const resolved = styleResolver.resolveWithNode(nextStyle, node);
      expect(resolved).toMatchSnapshot();
    });

    test('next inline styles have priority over current inline styles', () => {
      // note: this also checks for correctly uppercasing the first letter of DOM vendor prefixes
      node.style.cssText = 'opacity: 0.5; transform: scale(1);';
      const style = { opacity: 1, transform: [{ scale: 2 }] };
      const resolved = styleResolver.resolveWithNode(style, node);
      expect(resolved).toMatchSnapshot();
    });

    test('when isRTL=true, resolves to flipped inline styles', () => {
      // note: DOM state resolved from { marginLeft: 5, left: 5 } in RTL mode
      node.style.cssText = 'margin-right: 5px; right: 5px;';
      I18nManager.forceRTL(true);
      const resolved = styleResolver.resolveWithNode({ marginLeft: 10, right: 10 }, node);
      I18nManager.forceRTL(false);
      expect(resolved).toMatchSnapshot();
    });

    test('when isRTL=true, resolves to flipped classNames', () => {
      // note: DOM state resolved from { marginLeft: 5, left: 5 }
      node.style.cssText = 'margin-right: 5px; right: 5px;';
      const nextStyle = ReactNativePropRegistry.register({ marginLeft: 10, right: 1 });

      I18nManager.forceRTL(true);
      const resolved = styleResolver.resolveWithNode(nextStyle, node);
      I18nManager.forceRTL(false);
      expect(resolved).toMatchSnapshot();
    });

    test('when isRTL=true & doLeftAndRightSwapInRTL=false, resolves to non-flipped inline styles', () => {
      // note: DOM state resolved from { marginRight 5, right: 5, paddingEnd: 5 }
      node.style.cssText = 'margin-right: 5px; right: 5px; padding-left: 5px';
      I18nManager.forceRTL(true);
      I18nManager.swapLeftAndRightInRTL(false);
      const resolved = styleResolver.resolveWithNode(
        { marginRight: 10, right: 10, paddingEnd: 10 },
        node
      );
      I18nManager.forceRTL(false);
      I18nManager.swapLeftAndRightInRTL(true);
      expect(resolved).toMatchSnapshot();
    });
  });
});
