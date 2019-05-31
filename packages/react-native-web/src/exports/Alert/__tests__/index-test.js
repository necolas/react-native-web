/* eslint-env jasmine, jest */
import Alert from '../index';
import AlertOverlay from '../AlertOverlay';

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

  it('should deactivate any other node in the body for screen readers', () => {
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
    expect(document.body.getAttribute('tabIndex')).toBe('0');
  });

  it('after calling alert body must be not scrollable', () => {
    callAlert();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('after calling alert body text must not be selectable', () => {
    callAlert();
    // console.log( props );
    expect(document.body.style.userSelect).toBe('none');
  });
});
