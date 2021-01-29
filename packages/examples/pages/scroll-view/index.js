import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Example from '../../shared/example';

const ITEMS = [...Array(12)].map((_, i) => `Item ${i}`);

function createItemRow(msg, index) {
  return (
    <TouchableOpacity key={index} style={[styles.item]}>
      <Text style={styles.text} >{msg}</Text>
    </TouchableOpacity>
  );
}

function Divider() {
  return <View style={styles.divider} />
}

export default function ScrollViewPage() {
  const [scrollEnabled, setEnabled] = React.useState(true);
  const [throttle, setThrottle] = React.useState(16);
  const scrollRef = React.useRef(null);

  return (
    <Example title="ScrollView">
      <View style={styles.container}>
        <ScrollView
          onScroll={() => {
            console.log('onScroll');
          }}
          ref={scrollRef}
          scrollEnabled={scrollEnabled}
          scrollEventThrottle={throttle}
          style={[styles.scrollView, !scrollEnabled && styles.disabled ]}
        >
          {ITEMS.map(createItemRow)}
        </ScrollView>

        <View style={styles.buttons}>
          <Button
            onPress={() => {
              setEnabled((val) => !val);
            }}
            title={scrollEnabled ? 'Disable' : 'Enable'}
          />
          <Divider />
          <Button
            onPress={() => {
              setThrottle((val) => (val !== 16 ? 16 : 1000));
            }}
            title="Throttle"
          />
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() => {
              scrollRef.current.scrollTo({ y: 0 });
            }}
            title="To start"
          />
          <Divider />
          <Button
            onPress={() => {
              scrollRef.current.scrollTo({ y: 50 });
            }}
            title="To 50px"
          />
          <Divider />
          <Button
            onPress={() => {
              scrollRef.current.scrollToEnd({ animated: true });
            }}
            title="To end"
          />
        </View>
      </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  scrollView: {
    backgroundColor: '#eeeeee',
    maxHeight: 250
  },
  disabled: {
    opacity: 0.5
  },
  item: {
    margin: 5,
    padding: 5,
    backgroundColor: '#cccccc',
    borderRadius: 3,
    minWidth: 96
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '1rem'
  },
  divider: {
    width: '1rem'
  }
});
