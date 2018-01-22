import createRuleBlock from './createRuleBlock';

const createAtomicRules = (selector, prop, value) => {
  const rules = [];
  let val = value;

  // pointerEvents is a special case that requires custom values and additional rules
  // See #513
  if (prop === 'pointerEvents') {
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
  }

  const block = createRuleBlock({ [prop]: val });
  rules.push(`${selector}{${block}}`);

  return rules;
};

export default createAtomicRules;
