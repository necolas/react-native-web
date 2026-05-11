/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Verifies the __RNW_INGEST_DELTA__ hook handles delta `<style>` elements
 * that stream into the document AFTER initial RNW boot. Each test uses
 * jest.isolateModules so dom/index.js's module-scope `sheets` array
 * starts fresh — otherwise tests would see the prior test's createSheet
 * having already booted.
 */

const planStyleElement = (textContent, attrs = {}) => {
  const el = document.createElement('style');
  Object.keys(attrs).forEach((k) => el.setAttribute(k, attrs[k]));
  el.appendChild(document.createTextNode(textContent));
  document.head.appendChild(el);
  return el;
};

import createOrderedCSSStyleSheet from '../dom/createOrderedCSSStyleSheet';

const buildDeltaText = (rules) => {
  // createOrderedCSSStyleSheet is stateless; we use it as a helper to
  // construct the same CSS text the SSR pipeline would emit.
  const s = createOrderedCSSStyleSheet();
  rules.forEach(([cssText, group]) => s.insert(cssText, group));
  return s.getTextContent();
};

const cleanup = () => {
  delete window.__RNW_DELTA__;
  delete window.__RNW_INGEST_DELTA__;
  document.querySelectorAll('style').forEach((el) => el.remove());
};

afterEach(cleanup);

describe('createSheet streaming-delta late ingest', () => {
  test('drains pending __RNW_DELTA__ ids on initial sheet boot', () => {
    jest.isolateModules(() => {
      const { createSheet } = require('../dom');

      planStyleElement(buildDeltaText([['.pre-boot { padding: 8px }', 1]]), {
        'data-rnw-delta': '1'
      });
      window.__RNW_DELTA__ = ['1'];

      const sheet = createSheet();

      expect(typeof window.__RNW_INGEST_DELTA__).toBe('function');
      expect(window.__RNW_DELTA__.length).toBe(0);

      const repeat = sheet.insert('.pre-boot { padding: 8px }', 1);
      expect(repeat.ruleAdded).toBe(false);
    });
  });

  test('absorbs a delta that arrives AFTER boot via the hook', () => {
    jest.isolateModules(() => {
      const { createSheet } = require('../dom');

      // Boot first with no pending deltas.
      const sheet = createSheet();
      expect(typeof window.__RNW_INGEST_DELTA__).toBe('function');

      // A streaming chunk lands later.
      planStyleElement(buildDeltaText([['.post-boot { margin: 4px }', 1]]), {
        'data-rnw-delta': '2'
      });
      (window.__RNW_DELTA__ = window.__RNW_DELTA__ || []).push('2');
      window.__RNW_INGEST_DELTA__();

      const repeat = sheet.insert('.post-boot { margin: 4px }', 1);
      expect(repeat.ruleAdded).toBe(false);
      expect(sheet.getTextContent()).toContain('.post-boot');
    });
  });

  test('processing a delta twice is a no-op', () => {
    jest.isolateModules(() => {
      const { createSheet } = require('../dom');

      planStyleElement(buildDeltaText([['.idempotent { width: 7px }', 1]]), {
        'data-rnw-delta': '3'
      });
      window.__RNW_DELTA__ = ['3'];

      const sheet = createSheet();

      // Re-push the same id and call the hook again — should be a no-op.
      window.__RNW_DELTA__.push('3');
      window.__RNW_INGEST_DELTA__();

      const repeat = sheet.insert('.idempotent { width: 7px }', 1);
      expect(repeat.ruleAdded).toBe(false);

      const text = sheet.getTextContent();
      const matches = (text.match(/\.idempotent/g) || []).length;
      expect(matches).toBe(1);
    });
  });

  test('queues delta ids when the hook is not yet installed', () => {
    jest.isolateModules(() => {
      // Server's inline script runs before RNW boots. It pushes into the
      // queue and tries to call the hook, which is absent — a no-op.
      (window.__RNW_DELTA__ = window.__RNW_DELTA__ || []).push('4');
      expect(typeof window.__RNW_INGEST_DELTA__).toBe('undefined');

      planStyleElement(
        buildDeltaText([['.queued-before-boot { color: blue }', 1]]),
        { 'data-rnw-delta': '4' }
      );

      // RNW boots; queue gets drained by installDeltaIngest.
      const { createSheet } = require('../dom');
      const sheet = createSheet();
      expect(window.__RNW_DELTA__.length).toBe(0);

      const repeat = sheet.insert('.queued-before-boot { color: blue }', 1);
      expect(repeat.ruleAdded).toBe(false);
    });
  });
});
