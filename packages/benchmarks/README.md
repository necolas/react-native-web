# Benchmarks

Try the [benchmarks app](https://necolas.github.io/react-native-web/benchmarks) online.

To work on the benchmarks locally from monorepo root:

```
npm run dev -w react-native-web
npm run build -w benchmarks
open ./packages/benchmarks/dist/index.html
```

## Notes

These benchmarks are approximations of extreme cases that libraries may
encounter. Their purpose is to provide an early-warning signal for performance
regressions. Each test report includes the mean and standard deviation of the
timings, and approximations of the time spent in scripting (S) and layout (L).

The components used in the render benchmarks are simple enough to be
implemented by multiple UI or style libraries. The benchmark implementations
and the features of the style libraries are _only approximately equivalent in
functionality_.

No benchmark will run for more than 20 seconds.

### Mount deep/wide tree

These cases look at the performance of mounting and rendering large trees of
elements that use static styles.

### Update dynamic styles

This case looks at the performance of repeated style updates to a large mounted
tree. Some libraries choose to inject new styles for each "dynamic style",
whereas others choose to use inline styles. Libraries without built-in support
for dynamic styles (i.e., they rely on user-authored inline styles) are not
included.

## Example results

### MacBook Pro (2011)

MacBook Pro (13-inch, Early 2011); 2.3 GHz Intel Core i5; 8 GB 1333 MHz DDR3 RAM. Google Chrome 72.

Typical render timings: mean ± standard deviations.

| Implementation                        | Mount deep tree (ms) | Mount wide tree (ms) | Dynamic update (ms) |
| :--- | ---: | ---: | ---: |
| `css-modules`                         |     `23.41` `±03.06` |     `35.38` `±06.41` |                   - |
| `react-native-web@0.11.0`             |     `28.37` `±04.39` |     `41.50` `±05.75` |    `23.13` `±03.51` |
| `inline-styles`                       |     `66.19` `±06.31` |    `104.22` `±10.22` |    `09.96` `±02.76` |

### Moto G4

Moto G4 (Android 7); Octa-core (4x1.5 GHz & 4x1.2 Ghz); 2 GB RAM. Google Chrome 72.

Typical render timings: mean ± standard deviations.

| Implementation                        | Mount deep tree (ms) | Mount wide tree (ms) | Dynamic update (ms) |
| :--- | ---: | ---: | ---: |
| `css-modules`                         |     `71.33` `±09.68` |    `101.36` `±12.36` |                   - |
| `react-native-web@0.11.0`             |     `83.65` `±12.40` |    `123.59` `±14.40` |    `75.41` `±07.74` |
| `inline-styles`                       |    `188.35` `±17.69` |    `282.35` `±22.48` |    `28.10` `±06.87` |
