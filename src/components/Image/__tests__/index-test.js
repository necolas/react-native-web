/* eslint-env jasmine, jest */

import Image from '../';
import React from 'react';
import StyleSheet from '../../../apis/StyleSheet';
import { mount, shallow } from 'enzyme';

describe('components/Image', () => {
  it('sets correct accessibility role"', () => {
    const image = shallow(<Image />);
    expect(image.prop('accessibilityRole')).toEqual('img');
  });

  it('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel';
    const image = shallow(<Image accessibilityLabel={accessibilityLabel} />);
    expect(image.prop('accessibilityLabel')).toEqual(accessibilityLabel);
  });

  it('prop "accessible"', () => {
    const accessible = false;
    const image = shallow(<Image accessible={accessible} />);
    expect(image.prop('accessible')).toEqual(accessible);
  });

  it('prop "children"', () => {
    const children = <div className='unique' />;
    const wrapper = shallow(<Image>{children}</Image>);
    expect(wrapper.contains(children)).toEqual(true);
  });

  describe('prop "defaultSource"', () => {
    it('sets background image when value is an object', () => {
      const defaultSource = { uri: 'https://google.com/favicon.ico' };
      const image = shallow(<Image defaultSource={defaultSource} />);
      const backgroundImage = StyleSheet.flatten(image.prop('style')).backgroundImage;
      expect(backgroundImage.indexOf(defaultSource.uri) > -1).toBeTruthy();
    });

    it('sets background image when value is a string', () => {
      // emulate require-ed asset
      const defaultSource = 'https://google.com/favicon.ico';
      const image = shallow(<Image defaultSource={defaultSource} />);
      const backgroundImage = StyleSheet.flatten(image.prop('style')).backgroundImage;
      expect(backgroundImage.indexOf(defaultSource) > -1).toBeTruthy();
    });
  });

  it('prop "onError"', function (done) {
    this.timeout(5000);
    mount(<Image onError={onError} source={{ uri: 'https://google.com/favicon.icox' }} />);
    function onError(e) {
      expect(e.nativeEvent.type).toEqual('error');
      done();
    }
  });

  it('prop "onLoad"', function (done) {
    this.timeout(5000);
    const image = mount(<Image onLoad={onLoad} source={{ uri: 'https://google.com/favicon.ico' }} />);
    function onLoad(e) {
      expect(e.nativeEvent.type).toEqual('load');
      const hasBackgroundImage = (image.html()).indexOf('url(&quot;https://google.com/favicon.ico&quot;)') > -1;
      expect(hasBackgroundImage).toEqual(true);
      done();
    }
  });

  it('prop "onLoadEnd"', function (done) {
    this.timeout(5000);
    const image = mount(<Image onLoadEnd={onLoadEnd} source={{ uri: 'https://google.com/favicon.ico' }} />);
    function onLoadEnd() {
      expect(true).toBeTruthy();
      const hasBackgroundImage = (image.html()).indexOf('url(&quot;https://google.com/favicon.ico&quot;)') > -1;
      expect(hasBackgroundImage).toEqual(true);
      done();
    }
  });

  it('prop "onLoadStart"', function (done) {
    this.timeout(5000);
    mount(<Image onLoadStart={onLoadStart} source={{ uri: 'https://google.com/favicon.ico' }} />);
    function onLoadStart() {
      expect(true).toBeTruthy();
      done();
    }
  });

  describe('prop "resizeMode"', () => {
    const getBackgroundSize = (image) => StyleSheet.flatten(image.prop('style')).backgroundSize;

    it('value "contain"', () => {
      const image = shallow(<Image resizeMode={Image.resizeMode.contain} />);
      expect(getBackgroundSize(image)).toEqual('contain');
    });

    it('value "cover"', () => {
      const image = shallow(<Image resizeMode={Image.resizeMode.cover} />);
      expect(getBackgroundSize(image)).toEqual('cover');
    });

    it('value "none"', () => {
      const image = shallow(<Image resizeMode={Image.resizeMode.none} />);
      expect(getBackgroundSize(image)).toEqual('auto');
    });

    it('value "stretch"', () => {
      const image = shallow(<Image resizeMode={Image.resizeMode.stretch} />);
      expect(getBackgroundSize(image)).toEqual('100% 100%');
    });

    it('no value', () => {
      const image = shallow(<Image />);
      expect(getBackgroundSize(image)).toEqual('cover');
    });
  });

  describe('prop "source"', function () {
    this.timeout(5000);

    it('sets background image when value is an object', (done) => {
      const source = { uri: 'https://google.com/favicon.ico' };
      mount(<Image onLoad={onLoad} source={source} />);
      function onLoad(e) {
        const src = e.nativeEvent.target.src;
        expect(src).toEqual(source.uri);
        done();
      }
    });

    it('sets background image when value is a string', (done) => {
      // emulate require-ed asset
      const source = 'https://google.com/favicon.ico';
      mount(<Image onLoad={onLoad} source={source} />);
      function onLoad(e) {
        const src = e.nativeEvent.target.src;
        expect(src).toEqual(source);
        done();
      }
    });
  });

  describe('prop "style"', () => {
    it('converts "resizeMode" property', () => {
      const image = shallow(<Image style={{ resizeMode: Image.resizeMode.contain }} />);
      expect(StyleSheet.flatten(image.prop('style')).backgroundSize).toEqual('contain');
    });

    it('removes "resizeMode" property', () => {
      const image = shallow(<Image style={{ resizeMode: Image.resizeMode.contain }} />);
      expect(StyleSheet.flatten(image.prop('style')).resizeMode).toEqual(undefined);
    });
  });

  it('prop "testID"', () => {
    const testID = 'testID';
    const image = shallow(<Image testID={testID} />);
    expect(image.prop('testID')).toEqual(testID);
  });
});
