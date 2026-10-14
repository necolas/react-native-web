/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { CSSRuleContainer } from './createOrderedCSSStyleSheet';

/**
 * The cascade layer the runtime style sheet's rules belong to.
 *
 * The rules this sheet holds are framework defaults, but an unlayered declaration takes precedence
 * over every layered one regardless of specificity or layer order. Emitting them unlayered makes
 * them a ceiling rather than a default: an application that puts its own rules in a cascade layer
 * finds them silently outranked, with no error and no specificity fight available to win.
 *
 * Nesting them in a layer restores the intended precedence. Application styles stay unlayered and
 * continue to win, and an application that uses layers can position this one by name.
 */
export const CASCADE_LAYER_NAME = 'rnw';

const layerBlockPrefix = `@layer ${CASCADE_LAYER_NAME}{`;

/**
 * Serialize css text as the contents of the cascade layer. Pure, total, and deterministic: the
 * single place the layer's syntax is written, so the runtime sheet and the extracted text cannot
 * disagree about what the layer is called or how it is opened.
 */
export function wrapInCascadeLayer(cssText: string): string {
  return `${layerBlockPrefix}${cssText}}`;
}

/**
 * A CSSLayerBlockRule is the only rule type exposing both 'name' and 'insertRule'.
 * CSSKeyframesRule has a 'name' and no 'insertRule', and the legacy numeric 'type' reports 0 for
 * every rule added after that enum was frozen, so it distinguishes nothing.
 */
export function isCascadeLayerRule(rule: ?Object): boolean {
  return (
    rule != null &&
    rule.name === CASCADE_LAYER_NAME &&
    typeof rule.insertRule === 'function'
  );
}

/**
 * The sheet's own cascade layer block, or null where the CSSOM cannot express one.
 *
 * Support is measured rather than assumed, because an engine without it fails silently in two
 * directions: 'insertRule' may accept the layer text and expose it as an ordinary style rule, and
 * a style element whose text is wrapped in a layer block may fail to parse in full. A rule that
 * turns out not to be a layer is removed again, so an unsupported engine is left exactly as it was.
 */
export function resolveCascadeLayer(
  sheet: ?CSSRuleContainer
): ?CSSRuleContainer {
  if (sheet == null) {
    return null;
  }
  const rules = sheet.cssRules;
  for (let i = 0; i < rules.length; i += 1) {
    if (isCascadeLayerRule(rules[i])) {
      return rules[i];
    }
  }
  const position = rules.length;
  try {
    sheet.insertRule(`${layerBlockPrefix}}`, position);
  } catch (e) {
    return null;
  }
  if (isCascadeLayerRule(rules[position])) {
    return rules[position];
  }
  sheet.deleteRule(position);
  return null;
}

/**
 * Whether this document's CSSOM implements cascade layers. Measured against a detached probe so
 * the answer is available before a style element's text is composed, and leaves the document as
 * it was found.
 */
export function documentSupportsCascadeLayer(): boolean {
  const head = document.head;
  if (head == null) {
    return false;
  }
  const probe = document.createElement('style');
  head.appendChild(probe);
  const supported = resolveCascadeLayer(probe.sheet) != null;
  head.removeChild(probe);
  return supported;
}
