/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

type Groups = { [key: number]: Array<string> };
type Selectors = { [key: string]: boolean };

const slice = Array.prototype.slice;

/**
 * Order-based insertion of CSS.
 *
 * Each rule can be inserted (appended) into a numerically defined group.
 * Groups are ordered within the style sheet according to their number, with the
 * lowest first.
 *
 * Groups are implemented using Media Query blocks. CSSMediaRule implements the
 * CSSGroupingRule, which includes 'insertRule', allowing groups to be treated as
 * a sub-sheet.
 * https://developer.mozilla.org/en-US/docs/Web/API/CSSMediaRule
 *
 * The selector of the first rule of each group is used only to encode the group
 * number for hydration.
 */
export default function createOrderedCSSStyleSheet(sheet: ?CSSStyleSheet) {
  const groups: Groups = {};
  const selectors: Selectors = {};

  /**
   * Hydrate approximate record from any existing rules in the sheet.
   */
  if (sheet != null) {
    slice.call(sheet.cssRules).forEach(mediaRule => {
      if (mediaRule.media == null) {
        throw new Error(
          'OrderedCSSStyleSheet: hydrating invalid stylesheet. Expected only @media rules.'
        );
      }

      // Create group number
      const group = decodeGroupRule(mediaRule);
      groups[group] = [];

      // Create record of existing selectors and rules
      slice.call(mediaRule.cssRules).forEach(rule => {
        const selectorText = getSelectorText(rule.cssText);
        if (selectorText != null) {
          selectors[selectorText] = true;
          groups[group].push(rule.cssText);
        }
      });
    });
  }

  const OrderedCSSStyleSheet = {
    /**
     * The textContent of the style sheet.
     * Each group's rules are wrapped in a media query.
     */
    getTextContent(): string {
      return getOrderedGroups(groups)
        .map(group => {
          const rules = groups[group];
          const str = rules.join('\n');
          return createMediaRule(str);
        })
        .join('\n');
    },

    /**
     * Insert a rule into a media query in the style sheet
     */
    insert(cssText: string, group: number) {
      // Create a new group.
      if (groups[group] == null) {
        const markerRule = encodeGroupRule(group);

        // Create the internal record.
        groups[group] = [];
        groups[group].push(markerRule);

        // Create CSSOM CSSMediaRule.
        if (sheet != null) {
          const groupIndex = getOrderedGroups(groups).indexOf(group);
          insertRuleAt(sheet, createMediaRule(markerRule), groupIndex);
        }
      }

      // selectorText is more reliable than cssText for insertion checks. The
      // browser excludes vendor-prefixed properties and rewrites certain values
      // making cssText more likely to be different from what was inserted.
      const selectorText = getSelectorText(cssText);
      if (selectorText != null && selectors[selectorText] == null) {
        // Update the internal records.
        selectors[selectorText] = true;
        groups[group].push(cssText);
        // Update CSSOM CSSMediaRule.
        if (sheet != null) {
          const groupIndex = getOrderedGroups(groups).indexOf(group);
          const root = sheet.cssRules[groupIndex];
          if (root != null) {
            // $FlowFixMe: Flow is missing CSSOM types
            insertRuleAt(root, cssText, root.cssRules.length);
          }
        }
      }
    }
  };

  return OrderedCSSStyleSheet;
}

/**
 * Helper functions
 */

function createMediaRule(content) {
  return `@media all {\n${content}\n}`;
}

function encodeGroupRule(group) {
  return `[stylesheet-group="${group}"]{}`;
}

function decodeGroupRule(mediaRule) {
  return mediaRule.cssRules[0].selectorText.split('"')[1];
}

function getOrderedGroups(obj: { [key: number]: any }) {
  return Object.keys(obj)
    .sort()
    .map(k => Number(k));
}

const pattern = /\s*([,])\s*/g;
function getSelectorText(cssText) {
  const selector = cssText.split('{')[0].trim();
  return selector !== '' ? selector.replace(pattern, '$1') : null;
}

function insertRuleAt(root, cssText: string, position: number) {
  try {
    // $FlowFixMe: Flow is missing CSSOM types needed to type 'root'.
    root.insertRule(cssText, position);
  } catch (e) {
    // JSDOM doesn't support `CSSSMediaRule#insertRule`.
    // Also ignore errors that occur from attempting to insert vendor-prefixed selectors.
  }
}
