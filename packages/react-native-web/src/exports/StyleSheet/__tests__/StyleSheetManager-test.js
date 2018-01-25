/* eslint-env jasmine, jest */

import StyleSheetManager from '../StyleSheetManager';

let styleSheetManager;

describe('StyleSheet/StyleSheetManager', () => {
  beforeEach(() => {
    styleSheetManager = new StyleSheetManager();
  });

  test('getClassName', () => {
    expect(styleSheetManager.getClassName('pointerEvents', 'box-only')).toMatchSnapshot();
    const className = styleSheetManager.injectDeclaration('width', '100px');
    expect(styleSheetManager.getClassName('width', '100px')).toEqual(className);
  });

  test('getDeclaration', () => {
    const className = styleSheetManager.injectDeclaration('width', '100px');
    expect(styleSheetManager.getDeclaration(className)).toEqual({
      prop: 'width',
      value: '100px'
    });
  });

  test('getStyleSheet', () => {
    styleSheetManager.injectDeclaration('--test-property', 'test-value');
    expect(styleSheetManager.getStyleSheet()).toMatchSnapshot();
  });

  test('injectDeclaration', () => {
    styleSheetManager._sheet.insertRuleOnce = (rule, position) => {
      // check for regressions in CSS write path (e.g., 0 => 0px)
      expect(rule.indexOf('-webkit-flex-shrink:0;')).not.toEqual(-1);
    };
    styleSheetManager.injectDeclaration('flexShrink', 0);
  });
});
