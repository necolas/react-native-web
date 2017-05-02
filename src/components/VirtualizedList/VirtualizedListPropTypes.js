import PropTypes from "prop-types";

export default {
  data: PropTypes.arrayOf(PropTypes.any),
  debug: PropTypes.bool, // has no effect on this implementation
  getItem: PropTypes.func,
  getItemCount: PropTypes.func,
  getItemLayout: PropTypes.func,
  horizontal: PropTypes.bool,
  initialNumToRender: PropTypes.number,
  keyExtractor: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
  onEndReached: PropTypes.func,
  onEndReachedThreshold: PropTypes.number,
  onRefresh: PropTypes.func,
  onViewableItemsChanged: PropTypes.func,
  shouldItemUpdate: PropTypes.func,
  onScroll: PropTypes.func,
  onScrollToTop: PropTypes.func,
  onScrollToBottom: PropTypes.func,
  stickToBottom: PropTypes.bool,
  maintainScrollPosition: PropTypes.bool,
  viewabilityConfig: PropTypes.any,
  windowSize: PropTypes.number
};
