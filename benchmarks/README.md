# Performance

To run these benchmarks:

```
npm run build:performance
open ./performance/index.html
```

## Notes

The components used in the render benchmarks are simple enough to be
implemented by multiple UI or style libraries. The implementations are not
equivalent in functionality.

`react-native-web/stylesheet` is a comparative baseline that implements a
simple `View` without much of React Native's functionality.

## Benchmark results

Typical render timings*: mean ± two standard deviations

| Implementation                       | Deep tree (ms)    | Wide tree (ms)    | Tweets (ms)       |
| :--- | ---: | ---: | ---: |
| `css-modules`                        |  `87.67` `±15.22` | `170.85` `±16.87` | |
| `react-native-web/stylesheet@0.0.84` |  `90.02` `±13.16` | `186.66` `±19.23` | |
| `react-native-web@0.0.84`            | `102.72` `±19.26` | `222.35` `±18.95` | `12.81` `±5.45ms` |

Other libraries

| Implementation                       | Deep tree (ms)    | Wide tree (ms)    |
| :--- | ---: | ---: |
| `styletron@2.5.1`                    |  `88.48` `±12.00` | `171.89` `±13.28` |
| `aphrodite@1.2.0`                    | `101.32` `±20.33` | `220.33` `±31.41` |
| `glamor@3.0.0-1`                     | `129.00` `±14.92` | `264.57` `±28.54` |
| `react-jss@5.4.1`                    | `137.33` `±21.55` | `314.91` `±29.03` |
| `reactxp@0.34.3`                     | `223.82` `±32.77` | `461.56` `±34.43` |
| `styled-components@2.0.0-11`         | `277.53` `±28.83` | `627.91` `±43.13` |

*MacBook Pro (13-inch, Early 2011); 2.7 GHz Intel Core i7; 16 GB 1600 MHz DDR3. Google Chrome 56.
