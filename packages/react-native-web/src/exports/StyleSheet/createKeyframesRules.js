import createRuleBlock from './createRuleBlock';
import createReactDOMStyle from './createReactDOMStyle';
import i18nStyle from './i18nStyle';
import hash from '../../vendor/hash';

const hashObject = obj => hash(JSON.stringify(obj));

const createIdentifier = obj => {
  const hashed = hashObject(obj);
  return process.env.NODE_ENV !== 'production' ? `rn-anim-${hashed}` : `rn-${hashed}`;
};

const prefixes = ['-webkit-', ''];

const makeBlock = rule => {
  const domStyle = createReactDOMStyle(i18nStyle(rule));
  return createRuleBlock(domStyle);
};

const makeSteps = keyframes =>
  Object.keys(keyframes)
    .map(stepName => {
      const rule = keyframes[stepName];
      const block = makeBlock(rule);
      return `${stepName}{${block}}`;
    })
    .join('');

const createKeyframesRules = (keyframes: Object): Array<String> => {
  const identifier = createIdentifier(keyframes);
  const rules = prefixes.map(prefix => {
    return `@media all {@${prefix}keyframes ${identifier}{${makeSteps(keyframes)}}}`;
  });
  return { identifier, rules };
};

export default createKeyframesRules;
