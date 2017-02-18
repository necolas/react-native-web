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

  test('flex', () => {
    expect(expandStyle({ display: 'flex' }))
      .toEqual({ display: 'flex', flexShrink: 0 });

    expect(expandStyle({ display: 'flex', flex: 1 }))
      .toEqual({ display: 'flex', flexGrow: 1, flexShrink: 1, flexBasis: 'auto' });

    expect(expandStyle({ display: 'flex', flex: 10 }))
      .toEqual({ display: 'flex', flexGrow: 10, flexShrink: 1, flexBasis: 'auto' });

    expect(expandStyle({ display: 'flex', flexShrink: 1 }))
      .toEqual({ display: 'flex', flexShrink: 1 });

    expect(expandStyle({ display: 'flex', flex: 1, flexShrink: 2 }))
      .toEqual({ display: 'flex', flexGrow: 1, flexShrink: 2, flexBasis: 'auto' });
  });
});
