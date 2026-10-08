/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  CASCADE_LAYER_NAME,
  isCascadeLayerRule,
  resolveCascadeLayer,
  wrapInCascadeLayer
} from '../dom/cascadeLayer';
import createOrderedCSSStyleSheet from '../dom/createOrderedCSSStyleSheet';

/**
 * A rule container with the two members this module consumes. The CSSOM in this test environment
 * does not implement cascade layers, so the layered path is driven through these instead: a fake
 * that reports the shape a CSSLayerBlockRule has, and one that reports the shape an engine without
 * support produces.
 */
const createRuleContainer = ({ name } = {}) => {
  const cssRules = [];
  const container = {
    cssRules,
    insertRule(cssText, position) {
      const selectorText = cssText.split('{')[0].trim();
      const nested =
        selectorText === `@layer ${CASCADE_LAYER_NAME}`
          ? // A supporting engine exposes the block as a nested container; one without support
            // exposes it as an ordinary style rule, which has no 'name' and no 'insertRule'.
            createRuleContainer({
              name: name === undefined ? CASCADE_LAYER_NAME : name
            })
          : { cssText, selectorText };
      cssRules.splice(position, 0, nested);
      return position;
    },
    deleteRule(position) {
      cssRules.splice(position, 1);
    }
  };
  if (name != null) {
    container.name = name;
  }
  return container;
};

/** An engine that parses the layer text as an ordinary style rule — no 'name', no 'insertRule'. */
const createLayerBlindContainer = () => {
  const cssRules = [];
  return {
    cssRules,
    insertRule(cssText, position) {
      cssRules.splice(position, 0, {
        cssText,
        selectorText: cssText.split('{')[0].trim()
      });
      return position;
    },
    deleteRule(position) {
      cssRules.splice(position, 1);
    }
  };
};

/** An engine that rejects the layer text outright. */
const createRejectingContainer = () => ({
  cssRules: { length: 0 },
  insertRule() {
    throw new Error('unsupported rule');
  },
  deleteRule() {
    throw new Error('nothing to delete');
  }
});

describe('wrapInCascadeLayer', () => {
  test('wraps css text in the layer block', () => {
    expect(wrapInCascadeLayer('.a{opacity:1;}')).toMatchInlineSnapshot(
      `"@layer rnw{.a{opacity:1;}}"`
    );
  });

  test('wraps empty text', () => {
    expect(wrapInCascadeLayer('')).toMatchInlineSnapshot(`"@layer rnw{}"`);
  });

  test('is deterministic', () => {
    expect(wrapInCascadeLayer('.a{}')).toBe(wrapInCascadeLayer('.a{}'));
  });

  test('is not idempotent, so a double wrap is visible rather than silent', () => {
    // Each call nests one more layer block. The sheet's text is wrapped at exactly one seam, and a
    // second wrap would change the output rather than being absorbed.
    expect(wrapInCascadeLayer(wrapInCascadeLayer('.a{}'))).not.toBe(
      wrapInCascadeLayer('.a{}')
    );
  });
});

describe('isCascadeLayerRule', () => {
  test.each([
    ['null', null],
    ['undefined', undefined],
    ['a style rule', { cssText: '.a{}', selectorText: '.a' }],
    ['a keyframes rule', { name: 'spin' }],
    ['a differently named layer', { name: 'other', insertRule() {} }],
    ['a layer name without insertRule', { name: CASCADE_LAYER_NAME }]
  ])('rejects %s', (_label, rule) => {
    expect(isCascadeLayerRule(rule)).toBe(false);
  });

  test('accepts a layer block rule', () => {
    expect(
      isCascadeLayerRule({ name: CASCADE_LAYER_NAME, insertRule() {} })
    ).toBe(true);
  });
});

