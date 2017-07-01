import applyNativeMethods from '../../modules/applyNativeMethods';
import ListViewDataSource from './ListViewDataSource';
import ListViewPropTypes from './ListViewPropTypes';
import ScrollView from '../ScrollView';
import StaticRenderer from '../StaticRenderer';
import React, { Component } from 'react';
import isEmpty from 'fbjs/lib/isEmpty';
import requestAnimationFrame from 'fbjs/lib/requestAnimationFrame';

const DEFAULT_PAGE_SIZE = 1;
const DEFAULT_INITIAL_ROWS = 10;
const DEFAULT_SCROLL_RENDER_AHEAD = 1000;
const DEFAULT_END_REACHED_THRESHOLD = 1000;
const DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;

class ListView extends Component {
  static propTypes = ListViewPropTypes;

  static defaultProps = {
    initialListSize: DEFAULT_INITIAL_ROWS,
    pageSize: DEFAULT_PAGE_SIZE,
    renderScrollComponent: props => <ScrollView {...props} />,
    scrollRenderAheadDistance: DEFAULT_SCROLL_RENDER_AHEAD,
    onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
    scrollEventThrottle: DEFAULT_SCROLL_CALLBACK_THROTTLE,
    removeClippedSubviews: true,
    stickyHeaderIndices: []
  };

  static DataSource = ListViewDataSource;

  constructor(props) {
    super(props);
    this.state = {
      curRenderedRowsCount: this.props.initialListSize,
      highlightedRow: {}
    };
    this.onRowHighlighted = (sectionId, rowId) => this._onRowHighlighted(sectionId, rowId);
    this.scrollProperties = {};
  }

  componentWillMount() {
    // this data should never trigger a render pass, so don't put in state
    this.scrollProperties = {
      visibleLength: null,
      contentLength: null,
      offset: 0
    };
    this._childFrames = [];
    this._visibleRows = {};
    this._prevRenderedRowsCount = 0;
    this._sentEndForContentLength = null;
  }

  componentDidMount() {
    // do this in animation frame until componentDidMount actually runs after
    // the component is laid out
    requestAnimationFrame(() => {
      this._measureAndUpdateScrollProps();
    });
  }

  componentWillReceiveProps(nextProps: Object) {
    if (
      this.props.dataSource !== nextProps.dataSource ||
      this.props.initialListSize !== nextProps.initialListSize
    ) {
      this.setState(
        (state, props) => {
          this._prevRenderedRowsCount = 0;
          return {
            curRenderedRowsCount: Math.min(
              Math.max(state.curRenderedRowsCount, props.initialListSize),
              props.enableEmptySections
                ? props.dataSource.getRowAndSectionCount()
                : props.dataSource.getRowCount()
            )
          };
        },
        () => this._renderMoreRowsIfNeeded()
      );
    }
  }

  componentDidUpdate() {
    requestAnimationFrame(() => {
      this._measureAndUpdateScrollProps();
    });
  }

  getScrollResponder() {
    return this._scrollViewRef && this._scrollViewRef.getScrollResponder();
  }

  scrollTo(...args) {
    return this._scrollViewRef && this._scrollViewRef.scrollTo(...args);
  }

  setNativeProps(props) {
    return this._scrollViewRef && this._scrollViewRef.setNativeProps(props);
  }

  _onRowHighlighted = (sectionId, rowId) => {
    this.setState({ highlightedRow: { sectionId, rowId } });
  };

  renderSectionHeaderFn = (data, sectionID) => {
    return () => this.props.renderSectionHeader(data, sectionID);
  };

  renderRowFn = (data, sectionID, rowID) => {
    return () => this.props.renderRow(data, sectionID, rowID, this._onRowHighlighted);
  };

