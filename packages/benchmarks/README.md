# benchmarks

[![npm version][package-badge]][package-url] [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

Try the [benchmarks app](https://necolas.github.io/react-native-web/benchmarks) online.

To run the benchmarks locally:

```
yarn benchmark
open ./packages/benchmarks/dist/index.html
```

Develop against these benchmarks:

```
yarn compile --watch
yarn benchmark --watch
```

## Notes

These benchmarks are approximations of extreme cases that libraries may
encounter. The deep and wide tree cases look at the performance of mounting and
rendering large trees of styled elements. The dynamic case looks at the
performance of repeated style updates to a large mounted tree. Some libraries
must inject new styles for each "dynamic style", whereas others may not.
Libraries without support for dynamic styles (i.e., they rely on user-authored
inline styles) do not include a corresponding benchmark.

The components used in the render benchmarks are simple enough to be
implemented by multiple UI or style libraries. The benchmark implementations
and the features of the style libraries are _only approximately equivalent in
functionality_.

No benchmark will run for more than 20 seconds.

## Results

Typical render timings*: mean ± two standard deviations.

| Implementation                        | Mount deep tree (ms)    | Mount wide tree (ms)    | Update tree (ms)    |
| :--- | ---: | ---: | ---: |
| `css-modules`                         |  `15.23` `±04.31` | `21.27` `±07.03` | - |
| `react-native-web@0.3.1`              |  `17.52` `±04.44` | `24.14` `±04.39` | `15.03` `±02.22` |
| `inline-styles`                       |  `50.06` `±06.70` | `76.38` `±09.58` | `06.43` `±02.02` |

Other libraries

| Implementation                        | Mount deep tree (ms)    | Mount wide tree (ms)    | Update tree (ms)     |
| :--- | ---: | ---: | ---: |
| `aphrodite@1.2.5`                     |  `17.27` `±05.96` |  `24.89` `±08.36` | - |
| `glamor@2.20.40`                      |  `21.59` `±05.38` |  `27.93` `±07.56` | ‡ |
| `emotion@8.0.12`                      |  `21.07` `±04.16` |  `31.40` `±09.40` | ‡ `19.80` `±13.56` |
| `styletron-react@3.0.3`               |  `23.55` `±05.14` |  `34.26` `±07.58` |   `10.39` `±02.94` |
| `react-fela@5.0.0`                    |  `27.58` `±04.26` |  `39.54` `±05.46` |   `10.93` `±01.69` |
| `react-jss@8.2.1`                     |  `27.31` `±07.87` |  `40.74` `±10.67` | - |
| `styled-components@2.4.0`             |  `43.89` `±06.99` |  `63.26` `±09.02` |   `16.17` `±03.71` |
| `reactxp@0.51.0-alpha.9`              |  `51.86` `±07.21` |  `78.80` `±11.85` |   `15.04` `±03.92` |
| `radium@0.21.0`                       | `101.06` `±13.00` | `144.46` `±16.94` |   `17.44` `±03.59` |

These results indicate that render times when using `react-native-web`,
`css-modules`, `aphrodite`, and `styletron` are roughly equivalent and
significantly faster than alternatives.

*MacBook Pro (13-inch, Early 2011); 2.3 GHz Intel Core i5; 8 GB 1333 MHz DDR3. Google Chrome 62.

‡Glamor essentially crashes the browser tab. Emotion gets slower every iteration.

[package-badge]: https://img.shields.io/npm/v/babel-plugin-react-native-web.svg?style=flat
[package-url]: https://yarnpkg.com/en/package/babel-plugin-react-native-web
