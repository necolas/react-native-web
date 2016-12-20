import { storiesOf } from '@kadira/storybook';
import { I18nManager, StyleSheet, TouchableHighlight, Text, View } from 'react-native'
import React, { Component } from 'react';

class I18nManagerExample extends Component {
  componentWillUnmount() {
    I18nManager.setPreferredLanguageRTL(false)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text accessibilityRole='heading' style={styles.welcome}>
          LTR/RTL layout example!
        </Text>
        <Text style={styles.text}>
          This is sample text. The writing direction can be changed by pressing the button below.
        </Text>
        <Text style={[ styles.text, styles.ltrText ]}>
          This is text that will always display LTR.
        </Text>
        <Text style={[ styles.text, styles.rtlText ]}>
          This is text that will always display RTL.
        </Text>
        <TouchableHighlight
          onPress={this._handleToggle}
          style={styles.toggle}
          underlayColor='rgba(0,0,0,0.25)'
        >
          <Text>Toggle LTR/RTL</Text>
        </TouchableHighlight>
      </View>
    )
  }

  _handleToggle = () => {
    this._isRTL = !this._isRTL
    I18nManager.setPreferredLanguageRTL(this._isRTL)
  }
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
  ltrText: {
    textAlign$noI18n: 'left',
    writingDirection$noI18n: 'ltr'
  },
  rtlText: {
    textAlign$noI18n: 'right',
    writingDirection$noI18n: 'rtl'
  },
  toggle: {
    alignSelf: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 10,
    padding: 10
  }
})

storiesOf('api: I18nManager', module)
  .add('RTL layout', () => (
    <I18nManagerExample />
  ))
