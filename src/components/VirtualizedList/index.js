import React, { Component } from "react";
import PropTypes from "prop-types";
import chunk from "lodash/chunk";
import difference from "lodash/difference";
import requestAnimationFrame from "fbjs/lib/requestAnimationFrame";
import invariant from "fbjs/lib/invariant";

import VirtualizedListPropTypes from "./VirtualizedListPropTypes";
import ListPage from "./ListPage";
import View from "../View";

import applyNativeMethods from "../../modules/applyNativeMethods";

const PROP_TYPE_KEYS = Object.keys(VirtualizedListPropTypes);

class VirtualizedList extends Component {
  static propTypes = VirtualizedListPropTypes;

  static defaultProps = {
    horizontal: false,
    initialNumToRender: 100, // number of items per page
    onEndReachedThreshold: 0
  };

  listRef = undefined;
  itemPages = [];
  recalculatingItemPages = false;
  isOnTop = undefined;
  isOnBottom = undefined;
  prevScrollHeight = undefined;
  prevScrollTop = undefined;
  previouslyViewableItems = [];

  constructor(props) {
    super(props);

    invariant(
      (!props.getItem && !props.getItemCount) ||
        (props.getItem && props.getItemCount),
      "You need to specify both getItem and getItemCount."
    );

    this.state = {
      pages: this.chunkData(props.data)
    };
  }

