/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root
 * directory of this source tree.
 *
 * @noflow
 */
'use strict';

import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import {
  FooterComponent,
  HeaderComponent,
  ItemComponent,
  PlainInput,
  SeparatorComponent,
  genItemData,
  getItemLayout,
  pressItem,
  renderSmallSwitchOption,
} from './shared';

class MultiColumnExample extends React.PureComponent {
  static title = '<FlatList> - MultiColumn';
  static description = 'Performant, scrollable grid of data.';

  state = {
    data: genItemData(1000),
    filterText: '',
    fixedHeight: true,
    logViewable: false,
    numColumns: 2,
    virtualized: true,
  };
  _onChangeFilterText = (filterText) => {
    this.setState(() => ({ filterText }));
  };
  _onChangeNumColumns = (numColumns) => {
    this.setState(() => ({ numColumns: Number(numColumns) }));
  };
  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = (item) => filterRegex.test(item.text) || filterRegex.test(item.title);
    const filteredData = this.state.data.filter(filter);
    return (
      <View style={styles.container}>
        <View style={styles.searchRow}>
          <View style={styles.row}>
            <PlainInput
              onChangeText={this._onChangeFilterText}
              placeholder="Search..."
              value={this.state.filterText}
            />
            <Text> numColumns: </Text>
            <PlainInput
              clearButtonMode="never"
              onChangeText={this._onChangeNumColumns}
              value={this.state.numColumns ? String(this.state.numColumns) : ''}
            />
          </View>
          <View style={styles.row}>
            {renderSmallSwitchOption(this, 'virtualized')}
            {renderSmallSwitchOption(this, 'fixedHeight')}
            {renderSmallSwitchOption(this, 'logViewable')}
          </View>
        </View>
        <SeparatorComponent />
        <FlatList
          data={filteredData}
          disableVirtualization={!this.state.virtualized}
          getItemLayout={this.state.fixedHeight ? this._getItemLayout : undefined}
          key={this.state.numColumns + (this.state.fixedHeight ? 'f' : 'v')}
          ListFooterComponent={FooterComponent}
          ListHeaderComponent={HeaderComponent}
          numColumns={this.state.numColumns || 1}
          onRefresh={() => console.log('onRefresh: nothing to refresh :P')}
          onViewableItemsChanged={this._onViewableItemsChanged}
          refreshing={false}
          renderItem={this._renderItemComponent}
        />
      </View>
    );
  }
  _getItemLayout(data: any, index: number): { length: number, offset: number, index: number } {
    const length = getItemLayout(data, index).length + 2 * (CARD_MARGIN + BORDER_WIDTH);
    return { length, offset: length * index, index };
  }
  _renderItemComponent = ({ item }) => {
    return (
      <View style={styles.card}>
        <ItemComponent fixedHeight={this.state.fixedHeight} item={item} onPress={this._pressItem} />
      </View>
    );
  };
  // This is called when items change viewability by scrolling into or out of the viewable area.
  _onViewableItemsChanged = (info: {
    changed: Array<{
      key: string,
      isViewable: boolean,
      item: { columns: Array<*> },
      index: ?number,
      section?: any,
    }>,
  }) => {
    // Impressions can be logged here
    if (this.state.logViewable) {
      console.log(
        'onViewableItemsChanged: ',
        info.changed.map((v) => ({ ...v, item: '...' }))
      );
    }
  };
  _pressItem = (key: string) => {
    pressItem(this, key);
  };
}

const CARD_MARGIN = 4;
const BORDER_WIDTH = 1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(239, 239, 244)',
    flex: 1,
  },
  card: {
    margin: CARD_MARGIN,
    borderRadius: 10,
    flex: 1,
    overflow: 'hidden',
    borderColor: 'lightgray',
    borderWidth: BORDER_WIDTH,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchRow: {
    padding: 10,
  },
});

export default function () {
  return (
    <View style={{ height: 300 }}>
      <MultiColumnExample />
    </View>
  );
}
