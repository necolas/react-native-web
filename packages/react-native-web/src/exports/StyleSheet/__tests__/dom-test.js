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
});
