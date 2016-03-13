import { NativeMethodsDecorator } from '../../modules/NativeMethodsMixin'
import React, {Component} from 'react'
import ScrollView from '../ScrollView'
import ListViewDataSource from './ListViewDataSource'
import ListViewPropTypes from './ListViewPropTypes'

const SCROLLVIEW_REF = 'listviewscroll'

@NativeMethodsDecorator
export default class ListView extends Component {
  static DataSource = ListViewDataSource;
  static propTypes = ListViewPropTypes;
  static defaultProps = {
    initialListSize: 10,
    pageSize: 1,
    renderScrollComponent: props => <ScrollView {...props} />,
    scrollRenderAheadDistance: 1000,
    onEndReachedThreshold: 1000,
    stickyHeaderIndices: []
  };

  constructor(props) {
    super(props)
    this.state = {
      curRenderedRowsCount: this.props.initialListSize,
      highlightedRow: {}
    }
    this.onRowHighlighted = (sectionId, rowId) => this._onRowHighlighted(sectionId, rowId)
  }

  /* getScrollResponder() {
    return this.refs[SCROLLVIEW_REF] && this.refs[SCROLLVIEW_REF].getScrollResponder()
  }

  scrollTo(...args) {
    return this.refs[SCROLLVIEW_REF] && this.refs[SCROLLVIEW_REF].scrollTo(...args)
  }

  setNativeProps(props) {
    return this.refs[SCROLLVIEW_REF] && this.refs[SCROLLVIEW_REF].setNativeProps(props)
  }*/

  _onRowHighlighted(sectionId, rowId) {
    this.setState({highlightedRow: {sectionId, rowId}})
  }

  render() {
    const dataSource = this.props.dataSource
    // console.log('whoop')
    const header = this.props.renderHeader ? this.props.renderHeader() : undefined
    const footer = this.props.renderFooter ? this.props.renderFooter() : undefined

    // render sections and rows
    const children = []
    const sections = dataSource.rowIdentities
    const renderRow = this.props.renderRow
    const renderSectionHeader = this.props.renderSectionHeader
    const renderSeparator = this.props.renderSeparator
    for (let sectionIdx = 0, sectionCnt = sections.length; sectionIdx < sectionCnt; sectionIdx++) {
      const rows = sections[sectionIdx]
      const sectionId = dataSource.sectionIdentities[sectionIdx]

      // render optional section header
      if (renderSectionHeader) {
        const section = dataSource.getSectionHeaderData(sectionIdx)
        const key = 's_' + sectionId
        const child = <div key={key}>{renderSectionHeader(section, sectionId)}</div>
        children.push(child)
      }

      // render rows
      for (let rowIdx = 0, rowCnt = rows.length; rowIdx < rowCnt; rowIdx++) {
        const rowId = rows[rowIdx]
        const row = dataSource.getRowData(sectionIdx, rowIdx)
        const key = 'r_' + sectionId + '_' + rowId
        const child = <div key={key}>{renderRow(row, sectionId, rowId, this.onRowHighlighted)}</div>
        children.push(child)

        // render optional separator
        if (renderSeparator && ((rowIdx !== rows.length - 1) || (sectionIdx === sections.length - 1))) {
          const adjacentRowHighlighted =
            this.state.highlightedRow.sectionID === sectionId && (
              this.state.highlightedRow.rowID === rowId ||
              this.state.highlightedRow.rowID === rows[rowIdx + 1])
          const separator = renderSeparator(sectionId, rowId, adjacentRowHighlighted)
          children.push(separator)
        }
      }
    }

    const {
      renderScrollComponent,
      ...props
    } = this.props
    return React.cloneElement(renderScrollComponent(props), {
      ref: SCROLLVIEW_REF
    }, header, children, footer)
  }
}
