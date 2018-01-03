import ListViewDataSource from './ListViewDataSource';
import ScrollView from '../ScrollView';
import { arrayOf, bool, func, instanceOf, number } from 'prop-types';

export default {
  ...ScrollView.propTypes,
  dataSource: instanceOf(ListViewDataSource).isRequired,
  renderSeparator: func,
  renderRow: func.isRequired,
  initialListSize: number,
  onEndReached: func,
  onEndReachedThreshold: number,
  pageSize: number,
  renderFooter: func,
  renderHeader: func,
  renderSectionHeader: func,
  renderScrollComponent: func.isRequired,
  scrollRenderAheadDistance: number,
  onChangeVisibleRows: func,
  removeClippedSubviews: bool,
  stickyHeaderIndices: arrayOf(number)
};
