import React from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import Example from '../../shared/example';

const ITEMS = [...Array(20)].map((_, i) => `Item ${i}`);

function useRefresh() {
  const [count, setCount] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setCount((c) => c + 1);
      setRefreshing(false);
    }, 1500);
  }, []);

  return { count, onRefresh, refreshing };
}

function Item({ onPress, title }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
    >
      <Text>{title}</Text>
    </Pressable>
  );
}

export default function RefreshControlPage() {
  const list = useRefresh();
  const invertedList = useRefresh();
  const scrollView = useRefresh();
  const [lastPress, setLastPress] = React.useState('none');

  const renderItem = ({ item }) => (
    <Item onPress={() => setLastPress(item)} title={item} />
  );

  return (
    <Example title="RefreshControl">
      <Text style={styles.label}>Last press: {lastPress}</Text>

      <Text style={styles.label}>
        FlatList with onRefresh (refreshed {list.count} times)
      </Text>
      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item}
        onRefresh={list.onRefresh}
        refreshing={list.refreshing}
        renderItem={renderItem}
        style={styles.list}
      />

      <Text style={styles.label}>
        Inverted FlatList, pull up from the bottom (refreshed{' '}
        {invertedList.count} times)
      </Text>
      <FlatList
        data={ITEMS}
        inverted
        keyExtractor={(item) => item}
        onRefresh={invertedList.onRefresh}
        refreshing={invertedList.refreshing}
        renderItem={renderItem}
        style={styles.list}
      />

      <Text style={styles.label}>
        ScrollView with custom colors (refreshed {scrollView.count} times)
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={['#F45D22']}
            onRefresh={scrollView.onRefresh}
            progressBackgroundColor="#FFF4E5"
            refreshing={scrollView.refreshing}
            size="large"
          />
        }
        style={styles.list}
      >
        {ITEMS.map((item) => (
          <Item key={item} onPress={() => setLastPress(item)} title={item} />
        ))}
      </ScrollView>
    </Example>
  );
}

const styles = StyleSheet.create({
  item: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 16
  },
  itemPressed: {
    backgroundColor: '#e8f0fe'
  },
  label: {
    marginBottom: 8,
    marginTop: 20
  },
  list: {
    borderColor: '#ccc',
    borderWidth: 1,
    flexGrow: 0,
    height: 180,
    width: 300
  }
});
