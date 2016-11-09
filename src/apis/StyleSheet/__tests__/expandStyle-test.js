/* eslint-env jasmine, jest */

import expandStyle from '../expandStyle';

describe('apis/StyleSheet/expandStyle', () => {
  test('shortform -> longform', () => {
    const style = {
      borderStyle: 'solid',
      boxSizing: 'border-box',
      borderBottomColor: 'white',
      borderBottomWidth: 1,
      borderWidth: 0,
      marginTop: 50,
      marginVertical: 25,
      margin: 10
    };

    expect(expandStyle(style)).toMatchSnapshot();
  });

  test('textAlignVertical', () => {
    const initial = {
      textAlignVertical: 'center'
    };

    const expected = {
      verticalAlign: 'middle'
    };

    expect(expandStyle(initial)).toEqual(expected);
  });

  test('flex', () => {
    const value = 10;

    const initial = {
      flex: value
    };

    const expected = {
      flexGrow: value,
      flexShrink: 1,
      flexBasis: 'auto'
    };

    expect(expandStyle(initial)).toEqual(expected);
  });
});
