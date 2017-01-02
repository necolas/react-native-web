import benchmark from '../../benchmark';
import createDeepTree from './createDeepTree';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactNative from 'react-native';

// React Native for Web implementation of the tree
const DeepTree = createDeepTree(ReactNative);

const deepTreeBenchmark = ({ breadth, depth, wrap, runs }, node) => () => {
  const setup = () => { };
  const teardown = () => ReactDOM.unmountComponentAtNode(node);

  return benchmark({
    name: 'DeepTree',
    description: `depth=${depth}, breadth=${breadth}, wrap=${wrap})`,
    runs,
    setup,
    teardown,
    task: () => ReactDOM.render(<DeepTree breadth={breadth} depth={depth} id={0} wrap={wrap} />, node)
  });
};

module.exports = deepTreeBenchmark;
