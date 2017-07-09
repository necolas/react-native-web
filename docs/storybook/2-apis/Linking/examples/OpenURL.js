/**
 * @flow
 */

import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { PureComponent } from 'react';

const url = 'https://mathiasbynens.github.io/rel-noopener/malicious.html';

export default class OpenURL extends PureComponent {
  handlePress() {
    Linking.canOpenURL(url).then(supported => {
      return Linking.openURL(url);
    });
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

const styles = StyleSheet.create({
  text: {
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10
  }
});
