import createRuleBlock from './createRuleBlock';

const createAtomicRules = (selector, prop, value) => {
  const rules = [];

  switch (prop) {
    // pointerEvents is a special case that requires custom values and additional rules
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
      rules.push(`@media all {
${selector}::-webkit-input-placeholder{${block}}
${selector}::-moz-placeholder{${block}}
${selector}:-ms-input-placeholder{${block}}
${selector}::placeholder{${block}}
}`);
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
