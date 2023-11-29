/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { OrderedCSSStyleSheet } from './createOrderedCSSStyleSheet';
import canUseDOM from '../../../modules/canUseDom';
import createCSSStyleSheet from './createCSSStyleSheet';
import createOrderedCSSStyleSheet from './createOrderedCSSStyleSheet';

type Sheet = {
  ...OrderedCSSStyleSheet,
  id: string
};

const defaultId = 'react-native-stylesheet';
const _roots = new WeakMap<Node, number>();
const _sheets = [];

const initialRules = [
  // minimal top-level reset
  'html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}',
  'body{margin:0;}',
  // minimal form pseudo-element reset
  'button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}',
  'input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}'
];

export function createSheet(
  _rootNode?: Document | ShadowRoot,
  id?: string = defaultId
): Sheet {
  let sheet;

  if (canUseDOM) {
    window.__sheets = window.__sheets || _sheets;
    window.__roots = window.__roots || _roots;

    const sheets = window.__sheets;
    const roots = window.__roots;
    let rootNode = _rootNode;

    if (_rootNode == null) {
      rootNode = document;
    }
    // Create the initial style sheet
    if (sheets.length === 0) {
      sheet = createOrderedCSSStyleSheet(createCSSStyleSheet(id, rootNode));
      initialRules.forEach((rule) => {
        sheet.insert(rule, 0);
      });
      roots.set(rootNode, sheets.length);
      sheets.push(sheet);
    } else {
      const index = roots.get(rootNode);
      if (index == null) {
        const initialSheet = sheets[0];
        // If we're creating a new sheet, populate it with existing styles
        const textContent =
          initialSheet != null ? initialSheet.getTextContent() : '';
        // Cast rootNode to 'any' because Flow types for getRootNode are wrong
        sheet = createOrderedCSSStyleSheet(
          createCSSStyleSheet(id, (rootNode: any), textContent)
        );
        roots.set(rootNode, sheets.length);
        sheets.push(sheet);
      } else {
        sheet = sheets[index];
      }
    }
  } else {
    // Create the initial style sheet
    if (_sheets.length === 0) {
      sheet = createOrderedCSSStyleSheet(createCSSStyleSheet(id));
      initialRules.forEach((rule) => {
        sheet.insert(rule, 0);
      });
      _sheets.push(sheet);
    } else {
      sheet = _sheets[0];
    }
  }

  return {
    getTextContent() {
      return sheet.getTextContent();
    },
    id,
    insert(cssText: string, groupValue: number) {
      const sheets = canUseDOM ? window.__sheets : _sheets;
      sheets.forEach((s) => {
        s.insert(cssText, groupValue);
      });
    }
  };
}
