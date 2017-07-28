import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Game2048 from './Game2048';

const Game2048Screen = () => <Game2048 />;

storiesOf('Example apps', module).add('Game2048', Game2048Screen);
