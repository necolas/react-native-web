/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { OrderedCSSStyleSheet } from './createOrderedCSSStyleSheet';

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import createCSSStyleSheet from './createCSSStyleSheet';
import createOrderedCSSStyleSheet from './createOrderedCSSStyleSheet';

type Sheet = {
  ...OrderedCSSStyleSheet,
  id: string
};

const defaultId = 'react-native-stylesheet';
const roots = new WeakMap<Node, number>();
const sheets = [];

export function createSheet(root?: HTMLElement, id?: string = defaultId): Sheet {
  let sheet;

  if (ExecutionEnvironment.canUseDOM) {
    const rootNode: Node = root != null ? root.getRootNode() : document;
    const index = roots.get(rootNode);
    if (index == null) {
      const initialSheet = sheets[0];
      // If we're creating a new sheet, populate it with existing styles
      const textContent = initialSheet != null ? initialSheet.getTextContent() : null;
      // Cast rootNode to 'any' because Flow types for getRootNode are wrong
      sheet = createOrderedCSSStyleSheet(createCSSStyleSheet(id, textContent, (rootNode: any)));
      roots.set(rootNode, sheets.length);
      sheets.push(sheet);
    } else {
      sheet = sheets[index];
    }
  } else {
    sheet = createOrderedCSSStyleSheet(createCSSStyleSheet(id));
  }

  return {
    getTextContent() {
      return sheet.getTextContent();
    },
    id,
    insert(cssText: string, groupValue: number) {
      sheets.forEach((s) => {
        s.insert(cssText, groupValue);
      });
    }
  };
}
