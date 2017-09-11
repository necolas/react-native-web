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

  componentDidMount () {
    setInterval(() => {
      this.setState({
        data: [
          { key: this.state.data.length.toString() },
          ...this.state.data,
        ]
      })
    }, 1000)
  }

  getItemLayout (data, index) {
    return { length: 18, offset: 18 * index, index: index }
  }

  renderItem ({item, index}) {
    return <View><Text>{item.key} - {index}</Text></View>
  }

  render () {
    return <VirtualizedList
      style={styles.container}
      data={this.state.data}
      renderItem={this.renderItem}
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
