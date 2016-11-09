/* eslint-env jasmine, jest */

import Image from '../';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('react-dom');

const originalImage = window.Image;

describe('components/Image', () => {
  beforeEach(() => {
    window.Image = jest.fn(() => ({}));
  });

  afterEach(() => {
    window.Image = originalImage;
  });

  test('sets correct accessibility role"', () => {
    const component = renderer.create(<Image />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('prop "accessibilityLabel"', () => {
    const component = renderer.create(<Image accessibilityLabel='accessibilityLabel' />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('prop "accessible"', () => {
    const component = renderer.create(<Image accessible={false} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('prop "children"', () => {
    const children = <div className='unique' />;
    const component = renderer.create(<Image children={children} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('prop "defaultSource"', () => {
    test('sets background image when value is an object', () => {
      const defaultSource = { uri: 'https://google.com/favicon.ico' };
      const component = renderer.create(<Image defaultSource={defaultSource} />);
      expect(component.toJSON()).toMatchSnapshot();
    });

    test('sets background image when value is a string', () => {
      // emulate require-ed asset
      const defaultSource = 'https://google.com/favicon.ico';
      const component = renderer.create(<Image defaultSource={defaultSource} />);
      expect(component.toJSON()).toMatchSnapshot();
    });

    test('sets "height" and "width" styles if missing', () => {
      const defaultSource = { uri: 'https://google.com/favicon.ico', height: 10, width: 20 };
      const component = renderer.create(<Image defaultSource={defaultSource} />);
      expect(component.toJSON()).toMatchSnapshot();
    });

    test('does not override "height" and "width" styles', () => {
      const defaultSource = { uri: 'https://google.com/favicon.ico', height: 10, width: 20 };
      const component = renderer.create(<Image defaultSource={defaultSource} style={{ height: 20, width: 40 }} />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  describe('prop "resizeMode"', () => {
    [
      Image.resizeMode.contain,
      Image.resizeMode.cover,
      Image.resizeMode.none,
      Image.resizeMode.stretch,
      undefined
    ].forEach((resizeMode) => {
      test(`value "${resizeMode}"`, () => {
        const component = renderer.create(<Image resizeMode={resizeMode} />);
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('prop "style"', () => {
    test('correctly supports "resizeMode" property', () => {
      const component = renderer.create(<Image style={{ resizeMode: Image.resizeMode.contain }} />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  test('prop "testID"', () => {
    const component = renderer.create(<Image testID='testID' />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
