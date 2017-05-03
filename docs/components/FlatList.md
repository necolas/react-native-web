# FlatList

An implementation of the FlatList component from React Native.

Note that we are continuing to refine this component for compability and performance.

## Props

[...VirtualizedList props](./VirtualizedList.md)

**ItemSeparatorComponent**: ?ReactClass<any>

This component will be inserted between every item in the list.

Note that this will change the behaviour of the `initialNumToRender` prop as it's now rendering N+(N-1) items.

**ListFooterComponent**: ?ReactClass<any>

This component will be inserted at the bottom of the list.

Note that this will change the behaviour of the `initialNumToRender` prop as it's now rendering N+1 items.

**ListHeaderComponent**: ?ReactClass<any>

This component will be inserted at the top of the list.

Note that this will change the behaviour of the `initialNumToRender` prop as it's now rendering N+1 items.

## Examples

```js
import React, { Component } from 'react'
import { FlatList, View } from 'react-native-web'

export default class FlatListExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [{ key: 'a', key: 'b', key: 'c' }]
    }

    this.renderItem = this.renderItem.bind(this)
  }

  renderItem ({item, index}) {
    return <View>{item.key}</View>
  }

  render () {
    return <FlatList
      data={this.state.data}
      renderItem={this.renderItem}
    />
  }
}
```
