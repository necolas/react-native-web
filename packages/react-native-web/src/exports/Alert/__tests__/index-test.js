/* eslint-env jasmine, jest */
import Alert from '../index';
import AlertOverlay from '../AlertOverlay';
import AlertDefaultComponent from '../AlertDefaultComponent';
import AlertDefaultButton from '../AlertDefaultButton';

const overlayRender = AlertOverlay.prototype.render;
function callAlert() {
  const props = {};

  // Mock the render method
  AlertOverlay.prototype.render = function() {
    Object.keys(this.props).forEach(p => (props[p] = this.props[p]));
    return overlayRender.call(this);
  };

  Alert.alert('Title', 'Message', [{ text: 'Button', onPress: () => {} }]);

  // Expose props to be able of closing th
  return props;
}

describe('apis/Alert', () => {
  beforeEach(() => {
    // Clean up all children on every test
    Array.prototype.forEach.call(document.body.children, child => {
      document.body.removeChild(child);
    });

    // Clean up custom component and styles
    delete Alert.Button;
    delete Alert.Component;
    delete Alert.getCustomStyles;
  });

  it('must mount a node when alert is called', () => {
    const childrenCount = document.body.children.length;

    callAlert();

    const actual = document.body.children.length;

    expect(actual).toBe(childrenCount + 1);
  });

  it('mounted node must have data-alert attribute', () => {
    callAlert();

    const mounted = document.body.children[0];

    expect(mounted.getAttribute('data-alert')).toBe('true');
  });

  it('must deactivate any other node in the body for screen readers', () => {
    document.body.appendChild(document.createElement('div'));
    document.body.appendChild(document.createElement('div'));

    callAlert();

    const children = document.body.children;

    expect(children[0].getAttribute('aria-hidden')).toBe('true');
    expect(children[1].getAttribute('aria-hidden')).toBe('true');
    expect(children[2].getAttribute('aria-hidden')).toBe(null);
  });

  it('focus trap element must be focused after alert is called', () => {
    callAlert();
    const focused = document.activeElement;

    expect(focused.getAttribute('data-focustrap')).toBe('alert');
  });

  it('after calling alert body must be focusable', () => {
    callAlert();
    expect(document.body.getAttribute('tabindex')).toBe('0');
  });

  it('after calling alert body must be not scrollable', () => {
    callAlert();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('after calling alert body text must not be selectable', () => {
    callAlert();
    expect(document.body.style.userSelect).toBe('none');
  });

  it('must pass the options down to the overlay as props', () => {
    const props = callAlert();
    expect(props.title).toBe('Title');
    expect(props.message).toBe('Message');
    expect(props.buttons.length).toBe(1);
    expect(props.buttons[0].text).toBe('Button');
  });

  it('must use default components for alert and buttons if no other is provided', () => {
    const props = callAlert();
    expect(props.Alert).toBe(AlertDefaultComponent);
    expect(props.Button).toBe(AlertDefaultButton);
  });

  it('must use custom components for alert and buttons if set in the Alert object', () => {
    const customComponent = () => null;
    const customButton = () => null;

    Alert.Component = customComponent;
    Alert.Button = customButton;

    const props = callAlert();
    expect(props.Alert).toBe(customComponent);
    expect(props.Button).toBe(customButton);
  });

  it('must pass an empty object down to the overlay if no getCustomStyles method set', () => {
    const props = callAlert();
    expect(props.customStyles).toEqual({});
  });

  it('must pass the result of getCustomStyles down to the overlay', () => {
    let animatedValue;
    const customStyles = { foo: 'bar' };
    Alert.getCustomStyles = av => {
      animatedValue = av;
      return customStyles;
    };

    const props = callAlert();
    expect(props.customStyles).toBe(customStyles);
    expect(animatedValue && animatedValue.setValue).toBeTruthy();
  });

  it('must unmount the node when closing the alert', () => {
    const childrenCount = document.body.children.length;
    const props = callAlert();
    expect(document.body.children.length).toBe(childrenCount + 1);
    props.onClose();
    expect(document.body.children.length).toBe(childrenCount);
  });

  it('must restore the aria-hidden attributes when closing the alert', () => {
    document.body.appendChild(document.createElement('div'));

    const div = document.createElement('div');
    div.setAttribute('aria-hidden', 'foo');
    document.body.appendChild(div);

    callAlert().onClose();

    const children = document.body.children;
    expect(children[0].getAttribute('aria-hidden')).toBe(null);
    expect(children[1].getAttribute('aria-hidden')).toBe('foo');
  });

  it('must return the focus to the previous focused element when closing the alert', () => {
    const activeElement = document.activeElement;
    callAlert().onClose();
    expect(document.activeElement).toBe(activeElement);
  });

  it('body must restore its tabindex after closing the alert', () => {
    document.body.setAttribute('tabindex', 'foo');
    callAlert().onClose();
    expect(document.body.getAttribute('tabindex')).toBe('foo');

    document.body.removeAttribute('tabindex');
    callAlert().onClose();
    expect(document.body.getAttribute('tabindex')).toBe(null);
  });

  it('body must restore its overflow style after closing the alert', () => {
    document.body.style.overflow = 'foo';
    callAlert().onClose();
    expect(document.body.style.overflow).toBe('foo');
  });

  it('body must restore its userSelect style after closing the alert', () => {
    document.body.style.userSelect = 'foo';
    callAlert().onClose();
    expect(document.body.style.userSelect).toBe('foo');
  });
});
