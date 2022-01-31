/* eslint-env jasmine, jest */

import AppRegistry from '..';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { render } from '@testing-library/react';
import StyleSheet from '../../StyleSheet';
import View from '../../View';

const canUseDOM = ExecutionEnvironment.canUseDOM;
const NoopComponent = () => React.createElement('div');

describe('AppRegistry', () => {
  describe('getApplication', () => {
    beforeEach(() => {
      ExecutionEnvironment.canUseDOM = false;
    });

    afterEach(() => {
      ExecutionEnvironment.canUseDOM = canUseDOM;
    });

    test('does not throw when missing appParameters', () => {
      AppRegistry.registerComponent('App', () => NoopComponent);
      expect(() => AppRegistry.getApplication('App')).not.toThrow();
    });

    test('returns "element" and "getStyleElement"', () => {
      AppRegistry.registerComponent('App', () => NoopComponent);
      const { element, getStyleElement } = AppRegistry.getApplication('App', {});
      const styleElement = ReactDOMServer.renderToStaticMarkup(getStyleElement());

      expect(element).toMatchSnapshot();
      expect(styleElement).toMatchSnapshot();
    });

    test('"getStyleElement" adds props to <style>', () => {
      const nonce = '2Bz9RM/UHvBbmo3jK/PbYZ==';
      AppRegistry.registerComponent('App', () => NoopComponent);
      const { getStyleElement } = AppRegistry.getApplication('App', {});
      const styleElement = getStyleElement({ nonce });
      expect(styleElement.props.nonce).toBe(nonce);
    });

    test('"getStyleElement" contains style updates', () => {
      const getApplicationStyles = (appName) => {
        const { element, getStyleElement } = AppRegistry.getApplication(appName, {});
        render(element);
        return getStyleElement().props.dangerouslySetInnerHTML.__html;
      };

      // First render "RootComponent"
      const RootComponent = () => React.createElement(View);
      AppRegistry.registerComponent('App', () => RootComponent);
      const first = getApplicationStyles('App');
      expect(first).toMatchSnapshot();

      // Second render "AlternativeComponent"
      const styles = StyleSheet.create({ root: { borderWidth: 1234, backgroundColor: 'purple' } });
      const AlternativeComponent = () => React.createElement(View, { style: styles.root });
      AppRegistry.registerComponent('AlternativeApp', () => AlternativeComponent);
      const second = getApplicationStyles('AlternativeApp');
      expect(second).toMatchSnapshot();

      // Third render "RootComponent" again
      const third = getApplicationStyles('App');
      expect(third).toEqual(second);
    });
  });

  describe('runApplication', () => {
    let rootTag;

    beforeEach(() => {
      rootTag = document.createElement('div');
      rootTag.id = 'react-root';
      document.body.appendChild(rootTag);
    });

    afterEach(() => {
      document.body.removeChild(rootTag);
    });

    test('callback after render', () => {
      const callback = jest.fn();
      AppRegistry.registerComponent('App', () => NoopComponent);
      AppRegistry.runApplication('App', { initialProps: {}, rootTag, callback });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('styles roots in different documents', () => {
      AppRegistry.registerComponent('App', () => NoopComponent);
      AppRegistry.runApplication('App', { initialProps: {}, rootTag });

      // Create iframe context
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);

      const iframeRootTag = document.createElement('div');
      iframeRootTag.id = 'react-iframe-root';
      iframe.contentWindow.document.body.appendChild(iframeRootTag);

      // Run in iframe
      AppRegistry.registerComponent('App', () => NoopComponent);
      AppRegistry.runApplication('App', { initialProps: {}, rootTag: iframeRootTag });

      const iframedoc = iframeRootTag.ownerDocument;
      expect(iframedoc).toBe(iframe.contentWindow.document);
      expect(iframedoc).not.toBe(document);

      const cssText = Array.prototype.slice
        .call(iframedoc.getElementById('react-native-stylesheet').sheet.cssRules)
        .map((cssRule) => cssRule.cssText);

      expect(cssText).toMatchInlineSnapshot(`
        [
          "[stylesheet-group=\\"0\\"] {}",
          "body {margin: 0;}",
          "body:not(.focusvisible) :focus {outline: none;}",
          "button::-moz-focus-inner,input::-moz-focus-inner {border: 0; padding: 0;}",
          "html {-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -webkit-tap-highlight-color: rgba(0,0,0,0);}",
          "input::-webkit-search-cancel-button,input::-webkit-search-decorationinput::-webkit-search-results-button,input::-webkit-search-results-decoration {display: none;}",
          "[stylesheet-group=\\"1\\"] {}",
          ".css-view-13b7bgz {align-items: stretch; background-color: rgba(0,0,0,0.00); border: 0 solid black; box-sizing: border-box; display: flex; flex-basis: auto; flex-direction: column; flex-shrink: 0; list-style: none; margin: 0px; min-height: 0px; min-width: 0px; padding: 0px; position: relative; z-index: 0;}",
          "[stylesheet-group=\\"2\\"] {}",
          ".r-borderWidth-1bee2fs {border-bottom-width: 1234px; border-left-width: 1234px; border-right-width: 1234px; border-top-width: 1234px;}",
          ".r-display-xoduu5 {display: inline-flex;}",
          ".r-flex-13awgt0 {flex: 1;}",
          "[stylesheet-group=\\"2.2\\"] {}",
          ".r-backgroundColor-aot4c7 {background-color: rgba(128,0,128,1.00);}",
          ".r-bottom-1p0dtai {bottom: 0px;}",
          ".r-left-1d2f490 {left: 0px;}",
          ".r-pointerEvents-105ug2t {pointer-events: auto !important;}",
          ".r-pointerEvents-12vffkv>* {pointer-events: auto;}",
          ".r-pointerEvents-12vffkv {pointer-events: none !important;}",
          ".r-pointerEvents-633pao {pointer-events: none !important;}",
          ".r-pointerEvents-ah5dr5>* {pointer-events: none;}",
          ".r-pointerEvents-ah5dr5 {pointer-events: auto !important;}",
          ".r-position-u8s1d {position: absolute;}",
          ".r-right-zchlnj {right: 0px;}",
          ".r-top-ipm5af {top: 0px;}",
        ]
      `);
    });
  });
});
