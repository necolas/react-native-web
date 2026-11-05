import React from 'react';
import { FlatList, StyleSheet, Switch, Text, View } from 'react-native';
import Example from '../../shared/example';

const rows = Array.from({ length: 20 }, (_, i) => ({ key: String(i) }));
const cells = Array.from({ length: 20 }, (_, i) => ({ key: String(i) }));

function Option({ label, value, onValueChange }) {
  return (
    <View style={styles.option}>
      <Switch onValueChange={onValueChange} value={value} />
      <Text style={styles.optionLabel}>{label}</Text>
    </View>
  );
}

export default function NestedListsPage() {
  const [outerInverted, setOuterInverted] = React.useState(true);
  const [innerInverted, setInnerInverted] = React.useState(false);

  const renderRow = ({ item: row }) => {
    if (Number(row.key) % 3 !== 0) {
      return (
        <View style={styles.row}>
          <Text>Row {row.key}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={cells}
        horizontal
        inverted={innerInverted}
        renderItem={({ item: cell }) => (
          <View style={styles.cell}>
            <Text>
              {row.key}.{cell.key}
            </Text>
          </View>
        )}
        style={styles.inner}
      />
    );
  };

  return (
    <Example title="Nested lists">
      <View style={styles.options}>
        <Option
          label="Outer (vertical) inverted"
          onValueChange={setOuterInverted}
          value={outerInverted}
        />
        <Option
          label="Inner (horizontal) inverted"
          onValueChange={setInnerInverted}
          value={innerInverted}
        />
      </View>
      <FlatList
        data={rows}
        extraData={innerInverted}
        inverted={outerInverted}
        renderItem={renderRow}
        style={styles.outer}
      />
    </Example>
  );
}

const styles = StyleSheet.create({
  options: {
    marginVertical: 16
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8
  },
  optionLabel: {
    marginLeft: 8
  },
  outer: {
    borderColor: '#ccc',
    borderWidth: 1,
    height: 400,
    maxWidth: '100%',
    width: 360
  },
  row: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 16
  },
  inner: {
    backgroundColor: '#f5f5f5',
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  cell: {
    alignItems: 'center',
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    height: 60,
    justifyContent: 'center',
    width: 80
  }
});
