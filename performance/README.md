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

## Benchmark results

Typical render timings*: mean ± two standard deviations

| Implementation               | Deep tree (ms)    | Wide tree (ms)    |
| :--- | ---: | ---: |
| `css-modules`                |  `76.66` `±18.46` | `157.03` `±19.79` |
| `react-native-web@0.0.78`    |  `90.13` `±20.91` | `198.72` `±24.44` |
| `styled-components@2.0.0-7`  | `263.06` `±31.87` | `564.53` `±27.62` |
| `glamor@3.0.0-1`             | `267.49` `±35.12` | `451.99` `±37.32` |

*MacBook Pro (13-inch, Early 2011); 2.7 GHz Intel Core i7; 16 GB 1600 MHz DDR3. Google Chrome 56.
