import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Game2048 from './Game2048';

storiesOf('demo: Game2048', module).add('the game', () => <Game2048 />);
