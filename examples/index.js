import React from 'react'
import ReactNative, { AppRegistry } from 'react-native'
import App from './components/App'
import Game2048 from './2048/Game2048'
import TicTacToeApp from './TicTacToe/TicTacToe'

const rootTag = document.getElementById('react-root')
AppRegistry.registerComponent('App', () => App)
AppRegistry.runApplication('App', { rootTag })
// ReactNative.render(<App />, rootTag)
