/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Nullable } from '../../../types';
import createReactDOMStyle from './createReactDOMStyle';
import hash from './hash';
import hyphenateStyleName from './hyphenateStyleName';
import normalizeValueWithProperty, {
  type StyleValue
} from './normalizeValueWithProperty';

export type Style = Readonly<Record<string, Nullable<StyleValue>>>;
type Keyframes = Readonly<Record<string, Style>>;
type KeyframesValue = string | Keyframes;
type AnimationKeyframesValue = KeyframesValue | ReadonlyArray<KeyframesValue>;
type Rule = string;
type Rules = Array<Rule>;
type RulesData = [Rules, number];
type CompiledStyle = {
  $$css: true;
  [key: string]: string | boolean;
};
type CompilerOutput = [CompiledStyle, Array<RulesData>];

const cache = new Map<string, [string, RulesData]>();

const classicGroup = 1;
const atomicGroup = 3;

const customGroup: Record<string, number> = {
  borderColor: 2,
  borderRadius: 2,
  borderStyle: 2,
  borderWidth: 2,
  display: 2,
  flex: 2,
  gap: 2,
  inset: 2,
  margin: 2,
  overflow: 2,
  overscrollBehavior: 2,
  padding: 2,

  borderBlockColor: 2.1,
  borderBlockStyle: 2.1,
  borderBlockWidth: 2.1,
  borderInlineColor: 2.1,
  borderInlineStyle: 2.1,
  borderInlineWidth: 2.1,
  insetBlock: 2.1,
  insetInline: 2.1,
  marginBlock: 2.1,
  marginInline: 2.1,
  paddingBlock: 2.1,
  paddingInline: 2.1,

  borderBlockEndColor: 2.2,
  borderBlockEndStyle: 2.2,
  borderBlockEndWidth: 2.2,
  borderBlockStartColor: 2.2,
  borderBlockStartStyle: 2.2,
  borderBlockStartWidth: 2.2,
  borderEndEndRadius: 2.2,
  borderEndStartRadius: 2.2,
  borderInlineEndColor: 2.2,
  borderInlineEndStyle: 2.2,
  borderInlineEndWidth: 2.2,
  borderInlineStartColor: 2.2,
  borderInlineStartStyle: 2.2,
  borderInlineStartWidth: 2.2,
  borderStartEndRadius: 2.2,
  borderStartStartRadius: 2.2,
  insetBlockEnd: 2.2,
  insetBlockStart: 2.2,
  insetInlineEnd: 2.2,
  insetInlineStart: 2.2,
  marginBlockEnd: 2.2,
  marginBlockStart: 2.2,
  marginInlineEnd: 2.2,
  marginInlineStart: 2.2,
  paddingBlockEnd: 2.2,
  paddingBlockStart: 2.2,
  paddingInlineEnd: 2.2,
  paddingInlineStart: 2.2,

  marginHorizontal: 2.3,
  marginVertical: 2.3,
  paddingHorizontal: 2.3,
  paddingVertical: 2.3
};

export function atomic(style: Style): CompilerOutput {
  const compiledStyle: CompiledStyle = { $$css: true };
  const compiledRules: Array<RulesData> = [];

  function atomicCompile(prop: string, value: StyleValue): string {
    const valueString = stringifyValueWithProperty(value, prop);
    const cacheKey = prop + valueString;
    const cachedResult = cache.get(cacheKey);
    let identifier;
    if (cachedResult != null) {
      identifier = cachedResult[0];
      compiledRules.push(cachedResult[1]);
    } else {
      identifier = createIdentifier('r', prop, valueString);
      const order = customGroup[prop] || atomicGroup;
      const rules = createAtomicRules(identifier, prop, value);
      const orderedRules: RulesData = [rules, order];
      compiledRules.push(orderedRules);
      cache.set(cacheKey, [identifier, orderedRules]);
    }
    return identifier;
  }

  Object.keys(style)
    .sort()
    .forEach((srcProp) => {
      const value = style[srcProp];
      if (value != null) {
        compiledStyle[srcProp] = atomicCompile(srcProp, value);
      }
    });

  return [compiledStyle, compiledRules];
}

/**
 * Compile simple style object to classic CSS rules.
 * No support for 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
 */
