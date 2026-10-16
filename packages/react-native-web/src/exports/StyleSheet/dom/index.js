/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type {
  CSSRuleContainer,
  OrderedCSSStyleSheet
} from './createOrderedCSSStyleSheet';
import {
  findCascadeLayer,
  readCascadeLayer,
  wrapInCascadeLayer
} from './cascadeLayer';
import canUseDOM from '../../../modules/canUseDom';
import createCSSStyleSheet from './createCSSStyleSheet';
import createOrderedCSSStyleSheet from './createOrderedCSSStyleSheet';

type Sheet = {
  ...OrderedCSSStyleSheet,
  id: string
};

type RootSheet = {|
  // The root's style sheet, which is null where there is no DOM
  +cssSheet: ?CSSRuleContainer,
  // The style sheet, or the cascade layer block in it, that holds the rules
  +container: ?CSSRuleContainer,
  +layerName: ?string,
  +sheet: OrderedCSSStyleSheet
|};

const defaultId = 'react-native-stylesheet';
const roots = new WeakMap<Node, number>();
const sheets: Array<RootSheet> = [];
let cascadeLayerName: ?string = null;

const initialRules = [
  // minimal top-level reset
  'html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}',
  'body{margin:0;}',
  // minimal form pseudo-element reset
  'button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}',
  'input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}'
];

function indexOfFirstGroup(container: CSSRuleContainer): number {
  for (let i = 0; i < container.cssRules.length; i += 1) {
    if (container.cssRules[i].cssText.indexOf('stylesheet-group') > -1) {
      return i;
    }
  }
  return -1;
}

/**
 * Move a root's rules into the cascade layer 'layerName'. The layer block is inserted before the
 * rules are removed, so an engine that cannot parse it keeps them where they were.
 */
function nestRootSheet(rootSheet: RootSheet, layerName: string): RootSheet {
  const { cssSheet, container } = rootSheet;
  if (cssSheet == null || container == null) {
    return {
      cssSheet,
      container,
      layerName,
      sheet: rootSheet.sheet
    };
  }
  const position = cssSheet.cssRules.length;
  try {
    cssSheet.insertRule(
      wrapInCascadeLayer(rootSheet.sheet.getTextContent(), layerName),
      position
    );
  } catch (e) {
    return rootSheet;
  }
  const layer = readCascadeLayer(cssSheet.cssRules[position]);
  if (layer == null) {
    cssSheet.deleteRule(position);
    return rootSheet;
  }
  // The rules run from the container's first group to its end, or to the block just inserted
  const start = indexOfFirstGroup(container);
  if (start > -1) {
    const end = container === cssSheet ? position : container.cssRules.length;
    for (let i = end - 1; i >= start; i -= 1) {
      container.deleteRule(i);
    }
  }
  return {
    cssSheet,
    container: layer.rule,
    layerName,
    sheet: createOrderedCSSStyleSheet(layer.rule)
  };
}

function createRootSheet(cssSheet: ?CSSRuleContainer): RootSheet {
  const layer = findCascadeLayer(cssSheet);
  const container = layer != null ? layer.rule : cssSheet;
  const rootSheet = {
    cssSheet,
    container,
    layerName: layer != null ? layer.name : null,
    sheet: createOrderedCSSStyleSheet(container)
  };
  return cascadeLayerName != null && rootSheet.layerName !== cascadeLayerName
    ? nestRootSheet(rootSheet, cascadeLayerName)
    : rootSheet;
}

function getRootTextContent(rootSheet: RootSheet): string {
  const textContent = rootSheet.sheet.getTextContent();
  return rootSheet.layerName != null
    ? wrapInCascadeLayer(textContent, rootSheet.layerName)
    : textContent;
}

/**
 * Nest the rules of every root, and of every root created later, in the cascade layer 'name', so
 * a page that orders its own styles in layers can position them among its own.
 */
export function setCascadeLayer(name: string): void {
  cascadeLayerName = name;
  sheets.forEach((rootSheet, index) => {
    if (rootSheet.layerName !== name) {
      sheets[index] = nestRootSheet(rootSheet, name);
    }
  });
}

export function createSheet(
  root?: HTMLElement,
  id?: string = defaultId
): Sheet {
  let index: number = 0;

  if (canUseDOM) {
    const rootNode: Node = root != null ? root.getRootNode() : document;
    const rootIndex = roots.get(rootNode);
    // Create the initial style sheet
    if (sheets.length === 0) {
      const rootSheet = createRootSheet(createCSSStyleSheet(id));
      initialRules.forEach((rule) => {
        rootSheet.sheet.insert(rule, 0);
      });
      roots.set(rootNode, index);
      sheets.push(rootSheet);
    } else if (rootIndex == null) {
      const initialSheet = sheets[0];
      // If we're creating a new sheet, populate it with existing styles, nested
      // in the same cascade layer
      const textContent =
        initialSheet != null ? getRootTextContent(initialSheet) : '';
      // Cast rootNode to 'any' because Flow types for getRootNode are wrong
      const rootSheet = createRootSheet(
        createCSSStyleSheet(id, (rootNode: any), textContent)
      );
      index = sheets.length;
      roots.set(rootNode, index);
      sheets.push(rootSheet);
    } else {
      index = rootIndex;
    }
  } else {
    // Create the initial style sheet
    if (sheets.length === 0) {
      const rootSheet = createRootSheet(createCSSStyleSheet(id));
      initialRules.forEach((rule) => {
        rootSheet.sheet.insert(rule, 0);
      });
      sheets.push(rootSheet);
    }
  }

  const sheetIndex = index;
  return {
    getTextContent() {
      return getRootTextContent(sheets[sheetIndex]);
    },
    id,
    insert(cssText: string, groupValue: number) {
      sheets.forEach((s) => {
        s.sheet.insert(cssText, groupValue);
      });
    }
  };
}
