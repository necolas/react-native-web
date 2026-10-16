/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { findCascadeLayer, wrapInCascadeLayer } from '../dom/cascadeLayer';

const createStyleSheet = (cssText) => {
  const element = document.createElement('style');
  element.appendChild(document.createTextNode(cssText));
  document.head.appendChild(element);
  return element.sheet;
};

describe('findCascadeLayer', () => {
  test('finds the layer block the page declared', () => {
    const sheet = createStyleSheet('@layer rnw{}');
    const layer = findCascadeLayer(sheet);
    expect(layer).not.toBe(null);
    expect(layer.name).toBe('rnw');
    expect(layer.rule).toBe(sheet.cssRules[0]);
  });

  test('reads the name of a nested layer', () => {
    const layer = findCascadeLayer(createStyleSheet('@layer framework.rnw{}'));
    expect(layer.name).toBe('framework.rnw');
  });

  test('reads an anonymous layer as an empty name', () => {
    const layer = findCascadeLayer(createStyleSheet('@layer{}'));
    expect(layer.name).toBe('');
  });

  test('skips rules that are not layer blocks', () => {
    const sheet = createStyleSheet(
      '.a{color:red;}@media print{.b{color:red;}}@layer rnw{}'
    );
    expect(findCascadeLayer(sheet).rule).toBe(sheet.cssRules[2]);
  });

  test('ignores a layer statement, which groups no rules', () => {
    // A CSSLayerStatementRule has no 'insertRule'
    const sheet = {
      cssRules: [{ cssText: '@layer rnw;' }],
      insertRule() {
        return 0;
      },
      deleteRule() {}
    };
    expect(findCascadeLayer(sheet)).toBe(null);
  });

  test('finds nothing in an unlayered or absent sheet', () => {
    expect(findCascadeLayer(createStyleSheet('.a{color:red;}'))).toBe(null);
    expect(findCascadeLayer(null)).toBe(null);
  });
});

describe('wrapInCascadeLayer', () => {
  test('wraps css text in a layer that is found under the same name', () => {
    ['rnw', 'framework.rnw', ''].forEach((name) => {
      const sheet = createStyleSheet(
        wrapInCascadeLayer('.a{opacity:1;}', name)
      );
      const layer = findCascadeLayer(sheet);
      expect(layer.name).toBe(name);
      expect(layer.rule.cssRules).toHaveLength(1);
    });
  });
});
