import { storiesOf } from '@kadira/storybook'
import UIExplorer from '../UIExplorer'
import {
  StyleSheet,
  Dimensions,
  Button,
  View,
  ScrollView,
  Text
} from 'react-native'
import React, { Component } from 'react'

const styles = StyleSheet.create({
  action: {
    marginTop: 8,
    marginBottom: 8
  },
  log: {
    fontSize: 6,
    marginTop: 8,
    marginBottom: 8
  }
})

class ChangeEventExample extends Component {
  state = { listened: false, logs: [] }

  render() {
    const { logs, listened } = this.state
    const buttonTitle = listened ? 'Remove listener' : 'Add listener'
    return (
      <View>
        <View style={styles.action}>
          <Button onPress={this.toggle} title={buttonTitle} />
        </View>
        <View style={styles.action}>
          <Button onPress={this.clearLogs} title="Clear logs" />
        </View>
        <ScrollView>
          {logs.map((log, i) =>
            <Text key={i} style={styles.log}>
              {log}
            </Text>
          )}
        </ScrollView>
      </View>
    )
  }

  toggle = () => {
    const { listened } = this.state
    if (listened) {
      Dimensions.removeEventListener('change', this._handleChange)
      this.log('Removed listener')
    } else {
      Dimensions.addEventListener('change', this._handleChange)
      this.log('Added listener')
    }
    this.setState({ listened: !listened })
  }

  _handleChange = ({ window, screen }) => {
    // this is only for logging
    window = JSON.stringify(window)
    screen = JSON.stringify(screen)
    this.log(`Changed. window=${window}. screen=${screen}`)
  }

  log = msg => {
    this.setState({
      logs: [`${new Date().toTimeString()} - ${msg}`, ...this.state.logs]
    })
  }

  clearLogs = () => this.setState({ logs: [] })
}

const examples = [
  {
    title: 'Listen to `change` event',
    description: '',
    render: () => <ChangeEventExample />
  }
]

storiesOf('APIs', module).add('Dimensions', () =>
  <UIExplorer description="" examples={examples} title="Dimensions" />
)
