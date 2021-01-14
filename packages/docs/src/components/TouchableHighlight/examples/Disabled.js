import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

const action = msg => () => {
  console.log(msg);
};

export default class TouchableHighlightDisabled extends React.Component {
  render() {
    return (
      <View>
        <TouchableHighlight
          activeOpacity={1}
          disabled={true}
          onPress={action('TouchableHighlight')}
          style={[styles.row, styles.block]}
          underlayColor="rgb(210, 230, 255)"
        >
          <Text style={styles.disabledButton}>Disabled TouchableHighlight</Text>
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={1}
          onPress={action('TouchableHighlight')}
          style={[styles.row, styles.block]}
          underlayColor="rgb(210, 230, 255)"
        >
          <Text style={styles.button}>Enabled TouchableHighlight</Text>
        </TouchableHighlight>
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
