import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Title extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    margin: 10,
    marginBottom: 0,
    height: 45,
    padding: 10,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 20,
    fontWeight: '500'
  }
});
