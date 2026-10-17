import React from 'react';
import { ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import Button from '../../shared/button';
import Example from '../../shared/example';

const ITEMS = [...Array(12)].map((_, i) => ({ id: i, text: `Item ${i}` }));

function createItemRow(msg) {
  return (
    <Pressable key={msg.id} style={[styles.item]}>
      <Text style={styles.text}>{msg.text}</Text>
    </Pressable>
  );
}

export default function ScrollViewPage() {
  const [scrollEnabled, setEnabled] = React.useState(true);
  const [horizontal, setHorizontal] = React.useState(false);
  const [throttle, setThrottle] = React.useState(16);
  const [maintainVisibleContentPosition, setMaintainVisibleContentPosition] =
    React.useState(false);
  const [autoscrollToTop, setAutoScrollToTop] = React.useState(false);
  const [items, setItems] = React.useState(ITEMS);
  const scrollRef = React.useRef(null);

  return (
    <Example title="ScrollView">
      <View style={styles.container}>
        <ScrollView
          horizontal={horizontal}
          maintainVisibleContentPosition={
            maintainVisibleContentPosition
              ? {
                  minIndexForVisible: 0,
                  autoscrollToTopThreshold: autoscrollToTop ? 100 : null
                }
              : null
          }
          onScroll={() => {
            console.log('onScroll');
          }}
          ref={scrollRef}
          scrollEnabled={scrollEnabled}
          scrollEventThrottle={throttle}
          style={[styles.scrollView, !scrollEnabled && styles.disabled]}
        >
          {items.map(createItemRow)}
        </ScrollView>

        <View style={styles.buttons}>
          <Button
            onPress={() => {
              setHorizontal((val) => !val);
            }}
            title={horizontal ? 'Vertical' : 'Horizontal'}
          />
          <Button
            onPress={() => {
              setEnabled((val) => !val);
            }}
            title={scrollEnabled ? 'Disable' : 'Enable'}
          />
          <Button
            onPress={() => {
              setThrottle((val) => (val !== 16 ? 16 : 1000));
            }}
            title="Throttle"
          />
          <Button
            onPress={() => {
              scrollRef.current.scrollTo({ y: 0 });
            }}
            title="To start"
          />
          <Button
            onPress={() => {
              scrollRef.current.scrollTo({ y: 50 });
            }}
            title="To 50px"
          />
          <Button
            onPress={() => {
              scrollRef.current.scrollToEnd({ animated: true });
            }}
            title="To end"
          />
          <Button
            onPress={() => {
              setMaintainVisibleContentPosition((val) => !val);
            }}
            title={
              maintainVisibleContentPosition ? 'Disable MVCP' : 'Enable MVCP'
            }
          />
          {maintainVisibleContentPosition && (
            <Button
              onPress={() => {
                setAutoScrollToTop((val) => !val);
              }}
              title={
                autoscrollToTop
                  ? 'Disable auto scroll top'
                  : 'Enable auto scroll top'
              }
            />
          )}
          <Button
            onPress={() => {
              setItems((items) => [
                { id: items[0].id - 1, text: `Item ${items[0].id - 1}` },
                ...items
              ]);
            }}
            title="Add item start"
          />
          <Button
            onPress={() => {
              setItems((items) => [
                ...items,
                {
                  id: items[items.length - 1].id + 1,
                  text: `Item ${items[items.length - 1].id + 1}`
                }
              ]);
            }}
            title="Add item end"
          />
        </View>
      </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch'
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
    gap: '1rem',
    flexWrap: 'wrap',
    marginVertical: '1rem'
  }
});
