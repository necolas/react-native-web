import React from 'react';
import { AppRegistry, Text, StyleSheet } from 'react-native';
import Example from '../../shared/example';

function App() {
  return <Text style={styles.text}>Should be red and bold</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontWeight: 'bold'
  }
});

AppRegistry.registerComponent('App', () => App);

export default function AppStatePage() {
  const iframeRef = React.useRef(null);
  const shadowRef = React.useRef(null);

  React.useEffect(() => {
    const iframeElement = iframeRef.current;
    const iframeBody = iframeElement.contentWindow.document.body;
    const iframeRootTag = document.createElement('div');
    iframeRootTag.id = 'iframe-root';
    iframeBody.appendChild(iframeRootTag);
    AppRegistry.runApplication('App', { rootTag: iframeRootTag });

    const shadowElement = shadowRef.current;
    const shadowRoot = shadowElement.attachShadow({ mode: 'open' });
    const shadowRootTag = document.createElement('div');
    shadowRootTag.id = 'shadow-root';
    shadowRoot.appendChild(shadowRootTag);
    AppRegistry.runApplication('App', { rootTag: shadowRootTag });

    return () => {
      AppRegistry.unmountApplicationComponentAtRootTag(iframeRootTag);
      AppRegistry.unmountApplicationComponentAtRootTag(shadowRootTag);
    };
  }, []);

  return (
    <Example title="AppRegistry">
      <Text>Styles in iframe</Text>
      <iframe ref={iframeRef} />
      <Text>Styles in ShadowRoot</Text>
      <div ref={shadowRef} />
    </Example>
  );
}
