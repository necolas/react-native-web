/* eslint-env jasmine, jest */
import React from 'react';
import { shallow } from 'enzyme';
import Animated from '../../Animated';
import AlertOverlay from '../AlertOverlay';
import AlertDefaultComponent from '../AlertDefaultComponent';
import AlertDefaultButton from '../AlertDefaultButton';

const defaultProps = {
  buttons: [{ text: 'Button', onPress: () => {} }],
  title: 'Title',
  message: 'Message',
  Alert: AlertDefaultComponent,
  Button: AlertDefaultButton
};

function renderOverlay(customProps = {}) {
  const props = {
    animatedValue: new Animated.Value(0),
    ...defaultProps,
    ...customProps
  };

  return shallow(<AlertOverlay {...props} />);
}

describe('<AlertOverlay>', () => {
  test('must mount the component passed as Alert prop', () => {
    const Alert = function Alert() {
      return null;
    };
    const wrapper = renderOverlay({ Alert });
    expect(wrapper.find(Alert).length).toBe(1);
  });

  test('must pass the props down to the Alert component', () => {
    const wrapper = renderOverlay();
    const alertProps = wrapper.find(AlertDefaultComponent).props();

    expect(alertProps.title).toBe(defaultProps.title);
    expect(alertProps.message).toBe(defaultProps.message);
    expect(alertProps.buttons.length).toBe(defaultProps.buttons.length);
    expect(alertProps.buttons[0].text).toBe(defaultProps.buttons[0].text);
    expect(alertProps.Button).toBe(defaultProps.Button);
  });
  /*
	test('must animate the animated value prop', done => {
		
		jest.useFakeTimers()

		const av = new Animated.Value(0)
		renderOverlay({ animatedValue: av });

		setTimeout( () => {
			expect( av._value ).toBe( 1 )
			done();
		}, 500)

		jest.runAllTimers()
	});
	s*/
});
