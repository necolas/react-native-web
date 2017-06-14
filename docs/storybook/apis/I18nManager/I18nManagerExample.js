import { storiesOf } from '@kadira/storybook';
import UIExplorer from '../../UIExplorer';
import { I18nManager, StyleSheet, TouchableHighlight, Text, View } from 'react-native';
import React, { Component } from 'react';

class I18nManagerExample extends Component {
  componentWillUnmount() {
    I18nManager.setPreferredLanguageRTL(false);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text accessibilityRole="heading" style={styles.welcome}>
          LTR/RTL layout example!
        </Text>
        <Text style={styles.text}>
          The writing direction of text is automatically determined by the browser, independent of
          the global writing direction of the app.
        </Text>
        <Text style={[styles.text, styles.rtlText]}>
          أحب اللغة العربية
        </Text>
        <Text style={[styles.text, styles.textAlign]}>
          textAlign toggles
        </Text>
        <View style={styles.horizontal}>
          <View style={[styles.box, { backgroundColor: 'lightblue' }]}>
            <Text>One</Text>
          </View>
          <View style={[styles.box]}>
            <Text>Two</Text>
          </View>
        </View>
        <TouchableHighlight
          onPress={this._handleToggle}
          style={styles.toggle}
          underlayColor="rgba(0,0,0,0.25)"
        >
          <Text>Toggle LTR/RTL</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _handleToggle = () => {
    I18nManager.setPreferredLanguageRTL(!I18nManager.isRTL);
    this.forceUpdate();
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  welcome: {
    fontSize: 28,
    marginVertical: 10
  },
  text: {
    color: '#333333',
    fontSize: 18,
    marginBottom: 5
  },
  textAlign: {
    textAlign: 'left'
  },
  horizontal: {
    flexDirection: 'row',
    marginVertical: 10
  },
  box: {
    borderWidth: 1,
    flex: 1
  },
  toggle: {
    alignSelf: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 10,
    padding: 10
  }
});

const examples = [
  {
    title: 'RTL toggle',
    render: () => <I18nManagerExample />
  }
];

storiesOf('APIs', module).add('I18nManager', () =>
  <UIExplorer examples={examples} title="I18nManager" />
);
