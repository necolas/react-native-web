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
          autoFocus
          onFocus={() => {
            console.log('focused');
          }}
          style={styles.textinput}
        />
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
          defaultValue="readOnly (true)"
          readOnly={true}
          style={styles.textinput}
        />
        <TextInput
          inputMode="numeric"
          placeholder="inputMode 'numeric'"
          style={styles.textinput}
        />
        <TextInput
          maxLength={5}
          placeholder="maxLength"
          style={styles.textinput}
        />

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
          placeholder="multiline"
          rows={3}
          style={styles.multiline}
        />
        <TextInput
          caretHidden
          defaultValue="caretHidden"
          style={styles.textinput}
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
