import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Example from '../../shared/example';

export default function TextInputPage() {
  const nextFocus = React.useRef(null);

  const focusNextField = () => {
    if (nextFocus.current != null) {
      nextFocus.current.focus();
    }
  };

  return (
    <Example title="TextInput">
    <View style={styles.container}>
      <TextInput
        blurOnSubmit={true}
        onSubmitEditing={() => focusNextField()}
        placeholder="blurOnSubmit"
        style={styles.textinput}
      />
      <TextInput
        clearTextOnFocus={true}
        defaultValue="clearTextOnFocus"
        ref={nextFocus}
        style={styles.textinput}
      />
      <TextInput
        defaultValue="disabled"
        disabled={true}
        style={styles.textinput}
      />
      <TextInput
        defaultValue="editable (false)"
        editable={false}
        style={styles.textinput}
      />
      <TextInput
        keyboardType="numeric"
        placeholder="keyboardType 'numeric'"
        style={styles.textinput}
      />
      <TextInput maxLength={5} placeholder="maxLength" style={styles.textinput} />

      <TextInput
        placeholder="placeholderTextColor"
        placeholderTextColor="orange"
        style={styles.textinput}
      />
      <TextInput
        defaultValue="selectTextOnFocus"
        selectTextOnFocus={true}
        style={styles.textinput}
      />
      <TextInput
        defaultValue="secureTextEntry"
        secureTextEntry={true}
        style={styles.textinput}
      />
      <TextInput
        multiline={true}
        numberOfLines={3}
        placeholder="multiline"
        style={styles.multiline}
      />
    </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: '1rem'
  },
  textinput: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    marginVertical: '1rem'
  },
  multiline: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    marginVertical: '1rem'
  }
});
