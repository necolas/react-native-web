/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import createReactDOMStyle from './createReactDOMStyle';
import hash from './hash';
import hyphenateStyleName from './hyphenateStyleName';
import normalizeValueWithProperty from './normalizeValueWithProperty';
import prefixStyles from '../../../modules/prefixStyles';
import preprocess from './preprocess';

type Value = Object | Array<any> | string | number;
type Style = { [key: string]: Value };
type Rule = string;
type Rules = Array<Rule>;
type RulesData = [Rules, number];
type CompiledStyle = { $$css: boolean, [key: string]: string };
type CompilerOutput = [CompiledStyle, Array<RulesData>];

const cache = new Map();

const classicGroup = 1;
const atomicGroup = 2.2;
const customGroup = {
  borderColor: 2,
  borderRadius: 2,
  borderStyle: 2,
  borderWidth: 2,
  display: 2,
  flex: 2,
  margin: 2,
  overflow: 2,
  overscrollBehavior: 2,
  padding: 2,
  marginHorizontal: 2.1,
  marginVertical: 2.1,
  paddingHorizontal: 2.1,
  paddingVertical: 2.1
};

/**
 * Compile style to atomic CSS rules.
 */
export function atomic(style: Style): CompilerOutput {
  const compiledStyle = { $$css: true };
  const compiledRules = [];

  Object.keys(style)
    .sort()
    .forEach((key) => {
      const value = style[key];
      if (value != null) {
        const valueString = stringifyValueWithProperty(value, key);
        const cacheKey = key + valueString;
        const cachedResult = cache.get(cacheKey);
        if (cachedResult != null) {
          compiledStyle[key] = cachedResult[0];
          compiledRules.push(cachedResult[1]);
        } else {
          const order = customGroup[key] || atomicGroup;
          const identifier = createIdentifier('r', key, value);
          const rules = createAtomicRules(identifier, key, value);
          const orderedRules = [rules, order];
          compiledStyle[key] = identifier;
          compiledRules.push(orderedRules);
          cache.set(cacheKey, [identifier, orderedRules]);
        }
      }
    });

  return [compiledStyle, compiledRules];
}

/**
 * Compile simple style object to classic CSS rules.
 * No support for 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
 */
export function classic(style: Style, name: string): CompilerOutput {
  const compiledStyle = { $$css: true };
  const compiledRules = [];

  const { animationKeyframes, ...rest } = style;
  const identifier = createIdentifier('css', name, style);
  const selector = `.${identifier}`;
  let animationName;
  if (animationKeyframes != null) {
    const [animationNames, keyframesRules] = processKeyframesValue(animationKeyframes);
    animationName = animationNames.join(',');
    compiledRules.push(...keyframesRules);
  }
  const block = createDeclarationBlock({ ...rest, animationName });
  compiledRules.push(`${selector}${block}`);

  compiledStyle[identifier] = identifier;
  return [compiledStyle, [[compiledRules, classicGroup]]];
}

/**
 * Compile simple style object to inline DOM styles.
 * No support for 'animationKeyframes', 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
 */
export function inline(style: Style): { [key: string]: mixed } {
  return createReactDOMStyle(style, true);
}

export { preprocess };

/**
 * Create a value string that normalizes different input values with a common
 * output.
 */
export function stringifyValueWithProperty(value: Value, property: ?string): string {
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
      const [animationNames, keyframesRules] = processKeyframesValue(value);
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
          const block = createDeclarationBlock({ pointerEvents: 'none' });
          rules.push(`${selector}>*${block}`);
        }
      } else if (value === 'none' || value === 'box-none') {
        finalValue = 'none!important';
        if (value === 'box-none') {
          const block = createDeclarationBlock({ pointerEvents: 'auto' });
          rules.push(`${selector}>*${block}`);
        }
      }
      const block = createDeclarationBlock({ pointerEvents: finalValue });
      rules.push(`${selector}${block}`);
      break;
    }

    // Polyfill for draft spec
    // https://drafts.csswg.org/css-scrollbars-1/
    case 'scrollbarWidth': {
      if (value === 'none') {
        rules.push(`${selector}::-webkit-scrollbar{display:none}`);
      }
      const block = createDeclarationBlock({ scrollbarWidth: value });
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
function createDeclarationBlock(style: Style): string {
  const domStyle = prefixStyles(createReactDOMStyle(style));
  const declarationsString = Object.keys(domStyle)
    .map((property) => {
      const value = domStyle[property];
      const prop = hyphenateStyleName(property);
      // The prefixer may return an array of values:
      // { display: [ '-webkit-flex', 'flex' ] }
      // to represent "fallback" declarations
      // { display: -webkit-flex; display: flex; }
      if (Array.isArray(value)) {
        return value.map((v) => `${prop}:${v}`).join(';');
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
function createIdentifier(prefix: string, name: string, value: Value): string {
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
      .map((stepName) => {
        const rule = keyframes[stepName];
        const block = createDeclarationBlock(rule);
        return `${stepName}${block}`;
      })
      .join('') +
    '}';

  const rules = prefixes.map((prefix) => {
    return `@${prefix}keyframes ${identifier}${steps}`;
  });
  return [identifier, rules];
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

  value.forEach((keyframes) => {
    if (typeof keyframes === 'string') {
      // Support external animation libraries (identifiers only)
      animationNames.push(keyframes);
    } else {
      // Create rules for each of the keyframes
      const [identifier, keyframesRules] = createKeyframes(keyframes);
      animationNames.push(identifier);
      rules.push(...keyframesRules);
    }
  });

  return [animationNames, rules];
}
