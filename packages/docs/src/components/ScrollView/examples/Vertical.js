/* eslint-disable react/jsx-no-bind */

'use strict';

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { createItemRow, Button } from '../helpers';

const ITEMS = [...Array(12)].map((_, i) => `Item ${i}`);

export default function Vertical() {
  const scrollRef = React.useRef(null);
  return (
    <View>
      <Text style={styles.text}>Vertical scroll</Text>
      <ScrollView ref={scrollRef} style={styles.scrollView}>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Button
        label="Scroll to start"
        onPress={() => {
          scrollRef.current.scrollTo({ y: 0 });
        }}
      />
      <Button
        label="Scroll to 200px"
        onPress={() => {
          scrollRef.current.scrollTo({ y: 200 });
        }}
      />
      <Button
        label="Scroll to end"
        onPress={() => {
          scrollRef.current.scrollToEnd({ animated: true });
        }}
      />
      <Button
        label="Flash scroll indicators"
        onPress={() => {
          scrollRef.current.flashScrollIndicators();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#eeeeee',
    height: 300
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5
  }
});
