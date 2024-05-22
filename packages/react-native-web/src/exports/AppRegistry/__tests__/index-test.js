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

    test('styles roots in iframes', () => {
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
      const cssText = iframedoc.getElementById(
        'react-native-stylesheet'
      ).textContent;
      expect(cssText).toMatchSnapshot('iframe css');
    });

    test('styles roots in shadow trees', () => {
      AppRegistry.registerComponent('App', () => NoopComponent);
      act(() => {
        AppRegistry.runApplication('App', { initialProps: {}, rootTag, mode });
      });
      // Create shadow dom
      const shadowRootHost = document.createElement('div');
      const shadowRoot = shadowRootHost.attachShadow({ mode: 'open' });
      const shadowContainer = document.createElement('div');
      shadowRoot.appendChild(shadowContainer);
      document.body.appendChild(shadowRootHost);

      // Run in shadow dom
      act(() => {
        AppRegistry.runApplication('App', {
          initialProps: {},
          rootTag: shadowContainer,
          mode
        });
      });
      const cssText = shadowRoot.getElementById(
        'react-native-stylesheet'
      ).textContent;
      expect(cssText).toMatchSnapshot('shadow dom css');
    });
  });
});
