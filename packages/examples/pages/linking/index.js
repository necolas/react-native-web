import { Linking, StyleSheet, Text } from 'react-native';
import React, { PureComponent } from 'react';
import Example from '../../shared/example';

const url = 'https://mathiasbynens.github.io/rel-noopener/malicious.html';

export default class LinkingPage extends PureComponent {
  handlePress() {
    Linking.canOpenURL(url).then((supported) => {
      return Linking.openURL(url);
    });
  }

  render() {
    return (
      <Example title="Linking">
        <Text onPress={this.handlePress} style={styles.text}>
          Linking.openURL
        </Text>
        <Text
          accessibilityRole="link"
          href="https://mathiasbynens.github.io/rel-noopener/malicious.html"
          hrefAttrs={{
            target: '_blank'
          }}
          style={styles.text}
        >
          target="_blank"
        </Text>
      </Example>
    );
  }
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
