/* eslint-env mocha */

import assert from 'assert'
import Store from '../Store'

suite('apis/StyleSheet/Store', () => {
  suite('the constructor', () => {
    test('initialState', () => {
      const initialState = { classNames: { 'textAlign:center': '__classname__' } }
      const store = new Store(initialState)
      assert.deepEqual(store._classNames['textAlign:center'], '__classname__')
    })
  })

  suite('#get', () => {
    test('returns a declaration-specific className', () => {
      const initialState = {
        classNames: {
          'textAlign:center': '__expected__',
          'textAlign:left': '__error__'
        }
      }
      const store = new Store(initialState)
      assert.deepEqual(store.get('textAlign', 'center'), '__expected__')
    })
  })

  suite('#set', () => {
    test('stores declarations', () => {
      const store = new Store()
      store.set('textAlign', 'center')
      store.set('marginTop', 0)
      store.set('marginTop', 1)
      store.set('marginTop', 2)
      assert.deepEqual(store._declarations, {
        textAlign: [ 'center' ],
        marginTop: [ 0, 1, 2 ]
      })
    })

    test('human-readable classNames', () => {
      const store = new Store()
      store.set('textAlign', 'center')
      store.set('marginTop', 0)
      store.set('marginTop', 1)
      store.set('marginTop', 2)
      assert.deepEqual(store._classNames, {
        'textAlign:center': 'textAlign:center',
        'marginTop:0': 'marginTop:0',
        'marginTop:1': 'marginTop:1',
        'marginTop:2': 'marginTop:2'
      })
    })

    test('obfuscated classNames', () => {
      const store = new Store({}, { obfuscateClassNames: true })
      store.set('textAlign', 'center')
      store.set('marginTop', 0)
      store.set('marginTop', 1)
      store.set('marginTop', 2)
      assert.deepEqual(store._classNames, {
        'textAlign:center': '_s_1',
        'marginTop:0': '_s_2',
        'marginTop:1': '_s_3',
        'marginTop:2': '_s_4'
      })
    })

    test('replaces space characters', () => {
      const store = new Store()

      store.set('backgroundPosition', 'top left')
      assert.equal(store.get('backgroundPosition', 'top left'), 'backgroundPosition\:top-left')
    })
  })

  suite('#toString', () => {
    test('human-readable style sheet', () => {
      const store = new Store()
      store.set('textAlign', 'center')
      store.set('backgroundColor', 'rgba(0,0,0,0)')
      store.set('color', '#fff')
      store.set('fontFamily', '"Helvetica Neue", Arial, sans-serif')
      store.set('marginBottom', '0px')
      store.set('width', '100%')

      const expected = '/* 6 unique declarations */\n' +
          '.backgroundColor\\:rgba\\(0\\,0\\,0\\,0\\){background-color:rgba(0,0,0,0);}\n' +
          '.color\\:\\#fff{color:#fff;}\n' +
          '.fontFamily\\:\\"Helvetica-Neue\\"\\,-Arial\\,-sans-serif{font-family:"Helvetica Neue", Arial, sans-serif;}\n' +
          '.marginBottom\\:0px{margin-bottom:0px;}\n' +
          '.textAlign\\:center{text-align:center;}\n' +
          '.width\\:100\\%{width:100%;}'

      assert.equal(store.toString(), expected)
    })

    test('obfuscated style sheet', () => {
      const store = new Store({}, { obfuscateClassNames: true })
      store.set('textAlign', 'center')
      store.set('marginBottom', '0px')
      store.set('margin', '1px')
      store.set('margin', '2px')
      store.set('margin', '3px')

      const expected = '/* 5 unique declarations */\n' +
          '._s_3{margin:1px;}\n' +
          '._s_4{margin:2px;}\n' +
          '._s_5{margin:3px;}\n' +
          '._s_2{margin-bottom:0px;}\n' +
          '._s_1{text-align:center;}'

      assert.equal(store.toString(), expected)
    })
  })
})
