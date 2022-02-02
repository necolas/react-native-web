import React from 'react';
import { styleq } from 'styleq';

const q = styleq.factory({ disableCache: false });

function View(props) {
  const [className, inlineStyle] = q([styles.root, props.style]);
  return <div {...props} className={className} style={inlineStyle} />;
}

const styles = {
  root: {
    $$css: true,
    'css-175oi2r': 'css-175oi2r'
  }
};

export default View;
