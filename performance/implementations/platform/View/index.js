/* eslint-disable react/prop-types */
import classnames from 'classnames';
import React from 'react';

const View = props => <div {...props} className={classnames('view', props.className)} />;

module.exports = View;
