/**
 * @flow
 */

import React from 'react';
import { any, string } from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

export const styles = StyleSheet.create({
  textinput: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    padding: 4
  },
  eventLabel: {
    margin: 3,
    fontSize: 12
  },
  multiline: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    padding: 4,
    marginBottom: 4
  }
});

export class WithLabel extends React.Component {
  static propTypes = {
    children: any,
    label: string
  };

  render() {
    return (
      <View style={withLabelStyles.labelContainer}>
        <View style={withLabelStyles.label}>
          <Text>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

const withLabelStyles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    marginVertical: 2,
    flex: 1
  },
  label: {
    width: 115,
    alignItems: 'flex-end',
    marginRight: 10,
    paddingTop: 2
  }
});
