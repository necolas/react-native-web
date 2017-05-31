import createRenderBenchmark from '../createRenderBenchmark';
import NestedTree from '../src/components/NestedTree';
import React from 'react';

const renderWideTree = (label, components) =>
  createRenderBenchmark({
    name: `Wide tree [${label}]`,
    runs: 20,
    getElement() {
      return <NestedTree breadth={10} components={components} depth={3} id={0} wrap={4} />;
    }
  });

export default renderWideTree;
