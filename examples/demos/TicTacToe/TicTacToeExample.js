import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TicTacToe from './TicTacToe';

storiesOf('demo: TicTacToe', module).add('the game', () => <TicTacToe />);
