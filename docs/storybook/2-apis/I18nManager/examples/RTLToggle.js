/**
 * @flow
 */

import { Button, I18nManager, StyleSheet, Text, View } from 'react-native';
import React, { PureComponent } from 'react';

export default class RTLToggle extends PureComponent {
  componentWillUnmount() {
    I18nManager.setPreferredLanguageRTL(false);
  }

  render() {
    return (
      <View>
        <View style={[styles.buttonBox, I18nManager.isRTL && { alignSelf: 'flex-end' }]}>
          <Button onPress={this._handleToggle} title="Toggle LTR/RTL" />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>
            The writing direction of text is automatically determined by the browser, independent of
            the global writing direction of the app.
          </Text>
          <Text style={[styles.text, styles.rtlText]}>أحب اللغة العربية</Text>
          <Text style={[styles.text, styles.textAlign]}>textAlign toggles</Text>
          <View style={styles.horizontal}>
            <View style={[styles.box, { backgroundColor: 'lightblue' }]}>
              <Text>One</Text>
            </View>
            <View style={[styles.box]}>
              <Text>Two</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _handleToggle = () => {
    I18nManager.setPreferredLanguageRTL(!I18nManager.isRTL);
    this.forceUpdate();
  };
}

const styles = StyleSheet.create({
  buttonBox: {
    alignSelf: 'flex-start'
  },
  container: {
    borderColor: '#AAB8C2',
    borderWidth: 1,
    marginTop: 20,
    padding: 10
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
