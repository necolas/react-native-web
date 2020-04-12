import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

const action = msg => () => {
  console.log(msg);
};

export default function Disabled() {
  return (
    <View>
      <Pressable disabled={true} onPress={action('Pressable')}>
        <View style={[styles.row, styles.block]}>
          <Text style={styles.disabledButton}>Disabled Pressable</Text>
        </View>
      </Pressable>

      <Pressable disabled={false} onPress={action('Pressable')}>
        <View style={[styles.row, styles.block]}>
          <Text style={styles.button}>Enabled Pressable</Text>
        </View>
      </Pressable>
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
