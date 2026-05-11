/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createOrderedCSSStyleSheet from '../dom/createOrderedCSSStyleSheet';

const insertStyleElement = () => {
  const element = document.createElement('style');
  const head = document.head;
  head.insertBefore(element, head.firstChild);
  return element;
};

const removeStyleElement = (element) => {
  document.head.removeChild(element);
};

describe('createOrderedCSSStyleSheet', () => {
  describe('#insert', () => {
    test('insertion order for same group', () => {
      const sheet = createOrderedCSSStyleSheet();

      expect(sheet.getTextContent()).toMatchInlineSnapshot('""');

      sheet.insert('.a {}', 0);
      expect(sheet.getTextContent()).toMatchInlineSnapshot(`
        "[stylesheet-group="0"]{}
        .a {}"
      `);

      sheet.insert('.b {}', 0);
      expect(sheet.getTextContent()).toMatchInlineSnapshot(`
        "[stylesheet-group="0"]{}
        .a {}
        .b {}"
      `);

      sheet.insert('.c {}', 0);
      expect(sheet.getTextContent()).toMatchInlineSnapshot(`
        "[stylesheet-group="0"]{}
        .a {}
        .b {}
        .c {}"
      `);
    });

    test('deduplication for same group', () => {
      const sheet = createOrderedCSSStyleSheet();

      sheet.insert('.a {}', 0);
      sheet.insert('.a {}', 0);
      sheet.insert('.a {}', 0);

      expect(sheet.getTextContent()).toMatchInlineSnapshot(`
        "[stylesheet-group="0"]{}
        .a {}"
      `);
    });

    test('order for same group', () => {
      const sheet = createOrderedCSSStyleSheet();

      sheet.insert('.c {}', 0);
      sheet.insert('.b {}', 0);
      sheet.insert('.a {}', 0);

      expect(sheet.getTextContent()).toMatchInlineSnapshot(`
        "[stylesheet-group="0"]{}
        .a {}
        .b {}
        .c {}"
      `);
    });

    test('insertion order for different groups', () => {
      const sheet = createOrderedCSSStyleSheet();

      sheet.insert('.nine-1 {}', 9.9);
      sheet.insert('.nine-2 {}', 9.9);
      sheet.insert('.three {}', 3);
      sheet.insert('.one {}', 1);
      sheet.insert('.two {}', 2.2);
      sheet.insert('.four-1 {}', 4);
      sheet.insert('.four-2 {}', 4);
      sheet.insert('.twenty {}', 20);
      sheet.insert('.ten {}', 10);
      sheet.insert('.twenty-point2 {}', 20.2);

      expect(sheet.getTextContent()).toMatchInlineSnapshot(`
        "[stylesheet-group="1"]{}
        .one {}
        [stylesheet-group="2.2"]{}
        .two {}
        [stylesheet-group="3"]{}
        .three {}
        [stylesheet-group="4"]{}
        .four-1 {}
        .four-2 {}
        [stylesheet-group="9.9"]{}
        .nine-1 {}
        .nine-2 {}
        [stylesheet-group="10"]{}
        .ten {}
        [stylesheet-group="20"]{}
        .twenty {}
        [stylesheet-group="20.2"]{}
        .twenty-point2 {}"
      `);
    });
  });

  describe('client-side hydration', () => {
    let element;

    beforeEach(() => {
      if (element != null) {
        removeStyleElement(element);
      }
      element = insertStyleElement();
    });

    test('from SSR CSS', () => {
      // Setup SSR CSS
      const serverSheet = createOrderedCSSStyleSheet();
      serverSheet.insert('.one { width: 10px; }', 1);
      serverSheet.insert('.two-1 { height: 20px; }', 2);
      serverSheet.insert('.two-2 { color: red; }', 2);
      serverSheet.insert('@keyframes anim { 0% { opacity: 1; } }', 2);
      const textContent = serverSheet.getTextContent();

      // Add SSR CSS to client style sheet
      element.appendChild(document.createTextNode(textContent));
      const clientSheet = createOrderedCSSStyleSheet(element.sheet);
      expect(clientSheet.getTextContent()).toMatchInlineSnapshot(`
        "[stylesheet-group="1"] {}
        .one {width: 10px;}
        [stylesheet-group="2"] {}
        .two-1 {height: 20px;}
        .two-2 {color: red;}
        @keyframes anim { 
          0% {opacity: 1;} 
        }"
      `);
    });

    test('works when the group marker is in single quotes', () => {
      // Setup SSR CSS
      const serverSheet = createOrderedCSSStyleSheet();
      serverSheet.insert('.a { color: red }', 0);
      serverSheet.insert('.b { color: red }', 1);
      const textContent = serverSheet.getTextContent().replace(/"/g, "'");

      // Add SSR CSS to client style sheet
      element.appendChild(document.createTextNode(textContent));
      const clientSheet = createOrderedCSSStyleSheet(element.sheet);
      clientSheet.insert('.c { color: red }', 0);
      expect(clientSheet.getTextContent()).toMatchInlineSnapshot(`
        "[stylesheet-group='0'] {}
        .a {color: red;}
        .c { color: red }
        [stylesheet-group='1'] {}
        .b {color: red;}"
      `);
    });

    test('hydrates from additional (streaming-delta) sheets', () => {
      // Primary sheet contains the shell head dump (group 0 + group 2).
      const primary = insertStyleElement();
      const primaryServer = createOrderedCSSStyleSheet();
      primaryServer.insert('.a { color: red }', 0);
      primaryServer.insert('.b { width: 10px }', 2);
      primary.appendChild(
        document.createTextNode(primaryServer.getTextContent())
      );

      // Two delta tags, as a streaming SSR pipeline would have emitted them.
      // Delta 1 carries group 1 rules; delta 2 carries group 3 rules. They
      // include their own group-marker rules so hydration knows which group
      // each rule belongs to.
      const delta1 = insertStyleElement();
      const deltaServer1 = createOrderedCSSStyleSheet();
      deltaServer1.insert('.c { padding: 8px }', 1);
      delta1.appendChild(
        document.createTextNode(deltaServer1.getTextContent())
      );

      const delta2 = insertStyleElement();
      const deltaServer2 = createOrderedCSSStyleSheet();
      deltaServer2.insert('.d { margin: 4px }', 3);
      delta2.appendChild(
        document.createTextNode(deltaServer2.getTextContent())
      );

      const clientSheet = createOrderedCSSStyleSheet(primary.sheet, [
        delta1.sheet,
        delta2.sheet
      ]);

      // The unified record sees every group from every source, in order.
      expect(clientSheet.getTextContent()).toMatchInlineSnapshot(`
        "[stylesheet-group="0"] {}
        .a {color: red;}
        [stylesheet-group="1"] {}
        .c {padding: 8px;}
        [stylesheet-group="2"] {}
        .b {width: 10px;}
        [stylesheet-group="3"] {}
        .d {margin: 4px;}"
      `);

      // Dedup is unified: a rule that already lives in a delta tag is a
      // no-op when inserted again at runtime.
      const repeatPaddingResult = clientSheet.insert('.c { padding: 8px }', 1);
      expect(repeatPaddingResult.ruleAdded).toBe(false);

      // A brand-new rule at runtime lands in the primary sheet's records.
      const newResult = clientSheet.insert('.e { gap: 12px }', 1);
      expect(newResult.ruleAdded).toBe(true);

      removeStyleElement(primary);
      removeStyleElement(delta1);
      removeStyleElement(delta2);
    });
  });
});
