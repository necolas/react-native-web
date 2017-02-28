/* eslint-disable react/prop-types */
import classnames from 'classnames';
import React from 'react';
import styles from './styles.css';

const View = props => <div {...props} className={classnames(styles.initial, props.className)} />;

module.exports = View;
