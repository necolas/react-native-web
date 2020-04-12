import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const action = msg => () => {
  console.log(msg);
};

export default class TouchableOpacityDisabled extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          disabled={true}
          onPress={action('TouchableOpacity')}
          style={[styles.row, styles.block]}
        >
          <Text style={styles.disabledButton}>Disabled TouchableOpacity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={action('TouchableOpacity')}
          style={[styles.row, styles.block]}
        >
          <Text style={styles.button}>Enabled TouchableOpacity</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  block: {
    padding: 10
  }
});
