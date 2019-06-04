/* eslint-env jasmine, jest */
import React from 'react';
import { mount } from 'enzyme';
import Animated from '../../Animated';
import AlertOverlay from '../AlertOverlay';
import AlertDefaultComponent from '../AlertDefaultComponent';
import AlertDefaultButton from '../AlertDefaultButton';

const defaultProps = {
  buttons: [{ text: 'Button', onPress: () => {} }],
  title: 'Title',
  message: 'Message',
  Alert: AlertDefaultComponent,
  Button: AlertDefaultButton,
  options: { cancelable: true, onDismiss: () => {} },
  customStyles: {}
};

function renderOverlay(customProps = {}) {
  const props = {
    animatedValue: new Animated.Value(0),
    ...defaultProps,
    ...customProps
  };

  return mount(<AlertOverlay {...props} />);
}

// Mock Animated's timing function
Animated.timing = jest.fn((av, options) => {
  return {
    start: clbk => clbk && clbk()
  };
});

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
    expect(alertProps.customStyles).toBe(defaultProps.customStyles);
  });

  test('click on the overlay layer should dismiss the alert', () => {
    jest.useFakeTimers();

    const props = {
      onClose: jest.fn(),
      options: {
        cancelable: true,
        onDismiss: jest.fn()
      }
    };
    const wrapper = renderOverlay(props);
    const overlay = wrapper.childAt(0);

    overlay.props().onPressIn({
      target: null
    });

    jest.runAllTimers();

    expect(props.onClose.mock.calls.length).toBe(1);
    expect(props.options.onDismiss.mock.calls.length).toBe(1);
  });

  test('click on the overlay layer should NOT dismiss the alert if cancelable=false', () => {
    jest.useFakeTimers();

    const props = {
      onClose: jest.fn(),
      options: {
        cancelable: false,
        onDismiss: jest.fn()
      }
    };
    const wrapper = renderOverlay(props);
    const overlay = wrapper.childAt(0);

    overlay.props().onPressIn({
      target: null
    });

    jest.runAllTimers();

    expect(props.onClose.mock.calls.length).toBe(0);
    expect(props.options.onDismiss.mock.calls.length).toBe(0);
  });

  test('clicking anywhere else than the overlay should NOT dismiss the alert', () => {
    jest.useFakeTimers();

    const props = {
      onClose: jest.fn(),
      options: {
        cancelable: true,
        onDismiss: jest.fn()
      }
    };
    const wrapper = renderOverlay(props);
    const overlay = wrapper.childAt(0);

    overlay.props().onPressIn({
      target: 'foo'
    });

    jest.runAllTimers();

    expect(props.onClose.mock.calls.length).toBe(0);
    expect(props.options.onDismiss.mock.calls.length).toBe(0);
  });

  test('pressing on ESC key should dismiss the alert', () => {
    jest.useFakeTimers();

    const props = {
      onClose: jest.fn(),
      options: {
        cancelable: true,
        onDismiss: jest.fn()
      }
    };

    renderOverlay(props);
    const event = new KeyboardEvent('keydown', { which: 27 }); // eslint-disable-line
    document.dispatchEvent(event);

    jest.runAllTimers();

    expect(props.onClose.mock.calls.length).toBe(1);
    expect(props.options.onDismiss.mock.calls.length).toBe(1);
  });

  test('pressing on ESC key should NOT dismiss the alert if cancelable=false', () => {
    jest.useFakeTimers();

    const props = {
      onClose: jest.fn(),
      options: {
        cancelable: false,
        onDismiss: jest.fn()
      }
    };

    renderOverlay(props);
    const event = new KeyboardEvent('keydown', { which: 27 }); // eslint-disable-line
    document.dispatchEvent(event);

    jest.runAllTimers();

    expect(props.onClose.mock.calls.length).toBe(0);
    expect(props.options.onDismiss.mock.calls.length).toBe(0);
  });

  test('clicking a button should call the action', () => {
    const onPress1 = jest.fn();
    const onPress2 = jest.fn();
    const wrapper = renderOverlay({
      buttons: [{ text: 'Button', onPress: onPress1 }, { text: 'Button', onPress: onPress2 }]
    });

    wrapper
      .find(AlertDefaultButton)
      .first()
      .props()
      .onPress();

    expect(onPress1.mock.calls.length).toBe(1);
    expect(onPress2.mock.calls.length).toBe(0);
  });

  test('clicking a button should close the alert', () => {
    const onClose = jest.fn();
    const wrapper = renderOverlay({ onClose });

    wrapper
      .find(AlertDefaultButton)
      .props()
      .onPress();
    expect(onClose.mock.calls.length).toBe(1);
  });

  test('custom styles must be applied to the overlay wrapper', () => {
    const wrapperStyle = {};
    const wrapper = renderOverlay({
      customStyles: {
        wrapper: wrapperStyle
      }
    });

    const overlay = wrapper.find('View').first();
    const styles = overlay.props().style[1];
    expect(styles[styles.length - 1]).toBe(wrapperStyle);
  });

  test('custom styles must be applied to the overlay background', () => {
    const overlayStyle = {};
    const wrapper = renderOverlay({
      customStyles: {
        overlay: overlayStyle
      }
    });

    const overlay = wrapper.find(Animated.View).first();
    const styles = overlay.props().style;
    expect(styles[styles.length - 1]).toBe(overlayStyle);
  });
});
