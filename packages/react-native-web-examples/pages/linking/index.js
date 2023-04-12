import { Linking, StyleSheet, Text } from 'react-native';
import React from 'react';
import Example from '../../shared/example';

const url = 'https://mathiasbynens.github.io/rel-noopener/malicious.html';

export default function LinkingPage(props) {
  const [, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log('adding listener');
    const listener = Linking.addEventListener('onOpen', () => {
      console.log('onOpen event');
    });
    return () => {
      console.log('removing listener');
      listener.remove();
    };
  });

  function handlePress() {
    Linking.canOpenURL(url).then((supported) => {
      setCount((x) => x + 1);
      const v = Linking.openURL(url);
      return v;
    });
  }

  return (
    <Example title="Linking">
      <Text onPress={handlePress} style={styles.text}>
        Linking.openURL
      </Text>
      <Text
        href="https://mathiasbynens.github.io/rel-noopener/malicious.html"
        hrefAttrs={{
          target: '_blank'
        }}
        role="link"
        style={styles.text}
      >
        target="_blank"
      </Text>
    </Example>
  );
}

const styles = StyleSheet.create({
  text: {
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10
  }
});
