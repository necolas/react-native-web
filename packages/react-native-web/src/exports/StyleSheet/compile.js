/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import createReactDOMStyle from './createReactDOMStyle';
import hash from '../../vendor/hash';
import hyphenateStyleName from 'hyphenate-style-name';
import normalizeValueWithProperty from './normalizeValueWithProperty';
import prefixStyles, { prefixInlineStyles } from '../../modules/prefixStyles';

type Value = Object | Array<any> | string | number;
type Style = { [key: string]: Value };
type Rule = string;
type Rules = Array<Rule>;
type RulesData = {|
  property?: string,
  value?: string,
  identifier: string,
  rules: Rules
|};
type CompilerOutput = { [key: string]: RulesData };

const cache = {
  get(property, value) {
    if (
      cache[property] != null &&
      cache[property].hasOwnProperty(value) &&
      cache[property][value] != null
    ) {
      return cache[property][value];
    }
  },
  set(property, value, object) {
    if (cache[property] == null) {
      cache[property] = {};
    }
    return (cache[property][value] = object);
  }
};

/**
 * Compile style to atomic CSS rules.
 */
export function atomic(style: Style): CompilerOutput {
  return Object.keys(style)
    .sort()
    .reduce((acc, property) => {
      const value = style[property];
      if (value != null) {
        const valueString = stringifyValueWithProperty(value, property);
        const cachedResult = cache.get(property, valueString);
        if (cachedResult != null) {
          const { identifier } = cachedResult;
          acc[identifier] = cachedResult;
        } else {
          const identifier = createIdentifier('r', property, value);
          const rules = createAtomicRules(identifier, property, value);
          const cachedResult = cache.set(property, valueString, {
            property,
            value: stringifyValueWithProperty(value, property),
            identifier,
            rules
          });
          acc[identifier] = cachedResult;
        }
      }
      return acc;
    }, {});
}

/**
 * Compile simple style object to classic CSS rules.
 * No support for 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
 */
export function classic(style: Style, name: string): CompilerOutput {
  const identifier = createIdentifier('css', name, style);
  const { animationKeyframes, ...rest } = style;

  const rules = [];
  const selector = `.${identifier}`;
  let animationName;
  if (animationKeyframes != null) {
    const { animationNames, rules: keyframesRules } = processKeyframesValue(animationKeyframes);
    animationName = animationNames.join(',');
    rules.push(...keyframesRules);
  }
  const block = createDeclarationBlock({ ...rest, animationName });
  rules.push(`${selector}${block}`);

  return { [identifier]: { identifier, rules } };
}

/**
 * Compile simple style object to inline DOM styles.
 * No support for 'animationKeyframes', 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
 */
export function inline(style: Style) {
  return prefixInlineStyles(createReactDOMStyle(style));
}

/**
 * Create a value string that normalizes different input values with a common
 * output.
 */
export function stringifyValueWithProperty(value: Value, property: ?string) {
  // e.g., 0 => '0px', 'black' => 'rgba(0,0,0,1)'
  const normalizedValue = normalizeValueWithProperty(value, property);
  return typeof normalizedValue !== 'string'
    ? JSON.stringify(normalizedValue || '')
    : normalizedValue;
}

/**
 * Create the Atomic CSS rules needed for a given StyleSheet rule.
 * Translates StyleSheet declarations to CSS.
 */
