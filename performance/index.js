import deepTree from './benchmarks/deepTree';
import React from 'react';
import ReactDOM from 'react-dom';

const node = document.querySelector('.root');

Promise.resolve()
  .then(deepTree({ wrap: 4, depth: 3, breadth: 10, runs: 10 }, node))
  .then(deepTree({ wrap: 1, depth: 5, breadth: 3, runs: 20 }, node))
  .then(() => ReactDOM.render(<div>Complete</div>, node));

