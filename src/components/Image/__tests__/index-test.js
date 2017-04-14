/* eslint-env jasmine, jest */

import Image from '../';
import React from 'react';
import { render } from 'enzyme';

const originalImage = window.Image;

describe('components/Image', () => {
  beforeEach(() => {
    window.Image = jest.fn(() => ({}));
  });

  afterEach(() => {
    window.Image = originalImage;
  });

  test('sets correct accessibility role"', () => {
    const component = render(<Image />);
    expect(component).toMatchSnapshot();
  });

  test('prop "accessibilityLabel"', () => {
    const component = render(<Image accessibilityLabel="accessibilityLabel" />);
    expect(component).toMatchSnapshot();
  });

  test('prop "accessible"', () => {
    const component = render(<Image accessible={false} />);
    expect(component).toMatchSnapshot();
  });

  test('prop "children"', () => {
    const children = <div className="unique" />;
    const component = render(<Image children={children} />);
    expect(component).toMatchSnapshot();
  });

  describe('prop "defaultSource"', () => {
    test('sets background image when value is an object', () => {
      const defaultSource = { uri: 'https://google.com/favicon.ico' };
      const component = render(<Image defaultSource={defaultSource} />);
      expect(component).toMatchSnapshot();
    });

    test('sets background image when value is a string', () => {
      // emulate require-ed asset
      const defaultSource = 'https://google.com/favicon.ico';
      const component = render(<Image defaultSource={defaultSource} />);
      expect(component).toMatchSnapshot();
    });

    test('sets "height" and "width" styles if missing', () => {
      const defaultSource = {
        uri: 'https://google.com/favicon.ico',
        height: 10,
        width: 20
      };
      const component = render(<Image defaultSource={defaultSource} />);
      expect(component).toMatchSnapshot();
    });

    test('does not override "height" and "width" styles', () => {
      const defaultSource = {
        uri: 'https://google.com/favicon.ico',
        height: 10,
        width: 20
      };
      const component = render(
        <Image defaultSource={defaultSource} style={{ height: 20, width: 40 }} />
      );
      expect(component).toMatchSnapshot();
    });
  });

  describe('prop "resizeMode"', () => {
    [
      Image.resizeMode.contain,
      Image.resizeMode.cover,
      Image.resizeMode.none,
      Image.resizeMode.stretch,
      undefined
    ].forEach(resizeMode => {
      test(`value "${resizeMode}"`, () => {
        const component = render(<Image resizeMode={resizeMode} />);
        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('prop "style"', () => {
    test('correctly supports "resizeMode" property', () => {
      const component = render(<Image style={{ resizeMode: Image.resizeMode.contain }} />);
      expect(component).toMatchSnapshot();
    });
  });

  test('prop "testID"', () => {
    const component = render(<Image testID="testID" />);
    expect(component).toMatchSnapshot();
  });

  test('passes other props through to underlying View', () => {
    const fn = () => {};
    const component = render(<Image onResponderGrant={fn} />);
    expect(component).toMatchSnapshot();
  });
});