function createAtomicRules(identifier: string, property, value): Rules {
  const rules = [];
  const selector = `.${identifier}`;

  // Handle non-standard properties and object values that require multiple
  // CSS rules to be created.
  switch (property) {
    case 'animationKeyframes': {
      const { animationNames, rules: keyframesRules } = processKeyframesValue(value);
      const block = createDeclarationBlock({ animationName: animationNames.join(',') });
      rules.push(`${selector}${block}`, ...keyframesRules);
      break;
    }

    // Equivalent to using '::placeholder'
    case 'placeholderTextColor': {
      const block = createDeclarationBlock({ color: value, opacity: 1 });
      rules.push(
        `${selector}::-webkit-input-placeholder${block}`,
        `${selector}::-moz-placeholder${block}`,
        `${selector}:-ms-input-placeholder${block}`,
        `${selector}::placeholder${block}`
      );
      break;
    }

    // Polyfill for additional 'pointer-events' values
    // See d13f78622b233a0afc0c7a200c0a0792c8ca9e58
    case 'pointerEvents': {
      let finalValue = value;
      if (value === 'auto' || value === 'box-only') {
        finalValue = 'auto!important';
        if (value === 'box-only') {
          const block = createDeclarationBlock({ [property]: 'none' });
          rules.push(`${selector}>*${block}`);
        }
      } else if (value === 'none' || value === 'box-none') {
        finalValue = 'none!important';
        if (value === 'box-none') {
          const block = createDeclarationBlock({ [property]: 'auto' });
          rules.push(`${selector}>*${block}`);
        }
      }
      const block = createDeclarationBlock({ [property]: finalValue });
      rules.push(`${selector}${block}`);
      break;
    }

    // Polyfill for draft spec
    // https://drafts.csswg.org/css-scrollbars-1/
    case 'scrollbarWidth': {
      if (value === 'none') {
        rules.push(`${selector}::-webkit-scrollbar{display:none}`);
      }
      const block = createDeclarationBlock({ [property]: value });
      rules.push(`${selector}${block}`);
      break;
    }

    default: {
      const block = createDeclarationBlock({ [property]: value });
      rules.push(`${selector}${block}`);
      break;
    }
  }

  return rules;
}

/**
 * Creates a CSS declaration block from a StyleSheet object.
 */
function createDeclarationBlock(style: Style) {
  const domStyle = prefixStyles(createReactDOMStyle(style));
  const declarationsString = Object.keys(domStyle)
    .map(property => {
      const value = domStyle[property];
      const prop = hyphenateStyleName(property);
      // The prefixer may return an array of values:
      // { display: [ '-webkit-flex', 'flex' ] }
      // to represent "fallback" declarations
      // { display: -webkit-flex; display: flex; }
      if (Array.isArray(value)) {
        return value.map(v => `${prop}:${v}`).join(';');
      } else {
        return `${prop}:${value}`;
      }
    })
    // Once properties are hyphenated, this will put the vendor
    // prefixed and short-form properties first in the list.
    .sort()
    .join(';');

  return `{${declarationsString};}`;
}

/**
 * An identifier is associated with a unique set of styles.
 */
function createIdentifier(prefix, name, value) {
  const hashedString = hash(name + stringifyValueWithProperty(value, name));
  return process.env.NODE_ENV !== 'production'
    ? `${prefix}-${name}-${hashedString}`
    : `${prefix}-${hashedString}`;
}

/**
 * Create individual CSS keyframes rules.
 */
function createKeyframes(keyframes) {
  const prefixes = ['-webkit-', ''];
  const identifier = createIdentifier('r', 'animation', keyframes);

  const steps =
    '{' +
    Object.keys(keyframes)
      .map(stepName => {
        const rule = keyframes[stepName];
        const block = createDeclarationBlock(rule);
        return `${stepName}${block}`;
      })
      .join('') +
    '}';

  const rules = prefixes.map(prefix => {
    return `@${prefix}keyframes ${identifier}${steps}`;
  });
  return { identifier, rules };
}

/**
 * Create CSS keyframes rules and names from a StyleSheet keyframes object.
 */
function processKeyframesValue(keyframesValue) {
  if (typeof keyframesValue === 'number') {
    throw new Error(`Invalid CSS keyframes type: ${typeof keyframesValue}`);
  }

  const animationNames = [];
  const rules = [];
  const value = Array.isArray(keyframesValue) ? keyframesValue : [keyframesValue];

  value.forEach(keyframes => {
    if (typeof keyframes === 'string') {
      // Support external animation libraries (identifiers only)
      animationNames.push(keyframes);
    } else {
      // Create rules for each of the keyframes
      const { identifier, rules: keyframesRules } = createKeyframes(keyframes);
      animationNames.push(identifier);
      rules.push(...keyframesRules);
    }
  });

  return { animationNames, rules };
}
