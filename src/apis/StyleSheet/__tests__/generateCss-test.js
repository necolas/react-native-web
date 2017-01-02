/* eslint-env jasmine, jest */

import generateCss from '../generateCss';

describe('apis/StyleSheet/generateCss', () => {
  test('generates correct css', () => {
    const style = {
      boxShadow: '1px 1px 1px 1px #000',
      borderWidthLeft: 2,
      borderWidthRight: 3,
      position: 'absolute',
      transitionDuration: '0.1s'
    };
    expect(generateCss(style)).toMatchSnapshot();
  });
});
