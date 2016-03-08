import invariant from 'fbjs/lib/invariant'

export default class ListViewDataSource {
  constructor(params) {
    invariant(
      params && typeof params.rowHasChanged === 'function',
      'Must provide a rowHasChanged function.'
    )
    this._rowHasChanged = params.rowHasChanged
    this._sectionHeaderHasChanged = params.sectionHeaderHasChanged
    this._getRowData = params.getRowData || defaultGetRowData
    this._getSectionHeaderData = params.getSectionHeaderData || defaultGetSectionHeaderData

    this._dataBlob = null
    this._dirtyRows = []
    this._dirtySections = []
    this._cachedRowCount = 0

    this.rowIdentities = []
    this.sectionIdentities = []
  }

  cloneWithRows(dataBlob, rowIdentities) {
    const rowIds = rowIdentities ? [rowIdentities] : null
    this._sectionHeaderHasChanged = this._sectionHeaderHasChanged || defaultSectionHeaderHasChanged
    return this.cloneWithRowsAndSections({s1: dataBlob}, ['s1'], rowIds)
  }

  cloneWithRowsAndSections(dataBlob, sectionIdentities, rowIdentities) {
    invariant(
      typeof this._sectionHeaderHasChanged === 'function',
      'Must provide a sectionHeaderHasChanged function with section data.'
    )
    const newSource = new ListViewDataSource({
      getRowData: this._getRowData,
      getSectionHeaderData: this._getSectionHeaderData,
      rowHasChanged: this._rowHasChanged,
      sectionHeaderHasChanged: this._sectionHeaderHasChanged
    })
    newSource._dataBlob = dataBlob
    newSource.sectionIdentities = sectionIdentities || Object.keys(dataBlob)
    if (rowIdentities) {
      newSource.rowIdentities = rowIdentities
    } else {
      newSource.rowIdentities = []
      newSource.sectionIdentities.forEach((sectionID) => {
        newSource.rowIdentities.push(Object.keys(dataBlob[sectionID]))
      })
    }
    newSource._cachedRowCount = countRows(newSource.rowIdentities)

    calculateDirtyArrays.call(newSource,
      this._dataBlob,
      this.sectionIdentities,
      this.rowIdentities
    )

    return newSource
  }

  getRowCount() {
    return this._cachedRowCount
  }

  rowShouldUpdate(sectionIndex, rowIndex) {
    return this._dirtyRows[sectionIndex][rowIndex]
  }

  getRowData(sectionIndex, rowIndex) {
    const sectionID = this.sectionIdentities[sectionIndex]
    const rowID = this.rowIdentities[sectionIndex][rowIndex]
    return this._getRowData(this._dataBlob, sectionID, rowID)
  }

  getRowIDForFlatIndex(index) {
    let accessIndex = index
    for (let i = 0, n = this.sectionIdentities.length; i < n; i++) {
      if (accessIndex >= this.rowIdentities[i].length) {
        accessIndex -= this.rowIdentities[i].length
      } else {
        return this.rowIdentities[i][accessIndex]
      }
    }
    return null
  }

  getSectionIDForFlatIndex(index) {
    let accessIndex = index
    for (let i = 0, n = this.sectionIdentities.length; i < n; i++) {
      if (accessIndex >= this.rowIdentities[i].length) {
        accessIndex -= this.rowIdentities[i].length
      } else {
        return this.sectionIdentities[i]
      }
    }
    return null
  }

  getSectionLengths() {
    const results = []
    for (let i = 0, n = this.sectionIdentities.length; i < n; i++) {
      results.push(this.rowIdentities[i].length)
    }
    return results
  }

  sectionHeaderShouldUpdate(sectionIndex) {
    return this._dirtySections[sectionIndex]
  }

  getSectionHeaderData(sectionIndex) {
    if (!this._getSectionHeaderData) {
      return null
    }
    const sectionID = this.sectionIdentities[sectionIndex]
    return this._getSectionHeaderData(this._dataBlob, sectionID)
  }
}

function calculateDirtyArrays(prevDataBlob, prevSectionIDs, prevRowIDs) {
  // construct a hashmap of the existing (old) id arrays
  const prevSectionsHash = keyedDictionaryFromArray(prevSectionIDs)
  const prevRowsHash = {}
  for (let i = 0, n = prevRowIDs.length; i < n; i++) {
    const sectionID = prevSectionIDs[i]
    prevRowsHash[sectionID] = keyedDictionaryFromArray(prevRowIDs[i])
  }

  // compare the 2 identity array and get the dirtied rows
  this._dirtySections = []
  this._dirtyRows = []

  let dirty
  const sectionHeaderHasChanged = this._sectionHeaderHasChanged
  for (let sIndex = 0, sCount = this.sectionIdentities.length; sIndex < sCount; sIndex++) {
    const sectionID = this.sectionIdentities[sIndex]
    // dirty if the sectionHeader is new or _sectionHasChanged is true
    dirty = !prevSectionsHash[sectionID]
    if (!dirty && sectionHeaderHasChanged) {
      dirty = sectionHeaderHasChanged(
        this._getSectionHeaderData(prevDataBlob, sectionID),
        this._getSectionHeaderData(this._dataBlob, sectionID)
      )
    }
    this._dirtySections.push(!!dirty)

    this._dirtyRows[sIndex] = []
    for (let rIndex = 0, rCount = this.rowIdentities[sIndex].length; rIndex < rCount; rIndex++) {
      const rowID = this.rowIdentities[sIndex][rIndex]
      // dirty if the section is new, row is new or _rowHasChanged is true
      dirty =
        !prevSectionsHash[sectionID] ||
        !prevRowsHash[sectionID][rowID] ||
        this._rowHasChanged(
          this._getRowData(prevDataBlob, sectionID, rowID),
          this._getRowData(this._dataBlob, sectionID, rowID)
        )
      this._dirtyRows[sIndex].push(!!dirty)
    }
  }
}

function keyedDictionaryFromArray(arr) {
  if (!arr) {
    return {}
  }
  const result = {}
  for (let i = 0, n = arr.length; i < n; i++) {
    const key = arr[i]
    result[key] = true
  }
  return result
}

function countRows(allRowIDs) {
  let totalRows = 0
  for (let i = 0, n = allRowIDs.length; i < n; i++) {
    totalRows += allRowIDs[i].length
  }
  return totalRows
}

function defaultGetRowData(dataBlob, sectionID, rowID) {
  return dataBlob[sectionID][rowID]
}

function defaultSectionHeaderHasChanged(/* data1, data2 */) {
  return false
}

function defaultGetSectionHeaderData(dataBlob, sectionID) {
  return dataBlob[sectionID]
}

