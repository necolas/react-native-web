import createKeyframesRules from './createKeyframesRules';
import createRuleBlock from './createRuleBlock';

const createAtomicRules = (selector, prop, value) => {
  const rules = [];

  // Handle custom properties and custom values that require additional rules
  // to be created.
  switch (prop) {
    // See #513
    case 'pointerEvents': {
      let val = value;
      if (value === 'auto' || value === 'box-only') {
        val = 'auto !important';
        if (value === 'box-only') {
          const block = createRuleBlock({ [prop]: 'none' });
          rules.push(`${selector} > *{${block}}`);
        }
      } else if (value === 'none' || value === 'box-none') {
        val = 'none !important';
        if (value === 'box-none') {
          const block = createRuleBlock({ [prop]: 'auto' });
          rules.push(`${selector} > *{${block}}`);
        }
      }
      const block = createRuleBlock({ [prop]: val });
      rules.push(`${selector}{${block}}`);
      break;
    }

    case 'placeholderTextColor': {
      const block = createRuleBlock({ color: value, opacity: 1 });
      rules.push(
        '@media all {' +
          `${selector}::-webkit-input-placeholder{${block}}` +
          `${selector}::-moz-placeholder{${block}}` +
          `${selector}:-ms-input-placeholder{${block}}` +
          `${selector}::placeholder{${block}}` +
          '}'
      );
      break;
    }

    case 'animationName': {
      if (typeof value === 'string') {
        // add a className referencing the animation
        const block = createRuleBlock({ [prop]: value });
        rules.push(`${selector}{${block}}`);
      } else {
        const animationNames = [];

        // add the keyframes needed to implement each value
        value.forEach(keyframes => {
          if (typeof keyframes === 'string') {
            animationNames.push(keyframes);
          } else {
            const { identifier, rules: keyframesRules } = createKeyframesRules(keyframes);
            keyframesRules.forEach(rule => {
              rules.push(rule);
            });
            animationNames.push(identifier);
          }
        });

        // add a className referencing the animation identifiers
        const block = createRuleBlock({ [prop]: animationNames.join(',') });
        rules.push(`${selector}{${block}}`);
      }

      break;
    }

    default: {
      const block = createRuleBlock({ [prop]: value });
      rules.push(`${selector}{${block}}`);
    }
  }

  return rules;
};

export default createAtomicRules;
