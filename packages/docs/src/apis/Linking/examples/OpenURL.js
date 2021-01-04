/**
 * @flow
 */

import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { PureComponent } from 'react';

const url = 'https://mathiasbynens.github.io/rel-noopener/malicious.html';

class OpenURLExample extends PureComponent {
  componentDidMount() {
    Linking.addEventListener('onOpen', this.onOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('onOpen', this.onOpenURL);
  }

  handlePress() {
    Linking.canOpenURL(url).then(supported => {
      return Linking.openURL(url);
    });
  }

  onOpenURL(url: string) {
    console.log(`%c    opened the url: ${url}    `, 'background: #D32F2F; color: #FFFFFF');
  }

  render() {
    return (
      <View>
        <Text onPress={this.handlePress} style={styles.text}>
          Linking.openURL
        </Text>
        <Text
          accessibilityRole="link"
          href="https://mathiasbynens.github.io/rel-noopener/malicious.html"
          style={styles.text}
          target="_blank"
        >
          target="_blank"
        </Text>
      </View>
    );
  }
}

export default function OpenURL() {
  return <OpenURLExample />;
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
