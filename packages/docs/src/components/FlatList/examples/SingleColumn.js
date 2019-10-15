/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

import React from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';

import {
  FooterComponent,
  HeaderComponent,
  ItemComponent,
  ItemSeparatorComponent,
  PlainInput,
  SeparatorComponent,
  Spindicator,
  genItemData,
  getItemLayout,
  pressItem,
  renderSmallSwitchOption
} from './shared';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true
};

class SingleColumnExample extends React.PureComponent {
  static title = '<FlatList>';
  static description = 'Performant, scrollable list of data.';

  state = {
    data: genItemData(100),
    debug: false,
    horizontal: false,
    inverted: false,
    filterText: '',
    fixedHeight: true,
    logViewable: false,
    virtualized: true
  };

  _onChangeFilterText = filterText => {
    this.setState({ filterText });
  };

  _onChangeScrollToIndex = text => {
    this._listRef.getNode().scrollToIndex({ viewPosition: 0.5, index: Number(text) });
  };

  _scrollPos = new Animated.Value(0);
  _scrollSinkX = Animated.event([{ nativeEvent: { contentOffset: { x: this._scrollPos } } }], {
    useNativeDriver: true
  });
  _scrollSinkY = Animated.event([{ nativeEvent: { contentOffset: { y: this._scrollPos } } }], {
    useNativeDriver: true
  });

  componentDidUpdate() {
    this._listRef.getNode().recordInteraction(); // e.g. flipping logViewable switch
  }

  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = item => filterRegex.test(item.text) || filterRegex.test(item.title);
    const filteredData = this.state.data.filter(filter);
    return (
      <View style={styles.container}>
        <View style={styles.searchRow}>
          <View style={styles.options}>
            <PlainInput
              onChangeText={this._onChangeFilterText}
              placeholder="Search..."
              value={this.state.filterText}
            />
            <PlainInput onChangeText={this._onChangeScrollToIndex} placeholder="scrollToIndex..." />
          </View>
          <View style={styles.options}>
            {renderSmallSwitchOption(this, 'virtualized')}
            {renderSmallSwitchOption(this, 'horizontal')}
            {renderSmallSwitchOption(this, 'fixedHeight')}
            {renderSmallSwitchOption(this, 'logViewable')}
            {renderSmallSwitchOption(this, 'inverted')}
            {renderSmallSwitchOption(this, 'debug')}
            <Spindicator value={this._scrollPos} />
          </View>
        </View>
        <SeparatorComponent />
        <AnimatedFlatList
          contentContainerStyle={styles.list}
          data={filteredData}
          debug={this.state.debug}
          disableVirtualization={!this.state.virtualized}
          getItemLayout={this.state.fixedHeight ? this._getItemLayout : undefined}
          horizontal={this.state.horizontal}
          inverted={this.state.inverted}
          ItemSeparatorComponent={ItemSeparatorComponent}
          key={(this.state.horizontal ? 'h' : 'v') + (this.state.fixedHeight ? 'f' : 'd')}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          legacyImplementation={false}
          ListFooterComponent={FooterComponent}
          ListHeaderComponent={<HeaderComponent />}
          numColumns={1}
          onEndReached={this._onEndReached}
          onRefresh={this._onRefresh}
          onScroll={this.state.horizontal ? this._scrollSinkX : this._scrollSinkY}
          onViewableItemsChanged={this._onViewableItemsChanged}
          ref={this._captureRef}
          refreshing={false}
          renderItem={this._renderItemComponent}
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      </View>
    );
  }
  _captureRef = ref => {
    this._listRef = ref;
  };
  _getItemLayout = (data: any, index: number) => {
    return getItemLayout(data, index, this.state.horizontal);
  };
  _onEndReached = () => {
    if (this.state.data.length >= 1000) {
      return;
    }
    this.setState(state => ({
      data: state.data.concat(genItemData(100, state.data.length))
    }));
  };
  _onRefresh = () => console.log('onRefresh: nothing to refresh :P');
  _renderItemComponent = ({ item, separators }) => {
    return (
      <ItemComponent
        fixedHeight={this.state.fixedHeight}
        horizontal={this.state.horizontal}
        item={item}
        onHideUnderlay={separators.unhighlight}
        onPress={this._pressItem}
        onShowUnderlay={separators.highlight}
      />
    );
  };
  // This is called when items change viewability by scrolling into or out of
  // the viewable area.
  _onViewableItemsChanged = (info: {
    changed: Array<{
      key: string,
      isViewable: boolean,
      item: any,
      index: ?number,
      section?: any
    }>
  }) => {
    // Impressions can be logged here
    if (this.state.logViewable) {
      console.log('onViewableItemsChanged: ', info.changed.map(v => ({ ...v, item: '...' })));
    }
  };
  _pressItem = (key: string) => {
    this._listRef.getNode().recordInteraction();
    pressItem(this, key);
  };
  _listRef: AnimatedFlatList;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(239, 239, 244)',
    flex: 1
  },
  list: {
    backgroundColor: 'white'
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  searchRow: {
    paddingHorizontal: 10
  }
});

export default function() {
  return (
    <View style={{ height: 300 }}>
      <SingleColumnExample />
    </View>
  );
}
