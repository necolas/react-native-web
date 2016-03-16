import React, { AppRegistry } from 'react-native'
import Game2048 from './2048/Game2048'
import TicTacToeApp from './TicTacToe/TicTacToe'

AppRegistry.runApplication('Game2048', {
  rootTag: document.getElementById('react-root')
})
