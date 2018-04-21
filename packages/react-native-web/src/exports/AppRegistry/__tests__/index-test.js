/* eslint-env jasmine, jest */

import AppRegistry from '..';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { render } from 'enzyme';
import StyleSheet from '../../StyleSheet';
import View from '../../View';

const RootComponent = () => <div />;

describe('AppRegistry', () => {
  describe('getApplication', () => {
    const canUseDOM = ExecutionEnvironment.canUseDOM;

    beforeEach(() => {
      ExecutionEnvironment.canUseDOM = false;
    });

    afterEach(() => {
      ExecutionEnvironment.canUseDOM = canUseDOM;
    });

    test('does not throw when missing appParameters', () => {
      AppRegistry.registerComponent('App', () => RootComponent);
      expect(() => AppRegistry.getApplication('App')).not.toThrow();
    });

    test('returns "element" and "getStyleElement"', () => {
      AppRegistry.registerComponent('App', () => RootComponent);

      const { element, getStyleElement } = AppRegistry.getApplication('App', {});
      expect(element).toMatchSnapshot();
      expect(ReactDOMServer.renderToStaticMarkup(getStyleElement())).toMatchSnapshot();
    });

    test('"getStyleElement" produces styles that are a function of rendering "element"', () => {
      const getTextContent = getStyleElement =>
        getStyleElement().props.dangerouslySetInnerHTML.__html;

      // First "RootComponent" render
      AppRegistry.registerComponent('App1', () => RootComponent);
      let app = AppRegistry.getApplication('App1', {});
      render(app.element);
      const first = getTextContent(app.getStyleElement);

      // Next render is a different tree; the style sheet should be different
      const styles = StyleSheet.create({ root: { borderWidth: 1234, backgroundColor: 'purple' } });
      const Component = () => <View style={styles.root} />;
      AppRegistry.registerComponent('App2', () => Component);
      app = AppRegistry.getApplication('App2', {});
      render(app.element);
      const second = getTextContent(app.getStyleElement);

      const diff = second.split(first)[1];

      expect(first).toMatchSnapshot('CSS for an unstyled app');
      expect(diff).toMatchSnapshot('Additional CSS for styled app');
      expect(first).not.toEqual(second);

      // Final render is once again "RootComponent"; the style sheet should not
      // be polluted by earlier rendering of a different tree
      app = AppRegistry.getApplication('App1', {});
      render(app.element);
      const third = getTextContent(app.getStyleElement);

      expect(first).toEqual(third);
    });
  });

  describe('runApplication', () => {
    test('callback after render', () => {
      AppRegistry.registerComponent('App', () => RootComponent);

      const callback = jest.fn();
      const rootTag = document.createElement('div');
      rootTag.id = 'react-root';
      document.body.appendChild(rootTag);
      AppRegistry.runApplication('App', { initialProps: {}, rootTag, callback });
      expect(callback).toHaveBeenCalledTimes(1);
      document.body.removeChild(rootTag);
    });
  });
});
