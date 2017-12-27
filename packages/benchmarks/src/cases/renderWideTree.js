import createRenderBenchmark from '../createRenderBenchmark';
import NestedTree from './NestedTree';
import React from 'react';

const renderWideTree = (label, components) =>
  createRenderBenchmark({
    name: `[${label}] Wide tree`,
    runs: 20,
    getElement() {
      return <NestedTree breadth={10} components={components} depth={3} id={0} wrap={4} />;
    }
  });

export default renderWideTree;
