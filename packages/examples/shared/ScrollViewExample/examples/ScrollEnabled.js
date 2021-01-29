'use strict';

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { createItemRow, Button } from '../helpers';

const ITEMS = [...Array(12)].map((_, i) => `Item ${i}`);

export default function ScrollEnabled() {
  const [enabled, updateEnabled] = React.useState(true);
  return (
    <View>
      <ScrollView scrollEnabled={enabled} style={styles.scrollView}>
        {ITEMS.map(createItemRow)}
      </ScrollView>
      <Text>{'Scrolling enabled = ' + enabled.toString()}</Text>
      <Button
        label="Disable Scrolling"
        onPress={() => {
          updateEnabled(false);
        }}
      />
      <Button
        label="Enable Scrolling"
        onPress={() => {
          updateEnabled(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#eeeeee',
    height: 300
  }
});
