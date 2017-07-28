import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TicTacToe from './TicTacToe';

const TicTacToeScreen = () => <TicTacToe />;

storiesOf('Example apps', module).add('TicTacToe', TicTacToeScreen);
