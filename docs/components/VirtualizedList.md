# VirtualizedList

An implementation of the VirtualizedList component from React Native.

Note that we are continuing to refine this component for compability and performance.

## Props

**data**: any

The data to power the VirtualizedList.

Note that if this isn't an Array of Objects, you'll have to also provide `getItem` and `getItemCount` props.

**getItem**: ?(data: any, index: number) => Item

Determines the data to render an item with, if `data` isn't an Array.

Should be used in conjunction with `getItemCount`.

**getItemCount**: ?(data: any) => number

Determines how many items to render, if `data` isn't an Array.

Should be used in conjunction with `getItem`.

**getItemLayout**: ?(data: any, index: number) => {length: number}

Used to specify the pre-computed layout of an item.

**initialNumToRender**: ?number = 100

The number of items to render per page in the list. Defaults to 100.

**keyExtractor**: ?function

Determines the `key` to be used for a specific item.

Note that the item's `key` property will be looked at first, if that is not present, then this function will be called if present.  
If neither of those are present, the index of the cell within the page will be used as the `key`.

**onEndReached**: ?function

A handler that is called once the list is scrolled to the end.

**onRefresh**: ?function

A handler called when the list is scrolled to the top.

**renderItem**: (info: { item: Item, index: number }) => React.Element<any>

The result of this function is rendered to each cell in the list.

It can be called many times for each item as the page containing the cell is shown and hidden.

## Instance methods

**scrollToEnd()**

Scrolls to the bottom of the list.

**scrollToIndex(index: number = 0)**

Scrolls to a specific item at an index.

**scrollToItem(item: Object)**

Will iterate over each item in the list to find the index of it and then will scroll to that index.

**scrollToOffset(offset: number)**: function

Scrolls to a particular offset in the list.

Note that the offset that you may want to scroll to can change if the cells above that offset changes its layout.
