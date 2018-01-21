/* eslint-env jasmine, jest */

import StyleSheetManager from '../StyleSheetManager';

let styleSheetManager;

describe('apis/StyleSheet/StyleSheetManager', () => {
  beforeEach(() => {
    styleSheetManager = new StyleSheetManager();
  });

  test('getClassName', () => {
    expect(styleSheetManager.getClassName('pointerEvents', 'box-only')).toMatchSnapshot();
    const className = styleSheetManager.setDeclaration('width', '100px');
    expect(styleSheetManager.getClassName('width', '100px')).toEqual(className);
  });

  test('getDeclaration', () => {
    const className = styleSheetManager.setDeclaration('width', '100px');
    expect(styleSheetManager.getDeclaration(className)).toEqual({
      prop: 'width',
      value: '100px'
    });
  });

  test('getStyleSheets', () => {
    styleSheetManager.setDeclaration('--test-property', 'test-value');
    expect(styleSheetManager.getStyleSheets()).toMatchSnapshot();
  });

  test('setDeclaration', () => {
    styleSheetManager._webStyleSheet.insertRuleOnce = (rule, position) => {
      // check for regressions in CSS write path (e.g., 0 => 0px)
      expect(rule.indexOf('-webkit-flex-shrink:0;')).not.toEqual(-1);
    };
    styleSheetManager.setDeclaration('flexShrink', 0);
  });
});
