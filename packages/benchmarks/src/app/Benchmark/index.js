// @flow
/* global $Values */
import * as Timing from './timing';
import React, { Component } from 'react';
import { getMean, getMedian, getStdDev } from './math';

import type { BenchResultsType, FullSampleTimingType, SampleTimingType } from './types';

export const BenchmarkType = {
  MOUNT: 'mount',
  UPDATE: 'update',
  UNMOUNT: 'unmount'
};

const emptyObject = {};

const shouldRender = (cycle: number, type: $Values<typeof BenchmarkType>): boolean => {
  switch (type) {
    // Render every odd iteration (first, third, etc)
    // Mounts and unmounts the component
    case BenchmarkType.MOUNT:
    case BenchmarkType.UNMOUNT:
      return !((cycle + 1) % 2);
    // Render every iteration (updates previously rendered module)
    case BenchmarkType.UPDATE:
      return true;
    default:
      return false;
  }
};

const shouldRecord = (cycle: number, type: $Values<typeof BenchmarkType>): boolean => {
  switch (type) {
    // Record every odd iteration (when mounted: first, third, etc)
    case BenchmarkType.MOUNT:
      return !((cycle + 1) % 2);
    // Record every iteration
    case BenchmarkType.UPDATE:
      return true;
    // Record every even iteration (when unmounted)
    case BenchmarkType.UNMOUNT:
      return !(cycle % 2);
    default:
      return false;
  }
};

const isDone = (
  cycle: number,
  sampleCount: number,
  type: $Values<typeof BenchmarkType>
): boolean => {
  switch (type) {
    case BenchmarkType.MOUNT:
      return cycle >= sampleCount * 2 - 1;
    case BenchmarkType.UPDATE:
      return cycle >= sampleCount - 1;
    case BenchmarkType.UNMOUNT:
      return cycle >= sampleCount * 2;
    default:
      return true;
  }
};

const sortNumbers = (a: number, b: number): number => a - b;

type BenchmarkPropsType = {
  component: typeof React.Component,
  getComponentProps?: Function,
  onComplete: (x: BenchResultsType) => void,
  sampleCount: number,
  timeout: number,
  type: $Values<typeof BenchmarkType>
};

type BenchmarkStateType = {
  componentProps: Object,
  cycle: number,
  running: boolean
};

/**
 * Benchmark
 * TODO: documentation
 */
export default class Benchmark extends Component<BenchmarkPropsType, BenchmarkStateType> {
  _startTime: number;
  _samples: Array<SampleTimingType>;

  static displayName = 'Benchmark';

  static defaultProps = {
    getComponentProps: () => emptyObject,
    sampleCount: 50,
    timeout: 10000, // 10 seconds
    type: BenchmarkType.MOUNT
  };

  static Type = BenchmarkType;

  constructor(props: BenchmarkPropsType, context?: {}) {
    super(props, context);
    const cycle = 0;
    this.state = {
      componentProps: props.getComponentProps({ cycle }),
      cycle,
      running: false
    };
    this._startTime = 0;
    this._samples = [];
  }

  componentWillReceiveProps(nextProps: BenchmarkPropsType) {
    this.setState(state => ({ componentProps: nextProps.getComponentProps(state.cycle) }));
  }

  componentWillUpdate(nextProps: BenchmarkPropsType, nextState: BenchmarkStateType) {
    if (nextState.running && !this.state.running) {
      this._startTime = Timing.now();
    }
  }

  componentDidUpdate() {
    const { sampleCount, timeout, type } = this.props;
    const { cycle, running } = this.state;

    if (running && shouldRecord(cycle, type)) {
      this._samples[cycle].end = Timing.now();
    }

    if (running) {
      const now = Timing.now();
      if (!isDone(cycle, sampleCount, type) && now - this._startTime < timeout) {
        this._handleCycleComplete();
      } else {
        this._handleComplete(now);
      }
    }
  }

  componentWillUnmount() {
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
    }
  }

  render() {
    const { component: Component, type } = this.props;
    const { componentProps, cycle, running } = this.state;
    if (running && shouldRecord(cycle, type)) {
      this._samples[cycle] = { start: Timing.now() };
    }
    return running && shouldRender(cycle, type) ? <Component {...componentProps} /> : null;
  }

  start() {
    this._samples = [];
    this.setState(() => ({ running: true, cycle: 0 }));
  }

  _handleCycleComplete() {
    const { getComponentProps, type } = this.props;
    const { cycle } = this.state;

    // Calculate the component props outside of the time recording (render)
    // so that it doesn't skew results
    const componentProps = getComponentProps({ cycle });
    // make sure props always change for update tests
    if (type === BenchmarkType.UPDATE) {
      componentProps['data-test'] = cycle;
    }

    this.raf = window.requestAnimationFrame(() => {
      this.setState((state: BenchmarkStateType) => ({
        cycle: state.cycle + 1,
        componentProps
      }));
    });
  }

  getSamples(): Array<FullSampleTimingType> {
    return this._samples.reduce(
      (
        memo: Array<FullSampleTimingType>,
        { start, end: endTime }: SampleTimingType
      ): Array<FullSampleTimingType> => {
        const end = endTime || 0;
        memo.push({ start, end, elapsed: end - start });
        return memo;
      },
      []
    );
  }

  _handleComplete(endTime: number) {
    const { onComplete } = this.props;
    const samples = this.getSamples();

    this.setState(() => ({ running: false, cycle: 0 }));

    const runTime = endTime - this._startTime;
    const sortedElapsedTimes = samples
      .map(({ elapsed }: { elapsed: number }): number => elapsed)
      .sort(sortNumbers);
    const mean = getMean(sortedElapsedTimes);
    const stdDev = getStdDev(sortedElapsedTimes);

    onComplete({
      startTime: this._startTime,
      endTime,
      runTime,
      sampleCount: samples.length,
      samples: samples,
      max: sortedElapsedTimes[sortedElapsedTimes.length - 1],
      min: sortedElapsedTimes[0],
      median: getMedian(sortedElapsedTimes),
      mean,
      stdDev
    });
  }
}
