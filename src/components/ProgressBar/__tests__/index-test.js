/* eslint-env mocha */

import assert from 'assert';
import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from '..';

suite('components/ProgressBar', () => {
  suite('progress', () => {
    test('value as percentage is set to "aria-valuenow"', () => {
      const component = shallow(<ProgressBar progress={0.5} />);
      assert(component.prop('aria-valuenow') === 50);
    });

    test('is ignored when "indeterminate" is "true"', () => {
      const component = shallow(<ProgressBar indeterminate progress={0.5} />);
      assert(component.prop('aria-valuenow') === null);
    });
  });
});
