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

  handlePressSelf() {
    Linking.canOpenURL(url).then(supported => {
      return Linking.openURL(url, '_self');
    });
  }

  handlePressNoOpener() {
    Linking.canOpenURL(url).then(supported => {
      return Linking.openURL(url, '_target', 'noopener');
    });
  }

  render() {
    return (
      <View>
        <Text onPress={this.handlePress} style={styles.text}>
          Click this to trigger Linking.openURL('some_url')
        </Text>
        <Text onPress={this.handlePressSelf} style={styles.text}>
          Click this to trigger Linking.openURL('some_url', '_self')
        </Text>
        <Text onPress={this.handlePressNoOpener} style={styles.text}>
          Click this to trigger Linking.openURL('some_url', '_target', 'noopener')
        </Text>
        <Text
          accessibilityRole="link"
          href="https://mathiasbynens.github.io/rel-noopener/malicious.html"
          style={styles.text}
          target="_blank"
        >
          Click this to open a link without using the Linking API{'\n'}
          &lt;Text href='some_url' target='_blank'&gt;
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
