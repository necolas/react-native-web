/* eslint-env jasmine, jest */

import normalizeNativeEvent from '../index';

describe('modules/normalizeNativeEvent', () => {
  it('handles mouse events without preventDefault, stopPropagation and stopImmediatePropagation', () => {
    const event = {
      type: 'mouse'
    };

    normalizeNativeEvent(event);
  });

  it('handles mouse events with preventDefault, stopPropagation and stopImmediatePropagation', () => {
    const event = {
      type: 'mouse',
      preventDefault: () => {},
      stopPropagation: () => {},
      stopImmediatePropagation: () => {}
    };

    normalizeNativeEvent(event);
  })

  it('handles touch events without preventDefault, stopPropagation and stopImmediatePropagation', () => {
    const event = {};

    normalizeNativeEvent(event);
  });

  it('handles touch events with preventDefault, stopPropagation and stopImmediatePropagation', () => {
    const event = {
      preventDefault: () => {},
      stopPropagation: () => {},
      stopImmediatePropagation: () => {}
    };

    normalizeNativeEvent(event);
  })
});
