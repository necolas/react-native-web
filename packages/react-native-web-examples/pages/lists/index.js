/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */
'use strict';

import * as React from 'react';
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Switch,
  TouchableHighlight,
  Text,
  TextInput,
  View
} from 'react-native';
import Example from '../../shared/example';

type Item = {
  title: string,
  text: string,
  key: string,
  pressed: boolean,
  noImage?: ?boolean
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HEADER = { height: 30, width: 100 };
const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;
const HORIZ_WIDTH = 200;
const ITEM_HEIGHT = 72;
const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true
};
const THUMB_URLS = [
  './lists/like.png',
  './lists/dislike.png',
  './lists/call.png',
  './lists/fist.png',
  './lists/bandaged.png',
  './lists/flowers.png',
  './lists/heart.png',
  './lists/liking.png',
  './lists/party.png',
  './lists/poke.png',
  './lists/superlike.png',
  './lists/victory.png'
];
const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix ' +
  'civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id ' +
  'integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem ' +
  'vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud ' +
  'modus, putant invidunt reprehendunt ne qui.';

function genItemData(count: number, start: number = 0): Array<Item> {
  const dataBlob = [];
  for (let ii = start; ii < count + start; ii++) {
    const itemHash = Math.abs(hashCode('Item ' + ii));
    dataBlob.push({
      title: 'Item ' + ii,
      text: LOREM_IPSUM.substr(0, (itemHash % 301) + 20),
      key: String(ii),
      pressed: false
    });
  }
  return dataBlob;
}

