import React, { Component } from "react";
import flatten from "lodash/flatten";
import VirtualizedList from "../VirtualizedList";
import VirtualizedListPropTypes
  from "../VirtualizedList/VirtualizedListPropTypes";

import FlatListPropTypes from './FlatListPropTypes'

import applyNativeMethods from "../../modules/applyNativeMethods";

const FLAT_LIST_PROP_KEYS = Object.keys(FlatListPropTypes)

function constructData(props) {
  const {
    ItemSeparatorComponent,
    ListFooterComponent,
    ListHeaderComponent,
    data
  } = props;

  let newData;

  if (ItemSeparatorComponent) {
    newData = flatten(
      data.map((item, index) => {
        if (index < data.length - 1) {
          return [item, ItemSeparatorComponent];
        }
        return item;
      })
    );
  } else {
    newData = [...data];
  }

  if (ListHeaderComponent) {
    newData.unshift(ListHeaderComponent);
  }

  if (ListFooterComponent) {
    newData.push(ListFooterComponent);
  }

  return newData;
}

class FlatList extends Component {
  static propTypes = {
    ...VirtualizedListPropTypes,
    ...FlatListPropTypes
  };

  state = {
    data: []
  };

  listRef = undefined

  constructor(props) {
    super(props);

    this.state = {
      data: constructData(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: constructData(nextProps)
    });
  }

  bindList = (element) => {
    this.listRef = element
  }

  renderItem = (info) => {
    const {
      ItemSeparatorComponent,
      ListFooterComponent,
      ListHeaderComponent,
      renderItem
    } = this.props;

    switch (info.item) {
      case ItemSeparatorComponent:
        return <ItemSeparatorComponent />;
      case ListFooterComponent:
        return <ListFooterComponent />;
      case ListHeaderComponent:
        return <ListHeaderComponent />;
      default:
        return renderItem(info);
    }
  };

  scrollToEnd = () => {
    if (this.listRef) {
      return this.listRef.scrollToEnd()
    }
  }

  scrollToIndex = (index) => {
    if (this.listRef) {
      return this.listRef.scrollToIndex(index)
    }
  }

  scrollToItem = (item) => {
    if (this.listRef) {
      return this.listRef.scrollToItem(item)
    }
  }

  scrollToOffset = (offset) => {
    if (this.listRef) {
      return this.listRef.scrollToOffset(offset)
    }
  }

  recordInteraction = (...args) => {
    if (this.listRef) {
      return this.listRef.recordInteraction(...args)
    }
  }


  render() {
    const passedProps = {}

    Object.keys(this.props).forEach((key) => {
      if (!FLAT_LIST_PROP_KEYS.includes(key)) {
        passedProps[key] = this.props[key]
      }
    })

    return (
      <VirtualizedList
        {...passedProps}
        ref={this.bindList}
        data={this.state.data}
        renderItem={this.renderItem}
      />
    );
  }
}

module.exports = applyNativeMethods(FlatList);
