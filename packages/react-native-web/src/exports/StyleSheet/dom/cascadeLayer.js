/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { CSSRuleContainer } from './createOrderedCSSStyleSheet';

export type CascadeLayer = {|
  +name: string,
  +rule: CSSRuleContainer
|};

const layerBlockPattern = /^@layer\s*([^{]*?)\s*\{/;

/**
 * The cascade layer a rule opens, when the rule is a layer block. A layer statement such as
 * `@layer rnw;` groups no rules, so it has no 'insertRule'.
 */
export function readCascadeLayer(rule: Object): ?CascadeLayer {
  if (typeof rule.insertRule !== 'function') {
    return null;
  }
  const match = layerBlockPattern.exec(rule.cssText);
  return match != null ? { name: match[1], rule } : null;
}

/**
 * The first cascade layer block in a style sheet, e.g. one a page declared in the style sheet's
 * element, `<style id="react-native-stylesheet">@layer rnw{}</style>`, or one a server rendered.
 * The runtime rules are inserted into it, so a page's unlayered and later-layered styles take
 * precedence over them. An engine without cascade layers drops the block, which leaves the sheet
 * unlayered.
 */
export function findCascadeLayer(sheet: ?CSSRuleContainer): ?CascadeLayer {
  if (sheet == null) {
    return null;
  }
  const rules = sheet.cssRules;
  for (let i = 0; i < rules.length; i += 1) {
    const layer = readCascadeLayer(rules[i]);
    if (layer != null) {
      return layer;
    }
  }
  return null;
}

/**
 * Serialize css text as the contents of the layer block named 'name', an anonymous layer when the
 * name is empty, so a copy of the sheet carries the same precedence as the sheet it was taken from.
 */
export function wrapInCascadeLayer(cssText: string, name: string): string {
  return name === '' ? `@layer{${cssText}}` : `@layer ${name}{${cssText}}`;
}