class ItemComponent extends React.PureComponent<{
  fixedHeight?: ?boolean,
  horizontal?: ?boolean,
  item: Item,
  onPress: (key: string) => void,
  onShowUnderlay?: () => void,
  onHideUnderlay?: () => void
}> {
  _onPress = () => {
    this.props.onPress(this.props.item.key);
  };
  render() {
    const { fixedHeight, horizontal, item } = this.props;
    const itemHash = Math.abs(hashCode(item.title));
    const imgSource = THUMB_URLS[itemHash % THUMB_URLS.length];
    return (
      <TouchableHighlight
        onHideUnderlay={this.props.onHideUnderlay}
        onPress={this._onPress}
        onShowUnderlay={this.props.onShowUnderlay}
        style={horizontal ? styles.horizItem : styles.item}
        tvParallaxProperties={{
          pressMagnification: 1.1
        }}
      >
        <View
          style={[
            styles.row,
            horizontal && { width: HORIZ_WIDTH },
            fixedHeight && { height: ITEM_HEIGHT }
          ]}
        >
          {!item.noImage && <Image source={imgSource} style={styles.thumb} />}
          <Text
            numberOfLines={horizontal || fixedHeight ? 3 : undefined}
            style={styles.text}
          >
            {item.title} - {item.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class FooterComponent extends React.PureComponent<{}> {
  render() {
    return (
      <View style={styles.headerFooterContainer}>
        <SeparatorComponent />
        <View style={styles.headerFooter}>
          <Text>LIST FOOTER</Text>
        </View>
      </View>
    );
  }
}

class HeaderComponent extends React.PureComponent<{}> {
  render() {
    return (
      <View style={styles.headerFooterContainer}>
        <View style={styles.headerFooter}>
          <Text>LIST HEADER</Text>
        </View>
        <SeparatorComponent />
      </View>
    );
  }
}

class SeparatorComponent extends React.PureComponent<{}> {
  render() {
    return <View style={styles.separator} />;
  }
}

class ItemSeparatorComponent extends React.PureComponent<{}> {
  render() {
    const style = this.props.highlighted
      ? [
          styles.itemSeparator,
          { marginLeft: 0, backgroundColor: 'rgb(217, 217, 217)' }
        ]
      : styles.itemSeparator;
    return <View style={style} />;
  }
}

class Spindicator extends React.PureComponent<{}> {
  render() {
    return (
      <Animated.View
        style={[
          styles.spindicator,
          {
            transform: [
              {
                rotate: this.props.value.interpolate({
                  inputRange: [0, 5000],
                  outputRange: ['0deg', '360deg'],
                  extrapolate: 'extend'
                })
              }
            ]
          }
        ]}
      />
    );
  }
}

function hashCode(str: string): number {
  let hash = 15;
  for (let ii = str.length - 1; ii >= 0; ii--) {
    hash = (hash << 5) - hash + str.charCodeAt(ii);
  }
  return hash;
}

function getItemLayout(data: any, index: number, horizontal?: boolean) {
  const [length, separator, header] = horizontal
    ? [HORIZ_WIDTH, 0, HEADER.width]
    : [ITEM_HEIGHT, SEPARATOR_HEIGHT, HEADER.height];
  return { length, offset: (length + separator) * index + header, index };
}

function pressItem(context: Object, key: string) {
  const index = Number(key);
  const pressed = !context.state.data[index].pressed;
  context.setState((state) => {
    const newData = [...state.data];
    newData[index] = {
      ...state.data[index],
      pressed,
      title: 'Item ' + key + (pressed ? ' (pressed)' : '')
    };
    return { data: newData };
  });
}

function renderSmallSwitchOption(context: Object, key: string) {
  return (
    <View style={styles.option}>
      <Text>{key}:</Text>
      <Switch
        onValueChange={(value) => context.setState({ [key]: value })}
        style={styles.smallSwitch}
        value={context.state[key]}
      />
    </View>
  );
}

function PlainInput(props: Object) {
  return (
    <TextInput
      autoCapitalize="none"
      autoCorrect={false}
      clearButtonMode="always"
      style={styles.searchTextInput}
      underlineColorAndroid="transparent"
      {...props}
    />
  );
}

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

  _onChangeFilterText = (filterText) => {
    this.setState({ filterText });
  };

  _onChangeScrollToIndex = (text) => {
    this._listRef
      .getNode()
      .scrollToIndex({ viewPosition: 0.5, index: Number(text) });
  };

  _scrollPos = new Animated.Value(0);
  _scrollSinkX = Animated.event(
    [{ nativeEvent: { contentOffset: { x: this._scrollPos } } }],
    {
      useNativeDriver: true
    }
  );
  _scrollSinkY = Animated.event(
    [{ nativeEvent: { contentOffset: { y: this._scrollPos } } }],
    {
      useNativeDriver: true
    }
  );

  componentDidUpdate() {
    this._listRef.getNode().recordInteraction(); // e.g. flipping logViewable switch
  }

  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = (item) =>
      filterRegex.test(item.text) || filterRegex.test(item.title);
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
            <PlainInput
              onChangeText={this._onChangeScrollToIndex}
              placeholder="scrollToIndex..."
            />
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
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={FooterComponent}
          ListHeaderComponent={<HeaderComponent />}
          contentContainerStyle={styles.list}
          data={filteredData}
          debug={this.state.debug}
          disableVirtualization={!this.state.virtualized}
          getItemLayout={
            this.state.fixedHeight ? this._getItemLayout : undefined
          }
          horizontal={this.state.horizontal}
          inverted={this.state.inverted}
          key={
            (this.state.horizontal ? 'h' : 'v') +
            (this.state.fixedHeight ? 'f' : 'd')
          }
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          legacyImplementation={false}
          numColumns={1}
          onEndReached={this._onEndReached}
          onRefresh={this._onRefresh}
          onScroll={
            this.state.horizontal ? this._scrollSinkX : this._scrollSinkY
          }
          onViewableItemsChanged={this._onViewableItemsChanged}
          ref={this._captureRef}
          refreshing={false}
          renderItem={this._renderItemComponent}
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      </View>
    );
  }
  _captureRef = (ref) => {
    this._listRef = ref;
  };
  _getItemLayout = (data: any, index: number) => {
    return getItemLayout(data, index, this.state.horizontal);
  };
  _onEndReached = () => {
    if (this.state.data.length >= 1000) {
      return;
    }
    this.setState((state) => ({
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
      console.log(
        'onViewableItemsChanged: ',
        info.changed.map((v) => ({ ...v, item: '...' }))
      );
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
    padding: 10
  },
  headerFooter: {
    ...HEADER,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerFooterContainer: {
    backgroundColor: 'rgb(239, 239, 244)'
  },
  horizItem: {
    alignSelf: 'flex-start' // Necessary for touch highlight
  },
  item: {
    flex: 1
  },
  itemSeparator: {
    height: SEPARATOR_HEIGHT,
    backgroundColor: 'rgb(200, 199, 204)',
    marginLeft: 60
  },
  option: {
    flexDirection: 'row',
    padding: 8,
    paddingLeft: 0,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white'
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
    paddingVertical: 0,
    height: 26,
    fontSize: 14,
    flexGrow: 1
  },
  separator: {
    height: SEPARATOR_HEIGHT,
    backgroundColor: 'rgb(200, 199, 204)'
  },
  smallSwitch: {
    top: 1,
    margin: -6,
    transform: [{ scale: 0.7 }]
  },
  stacked: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10
  },
  thumb: {
    width: 50,
    height: 50,
    left: -5
  },
  spindicator: {
    marginLeft: 'auto',
    marginTop: 8,
    width: 2,
    height: 16,
    backgroundColor: 'darkgray'
  },
  stackedText: {
    padding: 4,
    fontSize: 18
  },
  text: {
    flex: 1
  }
});

export default function ListsPage() {
  return (
    <Example title="Lists">
      <SingleColumnExample />
    </Example>
  );
}
