import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TicTacToe from './TicTacToe'

storiesOf('demo: TicTacToe', module)
  .add('the game', () => (
    <TicTacToe />
  ))