  componentDidMount() {
    this.recalculateItemPages(() => {
      if (this.props.stickToBottom) {
        this.scrollTo(this.props.data.length - 1);
      }

      this.handleScrollEvents();
    });

    this.listRef.addEventListener("scroll", this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.data !== nextProps.data ||
      this.props.data.length !== nextProps.data.length
    ) {
      this.chunkDataAndRecalc(nextProps.data);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    this.prevScrollHeight = this.listRef.scrollHeight;
    this.prevScrollTop = this.listRef.scrollTop;

    this.isOnTop = this.listRef.scrollTop === 0;

    this.isOnBottom =
      this.listRef.scrollTop + this.listRef.clientHeight ===
      this.listRef.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    const { stickToBottom, maintainScrollPosition } = this.props;

    if (stickToBottom) {
      if (maintainScrollPosition) {
        if (this.isOnBottom) {
          this.scrollTo(this.props.data.length - 1);
        } else {
          if (this.listRef.scrollTop !== this.prevScrollTop) {
            this.listRef.scrollTop +=
              this.prevScrollTop - this.listRef.scrollTop;
          } else {
            if (
              this.isOnTop &&
              this.prevScrollHeight < this.listRef.scrollHeight
            ) {
              this.listRef.scrollTop =
                this.listRef.scrollHeight - this.prevScrollHeight;
            }
          }
        }
      } else {
        this.scrollTo(this.props.data.length - 1);
      }
    }
  }

  bindList = element => {
    this.listRef = element.domRef;
  };

  chunkData(data) {
    const { getItem, getItemCount, initialNumToRender } = this.props;

    let passedItems = data;

    if (getItem && getItemCount) {
      passedItems = Array.apply(
        null,
        Array(getItemCount(data))
      ).map((i, index) => getItem(data, index));
    }

    return chunk(passedItems, initialNumToRender).map((items, pageIndex) => {
      return {
        pageIndex,
        items,
        onScreen: true,
        forceOnScreen: false,
        ref: null
      };
    });
  }

  chunkDataAndRecalc(data) {
    this.setState(
      {
        pages: this.chunkData(data)
      },
      this.recalculateItemPages
    );
  }

  handleScroll = () => {
    this.recalculateItemPages(this.handleScrollEvents);
  };

  handleScrollEvents = () => {
    if (this.listRef.scrollTop === 0) {
      if (this.props.onScrollToTop) {
        this.props.onScrollToTop();
      }

      if (this.props.onRefresh) {
        this.props.onRefresh();
      }

      if (this.props.onScrollToTop || this.props.onRefresh) {
        return;
      }
    }

    const isOnBottom =
      this.listRef.scrollTop + this.listRef.clientHeight >=
      this.listRef.scrollHeight - this.props.onEndReachedThreshold;

    if (isOnBottom) {
      if (this.props.onScrollToBottom) {
        this.props.onScrollToBottom();
      }

      if (this.props.onEndReached) {
        this.props.onEndReached({ distanceFromEnd: 0 });
      }
    } else {
      if (this.props.onScroll) {
        this.props.onScroll();
      }
    }
  };

  recalculateItemPages = callback => {
    if (!this.recalculatingItemPages) {
      this.recalculatingItemPages = true;

      requestAnimationFrame(() => {
        let renderNeeded = false;

        const itemListDimensions = this.listRef.getBoundingClientRect();

        for (
          let index = 0, page = this.state.pages[index];
          index < this.state.pages.length;
          index++, (page = this.state.pages[index])
        ) {
          if (page.ref && page.ref.pageRef) {
            const boundingRect = page.ref.pageRef.getBoundingClientRect();

            const isOnScreen =
              boundingRect.bottom > itemListDimensions.top &&
              boundingRect.top < itemListDimensions.bottom;

            if (page.onScreen && !isOnScreen) {
              renderNeeded = true;
            } else if (!page.onScreen && isOnScreen) {
              renderNeeded = true;
            }

            page.onScreen = isOnScreen;
          }
        }

        if (renderNeeded) {
          this.forceUpdate();
        }

        if (this.props.onViewableItemsChanged) {
          const viewableItems = this.calculateItemsOnScreen(
            this.state.pages,
            itemListDimensions
          );

          const changed = difference(
            viewableItems,
            this.previouslyViewableItems
          );

          if (changed.length) {
            this.props.onViewableItemsChanged({
              changed,
              viewableItems
            });

            this.previouslyViewableItems = viewableItems;
          }
        }

        if (callback) {
          callback();
        }

        this.recalculatingItemPages = false;
      });
    }
  };

  calculateItemsOnScreen(pages, listDimensions) {
    return pages.reduce((memo, page) => {
      if (page.onScreen && page.ref) {
        return memo.concat(page.ref.calculateItemsOnScreen(listDimensions));
      }

      return memo;
    }, []);
  }

  assignItemPageRef(index) {
    return element => {
      this.state.pages[index].ref = element;
    };
  }

  scrollToIndex = (index = 0) => {
    const { initialNumToRender } = this.props;

    const pageIndex = Math.floor(index / initialNumToRender);
    const pageItemIndex = index % initialNumToRender;

    const page = this.state.pages[pageIndex];

    if (page) {
      page.ref.scrollTo(pageItemIndex);

      return true;
    } else {
      return false;
    }
  };

  scrollToEnd = () => {
    this.scrollToIndex(this.props.data.length - 1);
  };

  scrollToItem = item => {
    if (this.props.data.indexOf) {
      const index = this.props.data.indexOf(item);

      if (index >= 0) {
        this.scrollToIndex(index);
      }
    }
  };

  scrollToOffset = offset => {
    this.listRef.scrollTop = offset;
  };

  // noop for compatibility with React Native
  recordInteraction() {}

  render() {
    const itemPages = this.state.pages.map(page => {
      const { pageIndex, items, onScreen, forceOnScreen } = page;

      return (
        <ListPage
          key={pageIndex}
          ref={this.assignItemPageRef(pageIndex)}
          index={pageIndex}
          fullData={this.props.data}
          items={items}
          getItemLayout={this.props.getItemLayout}
          keyExtractor={this.props.keyExtractor}
          renderItem={this.props.renderItem}
          shouldItemUpdate={this.props.shouldItemUpdate}
          show={onScreen || forceOnScreen}
        />
      );
    });

    const otherProps = {};

    Object.keys(this.props).forEach(key => {
      if (!PROP_TYPE_KEYS.includes(key)) {
        otherProps[key] = this.props[key];
      }
    });

    return (
      <View {...otherProps} ref={this.bindList}>
        {itemPages}
      </View>
    );
  }
}

module.exports = applyNativeMethods(VirtualizedList);
