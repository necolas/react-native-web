/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { OrderedCSSStyleSheet } from './createOrderedCSSStyleSheet';

/**
 * Client-side ingest path for streaming-SSR delta tags emitted by the server.
 *
 * The pipeline the consumer is expected to use, per chunk:
 *
 *   <style data-rnw-delta="N">[stylesheet-group="2"]{} .r-foo {...}</style>
 *   <script>
 *     (window.__RNW_DELTA__ = window.__RNW_DELTA__ || []).push("N");
 *     if (window.__RNW_INGEST_DELTA__) window.__RNW_INGEST_DELTA__();
 *   </script>
 *
 * The browser applies the `<style data-rnw-delta>` rules immediately — that
 * is the no-FOUC guarantee. The inline script is *only* a bookkeeping
 * signal: it tells RNW that the rule is already present in the document
 * so a later StyleSheet.create call for the same atomic class can dedup
 * instead of re-inserting a duplicate into the primary sheet at runtime.
 *
 * If the inline script runs before RNW's runtime has installed
 * __RNW_INGEST_DELTA__, the ID stays in the queue; RNW drains the queue
 * on first sheet bootstrap. If RNW never loads (JS-disabled bots), the
 * page still renders correctly — only the bookkeeping is unused.
 *
 * Re-processing a delta is a no-op (processed IDs are tracked).
 */

declare var window: {
  __RNW_DELTA__?: Array<string | number>,
  __RNW_INGEST_DELTA__?: () => void,
  ...
};

const QUEUE_KEY = '__RNW_DELTA__';
const HOOK_KEY = '__RNW_INGEST_DELTA__';

const slice = Array.prototype.slice;
const groupSplitPattern = /["']/g;

function decodeGroupRule(cssRule: CSSStyleRule): ?number {
  // Marker rules look like `[stylesheet-group="N"]{}`. Pull N out of the
  // selector text in a way that tolerates either quote style.
  const selector = cssRule.selectorText;
  if (selector == null) return null;
  const parts = selector.split(groupSplitPattern);
  if (parts.length < 2) return null;
  const n = Number(parts[1]);
  return isFinite(n) ? n : null;
}

/**
 * Install the global ingest hook and drain any pending queued deltas. Safe
 * to call multiple times — only the first call installs the hook; subsequent
 * calls are no-ops aside from draining the queue.
 *
 * `sheets` is the live array of OrderedCSSStyleSheets that the dom wrapper
 * keeps; the hook updates every sheet (so Shadow DOM clones learn about
 * deltas too). The reference is captured by closure so future deltas pushed
 * after the hook is installed land in the same set.
 */
export function installDeltaIngest(
  sheets: $ReadOnlyArray<OrderedCSSStyleSheet>
): void {
  if (typeof window === 'undefined') return;

  const processed: Set<string> = new Set();

  function ingestOne(id: string | number): void {
    const key = String(id);
    if (processed.has(key)) return;
    processed.add(key);

    const element = document.querySelector(
      `style[data-rnw-delta="${cssEscape(key)}"]`
    );
    if (element == null) return;
    // $FlowFixMe — HTMLStyleElement.sheet is incorrectly typed
    const cssSheet: ?CSSStyleSheet = element.sheet;
    if (cssSheet == null) return;

    let currentGroup: ?number = null;
    slice.call(cssSheet.cssRules).forEach((cssRule) => {
      const cssText = cssRule.cssText;
      if (cssText.indexOf('stylesheet-group') > -1) {
        currentGroup = decodeGroupRule(cssRule);
      } else if (currentGroup != null) {
        sheets.forEach((s) => {
          s.registerExisting(cssText, currentGroup);
        });
      }
    });
  }

  function drain(): void {
    const queue = window[QUEUE_KEY];
    if (!Array.isArray(queue)) return;
    while (queue.length > 0) {
      const id = queue.shift();
      if (id != null) ingestOne(id);
    }
  }

  if (typeof window[HOOK_KEY] !== 'function') {
    // $FlowFixMe — augmenting window with our internal hook
    window[HOOK_KEY] = drain;
  }
  // Always drain on install in case entries arrived before the hook existed.
  drain();
}

// Minimal CSS attribute-selector escape for the delta id. Delta ids are
// emitted by the server as plain digit / hyphen strings, so this only
// needs to cover the long-tail of consumers who pass something weird.
function cssEscape(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\x00-\x1f"\\]/g, '\\$&');
}
