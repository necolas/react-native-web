/* eslint-disable react/jsx-no-bind */

import React from 'react';
import UIExplorer from '../../UIExplorer';
import { action, storiesOf } from '@kadira/storybook';
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const onScroll = action('ScrollView.onScroll');

const examples = [
  {
    title: 'vertical',
    render: () =>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainerStyle}
          onScroll={onScroll}
          scrollEventThrottle={1000} // 1 event per second
          style={styles.scrollViewStyle}
        >
          {Array.from({ length: 50 }).map((item, i) =>
            <View key={i} style={styles.box}>
              <TouchableHighlight onPress={() => {}}><Text>{i}</Text></TouchableHighlight>
            </View>
          )}
        </ScrollView>
      </View>
  },
  {
    title: 'horizontal',
    render: () =>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainerStyle}
          horizontal
          onScroll={onScroll}
          scrollEventThrottle={16} // ~60 events per second
          style={styles.scrollViewStyle}
        >
          {Array.from({ length: 50 }).map((item, i) =>
            <View key={i} style={[styles.box, styles.horizontalBox]}>
              <Text>{i}</Text>
            </View>
          )}
        </ScrollView>
      </View>
  }
];

const styles = StyleSheet.create({
  box: {
    flexGrow: 1,
    justifyContent: 'center',
    borderWidth: 1
  },
  scrollViewContainer: {
    height: 200,
    width: 300
  },
  scrollViewStyle: {
    borderWidth: 1
  },
  scrollViewContentContainerStyle: {
    backgroundColor: '#eee',
    padding: 10
  }
});

storiesOf('Components', module).add('ScrollView', () =>
  <UIExplorer
    examples={examples}
    title="ScrollView"
    url="https://github.com/necolas/react-native-web/blob/master/docs/components/ScrollView.md"
  />
);
