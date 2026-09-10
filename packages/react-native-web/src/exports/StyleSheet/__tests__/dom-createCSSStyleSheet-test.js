/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createCSSStyleSheet from '../dom/createCSSStyleSheet';
import createOrderedCSSStyleSheet from '../dom/createOrderedCSSStyleSheet';

/**
 * The CSSOM in this test environment does not implement cascade layers, so these tests pin the
 * fallback: an engine without support must behave exactly as it did before layers were introduced.
 * The layered path is covered by 'dom-createOrderedCSSStyleSheet-test.js', which drives the ordered
 * sheet through a rule container of the shape a CSSLayerBlockRule has.
 */
describe('createCSSStyleSheet', () => {
  test('returns a container the ordered style sheet can hydrate', () => {
    // An engine that parses the layer text as an ordinary style rule would leave that rule in the
    // sheet, where hydration reads it as a rule belonging to a group that was never opened.
    const container = createCSSStyleSheet('hydratable-sheet');
    expect(() => createOrderedCSSStyleSheet(container)).not.toThrow();
  });

  test('leaves no rule behind when the engine cannot express a cascade layer', () => {
    const container = createCSSStyleSheet('empty-sheet');
    expect(container.cssRules).toHaveLength(0);
  });

  test('inserted rules are readable back from the container', () => {
    const sheet = createOrderedCSSStyleSheet(
      createCSSStyleSheet('readable-sheet')
    );
    sheet.insert('.a{opacity:1;}', 0);
    expect(sheet.getTextContent()).toContain('.a{opacity:1;}');
  });

  test('adopts the existing element when the id is already present', () => {
    const first = createCSSStyleSheet('shared-sheet');
    const second = createCSSStyleSheet('shared-sheet');
    expect(second).toBe(first);
  });

  describe('with text content', () => {
    // The text content path clones an existing sheet into a second root. Wrapping that text in a
    // layer block an engine cannot parse invalidates the whole style element, which leaves no sheet
    // at all rather than an unlayered one.
    test('produces a usable sheet', () => {
      const container = createCSSStyleSheet(
        'cloned-sheet',
        document,
        '[stylesheet-group="0"]{}\n.a{opacity:1;}'
      );
      expect(container).not.toBe(null);
      expect(container.cssRules.length).toBeGreaterThan(0);
    });

    test('the cloned rules hydrate into the ordered sheet', () => {
      const sheet = createOrderedCSSStyleSheet(
        createCSSStyleSheet(
          'cloned-hydrated-sheet',
          document,
          '[stylesheet-group="0"]{}\n.a{opacity:1;}'
        )
      );
      expect(sheet.getTextContent()).toContain('.a');
    });
  });
});
