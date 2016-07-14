import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { StyleSheet, TextInput, View } from 'react-native'

storiesOf('<TextInput>', module)
  .add('tbd', () => (
    <View>
      <TextInput
        defaultValue='Default textInput'
        keyboardType='default'
        onBlur={(e) => { console.log('TextInput.onBlur', e) }}
        onChange={(e) => { console.log('TextInput.onChange', e) }}
        onChangeText={(e) => { console.log('TextInput.onChangeText', e) }}
        onFocus={(e) => { console.log('TextInput.onFocus', e) }}
        onSelectionChange={(e) => { console.log('TextInput.onSelectionChange', e) }}
      />
      <TextInput secureTextEntry style={styles.textInput} />
      <TextInput defaultValue='read only' editable={false} style={styles.textInput} />
      <TextInput
        style={[ styles.textInput, { flex:1, height: 60, padding: 20, fontSize: 20, textAlign: 'center' } ]}
        keyboardType='email-address' placeholder='you@domain.com' placeholderTextColor='red'
      />
      <TextInput keyboardType='numeric' style={styles.textInput} />
      <TextInput keyboardType='phone-pad' style={styles.textInput} />
      <TextInput defaultValue='https://delete-me' keyboardType='url' placeholder='https://www.some-website.com' selectTextOnFocus style={styles.textInput} />
      <TextInput
        defaultValue='default value'
        maxNumberOfLines={10}
        multiline
        numberOfLines={5}
        style={styles.textInput}
      />
    </View>
  ))

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1
  }
})