export function classic(style: Style, name: string): CompilerOutput {
  const compiledStyle: CompiledStyle = { $$css: true };
  const compiledRules: Rules = [];

  const { animationKeyframes, ...rest } = style;
  const identifier = createIdentifier('css', name, JSON.stringify(style));
  const selector = `.${identifier}`;
  let animationName;
  if (animationKeyframes != null) {
    const [animationNames, keyframesRules] = processKeyframesValue(
      animationKeyframes as AnimationKeyframesValue
    );
    animationName = animationNames.join(',');
    compiledRules.push(...keyframesRules);
  }
  const block = createDeclarationBlock({ ...rest, animationName });
  compiledRules.push(`${selector}${block}`);

  compiledStyle[identifier] = identifier;
  return [compiledStyle, [[compiledRules, classicGroup]]];
}

/**
 * Create a value string that normalizes different input values with a common
 * output.
 */
function stringifyValueWithProperty(
  value: StyleValue,
  property: Nullable<string>
): string {
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
function createAtomicRules(
  identifier: string,
  property: string,
  value: StyleValue
): Rules {
  const rules: Rules = [];
  const selector = `.${identifier}`;

  // Handle non-standard properties and object values that require multiple
  // CSS rules to be created.
  switch (property) {
    case 'animationKeyframes': {
      const [animationNames, keyframesRules] = processKeyframesValue(
        value as AnimationKeyframesValue
      );
      const block = createDeclarationBlock({
        animationName: animationNames.join(',')
      });
      rules.push(`${selector}${block}`, ...keyframesRules);
      break;
    }

    // Equivalent to using '::placeholder'
    case 'placeholderTextColor': {
      const block = createDeclarationBlock({ color: value, opacity: 1 });
      rules.push(`${selector}::placeholder${block}`);
      break;
    }

    // Polyfill for additional 'pointer-events' values
    // See d13f78622b233a0afc0c7a200c0a0792c8ca9e58
    // See https://reactnative.dev/docs/view#pointerevents
    case 'pointerEvents': {
      let finalValue = value;
      if (value === 'auto') {
        finalValue = 'auto!important';
      } else if (value === 'none') {
        finalValue = 'none!important';
        const block = createDeclarationBlock({ pointerEvents: 'none' });
        rules.push(`${selector}>* ${block}`);
      } else if (value === 'box-none') {
        finalValue = 'none!important';
        const block = createDeclarationBlock({ pointerEvents: 'auto' });
        rules.push(`${selector}>* ${block}`);
      } else if (value === 'box-only') {
        finalValue = 'auto!important';
        const block = createDeclarationBlock({ pointerEvents: 'none' });
        rules.push(`${selector}>* ${block}`);
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
  const domStyle = createReactDOMStyle(style);
  const declarationsString = Object.keys(domStyle)
    .map((property) => {
      const value = domStyle[property];
      const prop = hyphenateStyleName(property);
      // The prefixing function may return an array of values:
      // { width: [ '-webkit-fill-available', 'fill-available' ] }
      // to represent "fallback" declarations
      // { width: -webkit-fill-available; width: fill-available; }
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
function createIdentifier(prefix: string, name: string, key: string): string {
  const hashedString = hash(name + key);
  return process.env.NODE_ENV !== 'production'
    ? `${prefix}-${name}-${hashedString}`
    : `${prefix}-${hashedString}`;
}

/**
 * Create individual CSS keyframes rules.
 */
function createKeyframes(keyframes: Keyframes): [string, Rules] {
  const identifier = createIdentifier(
    'r',
    'animation',
    JSON.stringify(keyframes)
  );

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

  const rules = [`@keyframes ${identifier}${steps}`];
  return [identifier, rules];
}

/**
 * Create CSS keyframes rules and names from a StyleSheet keyframes object.
 */
function processKeyframesValue(
  keyframesValue: AnimationKeyframesValue
): [Array<string>, Rules] {
  if (typeof keyframesValue === 'number') {
    throw new Error(`Invalid CSS keyframes type: ${typeof keyframesValue}`);
  }

  const animationNames: Array<string> = [];
  const rules: Rules = [];
  const value = Array.isArray(keyframesValue)
    ? keyframesValue
    : [keyframesValue];

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
