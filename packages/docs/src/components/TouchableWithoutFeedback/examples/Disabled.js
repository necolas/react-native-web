import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';

const action = msg => () => {
  console.log(msg);
};

export default function Disabled() {
  return (
    <View>
      <TouchableWithoutFeedback disabled={true} onPress={action('TouchableWithoutFeedback')}>
        <View style={[styles.row, styles.block]}>
          <Text style={styles.disabledButton}>Disabled TouchableWithoutFeedback</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback disabled={false} onPress={action('TouchableWithoutFeedback')}>
        <View style={[styles.row, styles.block]}>
          <Text style={styles.button}>Enabled TouchableWithoutFeedback</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
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
