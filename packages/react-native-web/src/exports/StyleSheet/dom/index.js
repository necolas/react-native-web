/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type {
  InsertResult,
  OrderedCSSStyleSheet
} from './createOrderedCSSStyleSheet';
import canUseDOM from '../../../modules/canUseDom';
import createCSSStyleSheet from './createCSSStyleSheet';
import createOrderedCSSStyleSheet from './createOrderedCSSStyleSheet';
import { installDeltaIngest } from './ingestDelta';

type Sheet = {
  ...OrderedCSSStyleSheet,
  id: string
};

export type { InsertResult } from './createOrderedCSSStyleSheet';

const defaultId = 'react-native-stylesheet';
// Attribute marking server-emitted streaming delta `<style>` elements.
// Initial hydration scans these so the dedup map / groups records reflect
// every rule that is already present in the document, regardless of which
// `<style>` element it physically lives in.
const deltaAttr = 'data-rnw-delta';
const roots = new WeakMap<Node, number>();
const sheets = [];

function collectDeltaSheets(
  rootNode: Document | ShadowRoot
): Array<CSSStyleSheet> {
  // $FlowFixMe — querySelectorAll types are imperfect for Document/ShadowRoot union
  const elements = rootNode.querySelectorAll(`style[${deltaAttr}]`);
  const result: Array<CSSStyleSheet> = [];
  for (let i = 0; i < elements.length; i++) {
    // $FlowFixMe — HTMLStyleElement.sheet is incorrectly typed
    const s: ?CSSStyleSheet = elements[i].sheet;
    if (s != null) result.push(s);
  }
  return result;
}

const initialRules = [
  // minimal top-level reset
  'html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}',
  'body{margin:0;}',
  // minimal form pseudo-element reset
  'button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}',
  'input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}'
];

export function createSheet(
  root?: HTMLElement,
  id?: string = defaultId
): Sheet {
  let sheet;

  if (canUseDOM) {
    const rootNode: Node = root != null ? root.getRootNode() : document;
    // Create the initial style sheet
    if (sheets.length === 0) {
      // Hydrate from the primary <style id="react-native-stylesheet"> AND any
      // <style data-rnw-delta="..."> elements emitted by the streaming SSR
      // pipeline. Browsers apply CSS from delta tags directly (no FOUC), but
      // RNW's selectors/groups records must also know about those rules so
      // runtime StyleSheet.create calls don't re-insert duplicates.
      const primary = createCSSStyleSheet(id);
      const deltas =
        rootNode instanceof Document || rootNode instanceof ShadowRoot
          ? collectDeltaSheets(rootNode)
          : [];
      sheet = createOrderedCSSStyleSheet(primary, deltas);
      initialRules.forEach((rule) => {
        sheet.insert(rule, 0);
      });
      roots.set(rootNode, sheets.length);
      sheets.push(sheet);
      // Install the global ingest hook so any `<style data-rnw-delta>`
      // elements that stream into the document AFTER this point — when
      // suspense boundaries resolve and React commits their chunk —
      // also get registered into the bookkeeping. The hook also drains
      // any IDs that arrived in window.__RNW_DELTA__ before RNW booted.
      installDeltaIngest(sheets);
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
    if (sheets.length === 0) {
      sheet = createOrderedCSSStyleSheet(createCSSStyleSheet(id));
      initialRules.forEach((rule) => {
        sheet.insert(rule, 0);
      });
      sheets.push(sheet);
    } else {
      sheet = sheets[0];
    }
  }

  return {
    getTextContent() {
      return sheet.getTextContent();
    },
    id,
    insert(cssText: string, groupValue: number): InsertResult {
      // Forward the primary sheet's result. Secondary sheets (e.g. Shadow DOM
      // clones) inherit the same dedup state so the primary's signal is the
      // authoritative answer for whether new content was added.
      let result: InsertResult = { groupCreated: false, ruleAdded: false };
      sheets.forEach((s, index) => {
        const r = s.insert(cssText, groupValue);
        if (index === 0) {
          result = r;
        }
      });
      return result;
    },
    registerExisting(cssText: string, groupValue: number): InsertResult {
      let result: InsertResult = { groupCreated: false, ruleAdded: false };
      sheets.forEach((s, index) => {
        const r = s.registerExisting(cssText, groupValue);
        if (index === 0) {
          result = r;
        }
      });
      return result;
    }
  };
}
