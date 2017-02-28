/* eslint-env jasmine, jest */

import StyleManager from '../StyleManager';

let styleManager;

describe('apis/StyleSheet/StyleManager', () => {
  beforeEach(() => {
    styleManager = new StyleManager();
  });

  test('getClassName', () => {
    expect(styleManager.getClassName('pointerEvents', 'box-only')).toMatchSnapshot();
    const className = styleManager.setDeclaration('width', '100px');
    expect(styleManager.getClassName('width', '100px')).toEqual(className);
  });

  test('getDeclaration', () => {
    const className = styleManager.setDeclaration('width', '100px');
    expect(styleManager.getDeclaration(className)).toEqual({
      prop: 'width',
      value: '100px'
    });
  });

  test('getStyleSheetHtml', () => {
    expect(styleManager.getStyleSheetHtml()).toMatchSnapshot();
    styleManager.setDeclaration('width', '100px');
    expect(styleManager.getStyleSheetHtml()).toMatchSnapshot();
  });
});
