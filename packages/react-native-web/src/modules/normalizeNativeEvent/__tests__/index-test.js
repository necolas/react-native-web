/* eslint-env jasmine, jest */

import normalizeNativeEvent from '..';

const normalizeEvent = nativeEvent => {
  const result = normalizeNativeEvent(nativeEvent);
  result.timestamp = 1496876171255;
  if (result.changedTouches && result.changedTouches[0]) {
    result.changedTouches[0].timestamp = 1496876171255;
  }
  if (result.touches && result.touches[0]) {
    result.touches[0].timestamp = 1496876171255;
  }
  return result;
};

describe('modules/normalizeNativeEvent', () => {
  describe('mouse events', () => {
    test('simulated event', () => {
      const nativeEvent = {
        type: 'mouseup'
      };

      const result = normalizeEvent(nativeEvent);
      expect(result).toMatchSnapshot();
    });

    test('synthetic event', () => {
      const nativeEvent = {
        type: 'mouseup',
        clientX: 100,
        clientY: 100,
        force: false,
        offsetX: 200,
        offsetY: 200,
        pageX: 300,
        pageY: 300,
        screenX: 400,
        screenY: 400
      };

      const result = normalizeEvent(nativeEvent);
      expect(result).toMatchSnapshot();
    });
  });

  describe('touch events', () => {
    test('simulated event', () => {
      const nativeEvent = {
        type: 'touchstart'
      };

      const result = normalizeEvent(nativeEvent);
      expect(result).toMatchSnapshot();
    });

    test('synthetic event', () => {
      const nativeEvent = {
        type: 'touchstart',
        changedTouches: [
          {
            clientX: 100,
            clientY: 100,
            force: false,
            pageX: 300,
            pageY: 300,
            radiusX: 10,
            radiusY: 10,
            rotationAngle: 45,
            screenX: 400,
            screenY: 400
          }
        ],
        pageX: 300,
        pageY: 300
      };

      const result = normalizeEvent(nativeEvent);
      expect(result).toMatchSnapshot();
    });
  });
});
