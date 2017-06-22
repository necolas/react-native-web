import { storiesOf } from '@kadira/storybook';
import UIExplorer from '../../UIExplorer';
import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';

const url = 'https://mathiasbynens.github.io/rel-noopener/malicious.html';

class LinkingExample extends Component {
  handlePress() {
    Linking.canOpenURL(url).then(supported => {
      return Linking.openURL(url);
    });
  }

  render() {
    return (
      <View>
        <Text onPress={this.handlePress} style={styles.text}>
          Linking.openURL (Expect: "The previous tab is safe and intact")
        </Text>
        <Text
          accessibilityRole="link"
          href="https://mathiasbynens.github.io/rel-noopener/malicious.html"
          style={styles.text}
          target="_blank"
        >
          target="_blank" (Expect: "The previous tab is safe and intact")
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 10
  }
});

const examples = [
  {
    title: 'Safe external links',
    render: () => <LinkingExample />
  }
];

storiesOf('APIs', module).add('Linking', () => <UIExplorer examples={examples} title="Linking" />);
