import { Linking, StyleSheet, Text, View, Button } from 'react-native';
import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

const url = 'https://mathiasbynens.github.io/rel-noopener/malicious.html';

class OpenURLExample extends Component {
  _handlePress() {
    Linking.canOpenURL(url).then(supported => {
      return Linking.openURL(url);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>openURL</Text>
        <Text onPress={this._handlePress} style={{ marginVertical: 10 }}>
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

class GetInitialURLExample extends Component {
  state = { initialUrl: '' };

  componentDidMount() {
    Linking.getInitialURL().then(url => this.setState({ initialUrl: url }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>getInitialURL</Text>
        {this.state.initialUrl &&
          <View style={styles.result}>
            <Text>Initial URL is: {this.state.initialUrl}</Text>
          </View>}
      </View>
    );
  }
}

class AddEventListenerExample extends Component {
  state = { currentUrl: '', receivedData: '' };

  componentDidMount() {
    Linking.addEventListener('url', this._handleUrl);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleUrl);
  }

  _handleUrl = ({ url, nativeEvent }) => {
    // Don't forget to check that the origin is allowed
    if (nativeEvent && nativeEvent.origin === 'https://github.com') {
      this.setState({
        currentUrl: url,
        receivedData: JSON.stringify(nativeEvent.data),
      });
    }
  };

  _handleSendData = () =>
    window.open('https://github.com', 'GitHub', 'menubar=no, status=no, scrollbars=no, width=200, height=200');

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>addEventListener</Text>
        <Text style={{ marginBottom: 10 }}>
          Send data from another site: click the button below, open the developers tools and type "window.opener.postMessage('Hello world!', '*')"
        </Text>
        <Button onPress={this._handleSendData} title="Send data" />
        {this.state.currentUrl &&
          <View style={styles.result}>
            <Text>Current URL is: {this.state.currentUrl}</Text>
            <Text>Received data is: {this.state.receivedData}</Text>
          </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  result: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#eee',
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

storiesOf('api: Linking', module)
  .add('openURL', () => <OpenURLExample />)
  .add('getInitialURL', () => <GetInitialURLExample />)
  .add('addEventListener', () => <AddEventListenerExample />);
