import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

const buttons = ['One', 'Two', 'Three'];

export default function TouchableCustomStyleOverridesExample() {
  const [state, setState] = React.useState({});

  function select(item) {
    return function handler(e) {
      setState({ [item]: true });
    };
  }

  return (
    <View style={styles.container}>
      {buttons.map((button) => {
        return (
          <TouchableHighlight
            key={button}
            onPress={select(button)}
            style={[styles.touchable, state[button] && styles.blue]}
            underlayColor="#1b95e020"
          >
            <Text style={[!state[button] && styles.text]}>{button}</Text>
          </TouchableHighlight>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  blue: {
    backgroundColor: '#1b95e040',
    borderColor: '#1B95E0',
  },
  text: {
    color: '#555',
  },
  container: {
    flexDirection: 'row',
  },
  touchable: {
    borderWidth: 3,
    borderColor: '#ccc',
    padding: 20,
    marginVertical: 10,
    marginRight: 10,
  },
});
