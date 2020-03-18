class TVEventHandler {
  constructor() {
    this.component = null;
    this.callback = null;
  }

  enable(component, callback) {
    this.component = component;
    this.callback = callback;
    document.addEventListener('onHWKeyEvent', this.onHWKeyEvent.bind(this));
  }

  disable() {
    document.removeEventListener('onHWKeyEvent', this.onHWKeyEvent);
  }

  onHWKeyEvent(event) {
    if (this.callback) {
      if (event && event.detail) {
        const tvEvent = event.detail.tvEvent;
        if (tvEvent) {
          this.callback(this.component, tvEvent);
        }
      }
    }
  }

  static dispatchEvent(tvEvent) {
    // Dispatch tvEvent through onHWKeyEvent
    // eslint-disable-next-line no-undef
    const hwKeyEvent = new CustomEvent('onHWKeyEvent', {
      detail: { tvEvent: tvEvent }
    });
    document.dispatchEvent(hwKeyEvent);
  }

  static getTVEvent(event) {
    // create tv event
    const tvEvent = {
      eventKeyAction: -1,
      eventType: '',
      tag: ''
    };
    // Key Event
    if (event.type === 'keydown' || event.type === 'keyup') {
      // get event type
      switch (event.key) {
        case 'Enter':
          tvEvent.eventType = 'select';
          break;
        case 'ArrowUp':
          tvEvent.eventType = 'up';
          break;
        case 'ArrowRight':
          tvEvent.eventType = 'right';
          break;
        case 'ArrowDown':
          tvEvent.eventType = 'down';
          break;
        case 'ArrowLeft':
          tvEvent.eventType = 'left';
          break;
        case 'MediaPlayPause':
          tvEvent.eventType = 'playPause';
          break;
        case 'MediaRewind':
          tvEvent.eventType = 'rewind';
          break;
        case 'MediaFastForward':
          tvEvent.eventType = 'fastForward';
          break;
        case 'Menu':
          tvEvent.eventType = 'menu';
          break;
        default:
          tvEvent.eventType = '';
      }
      if (event.type === 'keydown') {
        tvEvent.eventKeyAction = 0;
      } else if (event.type === 'keyup') {
        tvEvent.eventKeyAction = 1;
      }
    }
    // Focus / Blur event
    else if (event.type === 'focus' || event.type === 'blur') {
      tvEvent.eventType = event.type;
    }
    // Get tag from id attribute
    if (event.target && event.target.id) {
      tvEvent.tag = event.target.id;
    }
    return tvEvent;
  }
}

export default TVEventHandler;
