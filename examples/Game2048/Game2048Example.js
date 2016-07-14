import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Game2048 from './Game2048'

storiesOf('Game2048', module)
  .add('the game', () => (
    <Game2048 />
  ))
