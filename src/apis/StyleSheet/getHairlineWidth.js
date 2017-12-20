/**
 * Based on http://dieulot.net/css-retina-hairline
 * @noflow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

const getHairlineWidth = () => {
  let hairlineWidth = 1;
  if (canUseDOM && window.devicePixelRatio && window.devicePixelRatio >= 2) {
    const node = document.createElement('div');
    node.style.border = '.5px solid transparent';
    document.body.appendChild(node);
    if (node.offsetHeight === 1) {
      hairlineWidth = 0.5;
    }
    document.body.removeChild(node);
  }
  return hairlineWidth;
};

export default getHairlineWidth;
