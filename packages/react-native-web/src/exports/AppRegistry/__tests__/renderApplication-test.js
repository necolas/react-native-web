/* eslint-env jasmine, jest */

import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import { getApplication } from '../renderApplication';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { render } from 'enzyme';
import StyleSheet from '../../StyleSheet';
import View from '../../View';

const RootComponent = () => <div />;

describe('AppRegistry/renderApplication', () => {
  describe('getApplication', () => {
    const canUseDOM = ExecutionEnvironment.canUseDOM;

    beforeEach(() => {
      ExecutionEnvironment.canUseDOM = false;
    });

    afterEach(() => {
      ExecutionEnvironment.canUseDOM = canUseDOM;
    });

    test('returns "element" and "getStyleElement"', () => {
      const { element, getStyleElement } = getApplication(RootComponent, {});
      expect(element).toMatchSnapshot();
      expect(ReactDOMServer.renderToStaticMarkup(getStyleElement())).toMatchSnapshot();
    });

    test('"getStyleElement" produces styles that are a function of rendering "element"', () => {
      const getTextContent = getStyleElement =>
        getStyleElement().props.dangerouslySetInnerHTML.__html;

      // First "RootComponent" render
      let app = getApplication(RootComponent, {});
      render(app.element);
      const first = getTextContent(app.getStyleElement);

      // Next render is a different tree; the style sheet should be different
      const styles = StyleSheet.create({ root: { borderWidth: 1234, backgroundColor: 'purple' } });
      app = getApplication(() => <View style={styles.root} />, {});
      render(app.element);
      const second = getTextContent(app.getStyleElement);

      const diff = second.split(first)[1];

      expect(first).toMatchSnapshot('CSS for an unstyled app');
      expect(diff).toMatchSnapshot('Additional CSS for styled app');
      expect(first).not.toEqual(second);

      // Final render is once again "RootComponent"; the style sheet should not
      // be polluted by earlier rendering of a different tree
      app = getApplication(RootComponent, {});
      render(app.element);
      const third = getTextContent(app.getStyleElement);

      expect(first).toEqual(third);
    });
  });
});
