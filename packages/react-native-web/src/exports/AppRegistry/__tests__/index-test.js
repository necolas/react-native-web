/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AppRegistry from '..';
import React from 'react';
import { act } from '@testing-library/react';
const NoopComponent = () => React.createElement('div');

describe.each([['concurrent'], ['legacy']])('AppRegistry', (mode) => {
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
      act(() => {
        AppRegistry.runApplication('App', {
          initialProps: {},
          rootTag,
          callback,
          mode
        });
      });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('unmount ran application', () => {
      const setMountedState = jest.fn();
      const MountedStateComponent = () => {
        React.useEffect(() => {
          setMountedState(true);
          return () => {
            setMountedState(false);
          };
        }, []);
        return <NoopComponent />;
      };

      AppRegistry.registerComponent('App', () => MountedStateComponent);
      let application;
      act(() => {
        application = AppRegistry.runApplication('App', {
          initialProps: {},
          rootTag,
          mode
        });
      });
      expect(setMountedState).toHaveBeenCalledTimes(1);
      expect(setMountedState).toHaveBeenLastCalledWith(true);
      act(() => {
        application.unmount();
      });
      expect(setMountedState).toHaveBeenCalledTimes(2);
      expect(setMountedState).toHaveBeenLastCalledWith(false);
    });

    test('styles roots in different documents', () => {
      AppRegistry.registerComponent('App', () => NoopComponent);
      act(() => {
        AppRegistry.runApplication('App', { initialProps: {}, rootTag, mode });
      });
      // Create iframe context
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);

      const iframeRootTag = document.createElement('div');
      iframeRootTag.id = 'react-iframe-root';
      iframe.contentWindow.document.body.appendChild(iframeRootTag);

      // Run in iframe
      AppRegistry.registerComponent('App', () => NoopComponent);
      act(() => {
        AppRegistry.runApplication('App', {
          initialProps: {},
          rootTag: iframeRootTag,
          mode
        });
      });

      const iframedoc = iframeRootTag.ownerDocument;
      expect(iframedoc).toBe(iframe.contentWindow.document);
      expect(iframedoc).not.toBe(document);

      const cssText = Array.prototype.slice
        .call(
          iframedoc.getElementById('react-native-stylesheet').sheet.cssRules
        )
        .map((cssRule) => cssRule.cssText);

      expect(cssText).toMatchInlineSnapshot(`
        [
          "[stylesheet-group=\\"0\\"] {}",
          "body {margin: 0;}",
          "button::-moz-focus-inner,input::-moz-focus-inner {border: 0; padding: 0;}",
          "html {-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; -webkit-tap-highlight-color: rgba(0,0,0,0);}",
          "input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration {display: none;}",
          "[stylesheet-group=\\"1\\"] {}",
          ".css-view-175oi2r {align-items: stretch; background-color: rgba(0,0,0,0.00); border: 0 solid black; box-sizing: border-box; display: flex; flex-basis: auto; flex-direction: column; flex-shrink: 0; list-style: none; margin: 0px; min-height: 0px; min-width: 0px; padding: 0px; position: relative; text-decoration: none; z-index: 0;}",
          "[stylesheet-group=\\"2\\"] {}",
          ".r-display-xoduu5 {display: inline-flex;}",
          ".r-flex-13awgt0 {flex: 1;}",
          "[stylesheet-group=\\"2.2\\"] {}",
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
