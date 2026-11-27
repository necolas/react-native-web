/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { preprocess } from '../preprocess';

describe('StyleSheet/preprocess', () => {
  describe('non-standard styles', () => {
    test('converts non-standard logical styles', () => {
      expect(
        preprocess({
          end: 1,
          marginEnd: 1,
          marginHorizontal: 1,
          marginStart: 1,
          marginVertical: 1,
          paddingEnd: 1,
          paddingHorizontal: 1,
          paddingStart: 1,
          paddingVertical: 1,
          start: 1
        })
      ).toEqual({
        insetInlineEnd: 1,
        insetInlineStart: 1,
        marginBlock: 1,
        marginInline: 1,
        marginInlineEnd: 1,
        marginInlineStart: 1,
        paddingBlock: 1,
        paddingInline: 1,
        paddingInlineEnd: 1,
        paddingInlineStart: 1
      });
    });

    test('respects standard logical styles', () => {
      expect(
        preprocess({
          end: 1,
          marginEnd: 1,
          marginHorizontal: 1,
          marginStart: 1,
          marginVertical: 1,
          paddingEnd: 1,
          paddingHorizontal: 1,
          paddingStart: 1,
          paddingVertical: 1,
          start: 1,
          // standard
          insetInlineEnd: 2,
          insetInlineStart: 2,
          marginBlock: 2,
          marginInline: 2,
          marginInlineEnd: 2,
          marginInlineStart: 2,
          paddingBlock: 2,
          paddingInline: 2,
          paddingInlineEnd: 2,
          paddingInlineStart: 2
        })
      ).toEqual({
        insetInlineEnd: 2,
        insetInlineStart: 2,
        marginBlock: 2,
        marginInline: 2,
        marginInlineEnd: 2,
        marginInlineStart: 2,
        paddingBlock: 2,
        paddingInline: 2,
        paddingInlineEnd: 2,
        paddingInlineStart: 2
      });
    });

    test('converts non-standard textAlignVertical', () => {
      expect(
        preprocess({
          textAlignVertical: 'center'
        })
      ).toEqual({
        verticalAlign: 'middle'
      });

      expect(
        preprocess({
          verticalAlign: 'top',
          textAlignVertical: 'center'
        })
      ).toEqual({
        verticalAlign: 'top'
      });
    });

    test('aspectRatio', () => {
      expect(preprocess({ aspectRatio: 9 / 16 })).toEqual({
        aspectRatio: '0.5625'
      });

      expect(preprocess({ aspectRatio: '0.5' })).toEqual({
        aspectRatio: '0.5'
      });

      expect(preprocess({ aspectRatio: undefined })).toEqual({});
    });

    describe('boxShadow', () => {
      // passthrough if boxShadow value is ever a string
      test('string', () => {
        const boxShadow = '0 1px 2px rgba(0, 0, 0, 0.5)';
        const style = { boxShadow };
        expect(preprocess(style)).toEqual({ boxShadow });
      });

      test('array', () => {
        const boxShadow = [
          '0 1px 2px rgba(0, 0, 0, 0.5)',
          {
            offsetX: 1,
            offsetY: 2,
            blurRadius: 3
          },
          {
            offsetX: 5,
            offsetY: 6,
            blurRadius: 7,
            spreadDistance: 8,
            color: 'rgba(0, 255, 0, 0.75)',
            inset: true
          }
        ];
        const style = { boxShadow };
        expect(preprocess(style)).toEqual({
          boxShadow:
            '0 1px 2px rgba(0, 0, 0, 0.5), 1px 2px 3px 0 black, inset 5px 6px 7px 8px rgba(0,255,0,0.75)'
        });
      });
    });

    test('fontVariant', () => {
      expect(
        preprocess({ fontVariant: 'common-ligatures small-caps' })
      ).toEqual({
        fontFeatureSettings: 'normal',
        fontVariant: 'common-ligatures small-caps'
      });

      expect(
        preprocess({ fontVariant: ['common-ligatures', 'small-caps'] })
      ).toEqual({
        fontFeatureSettings: 'normal',
        fontVariant: 'common-ligatures small-caps'
      });

      expect(
        preprocess({
          fontVariant: ['small-caps', 'stylistic-one', 'stylistic-twenty']
        })
      ).toEqual({
        fontFeatureSettings: "'ss01', 'ss20'",
        fontVariant: 'small-caps'
      });

      expect(preprocess({ fontVariant: 'stylistic-two' })).toEqual({
        fontFeatureSettings: "'ss02'",
        fontVariant: 'normal'
      });

      expect(preprocess({ fontVariant: [] })).toEqual({
        fontFeatureSettings: 'normal',
        fontVariant: 'normal'
      });

      expect(preprocess({ fontVariant: null })).toEqual({
        fontFeatureSettings: null,
        fontVariant: null
      });

      expect(preprocess({ fontVariant: undefined })).toEqual({
        fontVariant: undefined
      });
    });

    test('fontVariant with fontFeatureSettings', () => {
      expect(
        preprocess({
          fontFeatureSettings: "'tnum'",
          fontVariant: ['stylistic-one']
        })
      ).toEqual({
        fontFeatureSettings: "'tnum', 'ss01'",
        fontVariant: 'normal'
      });

      expect(
        preprocess({
          fontVariant: ['stylistic-one'],
          fontFeatureSettings: "'tnum'"
        })
      ).toEqual({
        fontFeatureSettings: "'tnum', 'ss01'",
        fontVariant: 'normal'
      });

      expect(
        preprocess({
          fontFeatureSettings: 'normal',
          fontVariant: ['stylistic-one']
        })
      ).toEqual({
        fontFeatureSettings: "'ss01'",
        fontVariant: 'normal'
      });

      expect(
        preprocess({
          fontVariant: ['stylistic-one'],
          fontFeatureSettings: 'normal'
        })
      ).toEqual({
        fontFeatureSettings: "'ss01'",
        fontVariant: 'normal'
      });

      expect(preprocess({ fontFeatureSettings: 'normal' })).toEqual({
        fontFeatureSettings: 'normal'
      });

      expect(preprocess({ fontFeatureSettings: null })).toEqual({
        fontFeatureSettings: null
      });

      expect(
        preprocess({
          fontFeatureSettings: "'tnum'",
          fontVariant: null
        })
      ).toEqual({
        fontFeatureSettings: "'tnum'",
        fontVariant: null
      });

      expect(
        preprocess({
          fontVariant: null,
          fontFeatureSettings: "'tnum'"
        })
      ).toEqual({
        fontFeatureSettings: "'tnum'",
        fontVariant: null
      });

      expect(
        preprocess({
          fontFeatureSettings: "'tnum'",
          fontVariant: ['small-caps']
        })
      ).toEqual({
        fontFeatureSettings: "'tnum'",
        fontVariant: 'small-caps'
      });

      expect(
        preprocess({
          fontVariant: ['small-caps'],
          fontFeatureSettings: "'tnum'"
        })
      ).toEqual({
        fontFeatureSettings: "'tnum'",
        fontVariant: 'small-caps'
      });
    });

    describe('transform', () => {
      // passthrough if transform value is ever a string
      test('string', () => {
        const transform =
          'perspective(50px) scaleX(20) translateX(20px) rotate(20deg)';
        const style = { transform };
        expect(preprocess(style)).toEqual({ transform });
      });

      test('array', () => {
        const style = {
          transform: [
            { perspective: 50 },
            { scaleX: 20 },
            { translateX: 20 },
            { rotate: '20deg' },
            { matrix: [1, 2, 3, 4, 5, 6] },
            { matrix3d: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4] }
          ]
        };
        expect(preprocess(style)).toEqual({
          transform:
            'perspective(50px) scaleX(20) translateX(20px) rotate(20deg) matrix(1,2,3,4,5,6) matrix3d(1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4)'
        });
      });
    });

    describe('transformOrigin', () => {
      // passthrough if transformOrigin value is ever a string
      test('string', () => {
        const transformOrigin = '2px 30% 10px';
        const style = { transformOrigin };
        expect(preprocess(style)).toEqual({ transformOrigin });
      });

      test('array', () => {
        const style = {
          transformOrigin: [2, '30%', 10]
        };
        expect(preprocess(style)).toEqual({
          transformOrigin: '2px 30% 10px'
        });
      });
    });

    describe('transitionProperty', () => {
      test('string', () => {
        const transitionProperty = 'opacity, transform';
        const style = { transitionProperty };
        expect(preprocess(style)).toEqual({ transitionProperty });
      });

      test('array', () => {
        const style = {
          transitionProperty: ['opacity', 'transform']
        };
        expect(preprocess(style)).toEqual({
          transitionProperty: 'opacity, transform'
        });
      });
    });

    describe('filter', () => {
      test('string', () => {
        const filter = 'blur(4px) brightness(0.5)';
        const style = { filter };
        expect(preprocess(style)).toEqual({ filter });
      });

      test('array', () => {
        const style = {
          filter: [
            { blur: 4 },
            { brightness: 0.5 },
            { contrast: '120%' },
            { hueRotate: 90 },
            { hueRotate: '1rad' },
            {
              dropShadow: {
                offsetX: 1,
                offsetY: '2px',
                standardDeviation: 3,
                color: 'red'
              }
            },
            { dropShadow: { offsetX: 1, offsetY: 2 } },
            { dropShadow: { offsetX: 0, offsetY: 0, color: 'var(--color)' } },
            { dropShadow: '1px 2px blue' }
          ]
        };
        expect(preprocess(style)).toEqual({
          filter:
            'blur(4px) brightness(0.5) contrast(120%) hue-rotate(90deg) hue-rotate(1rad) drop-shadow(1px 2px 3px rgba(255,0,0,1.00)) drop-shadow(1px 2px) drop-shadow(0px 0px var(--color)) drop-shadow(1px 2px blue)'
        });
      });
    });

    describe('backgroundImage', () => {
      test('string', () => {
        const backgroundImage =
          'linear-gradient(to right, red, blue), url("image.png")';
        const style = { backgroundImage };
        expect(preprocess(style)).toEqual({ backgroundImage });
      });

      test('array', () => {
        const style = {
          backgroundImage: [
            {
              type: 'linear-gradient',
              direction: 'to right',
              colorStops: [
                { color: 'red' },
                { color: null, positions: ['20%'] },
                { color: 'rgba(0, 0, 255, 0.5)', positions: ['50%', '100%'] }
              ]
            },
            {
              type: 'linear-gradient',
              colorStops: [{ color: '#f00' }, { color: 'blue' }]
            },
            {
              type: 'linear-gradient',
              colorStops: [
                { color: 'oklch(0.7 0.1 200)' },
                { color: 'var(--color)' }
              ]
            },
            {
              type: 'radial-gradient',
              shape: 'circle',
              size: { x: 50, y: 50 },
              position: { top: 10, left: '20%' },
              colorStops: [{ color: 'red' }, { color: 'blue' }]
            },
            {
              type: 'radial-gradient',
              shape: 'ellipse',
              size: 'closest-side',
              position: { bottom: 0, right: 0 },
              colorStops: [{ color: 'red' }, { color: 'blue' }]
            },
            {
              type: 'radial-gradient',
              shape: 'ellipse',
              size: { x: '50%', y: 20 },
              position: { top: '50%', left: '50%' },
              colorStops: [{ color: 'red' }, { color: 'blue' }]
            }
          ]
        };
        expect(preprocess(style)).toEqual({
          backgroundImage: [
            'linear-gradient(to right, rgba(255,0,0,1.00),  20%, rgba(0,0,255,0.50) 50% 100%)',
            'linear-gradient(rgba(255,0,0,1.00), rgba(0,0,255,1.00))',
            'linear-gradient(oklch(0.7 0.1 200), var(--color))',
            'radial-gradient(circle 50px at top 10px left 20%, rgba(255,0,0,1.00), rgba(0,0,255,1.00))',
            'radial-gradient(ellipse closest-side at bottom 0px right 0px, rgba(255,0,0,1.00), rgba(0,0,255,1.00))',
            'radial-gradient(ellipse 50% 20px at top 50% left 50%, rgba(255,0,0,1.00), rgba(0,0,255,1.00))'
          ].join(', ')
        });
      });

      test('circle radius', () => {
        const circle = (size: { x: number | string; y: number | string }) => ({
          type: 'radial-gradient',
          shape: 'circle',
          size,
          position: { top: 0, left: 0 },
          colorStops: [{ color: 'red' }, { color: 'blue' }]
        });
        const style = {
          backgroundImage: [
            circle({ x: 10, y: 40 }),
            circle({ x: 10, y: '2em' }),
            circle({ x: '2em', y: '2em' }),
            circle({ x: '50%', y: 10 })
          ]
        };
        expect(preprocess(style)).toEqual({
          backgroundImage: [
            'radial-gradient(circle 40px at top 0px left 0px, rgba(255,0,0,1.00), rgba(0,0,255,1.00))',
            'radial-gradient(circle max(10px, 2em) at top 0px left 0px, rgba(255,0,0,1.00), rgba(0,0,255,1.00))',
            'radial-gradient(circle 2em at top 0px left 0px, rgba(255,0,0,1.00), rgba(0,0,255,1.00))',
            'radial-gradient(circle at top 0px left 0px, rgba(255,0,0,1.00), rgba(0,0,255,1.00))'
          ].join(', ')
        });
      });
    });

    describe('backgroundPosition', () => {
      test('string', () => {
        const backgroundPosition = 'left top, right 10px bottom 20%';
        const style = { backgroundPosition };
        expect(preprocess(style)).toEqual({ backgroundPosition });
      });

      test('array', () => {
        const style = {
          backgroundPosition: [
            { top: 10, left: '20%' },
            { top: 0, right: 0 },
            { bottom: '50%', left: 5 },
            { bottom: 0, right: '10%' }
          ]
        };
        expect(preprocess(style)).toEqual({
          backgroundPosition:
            'top 10px left 20%, top 0px right 0px, bottom 50% left 5px, bottom 0px right 10%'
        });
      });
    });

    describe('backgroundRepeat', () => {
      test('string', () => {
        const backgroundRepeat = 'repeat-x, no-repeat';
        const style = { backgroundRepeat };
        expect(preprocess(style)).toEqual({ backgroundRepeat });
      });

      test('array', () => {
        const style = {
          backgroundRepeat: [
            { x: 'repeat', y: 'no-repeat' },
            { x: 'space', y: 'round' }
          ]
        };
        expect(preprocess(style)).toEqual({
          backgroundRepeat: 'repeat no-repeat, space round'
        });
      });
    });

    describe('backgroundSize', () => {
      test('string', () => {
        const backgroundSize = 'cover, 50% auto';
        const style = { backgroundSize };
        expect(preprocess(style)).toEqual({ backgroundSize });
      });

      test('array', () => {
        const style = {
          backgroundSize: [
            { x: 100, y: '50%' },
            { x: 'auto', y: 20 }
          ]
        };
        expect(preprocess(style)).toEqual({
          backgroundSize: '100px 50%, auto 20px'
        });
      });
    });
  });

  describe('preprocesses multiple shadow styles into a single declaration', () => {
    const options = { shadow: true };

    test('shadowColor only', () => {
      expect(preprocess({ shadowColor: 'red' }, options)).toEqual({
        boxShadow: '0px 0px 0px rgba(255,0,0,1.00)'
      });
    });

    test('shadowColor and shadowOpacity only', () => {
      expect(
        preprocess({ shadowColor: 'red', shadowOpacity: 0.5 }, options)
      ).toEqual({
        boxShadow: '0px 0px 0px rgba(255,0,0,0.50)'
      });
    });

    test('shadowColor system color', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(preprocess({ shadowColor: 'CanvasText' }, options)).toEqual({
        boxShadow: '0px 0px 0px CanvasText'
      });
      expect(preprocess({ shadowColor: 'Mark' }, options)).toEqual({
        boxShadow: '0px 0px 0px var(--rnw-mark)'
      });

      // Opacity is ignored for system and web colors
      expect(
        preprocess({ shadowColor: 'CanvasText', shadowOpacity: 0.5 }, options)
      ).toEqual({
        boxShadow: '0px 0px 0px CanvasText'
      });
      expect(
        preprocess(
          { shadowColor: 'var(--rnw-mark, red)', shadowOpacity: 0.5 },
          options
        )
      ).toEqual({
        boxShadow: '0px 0px 0px var(--rnw-mark, red)'
      });

      // No warning for other web colors
      expect(
        preprocess(
          { shadowColor: 'var(--shadow)', shadowOpacity: 0.5 },
          options
        )
      ).toEqual({
        boxShadow: '0px 0px 0px var(--shadow)'
      });

      expect(spy).toHaveBeenCalledTimes(2);
    });

    test('shadowOffset only', () => {
      expect(
        preprocess({ shadowOffset: { width: 1, height: 2 } }, options)
      ).toEqual({
        boxShadow: '1px 2px 0px rgba(0,0,0,1.00)'
      });
    });

    test('shadowRadius only', () => {
      expect(preprocess({ shadowRadius: 5 }, options)).toEqual({
        boxShadow: '0px 0px 5px rgba(0,0,0,1.00)'
      });
    });

    test('shadowOffset, shadowRadius, shadowColor', () => {
      expect(
        preprocess(
          {
            shadowColor: 'rgba(50,60,70,0.5)',
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3
          },
          options
        )
      ).toEqual({
        boxShadow: '1px 2px 3px rgba(50,60,70,0.25)'
      });
    });

    test('shadow styles and string boxShadow together', () => {
      expect(
        preprocess(
          {
            shadowColor: 'rgba(50,60,70,0.5)',
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            boxShadow: '4px 5px 6px black'
          },
          options
        )
      ).toEqual({
        boxShadow: '4px 5px 6px black, 1px 2px 3px rgba(50,60,70,0.25)'
      });
    });

    test('shadow styles and array boxShadow together', () => {
      expect(
        preprocess(
          {
            shadowColor: 'rgba(50,60,70,0.5)',
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            boxShadow: [
              {
                offsetX: 2,
                offsetY: 3,
                spreadDistance: 5,
                color: 'rgba(10,20,30,0.45)',
                inset: true
              }
            ]
          },
          options
        )
      ).toEqual({
        boxShadow:
          'inset 2px 3px 0 5px rgba(10,20,30,0.45), 1px 2px 3px rgba(50,60,70,0.25)'
      });
    });
  });

  describe('preprocesses multiple textShadow styles into a single declaration', () => {
    const options = { textShadow: true };

    test('textShadowColor only', () => {
      expect(preprocess({ textShadowColor: 'red' }, options)).toEqual({});
    });

    test('textShadowOffset only', () => {
      expect(
        preprocess({ textShadowOffset: { width: 1, height: 2 } }, options)
      ).toEqual({});
    });

    test('textShadowRadius only', () => {
      expect(preprocess({ textShadowRadius: 5 }, options)).toEqual({});
    });

    test('textShadowColor and textShadowOffset only', () => {
      expect(
        preprocess(
          {
            textShadowColor: 'red',
            textShadowOffset: { width: 0, height: 0 }
          },
          options
        )
      ).toEqual({});
      expect(
        preprocess(
          {
            textShadowColor: 'red',
            textShadowOffset: { width: -1, height: 0 }
          },
          options
        )
      ).toEqual({
        textShadow: '-1px 0px 0px rgba(255,0,0,1.00)'
      });
      expect(
        preprocess(
          {
            textShadowColor: 'red',
            textShadowOffset: { width: 1, height: 2 }
          },
          options
        )
      ).toEqual({
        textShadow: '1px 2px 0px rgba(255,0,0,1.00)'
      });
    });

    test('textShadowColor and textShadowRadius only', () => {
      expect(
        preprocess({ textShadowColor: 'red', textShadowRadius: 0 }, options)
      ).toEqual({});
      expect(
        preprocess({ textShadowColor: 'red', textShadowRadius: 5 }, options)
      ).toEqual({
        textShadow: '0px 0px 5px rgba(255,0,0,1.00)'
      });
    });

    test('textShadowColor, textShadowOffset, textShadowRadius', () => {
      expect(
        preprocess(
          {
            textShadowColor: 'rgba(50,60,70,0.50)',
            textShadowOffset: { width: 5, height: 10 },
            textShadowRadius: 15
          },
          options
        )
      ).toEqual({
        textShadow: '5px 10px 15px rgba(50,60,70,0.50)'
      });
    });
  });

  describe('shadow conversion options', () => {
    test('shadow styles are converted by default', () => {
      expect(preprocess({ shadowColor: 'red' })).toEqual({
        boxShadow: '0px 0px 0px rgba(255,0,0,1.00)'
      });
      expect(preprocess({ shadowColor: 'red' }, { textShadow: false })).toEqual(
        { boxShadow: '0px 0px 0px rgba(255,0,0,1.00)' }
      );
    });

    test('shadow styles are not converted when options.shadow is false', () => {
      expect(preprocess({ shadowColor: 'red' }, { shadow: false })).toEqual({});
    });

    test('textShadow styles are converted by default', () => {
      expect(
        preprocess({
          textShadowColor: 'red',
          textShadowOffset: { width: 1, height: 2 }
        })
      ).toEqual({
        textShadow: '1px 2px 0px rgba(255,0,0,1.00)'
      });
    });

    test('textShadow styles are not converted when options.textShadow is false', () => {
      expect(
        preprocess(
          {
            textShadowColor: 'red',
            textShadowOffset: { width: 1, height: 2 }
          },
          { textShadow: false }
        )
      ).toEqual({});
    });
  });
});
