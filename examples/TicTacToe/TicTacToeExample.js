import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TicTacToe from './TicTacToe'

storiesOf('TicTacToe', module)
  .add('the game', () => (
    <TicTacToe />
  ))
