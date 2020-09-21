/* eslint-env jasmine, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import { render } from '@testing-library/react';
import TouchableHighlight from '../';
import View from '../../View';

describe('components/TouchableHighlight', () => {
  test('ref function is called when ref changes', () => {
    const refMock = jest.fn();
    const otherRefMock = jest.fn();

    const { rerender } = render(<TouchableHighlight ref={refMock}><View /></TouchableHighlight>);
    expect(refMock).toHaveBeenCalled();

    rerender(<TouchableHighlight ref={otherRefMock}><View /></TouchableHighlight>)
    expect(otherRefMock).toHaveBeenCalled();
  });

  test('ref function is not called every render', () => {
    const refMock = jest.fn();

    const { rerender } = render(<TouchableHighlight ref={refMock}><View /></TouchableHighlight>);
    expect(refMock).toHaveBeenCalledTimes(1);

    rerender(<TouchableHighlight ref={refMock}><View /></TouchableHighlight>);
    expect(refMock).toHaveBeenCalledTimes(1);
  });

  test('ref function is not called on prop changes', () => {
    const refMock = jest.fn();

    const { rerender } = render(<TouchableHighlight ref={refMock} testID={'foo'}><View /></TouchableHighlight>);
    expect(refMock).toHaveBeenCalledTimes(1);

    rerender(<TouchableHighlight ref={refMock} testID={'bar'}><View /></TouchableHighlight>);
    expect(refMock).toHaveBeenCalledTimes(1);
  });
});
