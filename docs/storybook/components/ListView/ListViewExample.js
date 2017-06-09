import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { ListView, StyleSheet, Text, View } from 'react-native';

const generateData = length => Array.from({ length }).map((item, i) => i);
const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

storiesOf('component: ListView', module)
  .add('vertical', () =>
    <View style={styles.scrollViewContainer}>
      <ListView
        contentContainerStyle={styles.scrollViewContentContainerStyle}
        dataSource={dataSource.cloneWithRows(generateData(100))}
        initialListSize={100}
        // eslint-disable-next-line react/jsx-no-bind
        onScroll={e => {
          console.log('ScrollView.onScroll', e);
        }}
        // eslint-disable-next-line react/jsx-no-bind
        renderRow={row => <View><Text>{row}</Text></View>}
        scrollEventThrottle={1000} // 1 event per second
        style={styles.scrollViewStyle}
      />
    </View>
  )
  .add('incremental rendering - large pageSize', () =>
    <View style={styles.scrollViewContainer}>
      <ListView
        contentContainerStyle={styles.scrollViewContentContainerStyle}
        dataSource={dataSource.cloneWithRows(generateData(5000))}
        initialListSize={100}
        // eslint-disable-next-line react/jsx-no-bind
        onScroll={e => {
          console.log('ScrollView.onScroll', e);
        }}
        pageSize={50}
        // eslint-disable-next-line react/jsx-no-bind
        renderRow={row => <View><Text>{row}</Text></View>}
        scrollEventThrottle={1000} // 1 event per second
        style={styles.scrollViewStyle}
      />
    </View>
  )
  .add('incremental rendering - small pageSize', () =>
    <View style={styles.scrollViewContainer}>
      <ListView
        contentContainerStyle={styles.scrollViewContentContainerStyle}
        dataSource={dataSource.cloneWithRows(generateData(5000))}
        initialListSize={5}
        // eslint-disable-next-line react/jsx-no-bind
        onScroll={e => {
          console.log('ScrollView.onScroll', e);
        }}
        pageSize={1}
        // eslint-disable-next-line react/jsx-no-bind
        renderRow={row => <View><Text>{row}</Text></View>}
        scrollEventThrottle={1000} // 1 event per second
        style={styles.scrollViewStyle}
      />
    </View>
  );

const styles = StyleSheet.create({
  box: {
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
    backgroundColor: '#eee',
    padding: '10px'
  }
});