describe('resolveCascadeLayer', () => {
  test('returns null for a missing sheet', () => {
    expect(resolveCascadeLayer(null)).toBe(null);
    expect(resolveCascadeLayer(undefined)).toBe(null);
  });

  test('creates the layer where the engine supports it', () => {
    const sheet = createRuleContainer();
    const layer = resolveCascadeLayer(sheet);
    expect(layer).not.toBe(null);
    expect(isCascadeLayerRule(layer)).toBe(true);
    expect(sheet.cssRules).toHaveLength(1);
  });

  test('is idempotent — a second call adopts the existing layer', () => {
    const sheet = createRuleContainer();
    const first = resolveCascadeLayer(sheet);
    const second = resolveCascadeLayer(sheet);
    expect(second).toBe(first);
    expect(sheet.cssRules).toHaveLength(1);
  });

  test('adopts a layer already present in a hydrated sheet', () => {
    const sheet = createRuleContainer();
    sheet.insertRule(`@layer ${CASCADE_LAYER_NAME}{}`, 0);
    const existing = sheet.cssRules[0];
    expect(resolveCascadeLayer(sheet)).toBe(existing);
    expect(sheet.cssRules).toHaveLength(1);
  });

  test('leaves no rule behind when the engine cannot express a layer', () => {
    // The regression this guards: a rule accepted but not exposed as a layer stays in the sheet,
    // where the ordered sheet reads it as a rule belonging to a group that was never opened.
    const sheet = createLayerBlindContainer();
    expect(resolveCascadeLayer(sheet)).toBe(null);
    expect(sheet.cssRules).toHaveLength(0);
  });

  test('leaves the sheet untouched when the engine rejects the rule', () => {
    const sheet = createRejectingContainer();
    expect(resolveCascadeLayer(sheet)).toBe(null);
    expect(sheet.cssRules.length).toBe(0);
  });
});

describe('createOrderedCSSStyleSheet through a cascade layer', () => {
  // The claim the layered design rests on: a layer block exposes the same two members the ordered
  // sheet consumes, so grouping, ordering and de-duplication are unchanged one level deeper.
  test('writes rules into the layer', () => {
    const layer = resolveCascadeLayer(createRuleContainer());
    const sheet = createOrderedCSSStyleSheet(layer);
    sheet.insert('.a{opacity:1;}', 0);
    expect(layer.cssRules.map((rule) => rule.cssText)).toEqual([
      '[stylesheet-group="0"]{}',
      '.a{opacity:1;}'
    ]);
  });

  test('preserves group ordering inside the layer', () => {
    const layer = resolveCascadeLayer(createRuleContainer());
    const sheet = createOrderedCSSStyleSheet(layer);
    sheet.insert('.c{}', 2);
    sheet.insert('.a{}', 0);
    expect(sheet.getTextContent()).toMatchInlineSnapshot(`
      "[stylesheet-group="0"]{}
      .a{}
      [stylesheet-group="2"]{}
      .c{}"
    `);
  });

  test('de-duplicates inside the layer', () => {
    const layer = resolveCascadeLayer(createRuleContainer());
    const sheet = createOrderedCSSStyleSheet(layer);
    sheet.insert('.a{}', 0);
    sheet.insert('.a{}', 0);
    expect(layer.cssRules).toHaveLength(2);
  });

  test('hydrates from rules already inside the layer', () => {
    // The server-rendered path: the layer arrives populated, and the ordered sheet must read its
    // groups back out rather than starting empty and re-inserting everything.
    const layer = resolveCascadeLayer(createRuleContainer());
    layer.insertRule('[stylesheet-group="0"]{}', 0);
    layer.insertRule('.a{opacity:1;}', 1);
    const sheet = createOrderedCSSStyleSheet(layer);
    sheet.insert('.a{opacity:1;}', 0);
    expect(layer.cssRules).toHaveLength(2);
    expect(sheet.getTextContent()).toMatchInlineSnapshot(`
      "[stylesheet-group="0"]{}
      .a{opacity:1;}"
    `);
  });
});
