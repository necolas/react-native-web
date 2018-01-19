# benchmarks

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

## Example results

### MacBook Pro (2011)

MacBook Pro (13-inch, Early 2011); 2.3 GHz Intel Core i5; 8 GB 1333 MHz DDR3 RAM. Google Chrome 63.

Typical render timings*: mean ± standard deviations.

| Implementation                        | Mount deep tree (ms)    | Mount wide tree (ms)    | Dynamic update (ms)     |
| :--- | ---: | ---: | ---: |
| `css-modules`                         |  `15.23` `±04.31` | `21.27` `±07.03` | - |
| `react-native-web@0.3.2`              |  `17.52` `±04.44` | `24.14` `±04.39` | `15.03` `±02.22` |
| `inline-styles`                       |  `50.06` `±06.70` | `76.38` `±09.58` | `06.43` `±02.02` |

Other libraries

| Implementation                        | Mount deep tree (ms)    | Mount wide tree (ms)    | Dynamic update (ms)     |
| :--- | ---: | ---: | ---: |
| `aphrodite@1.2.5`                     |  `17.27` `±05.96` |  `24.89` `±08.36` | - |
| `glamor@2.20.40`                      |  `21.59` `±05.38` |  `27.93` `±07.56` | ‡ |
| `emotion@8.0.12`                      |  `21.07` `±04.16` |  `31.40` `±09.40` | ‡ `19.80` `±13.56` |
| `styletron-react@3.0.3`               |  `23.55` `±05.14` |  `34.26` `±07.58` |   `10.39` `±02.94` |
| `react-fela@5.0.0`                    |  `27.58` `±04.26` |  `39.54` `±05.46` |   `10.93` `±01.69` |
| `react-jss@8.2.1`                     |  `27.31` `±07.87` |  `40.74` `±10.67` | - |
| `styled-jsx@2.2.1`                    |  `27.46` `±07.85` |  `41.47` `±11.53` |   `29.16` `±09.98` |
| `styled-components@2.4.0`             |  `43.89` `±06.99` |  `63.26` `±09.02` |   `16.17` `±03.71` |
| `reactxp@0.51.0-alpha.9`              |  `51.86` `±07.21` |  `78.80` `±11.85` |   `15.04` `±03.92` |
| `radium@0.21.0`                       | `101.06` `±13.00` | `144.46` `±16.94` |   `17.44` `±03.59` |

### Moto G4

Moto G4 (Android 7); Octa-core (4x1.5 GHz & 4x1.2 Ghz); 2 GB RAM. Google Chrome 63

Typical render timings*: mean ± standard deviations.

| Implementation                        | Mount deep tree (ms)    | Mount wide tree (ms)    | Dynamic update (ms)     |
| :--- | ---: | ---: | ---: |
| `css-modules`                         |   `56.18` `±19.54` |   `75.95` `±23.55` | - |
| `react-native-web@0.3.2`              |   `68.53` `±21.00` |  `101.03` `±25.32` | `60.57` `±09.07` |
| `inline-styles`                       |  `140.32` `±23.91` |  `208.55` `±35.25` | `20.36` `±04.92` |

Other libraries

| Implementation                        | Mount deep tree (ms)    | Mount wide tree (ms)    | Dynamic update (ms)     |
| :--- | ---: | ---: | ---: |
| `aphrodite@1.2.5`                     |   `58.77` `±19.73` |   `85.83` `±24.64` | - |
| `glamor@2.20.40`                      |   `81.05` `±15.87` |  `104.02` `±20.92` | ‡ |
| `emotion@8.0.12`                      |   `77.12` `±19.61` |  `112.04` `±24.43` | ‡ `80.40` `±40.56` |
| `styletron-react@3.0.3`               |   `91.00` `±17.95` |  `130.49` `±20.06` |   `39.70` `±06.85` |
| `react-fela@5.0.0`                    |  `101.36` `±19.55` |  `142.18` `±21.87` |   `43.64` `±12.24` |
| `styled-jsx@2.2.1`                    |  `101.60` `±25.26` |  `144.12` `±30.79` |   `115.63` `±32.77` |
| `react-jss@8.2.1`                     |  `112.46` `±32.07` |  `165.96` `±42.54` | - |
| `styled-components@2.4.0`             |  `159.85` `±24.30` |  `231.00` `±31.34` |   `53.86` `±13.40` |
| `reactxp@0.51.0-alpha.9`              |  `182.05` `±30.72` |  `261.25` `±35.54` |   `58.20` `±08.62` |
| `radium@0.21.0`                       |  `323.93` `±41.46` |  `464.70` `±53.93` |   `59.13` `±09.76` |

‡Glamor essentially crashes the browser tab. Emotion gets slower every iteration.
