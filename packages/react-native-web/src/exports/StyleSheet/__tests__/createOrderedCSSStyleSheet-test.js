/* eslint-env jasmine, jest */

'use strict';

import createOrderedCSSStyleSheet from '../createOrderedCSSStyleSheet';

const insertStyleElement = () => {
  const element = document.createElement('style');
  const head = document.head;
  head.insertBefore(element, head.firstChild);
  return element;
};

const removeStyleElement = element => {
  document.head.removeChild(element);
};

describe('createOrderedCSSStyleSheet', () => {
  describe('#insert', () => {
    test('insertion order for same group', () => {
      const sheet = createOrderedCSSStyleSheet();

      expect(sheet.getTextContent()).toMatchSnapshot();

      sheet.insert('.one {}', 0);
      expect(sheet.getTextContent()).toMatchSnapshot();

      sheet.insert('.two {}', 0);
      expect(sheet.getTextContent()).toMatchSnapshot();

      sheet.insert('.three {}', 0);
      expect(sheet.getTextContent()).toMatchSnapshot();
    });

    test('deduplication for same group', () => {
      const sheet = createOrderedCSSStyleSheet();

      expect(sheet.getTextContent()).toMatchSnapshot();

      sheet.insert('.one {}', 0);
      expect(sheet.getTextContent()).toMatchSnapshot();

      sheet.insert('.one {}', 0);
      expect(sheet.getTextContent()).toMatchSnapshot();
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

      expect(sheet.getTextContent()).toMatchSnapshot();
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
      expect(clientSheet.getTextContent()).toMatchSnapshot();
    });
  });
});
