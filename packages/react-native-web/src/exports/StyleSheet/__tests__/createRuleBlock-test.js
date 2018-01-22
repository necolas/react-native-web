/* eslint-env jasmine, jest */

import createRuleBlock from '../createRuleBlock';

describe('StyleSheet/createRuleBlock', () => {
  test('generates correct css', () => {
    const style = {
      boxShadow: '1px 1px 1px 1px #000',
      borderWidthLeft: 2,
      borderWidthRight: 3,
      position: 'absolute',
      transitionDuration: '0.1s'
    };
    expect(createRuleBlock(style)).toMatchSnapshot();
  });
});
