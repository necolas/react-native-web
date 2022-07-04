import React from 'react';
import { StyleSheet } from 'react-native';
import Example from '../../shared/example';
import { FlatList, Text, TouchableOpacity, View } from 'react-native-web';

const multiSelectData = ['First', 'Second', 'Third'].map((title, id) => ({
  id,
  title
}));
const minimalData = ['a', 'b', 'c', 'd', 'e'].map((key) => ({ key }));
const pageExamplesData = ['minimal', 'multiSelect'].map((type) => ({ type }));

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? 'red' : 'black';
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={[styles.listItemText, { color: textColor }]}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class MultiSelectList extends React.PureComponent {
  state = { selected: new Map() };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _renderItem = ({ item }) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render() {
    return (
      <FlatList
        data={multiSelectData}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

function renderExampleItem({ item }) {
  switch (item.type) {
    case 'minimal':
      // Example Minimal FlatList, directly from FlatList's own JSDoc details.
      // Appending our own view as a header to keep this example itself tightly matching the JSDoc.
      return (
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleHeaderText}>Minimal FlatList:</Text>
          <FlatList
            data={minimalData}
            renderItem={({ item }) => (
              <Text style={styles.listItemText}>{item.key}</Text>
            )}
          />
        </View>
      );
    case 'multiSelect':
      // Example Multi-Select FlatList, directly from FlatList's own JSDoc details.
      // Appending our own view as a header to keep this example itself tightly matching the JSDoc.
      return (
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleHeaderText}>Multi-Select FlatList:</Text>
          <MultiSelectList />
        </View>
      );
    default:
      throw new Error('Unexpected Item Type');
  }
}

export default function FlatListPage() {
  return (
    <Example title="FlatList">
      <FlatList
        ListFooterComponent={
          <Text style={styles.allExamplesFooter}>
            (Example ListFooterComponent Here)
          </Text>
        }
        ListHeaderComponent={
          <Text style={styles.allExamplesHeader}>
            (Example ListHeaderComponent Here)
          </Text>
        }
        data={pageExamplesData}
        renderItem={renderExampleItem}
      />
    </Example>
  );
}

const styles = StyleSheet.create({
  allExamplesFooter: { fontSize: 22 },
  allExamplesHeader: { fontSize: 22, marginBottom: 20 },
  exampleContainer: { marginBottom: 20 },
  exampleHeaderText: { fontSize: 18, fontWeight: 'bold' },
  listItemText: { fontSize: 16 }
});
