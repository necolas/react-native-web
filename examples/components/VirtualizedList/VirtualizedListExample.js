import React, { Component } from 'react'
import { VirtualizedList, View, Text, StyleSheet } from 'react-native'
import { storiesOf } from '@kadira/storybook';

class VirtualizedListExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: Array.from(Array(1000).keys()).map((i) => ({key: i.toString()}))
    }

    this.renderItem = this.renderItem.bind(this)
    this.getItemLayout = this.getItemLayout.bind(this)
  }

  getItemLayout (data, index) {
    return { length: 50, offset: 50 * index, index: index }
  }

  renderItem ({item, index}) {
    return <View><Text>{item.key} - {index}</Text></View>
  }

  render () {
    return <VirtualizedList
      style={styles.container}
      data={this.state.data}
      renderItem={this.renderItem}
      getItemLayout={this.getItemLayout}
    />
  }
}

const examples = [{
  title: 'perf',
  render() {
    return <VirtualizedListExample />
  }
}]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

storiesOf('component: VirtualizedList', module)
  .add('perf', () => (
    <VirtualizedListExample />
  ))
