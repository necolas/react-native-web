import * as marky from 'marky';

const fmt = (time) => `${Math.round(time * 100) / 100}ms`;

const measure = (name, fn) => {
  marky.mark(name);
  fn();
  const performanceMeasure = marky.stop(name);
  return performanceMeasure.duration;
};

const benchmark = ({ name, description, setup, teardown, task, runs }) => {
  return new Promise((resolve) => {
    const durations = [];
    let i = 0;

    console.group(`[benchmark] ${name}`);
    console.log(description);

    setup();
    const first = measure('first', task);
    teardown();

    const done = () => {
      const mean = durations.reduce((sum, duration) => {
        return sum + duration;
      }, 0) / runs;

      const firstDuration = fmt(first);
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
      const duration = measure('mean', task);
      durations.push(duration);
      c();
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

    window.requestAnimationFrame(a);
  });
};

module.exports = benchmark;
