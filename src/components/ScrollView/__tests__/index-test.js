/* eslint-env mocha */

import * as utils from '../../../modules/specHelpers'

import ScrollView from '../'

suite('components/ScrollView', () => {
  test('prop "style"', () => {
    utils.assertProps.style(ScrollView)
  })
})
