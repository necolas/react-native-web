import React from 'react';
import { storiesOf } from '../../ui-explorer';
import TicTacToe from './TicTacToe';

const TicTacToeScreen = () => <TicTacToe />;

storiesOf('Example apps', module).add('TicTacToe', TicTacToeScreen);
