/* eslint-disable react/jsx-no-bind */

/**
 * @flow
 */

import React, { PureComponent } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class ScrollToExample extends PureComponent {
  render() {
    return (
      <View style={styles.scrollViewContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainerStyle}
          ref={scrollview => {
            this.scrollview = scrollview;
          }}
          scrollEventThrottle={16} // ~60 events per second
          style={styles.scrollViewStyle}
        >
          {Array.from({ length: 50 }).map((item, i) => (
            <TouchableHighlight
              key={i}
              onPress={() => {}}
              style={[styles.box, styles.horizontalBox]}
            >
              <Text>{i}</Text>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <Button
          onPress={() => {
            this.scrollview.scrollTo({ y: 100 });
          }}
          title="Scroll to 100px"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flexGrow: 1,
    justifyContent: 'center',
    borderWidth: 1
  },
  scrollViewContainer: {
    height: 150,
    width: 300
  },
  scrollViewStyle: {
    borderWidth: 1,
    marginBottom: '1.3125rem'
  },
  scrollViewContentContainerStyle: {
    backgroundColor: '#eee',
    padding: 10
  }
});
