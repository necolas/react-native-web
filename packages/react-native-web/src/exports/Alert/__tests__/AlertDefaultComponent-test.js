/* eslint-env jasmine, jest */
import React from 'react';
import { mount } from 'enzyme';
import AlertDefaultComponent from '../AlertDefaultComponent';
import AlertDefaultButton from '../AlertDefaultButton';

const defaultProps = {
  buttons: [
    { text: 'Button', onPress: () => {} },
    { text: 'Button', onPress: () => {}, type: 'destructive' }
  ],
  title: 'Title',
  message: 'Message',
  Button: AlertDefaultButton,
  customStyles: {}
};

function renderAlert(customProps = {}) {
  const props = {
    ...defaultProps,
    ...customProps
  };

  return mount(<AlertDefaultComponent {...props} />);
}

describe('<AlertDefaultComponent>', () => {
  test('must render the title and the description', () => {
    const wrapper = renderAlert();
    const texts = wrapper.find('Text');
    expect(texts.at(0).text()).toBe(defaultProps.title);
    expect(texts.at(1).text()).toBe(defaultProps.message);
  });

  test('must render the buttons', () => {
    const wrapper = renderAlert();
    const buttons = wrapper.find(defaultProps.Button);
    const button1Props = buttons.at(0).props();
    const button2Props = buttons.at(1).props();

    expect(button1Props.text).toBe(defaultProps.buttons[0].text);
    expect(button1Props.onPress).toBe(defaultProps.buttons[0].onPress);
    expect(button1Props.type).toBe(defaultProps.buttons[0].type);
    expect(button2Props.text).toBe(defaultProps.buttons[1].text);
    expect(button2Props.onPress).toBe(defaultProps.buttons[1].onPress);
    expect(button2Props.type).toBe(defaultProps.buttons[1].type);
  });

  test('custom styles must be passed to the layers', () => {
    const customStyles = {
      alertWrapper: {},
      titleWrapper: {},
      title: {},
      messageWrapper: {},
      message: {},
      buttonsWrapper: {}
    };

    const wrapper = renderAlert({ customStyles }).find('View');

    const title = wrapper.at(1);
    const message = wrapper.at(2);
    const buttons = wrapper.at(3);

    expect(wrapper.at(0).props().style[1]).toBe(customStyles.alertWrapper);
    expect(title.props().style[1]).toBe(customStyles.titleWrapper);
    expect(title.find('Text').props().style[1]).toBe(customStyles.title);
    expect(message.props().style[1]).toBe(customStyles.messageWrapper);
    expect(message.find('Text').props().style[1]).toBe(customStyles.message);
    expect(buttons.props().style[1]).toBe(customStyles.buttonsWrapper);
  });
});
