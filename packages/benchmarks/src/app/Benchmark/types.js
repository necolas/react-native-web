// @flow
export type BenchResultsType = {
  startTime: number,
  endTime: number,
  runTime: number,
  sampleCount: number,
  samples: Array<FullSampleTimingType>,
  max: number,
  min: number,
  median: number,
  mean: number,
  stdDev: number,
  p70: number,
  p95: number,
  p99: number
};

export type SampleTimingType = {
  start: number,
  end?: number,
  elapsed?: number
};

export type FullSampleTimingType = {
  start: number,
  end: number,
  elapsed: number
};