  render() {
    const children = [];

    const {
      dataSource,
      enableEmptySections,
      renderFooter,
      renderHeader,
      renderScrollComponent,
      renderSectionHeader,
      renderSeparator,
      /* eslint-disable */
      initialListSize,
      onChangeVisibleRows,
      onEndReached,
      onEndReachedThreshold,
      onKeyboardDidHide,
      onKeyboardDidShow,
      onKeyboardWillHide,
      onKeyboardWillShow,
      pageSize,
      renderRow,
      scrollRenderAheadDistance,
      stickyHeaderIndices,
      /* eslint-enable */
      ...scrollProps
    } = this.props;

    const allRowIDs = dataSource.rowIdentities;
    let rowCount = 0;
    const sectionHeaderIndices = [];

    const header = renderHeader && renderHeader();
    const footer = renderFooter && renderFooter();
    let totalIndex = header ? 1 : 0;

    for (let sectionIdx = 0; sectionIdx < allRowIDs.length; sectionIdx++) {
      const sectionID = dataSource.sectionIdentities[sectionIdx];
      const rowIDs = allRowIDs[sectionIdx];
      if (rowIDs.length === 0) {
        if (enableEmptySections === undefined) {
          const warning = require('fbjs/lib/warning');
          warning(
            false,
            'In next release empty section headers will be rendered.' +
              " In this release you can use 'enableEmptySections' flag to render empty section headers."
          );
          continue;
        } else {
          const invariant = require('fbjs/lib/invariant');
          invariant(
            enableEmptySections,
            "In next release 'enableEmptySections' flag will be deprecated," +
              ' empty section headers will always be rendered. If empty section headers' +
              ' are not desirable their indices should be excluded from sectionIDs object.' +
              " In this release 'enableEmptySections' may only have value 'true'" +
              ' to allow empty section headers rendering.'
          );
        }
      }

      if (renderSectionHeader) {
        const shouldUpdateHeader =
          rowCount >= this._prevRenderedRowsCount &&
          dataSource.sectionHeaderShouldUpdate(sectionIdx);
        children.push(
          <StaticRenderer
            key={`s_${sectionID}`}
            render={this.renderSectionHeaderFn(
              dataSource.getSectionHeaderData(sectionIdx),
              sectionID
            )}
            shouldUpdate={!!shouldUpdateHeader}
          />
        );
        sectionHeaderIndices.push(totalIndex++);
      }

      for (let rowIdx = 0; rowIdx < rowIDs.length; rowIdx++) {
        const rowID = rowIDs[rowIdx];
        const comboID = `${sectionID}_${rowID}`;
        const shouldUpdateRow =
          rowCount >= this._prevRenderedRowsCount && dataSource.rowShouldUpdate(sectionIdx, rowIdx);
        const row = (
          <StaticRenderer
            key={`r_${comboID}`}
            render={this.renderRowFn(dataSource.getRowData(sectionIdx, rowIdx), sectionID, rowID)}
            shouldUpdate={!!shouldUpdateRow}
          />
        );
        children.push(row);
        totalIndex++;

        if (
          renderSeparator &&
          (rowIdx !== rowIDs.length - 1 || sectionIdx === allRowIDs.length - 1)
        ) {
          const adjacentRowHighlighted =
            this.state.highlightedRow.sectionID === sectionID &&
            (this.state.highlightedRow.rowID === rowID ||
              this.state.highlightedRow.rowID === rowIDs[rowIdx + 1]);
          const separator = renderSeparator(sectionID, rowID, adjacentRowHighlighted);
          if (separator) {
            children.push(separator);
            totalIndex++;
          }
        }
        if (++rowCount === this.state.curRenderedRowsCount) {
          break;
        }
      }
      if (rowCount >= this.state.curRenderedRowsCount) {
        break;
      }
    }
    scrollProps.onScroll = this._onScroll;

    return React.cloneElement(
      renderScrollComponent(scrollProps),
      {
        ref: this._setScrollViewRef,
        onContentSizeChange: this._onContentSizeChange,
        onLayout: this._onLayout
      },
      header,
      children,
      footer
    );
  }

  _measureAndUpdateScrollProps() {
    const scrollComponent = this.getScrollResponder();
    if (!scrollComponent || !scrollComponent.getInnerViewNode) {
      return;
    }

    this._updateVisibleRows();
  }

  _onLayout = (event: Object) => {
    const { width, height } = event.nativeEvent.layout;
    const visibleLength = !this.props.horizontal ? height : width;
    if (visibleLength !== this.scrollProperties.visibleLength) {
      this.scrollProperties.visibleLength = visibleLength;
      this._updateVisibleRows();
      this._renderMoreRowsIfNeeded();
    }
    this.props.onLayout && this.props.onLayout(event);
  };

