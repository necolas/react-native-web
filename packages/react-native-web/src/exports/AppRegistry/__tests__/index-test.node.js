/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AppRegistry from '..';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StyleSheet from '../../StyleSheet';
import View from '../../View';

const NoopComponent = () => React.createElement('div');

describe('AppRegistry', () => {
  describe('getApplication', () => {
    test('does not throw when missing appParameters', () => {
      AppRegistry.registerComponent('App', () => NoopComponent);
      expect(() => AppRegistry.getApplication('App')).not.toThrow();
    });

    test('returns "element" and "getStyleElement"', () => {
      AppRegistry.registerComponent('App', () => NoopComponent);
      const { element, getStyleElement } = AppRegistry.getApplication(
        'App',
        {}
      );
      const styleElement = ReactDOMServer.renderToStaticMarkup(
        getStyleElement()
      );

      expect(element).toMatchInlineSnapshot(`
        <AppContainer
          rootTag={{}}
        >
          <NoopComponent />
        </AppContainer>
      `);
      expect(styleElement).toMatchInlineSnapshot(`
        "<style id=\\"react-native-stylesheet\\">[stylesheet-group=\\"0\\"]{}
        body{margin:0;}
        button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}
        html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}
        input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}
        [stylesheet-group=\\"1\\"]{}
        .css-view-175oi2r{align-items:stretch;background-color:rgba(0,0,0,0.00);border:0 solid black;box-sizing:border-box;display:flex;flex-basis:auto;flex-direction:column;flex-shrink:0;list-style:none;margin:0px;min-height:0px;min-width:0px;padding:0px;position:relative;text-decoration:none;z-index:0;}
        [stylesheet-group=\\"2\\"]{}
        .r-display-xoduu5{display:inline-flex;}
        .r-flex-13awgt0{flex:1;}
        [stylesheet-group=\\"3\\"]{}
        .r-bottom-1p0dtai{bottom:0px;}
        .r-left-1d2f490{left:0px;}
        .r-pointerEvents-105ug2t{pointer-events:auto!important;}
        .r-pointerEvents-12vffkv>*{pointer-events:auto;}
        .r-pointerEvents-12vffkv{pointer-events:none!important;}
        .r-pointerEvents-633pao{pointer-events:none!important;}
        .r-pointerEvents-ah5dr5>*{pointer-events:none;}
        .r-pointerEvents-ah5dr5{pointer-events:auto!important;}
        .r-position-u8s1d{position:absolute;}
        .r-right-zchlnj{right:0px;}
        .r-top-ipm5af{top:0px;}</style>"
      `);
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
        const { getStyleElement } = AppRegistry.getApplication(appName, {});
        return getStyleElement().props.dangerouslySetInnerHTML.__html;
      };

      // First render "RootComponent"
      const RootComponent = () => React.createElement(View);
      AppRegistry.registerComponent('App', () => RootComponent);
      const first = getApplicationStyles('App');
      expect(first).toMatchInlineSnapshot(`
        "[stylesheet-group=\\"0\\"]{}
        body{margin:0;}
        button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}
        html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}
        input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}
        [stylesheet-group=\\"1\\"]{}
        .css-view-175oi2r{align-items:stretch;background-color:rgba(0,0,0,0.00);border:0 solid black;box-sizing:border-box;display:flex;flex-basis:auto;flex-direction:column;flex-shrink:0;list-style:none;margin:0px;min-height:0px;min-width:0px;padding:0px;position:relative;text-decoration:none;z-index:0;}
        [stylesheet-group=\\"2\\"]{}
        .r-display-xoduu5{display:inline-flex;}
        .r-flex-13awgt0{flex:1;}
        [stylesheet-group=\\"3\\"]{}
        .r-bottom-1p0dtai{bottom:0px;}
        .r-left-1d2f490{left:0px;}
        .r-pointerEvents-105ug2t{pointer-events:auto!important;}
        .r-pointerEvents-12vffkv>*{pointer-events:auto;}
        .r-pointerEvents-12vffkv{pointer-events:none!important;}
        .r-pointerEvents-633pao{pointer-events:none!important;}
        .r-pointerEvents-ah5dr5>*{pointer-events:none;}
        .r-pointerEvents-ah5dr5{pointer-events:auto!important;}
        .r-position-u8s1d{position:absolute;}
        .r-right-zchlnj{right:0px;}
        .r-top-ipm5af{top:0px;}"
      `);

      // Second render "AlternativeComponent"
      const styles = StyleSheet.create({
        root: { borderWidth: 1234, backgroundColor: 'purple' }
      });
      const AlternativeComponent = () =>
        React.createElement(View, { style: styles.root });
      AppRegistry.registerComponent(
        'AlternativeApp',
        () => AlternativeComponent
      );
      const second = getApplicationStyles('AlternativeApp');
      expect(second).toMatchInlineSnapshot(`
        "[stylesheet-group=\\"0\\"]{}
        body{margin:0;}
        button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}
        html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}
        input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}
        [stylesheet-group=\\"1\\"]{}
        .css-view-175oi2r{align-items:stretch;background-color:rgba(0,0,0,0.00);border:0 solid black;box-sizing:border-box;display:flex;flex-basis:auto;flex-direction:column;flex-shrink:0;list-style:none;margin:0px;min-height:0px;min-width:0px;padding:0px;position:relative;text-decoration:none;z-index:0;}
        [stylesheet-group=\\"2\\"]{}
        .r-borderWidth-1bee2fs{border-bottom-width:1234px;border-left-width:1234px;border-right-width:1234px;border-top-width:1234px;}
        .r-display-xoduu5{display:inline-flex;}
        .r-flex-13awgt0{flex:1;}
        [stylesheet-group=\\"3\\"]{}
        .r-backgroundColor-aot4c7{background-color:rgba(128,0,128,1.00);}
        .r-bottom-1p0dtai{bottom:0px;}
        .r-left-1d2f490{left:0px;}
        .r-pointerEvents-105ug2t{pointer-events:auto!important;}
        .r-pointerEvents-12vffkv>*{pointer-events:auto;}
        .r-pointerEvents-12vffkv{pointer-events:none!important;}
        .r-pointerEvents-633pao{pointer-events:none!important;}
        .r-pointerEvents-ah5dr5>*{pointer-events:none;}
        .r-pointerEvents-ah5dr5{pointer-events:auto!important;}
        .r-position-u8s1d{position:absolute;}
        .r-right-zchlnj{right:0px;}
        .r-top-ipm5af{top:0px;}"
      `);

      // Third render "RootComponent" again
      const third = getApplicationStyles('App');
      expect(third).toEqual(second);
    });
  });
});
