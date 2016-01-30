/* eslint-env mocha */

import assert from 'assert'
import makeStyleSheetPropTypes from '../makeStyleSheetPropTypes'
import StyleSheet from '../../StyleSheet'
import ViewStylePropTypes from '../../../components/View/ViewStylePropTypes'

const styles = StyleSheet.create({
  root: {
    common: {
      marginVertical: 0,
      marginHorizontal: 'auto'
    },
    mqSmall: {
      maxWidth: '400px'
    },
    mqLarge: {
      maxWidth: '600px'
    }
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  box: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    borderWidth: 1
  },
  horizontalBox: {
    width: '50px'
  }
})

const viewStyleProp = [
  [
    styles.root.common,
    styles.row,
    styles.box,
    [styles.horizontalBox, false, []]
  ],
  [],
  false,
  undefined,
  null,
  0,
  ''
]

const falseyStyleProp = [
  false,
  undefined,
  null,
  0,
  ''
]

const viewPropTypeChecker = makeStyleSheetPropTypes(ViewStylePropTypes)

suite('modules/StylePropTypes/makeStyleSheetPropTypes', () => {
  // Passes
  test('passes falsey prop', () => {
    const props = {
      style: false
    }
    assert.equal(viewPropTypeChecker(props, 'style', 'FakeComponent'), null)
  })
  test('passes array of falsey prop', () => {
    const props = {
      style: falseyStyleProp
    }
    assert.equal(viewPropTypeChecker(props, 'style', 'FakeComponent'), null)
  })
  test('passes valid ViewStyle prop', () => {
    const props = {
      style: viewStyleProp
    }
    assert.equal(viewPropTypeChecker(props, 'style', 'FakeComponent'), null)
  })

  // Failures
  test('fails a bad prop', () => {
    const props = {
      style: 'notAValidStyle'
    }
    const result = viewPropTypeChecker(props, 'style', 'FakeComponent')
    assert.equal(
      result.message,
      'Invalid undefined `style` supplied to `FakeComponent`.'
    )
  })
  test('fails array of bad prop', () => {
    const props = {
      style: [ 'notAValidStyle' ]
    }
    const result = viewPropTypeChecker(props, 'style', 'FakeComponent')
    assert.equal(
      result.message,
      'Invalid undefined `style` supplied to `FakeComponent`.'
    )
  })
  test('fails nested array of bad prop', () => {
    const props = {
      style: [[[[[ 'notAValidStyle' ]]]]]
    }
    const result = viewPropTypeChecker(props, 'style', 'FakeComponent')
    assert.equal(
      result.message,
      'Invalid undefined `style` supplied to `FakeComponent`.'
    )
  })
})