  _updateVisibleRows(updatedFrames?: Array<Object>) {
    if (!this.props.onChangeVisibleRows) {
      return; // No need to compute visible rows if there is no callback
    }
    if (updatedFrames) {
      updatedFrames.forEach(newFrame => {
        this._childFrames[newFrame.index] = Object.assign({}, newFrame);
      });
    }
    const isVertical = !this.props.horizontal;
    const dataSource = this.props.dataSource;
    const visibleMin = this.scrollProperties.offset;
    const visibleMax = visibleMin + this.scrollProperties.visibleLength;
    const allRowIDs = dataSource.rowIdentities;

    const header = this.props.renderHeader && this.props.renderHeader();
    let totalIndex = header ? 1 : 0;
    let visibilityChanged = false;
    const changedRows = {};
    for (let sectionIdx = 0; sectionIdx < allRowIDs.length; sectionIdx++) {
      const rowIDs = allRowIDs[sectionIdx];
      if (rowIDs.length === 0) {
        continue;
      }
      const sectionID = dataSource.sectionIdentities[sectionIdx];
      if (this.props.renderSectionHeader) {
        totalIndex++;
      }
      let visibleSection = this._visibleRows[sectionID];
      if (!visibleSection) {
        visibleSection = {};
      }
      for (let rowIdx = 0; rowIdx < rowIDs.length; rowIdx++) {
        const rowID = rowIDs[rowIdx];
        const frame = this._childFrames[totalIndex];
        totalIndex++;
        if (
          this.props.renderSeparator &&
          (rowIdx !== rowIDs.length - 1 || sectionIdx === allRowIDs.length - 1)
        ) {
          totalIndex++;
        }
        if (!frame) {
          break;
        }
        const rowVisible = visibleSection[rowID];
        const min = isVertical ? frame.y : frame.x;
        const max = min + (isVertical ? frame.height : frame.width);
        if ((!min && !max) || min === max) {
          break;
        }
        if (min > visibleMax || max < visibleMin) {
          if (rowVisible) {
            visibilityChanged = true;
            delete visibleSection[rowID];
            if (!changedRows[sectionID]) {
              changedRows[sectionID] = {};
            }
            changedRows[sectionID][rowID] = false;
          }
        } else if (!rowVisible) {
          visibilityChanged = true;
          visibleSection[rowID] = true;
          if (!changedRows[sectionID]) {
            changedRows[sectionID] = {};
          }
          changedRows[sectionID][rowID] = true;
        }
      }
      if (!isEmpty(visibleSection)) {
        this._visibleRows[sectionID] = visibleSection;
      } else if (this._visibleRows[sectionID]) {
        delete this._visibleRows[sectionID];
      }
    }
    visibilityChanged && this.props.onChangeVisibleRows(this._visibleRows, changedRows);
  }

  _onContentSizeChange = (width: number, height: number) => {
    const contentLength = !this.props.horizontal ? height : width;
    if (contentLength !== this.scrollProperties.contentLength) {
      this.scrollProperties.contentLength = contentLength;
      this._updateVisibleRows();
      this._renderMoreRowsIfNeeded();
    }
    this.props.onContentSizeChange && this.props.onContentSizeChange(width, height);
  };

  _getDistanceFromEnd(scrollProperties: Object) {
    return (
      scrollProperties.contentLength - scrollProperties.visibleLength - scrollProperties.offset
    );
  }

  _maybeCallOnEndReached(event?: Object) {
    if (
      this.props.onEndReached &&
      this.scrollProperties.contentLength !== this._sentEndForContentLength &&
      this._getDistanceFromEnd(this.scrollProperties) < this.props.onEndReachedThreshold &&
      this.state.curRenderedRowsCount ===
        (this.props.enableEmptySections
          ? this.props.dataSource.getRowAndSectionCount()
          : this.props.dataSource.getRowCount())
    ) {
      this._sentEndForContentLength = this.scrollProperties.contentLength;
      this.props.onEndReached(event);
      return true;
    }
    return false;
  }

  _renderMoreRowsIfNeeded() {
    if (
      this.scrollProperties.contentLength === null ||
      this.scrollProperties.visibleLength === null ||
      this.state.curRenderedRowsCount ===
        (this.props.enableEmptySections
          ? this.props.dataSource.getRowAndSectionCount()
          : this.props.dataSource.getRowCount())
    ) {
      this._maybeCallOnEndReached();
      return;
    }

    const distanceFromEnd = this._getDistanceFromEnd(this.scrollProperties);
    if (distanceFromEnd < this.props.scrollRenderAheadDistance) {
      this._pageInNewRows();
    }
  }

  _pageInNewRows() {
    this.setState(
      (state, props) => {
        const rowsToRender = Math.min(
          state.curRenderedRowsCount + props.pageSize,
          props.enableEmptySections
            ? props.dataSource.getRowAndSectionCount()
            : props.dataSource.getRowCount()
        );
        this._prevRenderedRowsCount = state.curRenderedRowsCount;
        return {
          curRenderedRowsCount: rowsToRender
        };
      },
      () => {
        this._measureAndUpdateScrollProps();
        this._prevRenderedRowsCount = this.state.curRenderedRowsCount;
      }
    );
  }

  _onScroll = (e: Object) => {
    const isVertical = !this.props.horizontal;
    this.scrollProperties.visibleLength =
      e.nativeEvent.layoutMeasurement[isVertical ? 'height' : 'width'];
    this.scrollProperties.contentLength =
      e.nativeEvent.contentSize[isVertical ? 'height' : 'width'];
    this.scrollProperties.offset = e.nativeEvent.contentOffset[isVertical ? 'y' : 'x'];
    this._updateVisibleRows(e.nativeEvent.updatedChildFrames);
    if (!this._maybeCallOnEndReached(e)) {
      this._renderMoreRowsIfNeeded();
    }

    if (
      this.props.onEndReached &&
      this._getDistanceFromEnd(this.scrollProperties) > this.props.onEndReachedThreshold
    ) {
      // Scrolled out of the end zone, so it should be able to trigger again.
      this._sentEndForContentLength = null;
    }

    this.props.onScroll && this.props.onScroll(e);
  };

  _setScrollViewRef = component => {
    this._scrollViewRef = component;
  };
}

export default applyNativeMethods(ListView);
