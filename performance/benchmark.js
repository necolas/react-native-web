import * as marky from 'marky';

const fmt = (time) => `${Math.round(time * 100) / 100}ms`;

const measure = (name, fn) => {
  marky.mark(name);
  fn();
  const performanceMeasure = marky.stop(name);
  return performanceMeasure;
};

const benchmark = ({ name, description, setup, teardown, task, runs }) => {
  return new Promise((resolve) => {
    const performanceMeasures = [];
    let i = 0;

    setup();
    const first = measure('first', task);
    teardown();

    const done = () => {
      const mean = performanceMeasures.reduce((sum, performanceMeasure) => {
        return sum + performanceMeasure.duration;
      }, 0) / runs;

      const firstDuration = fmt(first.duration);
      const meanDuration = fmt(mean);

      console.log(`First: ${firstDuration}`);
      console.log(`Mean: ${meanDuration}`);
      console.groupEnd();
      resolve(mean);
    };

    const a = () => {
      setup();
      window.requestAnimationFrame(b);
    };

    const b = () => {
      performanceMeasures.push(measure('mean', task));
      window.requestAnimationFrame(c);
    };

    const c = () => {
      teardown();
      window.requestAnimationFrame(d);
    };

    const d = () => {
      i += 1;
      if (i < runs) {
        window.requestAnimationFrame(a);
      } else {
        window.requestAnimationFrame(done);
      }
    };

    console.group();
    console.log(`[benchmark] ${name}: ${description}`);
    window.requestAnimationFrame(a);
  });
};

module.exports = benchmark;
