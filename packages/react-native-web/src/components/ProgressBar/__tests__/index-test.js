/* eslint-env jasmine, jest */

import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from '..';

describe('components/ProgressBar', () => {
  describe('progress', () => {
    it('value as percentage is set to "aria-valuenow"', () => {
      const component = shallow(<ProgressBar progress={0.5} />);
      expect(component.prop('aria-valuenow') === 50).toBeTruthy();
    });

    it('is ignored when "indeterminate" is "true"', () => {
      const component = shallow(<ProgressBar indeterminate progress={0.5} />);
      expect(component.prop('aria-valuenow') === null).toBeTruthy();
    });
  });
});
