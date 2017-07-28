/**
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

const action = msg => () => {
  console.log(msg);
};

class TouchableHighlightDisabled extends React.Component {
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

class TouchableOpacityDisabled extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          disabled={true}
          onPress={action('TouchableOpacity')}
          style={[styles.row, styles.block]}
        >
          <Text style={styles.disabledButton}>Disabled TouchableOpacity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={false}
          onPress={action('TouchableOpacity')}
          style={[styles.row, styles.block]}
        >
          <Text style={styles.button}>Enabled TouchableOpacity</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class TouchableWithoutFeedbackDisabled extends React.Component {
  render() {
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
}

export { TouchableHighlightDisabled, TouchableOpacityDisabled, TouchableWithoutFeedbackDisabled };

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  block: {
    padding: 10
  }
});
