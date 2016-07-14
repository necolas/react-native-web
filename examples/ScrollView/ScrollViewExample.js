import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { ScrollView, StyleSheet, Text, View } from 'react-native'

storiesOf('<ScrollView>', module)
  .add('vertical', () => (
    <View style={styles.scrollViewContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainerStyle}
        onScroll={e => console.log('ScrollView.onScroll', e)}
        scrollEventThrottle={1} // 1 event per second
        style={styles.scrollViewStyle}
      >
        {Array.from({ length: 50 }).map((item, i) => (
          <View key={i} style={styles.box}>
            <Text>{i}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  ))
  .add('horizontal', () => (
    <View style={styles.scrollViewContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainerStyle}
        horizontal
        onScroll={e => console.log('ScrollView.onScroll', e)}
        scrollEventThrottle={1} // 1 event per second
        style={styles.scrollViewStyle}
      >
        {Array.from({ length: 50 }).map((item, i) => (
          <View key={i} style={[ styles.box, styles.horizontalBox ]}>
            <Text>{i}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  ))

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    borderWidth: 1
  },
  scrollViewContainer: {
    height: '200px',
    width: 300
  },
  scrollViewStyle: {
    borderWidth: '1px'
  },
  scrollViewContentContainerStyle: {
    padding: '10px'
  }
})
