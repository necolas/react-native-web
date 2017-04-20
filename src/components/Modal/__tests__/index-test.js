/* eslint-env jasmine, jest */

import React from 'react';
import renderer from 'react-test-renderer';
import Modal from '..';

jest.mock('react-dom');

describe('components/Modal', () => {
  describe('visible', () => {
    test('when "true" a container is rendered', () => {
      const component = renderer.create(<Modal />);
      expect(component.toJSON()).toMatchSnapshot();
    });
    test('when "false" a container is not rendered', () => {
      const component = renderer.create(
        <Modal visible={false} />
      );
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
})
