import classnames from 'classnames';
import { Component } from 'react';

import styles from './view-styles.css';

class View extends Component {
  render() {
    const props = this.props;
    return (
      <div {...props} className={classnames(styles.initial, props.className)} />
    );
  }
}

export default View;
