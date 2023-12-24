import React, { useRef, useEffect, useState } from 'react';
import { Pressable, Text, StyleSheet, View, render } from 'react-native';
import Example from '../../shared/example';

function IframeWrapper({ children }) {
  const iframeHost = useRef();
  const reactRoot = useRef();

  useEffect(() => {
    if (iframeHost.current) {
      if (!reactRoot.current) {
        const iframeElement = iframeHost.current;
        const iframeAppContainer = document.createElement('div');
        iframeElement.contentWindow.document.body.appendChild(
          iframeAppContainer
        );
        reactRoot.current = render(children, iframeAppContainer);
      }
      reactRoot.current.render(children);
    }
  });

  return <iframe ref={iframeHost} style={{ border: 'none' }} />;
}

function ShadowDomWrapper({ children }) {
  const shadowHost = useRef();
  const reactRoot = useRef();

  useEffect(() => {
    if (shadowHost.current) {
      if (!reactRoot.current) {
        const shadowRoot = shadowHost.current.attachShadow({ mode: 'open' });
        reactRoot.current = render(children, shadowRoot);
      }
      reactRoot.current.render(children);
    }
  });

  return <div ref={shadowHost} />;
}

function Heading({ children }) {
  return (
    <Text role="heading" style={styles.heading}>
      {children}
    </Text>
  );
}

function Button({ active, onPress, title }) {
  return (
    <Pressable
      onPress={() => onPress((old) => !old)}
      style={[styles.button, active && styles.buttonActive]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

function App() {
  const [active, setActive] = useState(false);
  const [activeIframe, setActiveIframe] = useState(false);
  const [activeShadow, setActiveShadow] = useState(false);

  return (
    <Example title="AppRegistry">
      <View style={styles.app}>
        <View style={styles.header}>
          <Heading>Styles in document</Heading>
          <Text style={styles.text}>Should be red and bold</Text>
          <Button active={active} onPress={setActive} title={'Button'} />

          <Heading>Styles in ShadowRoot</Heading>
          <ShadowDomWrapper>
            <Text style={styles.text}>Should be red and bold</Text>
            <Button
              active={activeShadow}
              onPress={setActiveShadow}
              title={'Button'}
            />
          </ShadowDomWrapper>

          <Heading>Styles in iframe</Heading>
          <IframeWrapper>
            <Text style={styles.text}>Should be red and bold</Text>
            <Button
              active={activeIframe}
              onPress={setActiveIframe}
              title={'Button'}
            />
          </IframeWrapper>
        </View>
      </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: 'auto',
    maxWidth: 500
  },
  header: {
    padding: 20
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '1.125rem',
    marginBlockStart: '1rem',
    marginBlockEnd: '0.25rem'
  },
  text: {
    color: 'red',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: 'red',
    paddingBlock: 5,
    paddingInline: 10
  },
  buttonActive: {
    backgroundColor: 'blue'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    userSelect: 'none'
  }
});

export default function AppStatePage() {
  return <App />;
}
