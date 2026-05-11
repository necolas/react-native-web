/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Verifies that `createSheet` scans `<style data-rnw-delta>` elements during
 * its initial bootstrap so the dedup map / groups records know about every
 * rule already in the document, regardless of which physical `<style>`
 * element it lives in.
 *
 * This file lives separately from dom-test.js because `dom/index.js` keeps
 * module-scope state (`sheets`, `roots`); putting this scenario in its own
 * Jest module gives it a fresh module instance with a fresh sheets array.
 */

import createOrderedCSSStyleSheet from '../dom/createOrderedCSSStyleSheet';
import { createSheet } from '../dom';

const planStyleElement = (textContent, attrs = {}) => {
  const el = document.createElement('style');
  Object.keys(attrs).forEach((k) => el.setAttribute(k, attrs[k]));
  el.appendChild(document.createTextNode(textContent));
  document.head.appendChild(el);
  return el;
};

describe('createSheet streaming-delta hydration', () => {
  test('scans <style data-rnw-delta> tags and merges into the bookkeeping', () => {
    // Build CSS text for a primary + two delta sheets as a streaming SSR
    // pipeline would have emitted them.
    const primaryServer = createOrderedCSSStyleSheet();
    primaryServer.insert('.shell-a { color: red }', 0);
    primaryServer.insert('.shell-b { width: 12px }', 2);
    planStyleElement(primaryServer.getTextContent(), {
      id: 'react-native-stylesheet'
    });

    const delta1Server = createOrderedCSSStyleSheet();
    delta1Server.insert('.boundary-c { padding: 8px }', 1);
    planStyleElement(delta1Server.getTextContent(), {
      'data-rnw-delta': '1'
    });

    const delta2Server = createOrderedCSSStyleSheet();
    delta2Server.insert('.boundary-d { margin: 4px }', 3);
    planStyleElement(delta2Server.getTextContent(), {
      'data-rnw-delta': '2'
    });

    // Boot RNW's runtime sheet. This is the first call into createSheet in
    // this Jest module so it walks the head, picks up the primary sheet,
    // and scans every <style data-rnw-delta> element.
    const sheet = createSheet();

    // Runtime insert of a rule that is already in delta1 must dedup —
    // ruleAdded is false even though delta1 is a different <style> element
    // from the primary one createSheet writes into.
    const repeatResult = sheet.insert('.boundary-c { padding: 8px }', 1);
    expect(repeatResult.ruleAdded).toBe(false);

    // Runtime insert of a rule already in delta2 also dedups.
    const repeatDelta2 = sheet.insert('.boundary-d { margin: 4px }', 3);
    expect(repeatDelta2.ruleAdded).toBe(false);

    // Runtime insert of a brand new rule lands as expected.
    const novelResult = sheet.insert('.runtime-e { gap: 16px }', 1);
    expect(novelResult.ruleAdded).toBe(true);

    // getTextContent reflects every group + every rule across all sources
    // plus the runtime-added rule.
    const text = sheet.getTextContent();
    expect(text).toContain('.shell-a');
    expect(text).toContain('.shell-b');
    expect(text).toContain('.boundary-c');
    expect(text).toContain('.boundary-d');
    expect(text).toContain('.runtime-e');
  });
});
