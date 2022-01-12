/* eslint-env jasmine, jest */

import React from 'react';
import ReactRootView from '../ReactRootView';
import renderRootView from '../../../exports/AppRegistry/renderRootView';
import Text from '../../Text';
import View from '../../View';

describe('ReactRootView', () => {
  describe('render ReactRootView', () => {
    test('render ReactRootView inside ReactRootView', () => {
      const { container } = renderRootView(<ReactRootView />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('render two ReactRootViews at once', () => {
      const rootDiv = document.createElement('div');
      const reactDiv = document.createElement('div');
      const reactRootDiv = document.createElement('div');
      rootDiv.appendChild(reactDiv);
      rootDiv.appendChild(reactRootDiv);

      const { container } = renderRootView(
        <View>
          <Text>Some text</Text>
          <ReactRootView rootTag={reactRootDiv}>
            <Text>Some text outside</Text>
          </ReactRootView>
        </View>,
        { container: reactDiv }
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('render second ReactRootView in iframe', () => {
      const rootDiv = document.createElement('div');
      const reactDiv = document.createElement('div');
      const iframe = document.createElement('iframe');

      rootDiv.appendChild(reactDiv);
      rootDiv.appendChild(iframe);

      iframe.onload = () => {
        const doc = iframe.contentWindow.document;
        const reactRootDiv = doc.createElement('div');
        doc.body.appendChild(reactRootDiv);

        const { container } = renderRootView(
          <View>
            <Text>Some text</Text>
            <ReactRootView rootTag={reactRootDiv}>
              <Text>Some text outside</Text>
            </ReactRootView>
          </View>,
          { container: reactDiv }
        );
        expect(container.firstChild).toMatchSnapshot();

        expect(document.getElementByType('styles').length).toBe(1);
        expect(doc.getElementByType('styles').length).toBe(1);
      };
      iframe.src = 'about:blank';
    });
  });
});
