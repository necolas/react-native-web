/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createSheet } from '../dom';

describe('createSheet', () => {
  test('creates a sheet on the client', () => {
    const sheet = createSheet();
    expect(sheet.id).toMatchInlineSnapshot(`"react-native-stylesheet"`);
    expect(typeof sheet.getTextContent()).toBe('string');
    expect(typeof sheet.insert).toBe('function');
  });

  test('supports multiple documents with same styles', () => {
    const sheet = createSheet();
    sheet.insert('.test-sheet { opacity: 1 }', 3);

    // Iframe -----
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentWindow.document;
    const iframeRootTag = document.createElement('div');
    iframeDoc.body.appendChild(iframeRootTag);
    const iframeSheet = createSheet(iframeRootTag);

    // Did we generate a new sheet?
    expect(sheet).not.toBe(iframeSheet);
    expect(iframeSheet.id).toMatchInlineSnapshot(`"react-native-stylesheet"`);
    expect(typeof iframeSheet.insert).toBe('function');
    expect(iframeDoc.getElementById('react-native-stylesheet')).not.toBe(null);
    // Does the content match existing sheets?
    expect(iframeSheet.getTextContent().includes('test-sheet')).toBe(true);
    // Does the content update when other sheets are updated?
    sheet.insert('.test-iframe { opacity: 0 }', 3);
    expect(iframeSheet.getTextContent().includes('test-iframe')).toBe(true);

    // ShadowDOM -----
    const div = document.createElement('div');
    const shadowRoot = div.attachShadow({ mode: 'open' });
    const shadowRootTag = document.createElement('div');
    shadowRoot.appendChild(shadowRootTag);
    document.body.appendChild(shadowRoot);
    const shadowSheet = createSheet(shadowRootTag);

    // Did we generate a new sheet?
    expect(sheet).not.toBe(shadowSheet);
    expect(shadowSheet.id).toMatchInlineSnapshot(`"react-native-stylesheet"`);
    expect(typeof shadowSheet.insert).toBe('function');
    // expect(shadowRoot.getElementById('react-native-stylesheet')).not.toBe(null);
    // Does the content match existing sheets?
    expect(shadowSheet.getTextContent().includes('test-sheet')).toBe(true);
    // Does the content update when other sheets are updated?
    sheet.insert('.test-shadow { opacity: 0 }', 3);
    expect(shadowSheet.getTextContent().includes('test-shadow')).toBe(true);
  });

  // A fresh module per call, since the module keeps one sheet per document
  const loadIsolatedModule = () => {
    let isolatedModule;
    jest.isolateModules(() => {
      isolatedModule = require('../dom');
    });
    return isolatedModule;
  };

  const createDeclaredSheet = (id, declaredCssText) => {
    const element = document.createElement('style');
    element.setAttribute('id', id);
    element.appendChild(document.createTextNode(declaredCssText));
    document.head.appendChild(element);
    const { createSheet, setCascadeLayer } = loadIsolatedModule();
    return {
      createSheet,
      element,
      setCascadeLayer,
      sheet: createSheet(undefined, id)
    };
  };

  const readRuleTexts = (container) =>
    Array.from(container.cssRules).map((rule) => rule.cssText);

  describe('in a cascade layer the page declares', () => {
    test('inserts the rules into the layer', () => {
      const { element, sheet } = createDeclaredSheet(
        'layer-insert',
        '@layer rnw{}'
      );
      sheet.insert('.test-layer { opacity: 1 }', 3);

      expect(element.sheet.cssRules).toHaveLength(1);
      const layerRules = Array.from(element.sheet.cssRules[0].cssRules);
      expect(layerRules.map((rule) => rule.cssText)).toEqual(
        expect.arrayContaining([
          'body {margin: 0;}',
          '.test-layer {opacity: 1;}'
        ])
      );
    });

    test('serializes the rules in the layer', () => {
      const { sheet } = createDeclaredSheet('layer-text', '@layer rnw{}');
      sheet.insert('.test-text { opacity: 1 }', 3);

      const textContent = sheet.getTextContent();
      expect(
        textContent.startsWith('@layer rnw{[stylesheet-group="0"]{}')
      ).toBe(true);
      expect(textContent.endsWith('.test-text { opacity: 1 }}')).toBe(true);
    });

    test('hydrates server-rendered rules from the layer', () => {
      const { element, sheet } = createDeclaredSheet(
        'layer-hydrate',
        '@layer rnw{[stylesheet-group="3"]{}\n.test-hydrated{opacity:1;}}'
      );
      sheet.insert('.test-hydrated{opacity:1;}', 3);

      expect(element.sheet.cssRules).toHaveLength(1);
      const hydrated = Array.from(element.sheet.cssRules[0].cssRules).filter(
        (rule) => rule.cssText.startsWith('.test-hydrated')
      );
      expect(hydrated).toHaveLength(1);
    });

    test('nests the copy in another root in the same layer', () => {
      const { createSheet, sheet } = createDeclaredSheet(
        'layer-copy',
        '@layer rnw{}'
      );
      sheet.insert('.test-copy-before { opacity: 1 }', 3);
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      const iframeDoc = iframe.contentWindow.document;
      const iframeRootTag = document.createElement('div');
      iframeDoc.body.appendChild(iframeRootTag);
      const iframeSheet = createSheet(iframeRootTag, 'layer-copy');
      sheet.insert('.test-copy-after { opacity: 1 }', 3);

      const copy = iframeDoc.getElementById('layer-copy').sheet;
      expect(copy.cssRules).toHaveLength(1);
      const copiedRules = Array.from(copy.cssRules[0].cssRules);
      expect(copiedRules.map((rule) => rule.cssText)).toEqual(
        expect.arrayContaining([
          '.test-copy-before {opacity: 1;}',
          '.test-copy-after {opacity: 1;}'
        ])
      );
      expect(iframeSheet.getTextContent().startsWith('@layer rnw{')).toBe(true);
    });

    test('stays unlayered beside rules the page declares without a layer block', () => {
      const { element, sheet } = createDeclaredSheet(
        'layer-none',
        '.page { color: blue }'
      );
      sheet.insert('.test-unlayered { opacity: 1 }', 3);

      const rules = Array.from(element.sheet.cssRules).map(
        (rule) => rule.cssText
      );
      expect(rules[0]).toBe('.page {color: blue;}');
      expect(rules).toContain('.test-unlayered {opacity: 1;}');
      expect(
        sheet.getTextContent().startsWith('[stylesheet-group="0"]{}')
      ).toBe(true);
    });
  });

  describe('setCascadeLayer', () => {
    test('nests the rules inserted before and after the call', () => {
      const { element, setCascadeLayer, sheet } = createDeclaredSheet(
        'set-layer',
        ''
      );
      sheet.insert('.test-before { opacity: 1 }', 3);
      setCascadeLayer('rnw');
      sheet.insert('.test-after { opacity: 1 }', 3);

      expect(element.sheet.cssRules).toHaveLength(1);
      expect(readRuleTexts(element.sheet.cssRules[0])).toEqual(
        expect.arrayContaining([
          'body {margin: 0;}',
          '.test-before {opacity: 1;}',
          '.test-after {opacity: 1;}'
        ])
      );
      const textContent = sheet.getTextContent();
      expect(textContent.startsWith('@layer rnw{')).toBe(true);
      expect(textContent.match(/\.test-before/g)).toHaveLength(1);
      expect(textContent.match(/\.test-after/g)).toHaveLength(1);
    });

    test('keeps the rules a page declared before them', () => {
      const { element, setCascadeLayer } = createDeclaredSheet(
        'set-layer-page',
        '.page { color: blue }'
      );
      setCascadeLayer('rnw');

      const rules = readRuleTexts(element.sheet);
      expect(rules).toHaveLength(2);
      expect(rules[0]).toBe('.page {color: blue;}');
      expect(rules[1].startsWith('@layer rnw {')).toBe(true);
    });

    test('leaves a sheet already in that layer as it is', () => {
      const { element, setCascadeLayer } = createDeclaredSheet(
        'set-layer-same',
        '@layer rnw{}'
      );
      const layer = element.sheet.cssRules[0];
      const ruleCount = layer.cssRules.length;
      setCascadeLayer('rnw');

      expect(element.sheet.cssRules).toHaveLength(1);
      expect(element.sheet.cssRules[0]).toBe(layer);
      expect(layer.cssRules).toHaveLength(ruleCount);
    });

    test('moves the rules out of a layer of another name', () => {
      const { element, setCascadeLayer, sheet } = createDeclaredSheet(
        'set-layer-rename',
        '@layer page{}'
      );
      sheet.insert('.test-renamed { opacity: 1 }', 3);
      setCascadeLayer('rnw');

      const rules = readRuleTexts(element.sheet);
      expect(rules).toHaveLength(2);
      expect(rules[0]).toBe('@layer page {}');
      expect(readRuleTexts(element.sheet.cssRules[1])).toContain(
        '.test-renamed {opacity: 1;}'
      );
    });

    test('nests a sheet created after the call', () => {
      const element = document.createElement('style');
      element.setAttribute('id', 'set-layer-first');
      document.head.appendChild(element);
      const { createSheet, setCascadeLayer } = loadIsolatedModule();
      setCascadeLayer('rnw');
      createSheet(undefined, 'set-layer-first');

      expect(element.sheet.cssRules).toHaveLength(1);
      expect(readRuleTexts(element.sheet.cssRules[0])).toContain(
        'body {margin: 0;}'
      );
    });

    test('nests the copies in other roots', () => {
      const { createSheet, setCascadeLayer, sheet } = createDeclaredSheet(
        'set-layer-copy',
        ''
      );
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      const iframeDoc = iframe.contentWindow.document;
      const iframeRootTag = document.createElement('div');
      iframeDoc.body.appendChild(iframeRootTag);
      createSheet(iframeRootTag, 'set-layer-copy');
      setCascadeLayer('rnw');
      sheet.insert('.test-copy { opacity: 1 }', 3);

      const copy = iframeDoc.getElementById('set-layer-copy').sheet;
      expect(copy.cssRules).toHaveLength(1);
      expect(readRuleTexts(copy.cssRules[0])).toEqual(
        expect.arrayContaining([
          'body {margin: 0;}',
          '.test-copy {opacity: 1;}'
        ])
      );
    });

    test('keeps the rules in place where the engine rejects a layer', () => {
      expectRulesKeptInPlace('set-layer-rejected', () => {
        throw new SyntaxError('Failed to parse the rule');
      });
    });

    test('keeps the rules in place where the engine parses a layer as another rule', () => {
      expectRulesKeptInPlace('set-layer-misparsed', (insertRule, position) =>
        insertRule('.misparsed-layer{}', position)
      );
    });

    const expectRulesKeptInPlace = (id, insertLayer) => {
      const { element, setCascadeLayer, sheet } = createDeclaredSheet(id, '');
      const insertRule = element.sheet.insertRule.bind(element.sheet);
      element.sheet.insertRule = (cssText, position) =>
        cssText.startsWith('@layer')
          ? insertLayer(insertRule, position)
          : insertRule(cssText, position);
      const rules = readRuleTexts(element.sheet);
      setCascadeLayer('rnw');
      sheet.insert('.test-unsupported { opacity: 1 }', 3);

      expect(readRuleTexts(element.sheet)).toEqual([
        ...rules,
        '[stylesheet-group="3"] {}',
        '.test-unsupported {opacity: 1;}'
      ]);
      expect(
        sheet.getTextContent().startsWith('[stylesheet-group="0"]{}')
      ).toBe(true);
    };
  });
});
