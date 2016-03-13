import { PropTypes } from 'react'
import ScrollView from '../ScrollView'
import ListViewDataSource from './ListViewDataSource'

export default {
  ...ScrollView.propTypes,
  dataSource: PropTypes.instanceOf(ListViewDataSource).isRequired,
  renderSeparator: PropTypes.func,
  renderRow: PropTypes.func.isRequired,
  initialListSize: PropTypes.number,
  onEndReached: PropTypes.func,
  onEndReachedThreshold: PropTypes.number,
  pageSize: PropTypes.number,
  renderFooter: PropTypes.func,
  renderHeader: PropTypes.func,
  renderSectionHeader: PropTypes.func,
  renderScrollComponent: PropTypes.func.isRequired,
  scrollRenderAheadDistance: PropTypes.number,
  onChangeVisibleRows: PropTypes.func,
  removeClippedSubviews: PropTypes.bool,
  stickyHeaderIndices: PropTypes.arrayOf(PropTypes.number)
}
