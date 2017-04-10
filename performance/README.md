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
| `css-modules`                        |  `87.68` `±13.29` | `171.96` `±14.91` | |
| `react-native-web/stylesheet@0.0.81` |  `90.59` `±12.03` | `190.37` `±19.65` | |
| `react-native-web@0.0.81`            | `105.20` `±17.86` | `226.54` `±29.50` | `12.12` `±6.94ms` |

Other libraries

| Implementation                       | Deep tree (ms)    | Wide tree (ms)    |
| :--- | ---: | ---: |
| `aphrodite@1.2.0`                    | `101.25` `±18.78` | `224.59` `±22.28` |
| `glamor@3.0.0-1`                     | `143.39` `±23.05` | `275.21` `±21.10` |
| `react-jss@5.4.1`                    | `142.27` `±16.62` | `318.62` `±26.19` |
| `reactxp@0.34.3`                     | `221.36` `±23.35` | `472.61` `±40.86` |
| `styled-components@2.0.0-7`          | `301.92` `±39.43` | `647.80` `±102.1` |

*MacBook Pro (13-inch, Early 2011); 2.7 GHz Intel Core i7; 16 GB 1600 MHz DDR3. Google Chrome 56.
